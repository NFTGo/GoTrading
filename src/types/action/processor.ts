import {
  ActionKind,
  AggregatorAction,
  PassThroughActionInfo,
  SignatureActionInfo,
  TransactionActionInfo,
} from './action';

export interface ActionProcessor {
  processSignatureAction: (action: AggregatorAction<ActionKind.Signature>, params?: any) => Promise<string>;

  processTransactionAction: (action: AggregatorAction, params?: any) => Promise<any>;

  processPassThroughAction: (action: AggregatorAction, params?: any) => Promise<any>;
}
