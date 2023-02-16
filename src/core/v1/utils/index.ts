import { BigNumber, ethers } from 'ethers';
import Web3 from 'web3';

import { Log, provider, TransactionConfig } from 'web3-core';
import { AggregatorStable } from '../aggregator';
import { DecodeLogInterface, PUNK_CONTRACT_ADDRESS } from './consts';
import { AggregatorUtilsException } from '../../exception';
import {
  ErrorHandler,
  inspectTransactionParams as InspectTransactionParams,
  ReceiptHandler,
  Transaction,
  TransactionHashHandler,
  Utils,
} from '../../interface';

export class AggregatorUtils implements Utils {
  constructor(private provider: provider) {}
  private web3 = new Web3(this.provider);
  private TRANSFER_TOPIC = this.web3.eth.abi.encodeEventSignature(DecodeLogInterface.Transfer721);
  private TRANSFER_BATCH_TOPIC = this.web3.eth.abi.encodeEventSignature(DecodeLogInterface.BatchTransfer1155);
  private TRANSFER_SINGLE_TOPIC = this.web3.eth.abi.encodeEventSignature(DecodeLogInterface.SingleTransfer1155);
  private PUNK_TRANSFER_TOPIC = this.web3.eth.abi.encodeEventSignature(DecodeLogInterface.PunkTransfer);
  private PUNK_SINGLE_TOPIC = this.web3.eth.abi.encodeEventSignature(DecodeLogInterface.PunkBought);
  inspectTransaction({ hash, interval = 1000 }: InspectTransactionParams) {
    const transactionInstance = new SendTransaction();
    const intervalId = setInterval(async () => {
      try {
        const res = await this.web3?.eth?.getTransactionReceipt(hash);
        if (res === null) {
          return;
        }
        clearInterval(intervalId);
        transactionInstance.receipt_handler?.(res);
      } catch (error) {
        transactionInstance.error_handler?.(error as Error);
      } finally {
        transactionInstance.finally?.();
      }
    }, interval);
    return transactionInstance;
  }
  decodeLog(log: Log) {
    if (!log) {
      throw AggregatorUtilsException.decodeLogError('log is empty');
    }
    let contract;
    let tokenId;
    let amount = 0;
    let is1155 = false;
    const topic = log?.topics?.[0];
    let decodedEventLog;
    let to;
    try {
      switch (topic) {
        case this.TRANSFER_TOPIC:
          if (log.address.toLowerCase() === PUNK_CONTRACT_ADDRESS) {
            // one punk sale will trigger both Transfer721 and PunkBought
            break;
          } else {
            debugger;
            // 721
            decodedEventLog = this.web3.eth.abi.decodeLog(
              DecodeLogInterface.Transfer721.inputs ?? [],
              log.data,
              log.topics.slice(1)
            );
            contract = log.address;
            tokenId = decodedEventLog.tokenId.toString();
            to = decodedEventLog.to;
            amount = 1;
          }
          break;
        case this.TRANSFER_BATCH_TOPIC:
          // batch 1155
          decodedEventLog = this.web3.eth.abi.decodeLog(
            DecodeLogInterface.BatchTransfer1155.inputs ?? [],
            log.data,
            log.topics.slice(1)
          );
          contract = log.address;
          tokenId = decodedEventLog.ids[0];
          amount = parseInt(decodedEventLog.value); // value代表成交的数量
          to = decodedEventLog.to;
          is1155 = true;
          break;
        case this.TRANSFER_SINGLE_TOPIC:
          // single 1155
          decodedEventLog = this.web3.eth.abi.decodeLog(
            DecodeLogInterface.SingleTransfer1155.inputs ?? [],
            log.data,
            log.topics.slice(1)
          );
          contract = log.address;
          tokenId = decodedEventLog.id.toString();
          to = decodedEventLog.to;
          is1155 = true;
          amount = 1;
          break;
        case this.PUNK_TRANSFER_TOPIC:
          // punk
          decodedEventLog = this.web3.eth.abi.decodeLog(
            DecodeLogInterface.PunkTransfer.inputs ?? [],
            log.data,
            log.topics.slice(1)
          );
          contract = log.address;
          tokenId = decodedEventLog.punkIndex.toString();
          to = decodedEventLog.to;
          amount = 1;
          break;
        case this.PUNK_SINGLE_TOPIC:
          decodedEventLog = this.web3.eth.abi.decodeLog(
            DecodeLogInterface.PunkBought.inputs ?? [],
            log.data,
            // without the topic[0] if its a non-anonymous event, otherwise with topic[0].
            log.topics.slice(1)
          );
          contract = log.address;
          tokenId = decodedEventLog.punkIndex.toString();
          to = decodedEventLog.toAddress;
          break;
        default:
          return null;
      }
      return {
        contract,
        tokenId,
        amount,
        is1155,
        to,
      };
    } catch (error) {
      throw AggregatorUtilsException.decodeLogError(error?.toString());
    }
  }
  sendSafeModeTransaction(transactionConfig: Partial<ethers.Transaction>) {
    const transactionInstance = new SendTransaction();
    // safe mode need more transaction detail than normal, including nonce, gasLimit, type and etc.
    // https://docs.ethers.io/v5/api/providers/types/#providers-TransactionRequest
    this.web3.eth.getTransactionCount(transactionConfig.from as string).then((nonce) => {
      transactionConfig.value = BigNumber.isBigNumber(transactionConfig.value)
        ? transactionConfig.value
        : (BigNumber.from(transactionConfig.value) as any);
      transactionConfig.nonce = nonce;
      transactionConfig.type = 2;
      const priorityFee = BigNumber.from(2000000000);
      this.web3.eth.getGasPrice().then((gasPrice) => {
        transactionConfig.maxFeePerGas = priorityFee.add(BigNumber.from(gasPrice));
        transactionConfig.maxPriorityFeePerGas = priorityFee;
        // eth_sign only accetp 32byte data
        const unsignedTransactionHash = this.web3.utils.keccak256(ethers.utils.serializeTransaction(transactionConfig));

        this.web3.eth
          .sign(unsignedTransactionHash, transactionConfig.from as string)
          .then(async (signedTransaction) => {
            const signedTrx = ethers.utils.serializeTransaction(transactionConfig, signedTransaction);
            const trueRpc = 'https://rpc.flashbots.net';
            const flashBots = new Web3(trueRpc);
            flashBots.eth
              .sendSignedTransaction(signedTrx)
              .on('transactionHash', (hash) => {
                transactionInstance.transaction_hash_handler?.(hash);
              })
              .on('receipt', (receipt) => {
                transactionInstance.receipt_handler?.(receipt);
              })
              .on('error', (error) => {
                transactionInstance.error_handler?.(error);
              });
          })
          .catch((error) => {
            transactionInstance.error_handler?.(error);
          })
          .finally(() => {
            transactionInstance.finally_handler?.();
          });
      });
    });
    return transactionInstance;
  }
  sendTransaction(transactionConfig: TransactionConfig) {
    const transactionInstance = new SendTransaction();

    this.web3.eth
      .estimateGas({
        data: transactionConfig.data,
        value: transactionConfig.value,
        from: transactionConfig.from,
        to: transactionConfig.to,
      })
      .then((estimateGas) => {
        transactionConfig.gas = BigNumber.from(estimateGas).toHexString();
        // @ts-ignore
        if (globalThis?.ethereum) {
          // @ts-ignore
          globalThis?.ethereum
            ?.request({ method: 'eth_sendTransaction', params: [transactionConfig] })
            .then((hash: string) => {
              transactionInstance.transaction_hash_handler?.(hash);
              this.inspectTransaction({ hash }).on('receipt', (receipt) => {
                transactionInstance.receipt_handler?.(receipt);
              });
            })
            .catch((error: Error) => {
              transactionInstance.error_handler?.(error);
            })
            .finally(() => {
              transactionInstance.finally();
            });
        } else {
          this.web3.eth
            .sendTransaction(transactionConfig)
            .on('transactionHash', (hash) => {
              transactionInstance.transaction_hash_handler?.(hash);
            })
            .on('receipt', (receipt) => {
              transactionInstance.receipt_handler?.(receipt);
            })
            .on('error', (error) => {
              transactionInstance.error_handler?.(error);
            })
            .finally(() => {
              transactionInstance.finally_handler?.();
            });
        }
      });
    return transactionInstance;
  }
}

class SendTransaction implements Transaction {
  public transaction_hash_handler: TransactionHashHandler = null;
  public receipt_handler: ReceiptHandler = null;
  public error_handler: ErrorHandler = null;
  public finally_handler: (() => void) | null | undefined = null;
  on(type: 'transaction_hash', handler: TransactionHashHandler): Transaction;
  on(type: 'receipt', handler: ReceiptHandler): Transaction;
  on(type: 'error', handler: ErrorHandler): Transaction;
  on(
    type: 'transaction_hash' | 'receipt' | 'error',
    handler: TransactionHashHandler & ReceiptHandler & ErrorHandler
  ): Transaction {
    this[`${type}_handler`] = handler;
    return this;
  }
  finally(onfinally?: (() => void) | null | undefined): void {
    this.finally_handler = onfinally;
  }
}
