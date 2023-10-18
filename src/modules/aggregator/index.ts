import { AggregatorApiException } from '@/exceptions';
import {
  Config,
  HTTPClient,
  Utils,
  AggregatorApiResponse,
  AggregatorApiStatusResponse,
  AggregatorInterface,
  AggregatorResponse,
  CancelOrdersReq,
  CreateListingsReq,
  CreateOffersReq,
  FulfillListingsReq,
  FulfillOffersReq,
} from '@/types';

/**
 * Trading aggregator. Get actions you need to trade a NFT.
 */
export class Aggregator implements AggregatorInterface {
  constructor(private client: HTTPClient, private config: Config, private utils: Utils) {}

  createOffers = async (params: CreateOffersReq): Promise<AggregatorResponse> => {
    const res = await this.post<AggregatorApiResponse, CreateOffersReq>('/create-offers', params);
    return this.response(res);
  };

  fulfillOffers = async (params: FulfillOffersReq): Promise<AggregatorResponse> => {
    const res = await this.post<AggregatorApiResponse, FulfillOffersReq>('/fulfill-offers', params);
    return this.response(res);
  };

  cancelOrders = async (params: CancelOrdersReq): Promise<AggregatorResponse> => {
    const res = await this.post<AggregatorApiResponse, CancelOrdersReq>('/cancel-orders', params);

    return this.response(res);
  };

  createListings = async (params: CreateListingsReq): Promise<AggregatorResponse> => {
    const data = await this.post<AggregatorApiResponse, CreateListingsReq>('/create-listings', params);

    return this.response(data);
  };

  fulfillListings = async (params: FulfillListingsReq): Promise<AggregatorResponse> => {
    const data = await this.post<AggregatorApiResponse, FulfillListingsReq>('/fulfill-listings', params);
    return this.response(data);
  };

  private get headers(): Record<string, string> {
    return { 'X-API-KEY': this.config.apiKey!, 'X-FROM': 'js_sdk' };
  }

  private get url() {
    return this.config.baseUrl + '/trade' + '/v1' + '/nft';
  }

  private async post<ResData, Req = undefined>(path: string, params: Req) {
    const url = `${this.url}${path}?chain=${this.config.chain}`;
    const response = await this.client.post<AggregatorApiStatusResponse<ResData>, Req>(url, params, this.headers);
    const { code, msg, data } = response;
    if (code === 'SUCCESS') {
      return data;
    } else {
      throw new AggregatorApiException(msg, code, path);
    }
  }

  private response(data: AggregatorApiResponse): AggregatorResponse {
    const executor = this.utils.createActionExecutor(data.actions);
    const executeActions = executor.execute;
    const response: AggregatorResponse = {
      ...data,
      executeActions,
    };

    return response;
  }
}
