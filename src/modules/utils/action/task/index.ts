import {ActionTask, AggregatorAction, ActionKind} from '@/types';
import {PassThroughActionTask} from './pass-through';
import {SignatureActionTask} from './signature';
import {TransactionActionTask} from './transaction';

function createTask(
  action: AggregatorAction<ActionKind>,
  index: number
): ActionTask {
  switch (action.kind) {
    case ActionKind.PassThrough:
      return new PassThroughActionTask(action, index);
    case ActionKind.Transaction:
      return new TransactionActionTask(action, index);
    case ActionKind.Signature:
      return new SignatureActionTask(action, index);
    default:
      throw Error('Unknown action kind');
  }
}

export function createTasks(
  actions: AggregatorAction<ActionKind>[]
): ActionTask[] {
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
