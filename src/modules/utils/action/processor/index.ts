import {
  ActionKind,
  ActionName,
  ActionProcessor,
  AggregatorAction,
  Config,
  InternalUtils,
  ProcessPassThroughActionParams,
} from '@/types';
import { signApproveInfo, signListingData } from './signature';
import { PostOrderHandler } from '../../post-order';

export class AggregateActionProcessor implements ActionProcessor {
  private postOrderHandler: PostOrderHandler;
  constructor(private utils: InternalUtils, private config: Config) {
    this.postOrderHandler = new PostOrderHandler(config);
  }

  async processSignatureAction(action: AggregatorAction<ActionKind.Signature>) {
    const { name, data } = action;
    if (name === 'order-signature') {
      const { sign } = data;
      if (!sign) {
        throw new Error('sign is required');
      }
      const signature = await signListingData(sign, this.utils.getSigner());
      return signature;
    }
    return Promise.reject(new Error('no match action name'));
  }
  async processTransactionAction(action: AggregatorAction<ActionKind.Transaction>) {
    const { name, data } = action;
    if (name === 'nft-approval') {
      const { txData, orderIndexes } = data;
      if (!txData) {
        throw new Error('txData is required');
      }
      await signApproveInfo(txData, this.utils);

      return Promise.resolve({
        status: 'success',
        orderIndexes,
      });
    } else if (name === 'accept-listing') {
      const { txData } = data;
      if (!txData) {
        throw new Error('txData is required');
      }
    }
  }
  async processPassThroughAction(
    action: AggregatorAction<ActionKind.PassThrough>,
    params: ProcessPassThroughActionParams
  ) {
    const { name, data } = action;

    if (name === ActionName.PostOrderToMarketplace) {
      if (!params.signature) {
        throw new Error('action signature is required');
      }
      const { payload, endpoint } = data;
      const postOrderResult = this.postOrderHandler.handle(payload as any, params.signature, endpoint);
      return postOrderResult;
    }
    return Promise.resolve({
      status: 'success',
      name,
    });
  }
}

// "name": "accept-listing",
// "description": "Buy by Reservoir sdk",
// "kind": "transaction",
// "data": {
//   "txData": {
//     "from": "0xdc97a0c27c25e867e7e7b15e83f3297ea8c48c0a",
//     "to": "0x00000000000000adc04c56bf30ac9d3c0aaf14dc",
//     "value": "0xaa87bee5380000",
//     "data":
