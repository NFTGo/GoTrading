import {TransactionConfig} from 'web3-core';
import {Transaction} from '../../../interface';

interface TransactionExecutor {
  sendTransaction: (params: TransactionConfig) => Transaction;
}

export async function signApproveInfo(
  params: TransactionConfig,
  executor: TransactionExecutor
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    executor
      .sendTransaction(params)
      .on('error', err => {
        reject(new Error(err.message));
      })
      .on('receipt', receipt => {
        const error = receipt?.logs.length === 0 || !receipt?.status;
        if (error) {
          reject(new Error('approved sign failed'));
        } else {
          resolve(true);
        }
      });
    return Promise.resolve(true);
  });
}
