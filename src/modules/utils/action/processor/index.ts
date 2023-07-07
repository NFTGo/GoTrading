import { ActionKind, ActionProcessor, AggregatorAction, Config, InternalUtils, SignatureActionInfo } from '@/types';
import { signApproveInfo, signListingData } from './signature';
import { PostOrderHandler } from '../../post-order';

export class AggregateActionProcessor implements ActionProcessor {
  private postOrderHandler: PostOrderHandler;
  constructor(private utils: InternalUtils, private config: Config) {
    this.postOrderHandler = new PostOrderHandler(config);
  }

  async processSignatureAction(action: AggregatorAction) {
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
  async processTransactionAction(action: AggregatorAction) {
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
    }
  }
  async processPassThroughAction(action: AggregatorAction) {
    const { name, data } = action;
    if (name === 'pass-through') {
    }
    return Promise.resolve({
      status: 'success',
      name,
    });
    // return acceptListingTransaction(data, this.utils);
  }
}

// fulfill-listing
// "name": "accept-listing",
// "description": "Buy by Reservoir sdk",
// "kind": "transaction",

// "name": "pass-through",
// "description": "Post order to marketplace",
// "kind": "pass-through",
// "data": {
//   "endpoint": "/aggregator/v1/ETH/nft/post-order/v1",

export async function passThroughPostOrder() {}
