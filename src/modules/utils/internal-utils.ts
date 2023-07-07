import { BigNumber, ethers } from 'ethers';
import Web3 from 'web3';

import { Log, provider, TransactionConfig } from 'web3-core';
import { PUNK_CONTRACT_ADDRESS } from './consts';

import { ERC721ABI, CryptoPunkABI, ERC1155ABI } from '@/abi';
import {
  WalletConfig,
  InspectTransactionParams,
  TransactionHashHandler,
  ReceiptHandler,
  ErrorHandler,
  FinallyHandler,
  Transaction,
  ActionTaskExecutor,
  Config,
  AggregatorAction,
  InternalUtils,
} from '@/types';
import { UtilsException } from '@/exceptions';

export class InternalAggregatorUtils implements InternalUtils {
  private provider?: provider;
  private walletConfig?: WalletConfig;
  constructor(config: Config) {
    this.provider = config.web3Provider;
    this.walletConfig = config.walletConfig;

    this._web3Instance = new Web3(this.provider || (globalThis as any)?.ethereum);

    this._ethersProvider = new ethers.providers.Web3Provider(this.provider || (globalThis as any)?.ethereum);
    if (this.walletConfig) {
      if (typeof this.walletConfig?.address !== 'string') {
        throw UtilsException.invalidParamError('walletConfig.address');
      }
      if (typeof this.walletConfig?.privateKey !== 'string') {
        throw UtilsException.invalidParamError('walletConfig.privateKey');
      }

      this._ethersSigner = this.provider
        ? new ethers.Wallet(
            this.walletConfig.privateKey,
            new ethers.providers.JsonRpcProvider((this.provider as any).host)
          )
        : this._ethersProvider.getSigner(this.walletConfig?.address);

      this._web3Instance.eth.accounts.wallet.add(this.walletConfig as WalletConfig);
    }
    this.TRANSFER_TOPIC = this._web3Instance?.eth.abi.encodeEventSignature(ERC721ABI.transfer);
    this.TRANSFER_BATCH_TOPIC = this._web3Instance.eth.abi.encodeEventSignature(ERC1155ABI.batchTransfer);
    this.TRANSFER_SINGLE_TOPIC = this._web3Instance.eth.abi.encodeEventSignature(ERC1155ABI.singleTransfer);
    this.PUNK_TRANSFER_TOPIC = this._web3Instance.eth.abi.encodeEventSignature(CryptoPunkABI.transfer);
    this.PUNK_BOUGHT_TOPIC = this._web3Instance.eth.abi.encodeEventSignature(CryptoPunkABI.bought);
  }

  public _ethersProvider: ethers.providers.Web3Provider;
  public _ethersSigner: any;
  public _web3Instance: Web3;
  public account: string | undefined = this.walletConfig?.address;
  public blurAccessToken: string | undefined;
  private TRANSFER_TOPIC: string;
  private TRANSFER_BATCH_TOPIC: string;
  private TRANSFER_SINGLE_TOPIC: string;
  private PUNK_TRANSFER_TOPIC: string;
  private PUNK_BOUGHT_TOPIC: string;

  createActionExecutor?: (actions: AggregatorAction[]) => ActionTaskExecutor;
  inspectTransaction({ hash, interval = 1000 }: InspectTransactionParams) {
    const transactionInstance = new SendTransaction();
    const intervalId = setInterval(async () => {
      try {
        const res = await this._web3Instance?.eth?.getTransactionReceipt(hash);
        if (res === null) {
          return;
        }
        clearInterval(intervalId);
        transactionInstance.receiptHandler?.(res);
      } catch (error) {
        transactionInstance.errorHandler?.(error as Error);
      } finally {
        transactionInstance.finally?.();
      }
    }, interval);
    return transactionInstance;
  }

  decodeLog(log: Log) {
    if (!log) {
      throw UtilsException.decodeLogError('log is empty');
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
              ERC721ABI.transfer.inputs ?? [],
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
            ERC1155ABI.batchTransfer.inputs ?? [],
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
            ERC1155ABI.singleTransfer.inputs ?? [],
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
            CryptoPunkABI.transfer.inputs ?? [],
            log.data,
            log.topics.slice(1)
          );
          contract = log.address;
          tokenId = decodedEventLog.punkIndex.toString();
          to = decodedEventLog.to;
          amount = 1;
          break;
        case this.PUNK_BOUGHT_TOPIC:
          decodedEventLog = this._web3Instance.eth.abi.decodeLog(
            CryptoPunkABI.bought.inputs ?? [],
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
      throw UtilsException.decodeLogError(error?.toString());
    }
  }

