import { ActionKind, ProcessPassThroughActionParams } from '@/types';
import { ActionTaskTemplate } from './template';

export class SignatureActionTask extends ActionTaskTemplate<ActionKind.Signature> {
  protected run = async () => {
    const signature = await this.processor.processSignatureAction(this.action);

    const result: ProcessPassThroughActionParams = {
      signature,
    };

    return result;
  };
}
