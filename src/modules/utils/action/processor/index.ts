import {
  ActionKind,
  ActionName,
  ActionProcessor,
  AggregatorAction,
  AggregatorApiResponse,
  AggregatorApiStatusResponse,
  Config,
  HTTPClient,
  InternalUtils,
  ProcessPassThroughActionParams,
} from '@/types';
import { signInfo, signOrderData } from './common';
import { PostOrderHandler } from '../../post-order';

export class AggregateActionProcessor implements ActionProcessor {
  private postOrderHandler: PostOrderHandler;
  constructor(private utils: InternalUtils, private config: Config, private client: HTTPClient) {
    this.postOrderHandler = new PostOrderHandler(config);
  }

  async processSignatureAction(action: AggregatorAction<ActionKind.Signature>) {
    const { name, data } = action;
    if (name === 'order-signature') {
      const { sign } = data;
      if (!sign) {
        throw new Error('sign is required');
      }
      const signature = await signOrderData(sign, this.utils.getSigner());
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
    if (name === 'nft-approval') {
      await signInfo(txData, this.utils.sendTransaction);
    } else if (name === 'accept-listing') {
      if (safeMode) {
        await signInfo(txData, this.utils.sendSafeModeTransaction);
      } else {
        await signInfo(txData, this.utils.sendTransaction);
      }
      // other name case: currency-wrapping currency-approval
    } else {
      await signInfo(txData, this.utils.sendTransaction);
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
      const postOrderResult = this.postOrderHandler.handle(payload, params.signature, endpoint);
      return postOrderResult;
    }
    return Promise.resolve({
      status: 'success',
      name,
    });
  }

  async processControllerAction(
    action: AggregatorAction<ActionKind.Controller>
  ): Promise<AggregatorAction<ActionKind>[]> {
    const { data } = action;
    const { payload, endpoint, method } = data;

    const url = `${this.config.baseUrl}${endpoint}`;

    const clientMethod = method.toLowerCase() as Lowercase<typeof method>;

    const response = await this.client[clientMethod]<AggregatorApiStatusResponse<AggregatorApiResponse>>(url, payload);

    return response.data.actions;
  }
}
