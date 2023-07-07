import { ActionKind, ActionTaskExecutor, AggregatorAction } from './action';
import { ethers } from 'ethers';
import { Log, TransactionConfig, TransactionReceipt } from 'web3-core';

export interface InternalUtils {
  createActionExecutor?: (actions: AggregatorAction[]) => ActionTaskExecutor;
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
  sendSafeModeTransaction(transactionConfig: Partial<ethers.Transaction>): Transaction;
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

  // TODO: signer
  getSigner(): any;
}

export interface Utils extends InternalUtils {
  createActionExecutor(actions: AggregatorAction<ActionKind>[]): ActionTaskExecutor;
}

export interface DecodeLogRes {
  contract?: string;
  tokenId?: string;
  amount?: number;
  is1155?: boolean;
  to?: string;
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

export type TransactionHashHandler = ((hash: string) => void) | null | undefined;

export type ReceiptHandler = ((receipt: TransactionReceipt) => void) | null | undefined;

export type ErrorHandler = ((error: Error) => void) | null | undefined;

export type FinallyHandler = (() => void) | null | undefined;
