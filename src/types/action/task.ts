import {TradeAggregatorAction, ActionKind} from './action';

export interface ActionTaskResultMap {
  [ActionKind.PassThrough]: unknown;
  [ActionKind.Signature]: string;
  [ActionKind.Transaction]: unknown;
}

export type ActionTaskStatus = 'success' | 'fail' | 'ready' | 'pending';

export interface ActionTask {
  status: ActionTaskStatus;
  index: number;
  action: TradeAggregatorAction<ActionKind>;
  pre: ActionTask | null;
  result: unknown;
  execute(): Promise<void>;
}
