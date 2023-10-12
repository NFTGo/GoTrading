import { SafeAny } from '../safe-any';
import { TransactionHashHandler, ReceiptHandler, ErrorHandler } from '../utils';
import { ActionKind, AggregatorAction } from './action';
export interface ProcessTransactionCallBacks {
  onTransaction: TransactionHashHandler;
  onReceipt: ReceiptHandler;
  onError: ErrorHandler;
}
export interface ActionProcessor {
  processSignatureAction: (action: AggregatorAction<ActionKind.Signature>) => Promise<string>;

  processTransactionAction: (
    action: AggregatorAction<ActionKind.Transaction>,
    callbacks?: ProcessTransactionCallBacks
  ) => Promise<SafeAny>;

  processPassThroughAction: (
    action: AggregatorAction<ActionKind.PassThrough>,
    params: ProcessPassThroughActionParams
  ) => Promise<SafeAny>;

  processControllerAction(action: AggregatorAction<ActionKind.Controller>): Promise<AggregatorAction<ActionKind>[]>;
}

export type ProcessPassThroughActionParams = {
  signature: string;
};
