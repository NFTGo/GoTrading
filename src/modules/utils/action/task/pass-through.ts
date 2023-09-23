import { ActionKind, ProcessPassThroughActionParams } from '@/types';
import { ActionTaskTemplate } from './template';

export class PassThroughActionTask extends ActionTaskTemplate<ActionKind.PassThrough> {
  protected run = async () => {
    let pre = this.pre;
    while (pre) {
      // when can we use it for post-order
      // condition 1: it's a signature kind action
      // condition 2: it's orderIndexes must include passthrough order index
      if (pre.action.kind === ActionKind.Signature) {
        const { orderIndexes } = pre.action.data;
        const result = pre.result as ProcessPassThroughActionParams;
        const needThisSignature = this.action.data.orderIndexes.every(index => orderIndexes.includes(index));
        if (needThisSignature) {
          return await this.processor.processPassThroughAction(this.action, result);
        }
      }
      pre = pre.pre;
    }
    throw new Error('Can not found signature for post order');
  };
}
