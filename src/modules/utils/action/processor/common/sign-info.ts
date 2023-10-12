import { ProcessTransactionCallBacks, Transaction } from '@/types';
import { SafeAny } from 'src/types/safe-any';

type SendTransactionFn = (params: SafeAny) => Transaction;

export async function signInfo(
  params: SafeAny,
  sendTransaction: SendTransactionFn,
  callBacks?: ProcessTransactionCallBacks
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    sendTransaction(params)
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
