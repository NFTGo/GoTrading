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
  async createOffers(params: CreateOffersReq): Promise<AggregatorResponse<any>> {
    const res = await this.post<AggregatorApiResponse, CreateOffersReq>('/create-offers/v1', params);
    const { actions } = res;

    return {
      actions,
      executeActions: () => {
        return Promise.resolve(true);
      },
    };
  }

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  async fulfillOffers(params: FulfillOffersReq): Promise<AggregatorResponse<any>> {
    const res = await this.post<AggregatorApiResponse, FulfillOffersReq>('/aggregate-accept-offers', params);
    const { actions } = res;
    return {
      actions,
      executeActions: () => {
        return Promise.resolve(true);
      },
    };
  }

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  async cancelOrders(params: CancelOrdersReq): Promise<AggregatorResponse<any>> {
    const res = await this.post<AggregatorApiResponse, CancelOrdersReq>('/cancel-orders', params);
    const { actions } = res;
    return {
      actions,
      executeActions: () => {
        return Promise.resolve(true);
      },
    };
  }

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  async createListings(params: CreateListingsReq): Promise<AggregatorResponse<any>> {
    const data = await this.post<AggregatorApiResponse, CreateListingsReq>('/create-listings/v1', params);
    const { actions } = data;

    return {
      actions: actions,
      executeActions: () => {
        return Promise.resolve(true);
      },
    };
  }

  /**
   * buy nfts
   * - details: {@link }
   * @param params {@link FulfillListingsReq}
   * @returns Promise<{@link }>
   */
  async fulfillListings(params: FulfillListingsReq): Promise<AggregatorResponse<any>> {
    const data = await this.post<AggregatorApiResponse, FulfillListingsReq>('/aggregate-accept-listings', params);
    const { actions } = data;

    return {
      actions,
      executeActions: () => {
        return Promise.resolve(true);
      },
    };
  }

  private get headers() {
    return { 'X-API-KEY': this.config.apiKey, 'X-FROM': 'js_sdk' };
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
}
