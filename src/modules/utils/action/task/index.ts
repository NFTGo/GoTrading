import { ActionTask, AggregatorAction, ActionKind } from '@/types';
import { PassThroughActionTask } from './pass-through';
import { SignatureActionTask } from './signature';
import { TransactionActionTask } from './transaction';

export function createTask(action: AggregatorAction<ActionKind>, index: number): ActionTask {
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
