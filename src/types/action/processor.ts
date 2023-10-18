import { SafeAny } from '../safe-any';
import { TransactionHashHandler, ReceiptHandler, ErrorHandler } from '../utils';
import { ActionKind, AggregatorAction } from './action';

/**
 * Callbacks in processing transaction
 */
export interface ProcessTransactionCallBacks {
  /**
   * Callback after transaction been sent
   */
  onTransaction: TransactionHashHandler;
  /**
   * Callback after transaction completed
   */
  onReceipt: ReceiptHandler;
  /**
   * Callback after any error occurred before transaction completed
   */
  onError: ErrorHandler;
}

/**
 * Processors for all kinds of actions
 */
export interface ActionProcessor {
  /**
   * Process signature action, return a string signature
   * @param action signature action {@link AggregatorAction}{@link ActionKind.Signature}
   * @returns Promise<string>
   */
  processSignatureAction: (action: AggregatorAction<ActionKind.Signature>) => Promise<string>;

  /**
   * Process signature action, return true if transaction complete
   * @param action transaction action {@link AggregatorAction}{@link ActionKind.Transaction}
   * @param callbacks Callbacks in processing transaction {@link ProcessTransactionCallBacks}
   * @returns Promise<boolean>
   */
  processTransactionAction: (
    action: AggregatorAction<ActionKind.Transaction>,
    callbacks?: ProcessTransactionCallBacks
  ) => Promise<boolean>;

  /**
   * Process pass through action. For now, it means request a NFTGo data api with ProcessPassThroughActionParams
   * @param action pass through action {@link AggregatorAction}{@link ActionKind.PassThrough}
   * @param params {@link ProcessPassThroughActionParams}
   * @returns Promise<any>
   */
  processPassThroughAction: (
    action: AggregatorAction<ActionKind.PassThrough>,
    params: ProcessPassThroughActionParams
  ) => Promise<SafeAny>;

  /**
   * Process controller action. It process a http request which returns actions need to be processed
   * @param action controller action {@link AggregatorAction}{@link ActionKind.Controller}
   * @returns Promise<AggregatorAction<ActionKind>[]>
   */
  processControllerAction: (action: AggregatorAction<ActionKind.Controller>) => Promise<AggregatorAction<ActionKind>[]>;
}

export type ProcessPassThroughActionParams = {
  signature: string;
};
