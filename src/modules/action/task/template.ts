import {ActionTask, ActionTaskStatus, TradeAggregatorAction, TradeAggregatorActionKind} from '@/types';

export abstract class ActionTaskTemplate<T extends TradeAggregatorActionKind> implements ActionTask {
  status: ActionTaskStatus = 'ready';
  pre: ActionTask | null = null;
  abstract result: unknown;
  constructor(public action: TradeAggregatorAction<T>, public index: number) {
    this.execute.bind(this);
  }
  abstract execute(): Promise<void>;
}
