import { ActionTask, AggregatorAction, ActionKind, ActionProcessor } from '@/types';
import { PassThroughActionTask } from './pass-through';
import { SignatureActionTask } from './signature';
import { TransactionActionTask } from './transaction';
import { ControllerActionTask } from './controller';

export type CreateTaskOption = {
  action: AggregatorAction<ActionKind>;
  index: number;
  processor: ActionProcessor;
  updateTask?: (actions: AggregatorAction<ActionKind>[]) => void;
};

/**
 * Change actions to tasks with processor we provided
 * @param option {@link CreateTaskOption}
 * @returns task {@link SignatureActionTask}
 */
export function createTask(option: CreateTaskOption): ActionTask {
  const { action, index, processor } = option;
  switch (action.kind) {
    case ActionKind.PassThrough:
      return new PassThroughActionTask(action, index, processor);
    case ActionKind.Transaction:
      return new TransactionActionTask(action, index, processor);
    case ActionKind.Signature:
      return new SignatureActionTask(action, index, processor);
    case ActionKind.Controller: {
      const task = new ControllerActionTask(action, index, processor);
      task.updateTask = option.updateTask;
      return task;
    }
    default:
      throw Error('Unknown action kind');
  }
}
