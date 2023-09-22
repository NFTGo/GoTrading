import {
  ActionKind,
  ActionName,
  ActionProcessor,
  AggregatorAction,
  PassThroughActionInfo,
  ProcessPassThroughActionParams,
  SignatureActionInfo,
  TransactionActionInfo,
} from '../../src';

export class OffLineProcessor implements ActionProcessor {
  async processSignatureAction(action: AggregatorAction<ActionKind.Signature>) {
    const { name, data } = action;
    if (name === 'order-signature') {
      const { sign } = data;
      if (!sign) {
        throw new Error('sign is required');
      }
      const signature = 'signature' + data.orderIndexes.join(',');
      return signature;
    }
    return Promise.reject(new Error('no match action name'));
  }

  async processTransactionAction(action: AggregatorAction<ActionKind.Transaction>) {
    const { name, data } = action;
    const { txData, safeMode } = data;
    if (!txData) {
      throw new Error('txData is required');
    }
  }

  async processPassThroughAction(
    action: AggregatorAction<ActionKind.PassThrough>,
    params: ProcessPassThroughActionParams
  ) {
    const { name, data } = action;
    console.log(data.orderIndexes, params.signature);
  }

  async processControllerAction(
    action: AggregatorAction<ActionKind.Controller>
  ): Promise<AggregatorAction<ActionKind>[]> {
    return [];
  }
}
