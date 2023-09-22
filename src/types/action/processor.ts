import { SafeAny } from '../safe-any';
import { ActionKind, AggregatorAction } from './action';

export interface ActionProcessor {
  processSignatureAction: (action: AggregatorAction<ActionKind.Signature>) => Promise<string>;

  processTransactionAction: (action: AggregatorAction<ActionKind.Transaction>) => Promise<SafeAny>;

  processPassThroughAction: (
    action: AggregatorAction<ActionKind.PassThrough>,
    params: ProcessPassThroughActionParams
  ) => Promise<void>;

  processControllerAction(action: AggregatorAction<ActionKind.Controller>): Promise<AggregatorAction<ActionKind>[]>;
}

export type ProcessPassThroughActionParams = {
  signature: string;
};
