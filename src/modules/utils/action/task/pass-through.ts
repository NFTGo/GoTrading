import { ActionKind, ProcessPassThroughActionParams } from '@/types';
import { ActionTaskTemplate } from './template';

export class PassThroughActionTask extends ActionTaskTemplate<ActionKind.PassThrough> {
  protected run = async () => {
    const pre = this.pre;
    while (pre) {
      if (pre.action.kind === ActionKind.Signature) {
        const params = pre.result as ProcessPassThroughActionParams;
        await this.processor.processPassThroughAction(this.action, params);
        break;
      } else {
        continue;
      }
    }
    return null;
  };
}
