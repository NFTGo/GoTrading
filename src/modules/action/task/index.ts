import {ActionTask, TradeAggregatorAction, TradeAggregatorActionKind} from '@/types';
import {PassThroughActionTask} from './pass-through';
import {SignatureActionTask} from './signature';
import {TransactionActionTask} from './transaction';

function createTask(action: TradeAggregatorAction<TradeAggregatorActionKind>, index: number): ActionTask {
  switch (action.kind) {
    case TradeAggregatorActionKind.PassThrough:
      return new PassThroughActionTask(action, index);
    case TradeAggregatorActionKind.Transaction:
      return new TransactionActionTask(action, index);
    case TradeAggregatorActionKind.Signature:
      return new SignatureActionTask(action, index);
    default:
      throw Error('Unknown action kind');
  }
}

export function createTasks(actions: TradeAggregatorAction<TradeAggregatorActionKind>[]): ActionTask[] {
  const tasks: ActionTask[] = [];
  for (let index = 0; index < actions.length; index++) {
    const action = actions[index];
    const task = createTask(action, index);
    if (index !== 0) {
      task.pre = tasks[index - 1];
    }
    tasks.push(task);
  }
  return tasks;
}
