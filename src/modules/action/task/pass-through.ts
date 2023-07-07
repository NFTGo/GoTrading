import {TradeAggregatorActionKind} from '@/types';
import {ActionTaskTemplate} from './template';

export class PassThroughActionTask extends ActionTaskTemplate<TradeAggregatorActionKind.PassThrough> {
  result: null = null;

  async execute() {
    // do real execute
    let pre = this.pre;
    let data: Record<string, any> = {};
    while (pre) {
      const result = typeof pre?.result === 'object' && pre.action.kind !== TradeAggregatorActionKind.PassThrough ? pre?.result : {};
      Object.assign(data, pre.result ?? result);
      pre = pre.pre;
    }
    this.status = 'success';
  }
}
