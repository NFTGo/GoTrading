import {TradeAggregatorActionKind} from '@/types';
import {ActionTaskTemplate} from './template';

type TransactionActionTaskResult = {
  txData: {
    value: string;
  };
};

export class TransactionActionTask extends ActionTaskTemplate<TradeAggregatorActionKind.Transaction> {
  result: TransactionActionTaskResult | null = null;

  async execute() {
    // do real execute
    this.result = {
      txData: {
        value: '',
      },
    };

    this.status = 'success';
  }
}
