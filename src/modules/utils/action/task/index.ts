import { ActionTask, AggregatorAction, ActionKind, ActionProcessor } from '@/types';
import { PassThroughActionTask } from './pass-through';
import { SignatureActionTask } from './signature';
import { TransactionActionTask } from './transaction';

export function createTask(
  action: AggregatorAction<ActionKind>,
  index: number,
  processor: ActionProcessor
): ActionTask {
  switch (action.kind) {
    case ActionKind.PassThrough:
      return new PassThroughActionTask(action, index, processor);
    case ActionKind.Transaction:
      return new TransactionActionTask(action, index, processor);
    case ActionKind.Signature:
      return new SignatureActionTask(action, index, processor);
    default:
      throw Error('Unknown action kind');
  }
}
