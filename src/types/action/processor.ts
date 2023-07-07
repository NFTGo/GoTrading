import { ActionKind, AggregatorAction } from './action';

export interface ActionProcessor {
  processSignatureAction: (action: AggregatorAction<ActionKind.Signature>) => Promise<string>;

  processTransactionAction: (action: AggregatorAction<ActionKind.Transaction>) => Promise<void>;

  processPassThroughAction: (
    action: AggregatorAction<ActionKind.PassThrough>,
    params: ProcessPassThroughActionParams
  ) => Promise<void>;
}

export type ProcessPassThroughActionParams = {
  signature?: string;
};
