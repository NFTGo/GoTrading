import { ActionKind } from '@/types';
import { ActionTaskTemplate } from './template';

type SignatureActionTaskResult = {
  signature: string;
};

export class SignatureActionTask extends ActionTaskTemplate<ActionKind.Signature> {
  result: SignatureActionTaskResult | null = null;

  execute = async () => {
    // do real execute
    this.result = {
      signature: 'user signature',
    };
    this.status = 'success';
  };
}
