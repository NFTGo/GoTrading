import { ProcessTransactionCallBacks, Transaction, TxData } from '@/types';
import { ethers } from 'ethers';
import { SafeAny } from 'src/types/safe-any';
import { TransactionConfig } from 'web3-core';

type SendTransactionFn =
  | ((params: TransactionConfig) => Transaction)
  | ((params: Partial<ethers.Transaction>) => Transaction);

/**
 * Wrapped send transaction function with a promise
 * @param params transaction params {@link TxData}
 * @param sendTransaction send transaction function {@link SendTransactionFn}
 * @param callBacks callbacks in every step of a transaction {@link ProcessTransactionCallBacks}
 * @returns Promise<boolean>
 */
export async function promisedSendTransaction(
  params: TxData,
  sendTransaction: SendTransactionFn,
  callBacks?: ProcessTransactionCallBacks
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    sendTransaction(params as SafeAny)
      .on('transactionHash', callBacks?.onTransaction)
      .on('error', err => {
        callBacks?.onError?.(err);
        reject(new Error(err.message));
      })
      .on('receipt', receipt => {
        callBacks?.onReceipt?.(receipt);
        const error = receipt?.logs.length === 0 || !receipt?.status;
        if (error) {
          reject(new Error('approved sign failed'));
        } else {
          resolve(true);
        }
      });
  });
}
