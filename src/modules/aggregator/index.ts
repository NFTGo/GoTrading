import { BASE_URL } from '@/common';
import { AggregatorApiException } from '@/exceptions';
import {
  Config,
  EVMChain,
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
  AggregatorAction,
  ActionKind,
} from '@/types';

export class Aggregator implements AggregatorInterface {
  constructor(private client: HTTPClient, private config: Config, private utils: Utils) {
    this.cancelOrders.bind(this);
    this.createListings.bind(this);
    this.createOffers.bind(this);
    this.fulfillOffers.bind(this);
  }

  /**
   *
   * - details: {@link }
   * @param params {@link }
   * @returns Promise<{@link }>
   */
  async createOffers(params: CreateOffersReq): Promise<AggregatorResponse> {
    const res = await this.post<AggregatorApiResponse, CreateOffersReq>('/create-offers/v1', params);
    const { actions } = res;

    return this.response(actions);
  }

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  async fulfillOffers(params: FulfillOffersReq): Promise<AggregatorResponse> {
    const res = await this.post<AggregatorApiResponse, FulfillOffersReq>('/aggregate-accept-offers', params);
    const { actions } = res;
    return this.response(actions);
  }

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  async cancelOrders(params: CancelOrdersReq): Promise<AggregatorResponse> {
    const res = await this.post<AggregatorApiResponse, CancelOrdersReq>('/cancel-orders', params);
    const { actions } = res;

    return this.response(actions);
  }

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  async createListings(params: CreateListingsReq): Promise<AggregatorResponse> {
    const data = await this.post<AggregatorApiResponse, CreateListingsReq>('/create-listings/v1', params);
    const { actions } = data;

    return this.response(actions);
  }

  /**
   * buy nfts
   * - details: {@link }
   * @param params {@link FulfillListingsReq}
   * @returns Promise<{@link }>
   */
  async fulfillListings(params: FulfillListingsReq): Promise<AggregatorResponse> {
    const data = await this.post<AggregatorApiResponse, FulfillListingsReq>('/aggregate-accept-listings', params);
    const { actions } = data;

    return this.response(actions);
  }

  private get headers(): Record<string, string> {
    return { 'X-API-KEY': this.config.apiKey!, 'X-FROM': 'js_sdk' };
  }

  private get url() {
    return (
      (this.config?.baseUrl ?? BASE_URL) + '/aggregator' + '/v1' + '/' + (this.config?.chain ?? EVMChain.ETH) + '/nft'
    );
  }

  private async post<ResData, Req = undefined>(path: string, params: Req) {
    const response = await this.client.post<AggregatorApiStatusResponse<ResData>, Req>(
      this.url + path,
      params,
      this.headers
    );
    const { code, msg, data } = response;
    if (code === 'SUCCESS') {
      return data;
    } else {
      throw new AggregatorApiException(msg, code, path);
    }
  }

  private response(actions: AggregatorAction<ActionKind>[]): AggregatorResponse {
    const executeActions = this.utils.createActionExecutor(actions).execute;
    const response: AggregatorResponse = {
      actions,
      executeActions,
    };

    return response;
  }
}
