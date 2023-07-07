import {
  ActionTask,
  ActionTaskStatus,
  AggregatorAction,
  ActionKind,
} from '@/types';

export abstract class ActionTaskTemplate<T extends ActionKind>
  implements ActionTask
{
  status: ActionTaskStatus = 'ready';
  pre: ActionTask | null = null;
  abstract result: unknown;
  constructor(public action: AggregatorAction<T>, public index: number) {
    this.execute.bind(this);
  }
  abstract execute(): Promise<void>;
}
