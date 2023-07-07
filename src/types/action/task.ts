import {TradeAggregatorAction, TradeAggregatorActionKind} from './action';

export interface ActionTaskResultMap {
  [TradeAggregatorActionKind.PassThrough]: unknown;
  [TradeAggregatorActionKind.Signature]: string;
  [TradeAggregatorActionKind.Transaction]: unknown;
}

export type ActionTaskStatus = 'success' | 'fail' | 'ready' | 'pending';

export interface ActionTask {
  status: ActionTaskStatus;
  index: number;
  action: TradeAggregatorAction<TradeAggregatorActionKind>;
  pre: ActionTask | null;
  result: unknown;
  execute(): Promise<void>;
}