  sendSafeModeTransaction(transactionConfig: Partial<ethers.Transaction>) {
    const transactionInstance = new SendTransaction();
    // safe mode need more transaction detail than normal, including nonce, gasLimit, type and etc.
    // https://docs.ethers.io/v5/api/providers/types/#providers-TransactionRequest
    this._web3Instance.eth.getTransactionCount(transactionConfig.from as string).then(nonce => {
      transactionConfig.value = BigNumber.isBigNumber(transactionConfig.value)
        ? transactionConfig.value
        : (BigNumber.from(transactionConfig.value) as any);
      transactionConfig.nonce = nonce;
      transactionConfig.type = 2;
      const priorityFee = BigNumber.from(transactionConfig?.maxPriorityFeePerGas || 2000000000);
      this._web3Instance.eth.getGasPrice().then(gasPrice => {
        transactionConfig.maxFeePerGas = transactionConfig?.maxFeePerGas || priorityFee.add(BigNumber.from(gasPrice));
        transactionConfig.maxPriorityFeePerGas = transactionConfig?.maxPriorityFeePerGas || priorityFee;
        // eth_sign only accetp 32byte data
        const unsignedTransactionHash = this._web3Instance.utils.keccak256(
          ethers.utils.serializeTransaction(transactionConfig)
        );
        const flashBotsSendTx = (signedTrx: string) => {
          const trueRpc = 'https://rpc.flashbots.net';
          const flashBots = new Web3(trueRpc);
          flashBots.eth
            .sendSignedTransaction(signedTrx)
            .on('transactionHash', hash => {
              transactionInstance.transactionHashHandler?.(hash);
            })
            .on('receipt', receipt => {
              transactionInstance.receiptHandler?.(receipt);
            })
            .on('error', error => {
              transactionInstance.errorHandler?.(error);
            });
        };
        // Client
        if ((globalThis as any).ethereum) {
          this._web3Instance.eth
            .sign(unsignedTransactionHash, transactionConfig.from as string)
            .then(async signedTransaction => {
              const signedTrx = ethers.utils.serializeTransaction(transactionConfig, signedTransaction);
              flashBotsSendTx(signedTrx);
            })
            .catch(error => {
              transactionInstance.errorHandler?.(error);
            })
            .finally(() => {
              transactionInstance.finallyHandler?.();
            });
        } else {
          // Server
          try {
            const signedTransaction = this._web3Instance.eth.accounts.sign(
              unsignedTransactionHash,
              this.walletConfig?.privateKey as string
            );
            const signedTrx = ethers.utils.serializeTransaction(transactionConfig, signedTransaction.signature);
            flashBotsSendTx(signedTrx);
          } catch (error) {
            transactionInstance.errorHandler?.(error as any);
          } finally {
            transactionInstance.finallyHandler?.();
          }
        }
      });
    });
    return transactionInstance;
  }

  sendTransaction(transactionConfig: TransactionConfig) {
    if (
      this.walletConfig?.address &&
      transactionConfig?.from?.toString?.()?.toLowerCase?.() !== this.walletConfig?.address?.toLowerCase?.()
    ) {
      throw UtilsException.invalidParamError('transactionConfig.from', 'Buyer address must equal to wallet address');
    }
    const transactionInstance = new SendTransaction();
    this._web3Instance.eth
      .estimateGas({
        data: transactionConfig.data,
        value: transactionConfig.value,
        from: transactionConfig.from,
        to: transactionConfig.to,
      })
      .then(estimateGas => {
        // some wallet(eg: coinbase wallet) will inject providers object into window, which provide all providers available in current browser
        transactionConfig.gas = BigNumber.from(estimateGas).toHexString();
        if (typeof (globalThis as any)?.ethereum === 'object') {
          let finalProvider = (globalThis as any)?.ethereum as any;
          if (finalProvider?.providers && (this._web3Instance.currentProvider as any)?.isMetaMask) {
            finalProvider = finalProvider?.providers.filter(
              (provider: { isMetaMask: boolean }) => provider.isMetaMask
            )[0];
          }
          finalProvider
            ?.request({
              method: 'eth_sendTransaction',
              params: [transactionConfig],
            })
            .then((hash: string) => {
              transactionInstance.transactionHashHandler?.(hash);
              this.inspectTransaction({ hash }).on('receipt', receipt => {
                transactionInstance.receiptHandler?.(receipt);
              });
            })
            .catch((error: Error) => {
              transactionInstance.errorHandler?.(error);
            })
            .finally(() => {
              transactionInstance.finally();
            });
        } else {
          this._web3Instance.eth.accounts
            .signTransaction(transactionConfig, this.walletConfig?.privateKey as string)
            .then(signedTransaction => {
              this._web3Instance.eth
                .sendSignedTransaction(signedTransaction.rawTransaction as string)
                .on('transactionHash', hash => {
                  transactionInstance.transactionHashHandler?.(hash);
                })
                .on('receipt', receipt => {
                  transactionInstance.receiptHandler?.(receipt);
                })
                .on('error', error => {
                  transactionInstance.errorHandler?.(error);
                })
                .finally(() => {
                  transactionInstance.finallyHandler?.();
                });
            });
        }
      });
    return transactionInstance;
  }

  async signMessage(message: string): Promise<string> {
    if ((globalThis as any).ethereum) {
      const provider = (globalThis as any).ethereum;
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      const signature = await this._web3Instance.eth.personal.sign(message, account, '');
      return signature;
    } else {
      // server side
      console.info('acc', this._web3Instance.eth.accounts);
      console.info('this.walletConfig', this.walletConfig);
      const signResult = this._web3Instance.eth.accounts.sign(message, this.walletConfig?.privateKey as string);
      return signResult.signature;
    }
  }

  getSigner() {
    return this._ethersSigner;
  }
}

class SendTransaction implements Transaction {
  public transactionHashHandler: TransactionHashHandler = null;
  public receiptHandler: ReceiptHandler = null;
  public errorHandler: ErrorHandler = null;
  public finallyHandler: FinallyHandler = null;
  on(type: 'transactionHash', handler: TransactionHashHandler): Transaction;
  on(type: 'receipt', handler: ReceiptHandler): Transaction;
  on(type: 'error', handler: ErrorHandler): Transaction;
  on(
    type: 'transactionHash' | 'receipt' | 'error',
    handler: TransactionHashHandler & ReceiptHandler & ErrorHandler
  ): Transaction {
    this[`${type}Handler`] = handler;
    return this;
  }
  finally(onfinally?: FinallyHandler): void {
    this.finallyHandler = onfinally;
  }
}
