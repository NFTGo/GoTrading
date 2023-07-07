import {ActionKind} from '@/types';
import {ActionTaskTemplate} from './template';

export class PassThroughActionTask extends ActionTaskTemplate<ActionKind.PassThrough> {
  result: null = null;

  async execute() {
    // do real execute
    let pre = this.pre;
    let data: Record<string, any> = {};
    while (pre) {
      const result =
        typeof pre?.result === 'object' &&
        pre.action.kind !== ActionKind.PassThrough
          ? pre?.result
          : {};
      Object.assign(data, pre.result ?? result);
      pre = pre.pre;
    }
    this.status = 'success';
  }
}
