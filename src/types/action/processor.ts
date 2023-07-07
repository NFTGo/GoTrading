import { AggregatorAction, PassThroughActionInfo, SignatureActionInfo, TransactionActionInfo } from './action';

export interface ActionProcessor {
  processSignatureAction: (action: AggregatorAction, params?: any) => Promise<any>;

  processTransactionAction: (action: AggregatorAction, params?: any) => Promise<any>;

  processPassThroughAction: (action: AggregatorAction, params?: any) => Promise<any>;
}
