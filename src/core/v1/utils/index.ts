import { BigNumber, ethers } from 'ethers';
import Web3 from 'web3';

import { Log, provider, TransactionConfig, TransactionReceipt } from 'web3-core';
import { PUNK_CONTRACT_ADDRESS } from './consts';
import { AggregatorUtilsException } from '../../exception';
import {
  ErrorHandler,
  FinallyHandler,
  InspectTransactionParams as InspectTransactionParams,
  NFTBaseInfo,
  NFTInfoForTrade,
  ReceiptHandler,
  Transaction,
  TransactionHashHandler,
  Utils,
} from '../../interface';
import { CryptoPunkAbi, ERC721Abi } from '../abi/ERC721';
import { ERC1155Abi } from '../abi/ERC1155';

export class AggregatorUtils implements Utils {
  constructor(private provider: provider) {
    this._web3Instance = new Web3(this.provider);
    this.TRANSFER_TOPIC = this._web3Instance?.eth.abi.encodeEventSignature(ERC721Abi.transfer);
    this.TRANSFER_BATCH_TOPIC = this._web3Instance.eth.abi.encodeEventSignature(ERC1155Abi.batchTransfer);
    this.TRANSFER_SINGLE_TOPIC = this._web3Instance.eth.abi.encodeEventSignature(ERC1155Abi.singleTransfer);
    this.PUNK_TRANSFER_TOPIC = this._web3Instance.eth.abi.encodeEventSignature(CryptoPunkAbi.transfer);
    this.PUNK_SINGLE_TOPIC = this._web3Instance.eth.abi.encodeEventSignature(CryptoPunkAbi.bought);
    this.init();
  }
  public _web3Instance: Web3;
  public account: string = '';
  private async init() {
    const accounts = await this._web3Instance.eth.getAccounts();
    this.account = accounts[0];
  }
  private TRANSFER_TOPIC: string;
  private TRANSFER_BATCH_TOPIC: string;
  private TRANSFER_SINGLE_TOPIC: string;
  private PUNK_TRANSFER_TOPIC: string;
  private PUNK_SINGLE_TOPIC: string;
  inspectTransaction({ hash, interval = 1000 }: InspectTransactionParams) {
    const transactionInstance = new SendTransaction();
    const intervalId = setInterval(async () => {
      try {
        const res = await this._web3Instance?.eth?.getTransactionReceipt(hash);
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
            // A punk sale will trigger both Transfer721 and PunkBought. We take PunkBought into count rather than Transfer721.
            break;
          } else {
            // 721
            decodedEventLog = this._web3Instance.eth.abi.decodeLog(
              ERC721Abi.transfer.inputs ?? [],
              log.data,
              log.topics.slice(1) // without the topic[0] if its a non-anonymous event, otherwise with topic[0].
            );
            contract = log.address;
            tokenId = decodedEventLog.tokenId.toString();
            to = decodedEventLog.to;
            amount = 1;
          }
          break;
        case this.TRANSFER_BATCH_TOPIC:
          // batch 1155
          decodedEventLog = this._web3Instance.eth.abi.decodeLog(
            ERC1155Abi.batchTransfer.inputs ?? [],
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
          decodedEventLog = this._web3Instance.eth.abi.decodeLog(
            ERC1155Abi.singleTransfer.inputs ?? [],
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
          decodedEventLog = this._web3Instance.eth.abi.decodeLog(
            CryptoPunkAbi.transfer.inputs ?? [],
            log.data,
            log.topics.slice(1)
          );
          contract = log.address;
          tokenId = decodedEventLog.punkIndex.toString();
          to = decodedEventLog.to;
          amount = 1;
          break;
        case this.PUNK_SINGLE_TOPIC:
          decodedEventLog = this._web3Instance.eth.abi.decodeLog(
            CryptoPunkAbi.bought.inputs ?? [],
            log.data,
            log.topics.slice(1)
          );
          contract = log.address;
          tokenId = decodedEventLog.punkIndex.toString();
          to = decodedEventLog.toAddress;
          break;
        default:
          amount = 0;
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
  genUniqueKeyForNFT({ contract, tokenId }: NFTBaseInfo): string {
    return `${contract?.toLocaleLowerCase?.()}_${tokenId}`;
  }
  parseTransactedNFTs(receipt: TransactionReceipt): Map<string, NFTInfoForTrade> | undefined {
    if (receipt?.logs.length === 0 || !receipt?.status) {
      return undefined;
    }
    // Use set to prevent duplication.
    // Because there will be multiple logs for one nft transaction
    // multiple identical nft information may be parsed
    const successList = new Map<string, NFTInfoForTrade>();
    for (let i = 0; i < receipt?.logs.length; i++) {
      const log = receipt.logs[i];
      const { contract, tokenId, is1155, amount, to } = this.decodeLog(log);
      // Not every log can parse contract and tokenId
      // Only Log whose destination address equal to buyer address is useful
      if ((!contract && !tokenId) || to?.toLowerCase() !== this.account?.toLowerCase()) {
        continue;
      }
      const key = this.genUniqueKeyForNFT({ contract, tokenId });
      if (is1155) {
        if (successList.has(key)) {
          const old1155 = successList.get(key) as NFTInfoForTrade;
          old1155.amount += amount ?? 0;
          successList.set(key, old1155);
        } else {
          successList.set(key, { contract, tokenId, amount });
        }
      } else {
        successList.set(key, { contract, tokenId, amount });
      }
    }
    return successList;
  }
  sendSafeModeTransaction(transactionConfig: Partial<ethers.Transaction>) {
    const transactionInstance = new SendTransaction();
    // safe mode need more transaction detail than normal, including nonce, gasLimit, type and etc.
    // https://docs.ethers.io/v5/api/providers/types/#providers-TransactionRequest
    this._web3Instance.eth.getTransactionCount(transactionConfig.from as string).then((nonce) => {
      transactionConfig.value = BigNumber.isBigNumber(transactionConfig.value)
        ? transactionConfig.value
        : (BigNumber.from(transactionConfig.value) as any);
      transactionConfig.nonce = nonce;
      transactionConfig.type = 2;
      const priorityFee = BigNumber.from(2000000000);
      this._web3Instance.eth.getGasPrice().then((gasPrice) => {
        transactionConfig.maxFeePerGas = priorityFee.add(BigNumber.from(gasPrice));
        transactionConfig.maxPriorityFeePerGas = priorityFee;
        // eth_sign only accetp 32byte data
        const unsignedTransactionHash = this._web3Instance.utils.keccak256(
          ethers.utils.serializeTransaction(transactionConfig)
        );

        this._web3Instance.eth
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

    this._web3Instance.eth
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
          this._web3Instance.eth
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
  public finally_handler: FinallyHandler = null;
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
  finally(onfinally?: FinallyHandler): void {
    this.finally_handler = onfinally;
  }
}
