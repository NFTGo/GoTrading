import { Transaction } from '@/types';
import { SafeAny } from 'src/types/safe-any';

type SendTransactionFn = (params: SafeAny) => Transaction;

export async function signInfo(params: SafeAny, sendTransaction: SendTransactionFn): Promise<boolean> {
  return new Promise((resolve, reject) => {
    sendTransaction(params)
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
  });
}
