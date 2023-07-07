import {
  PassThroughActionInfo,
  SignatureActionInfo,
  TransactionActionInfo,
} from './action';

export interface ActionProcessor {
  processSignatureAction: (data: SignatureActionInfo) => Promise<string>;

  processTransactionAction: (data: TransactionActionInfo) => Promise<string>;

  processPassThroughAction: (data: PassThroughActionInfo) => Promise<string>;
}
