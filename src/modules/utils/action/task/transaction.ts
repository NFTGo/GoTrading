import { ActionKind } from '@/types';
import { ActionTaskTemplate } from './template';

export class TransactionActionTask extends ActionTaskTemplate<ActionKind.Transaction> {
  protected run = async () => {
    this.processor.processTransactionAction(this.action);

    return null;
  };
}
