import { ActionKind } from '@/types';
import { ActionTaskTemplate } from './template';

export class TransactionActionTask extends ActionTaskTemplate<ActionKind.Transaction> {
  protected run = async () => {
    return await this.processor.processTransactionAction(this.action);
  };
}
