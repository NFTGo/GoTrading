import {ethers} from 'ethers';
import {Log, TransactionConfig, TransactionReceipt} from 'web3-core';
import {OrderFetcherInterface} from './modules/order-fetcher/interface';
import {AggregatorInterface} from './modules/aggregator/interface';
import {AggregatorUtils} from './utils';

// # user-land interface , core  should implement this
export enum EVMChain {
  ETH = 'ETH',
}

export type TransactionHashHandler =
  | ((hash: string) => void)
  | null
  | undefined;
export type ReceiptHandler =
  | ((receipt: TransactionReceipt) => void)
  | null
  | undefined;
export type ErrorHandler = ((error: Error) => void) | null | undefined;
export type FinallyHandler = (() => void) | null | undefined;
export interface BuyNFTsWithOrderIdsParams {
  buyerAddress: string;
  orderIds: string[];
  isSafeMode?: boolean; // https://docs.nftgo.io/docs/safe-mode
}

export interface Transaction {
  on(type: 'transactionHash', handler: TransactionHashHandler): Transaction;

  on(type: 'receipt', handler: ReceiptHandler): Transaction;

  on(type: 'error', handler: ErrorHandler): Transaction;

  on(
    type: 'error' | 'receipt' | 'transactionHash',
    handler: (receipt: Error | TransactionReceipt | string | object) => void
  ): Transaction;
  finally(handler: FinallyHandler): void;
}

export interface DecodeLogRes {
  contract?: string;
  tokenId?: string;
  amount?: number;
  is1155?: boolean;
  to?: string;
}

export interface InspectTransactionParams {
  hash: string;
  interval?: number; // ms, 1000 as default
}

export type UniqueNFTKey = string;
export interface Utils {
  /**
   * Decode transaction log, return contract, token id, trading amount, buyer
   * - details: {@link }
   * @param log {@link Log} single log returned by send transaction method
   * @returns res {@link DecodeLogRes}
   */
  decodeLog(log: Log): DecodeLogRes | null;

  /**
   * Send transaction with safe mode, using flash bot
   * - details: {@link }
   * @param transactionConfig {@link https://docs.ethers.io/v5/api/providers/types/#providers-TransactionRequest} transaction config
   * @returns transaction {@link Transaction}
   */
  sendSafeModeTransaction(
    transactionConfig: Partial<ethers.Transaction>
  ): Transaction;
  /**
   * Send transaction
   * - details: {@link }
   * @param transactionConfig {@link https://web3js.readthedocs.io/en/v1.8.2/web3-eth.html#sendtransaction} transaction config
   * @returns transaction {@link Transaction}
   */
  sendTransaction(transactionConfig: TransactionConfig): Transaction;
  /**
   * inspect a transaction
   * - details: {@link }
   * @param params {@link InspectTransactionParams} transaction hash, inspect interval
   * @returns transaction {@link Transaction}
   */
  inspectTransaction(params: InspectTransactionParams): Transaction;

  // standard sign message
  signMessage(message: string): Promise<string>;
}

export interface GoTrading {
  orderFetcher?: OrderFetcherInterface;
  utils?: AggregatorUtils | null;
  aggregator?: AggregatorInterface;
}

export interface HTTPClient {
  get<R, Q = undefined>(
    url: string,
    query: Q | undefined,
    headers?: Record<string, string>
  ): Promise<R>;
  post<R, P = undefined>(
    url: string,
    data: P,
    headers?: Record<string, string>,
    needOriginResponse?: boolean
  ): Promise<R>;
}

export interface WalletConfig {
  address: string;
  privateKey: string;
}

export interface Config {
  apiKey: string;
  chain?: EVMChain;
  baseUrl?: string;
}

export interface ListingIndexerConfig extends Config {
  openSeaApiKeyConfig: ApiKeyConfig;
  looksRareApiKeyConfig: ApiKeyConfig;
  x2y2ApiKeyConfig: ApiKeyConfig;
}

export type ApiKeyConfig = {
  apiKey: string;
  requestsPerInterval: number;
  interval: number;
};
