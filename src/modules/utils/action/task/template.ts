import { ActionTask, ActionTaskStatus, AggregatorAction, ActionKind, ActionProcessor } from '@/types';

export abstract class ActionTaskTemplate<T extends ActionKind> implements ActionTask {
  status: ActionTaskStatus = 'ready';
  pre: ActionTask | null = null;
  abstract result: unknown;
  constructor(public action: AggregatorAction<T>, public index: number, protected processor: ActionProcessor) {
    this.execute.bind(this);
  }
  abstract execute(): Promise<void>;
}
