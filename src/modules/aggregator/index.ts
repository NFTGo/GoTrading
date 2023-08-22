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
  AggregatorAction,
  ActionKind,
} from '@/types';

export class Aggregator implements AggregatorInterface {
  constructor(private client: HTTPClient, private config: Config, private utils: Utils) {}

  /**
   *
   * - details: {@link }
   * @param params {@link }
   * @returns Promise<{@link }>
   */
  createOffers = async (params: CreateOffersReq): Promise<AggregatorResponse> => {
    const res = await this.post<AggregatorApiResponse, CreateOffersReq>('/create-offers', params);
    const { actions } = res;

    return this.response(actions);
  };

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  fulfillOffers = async (params: FulfillOffersReq): Promise<AggregatorResponse> => {
    const res = await this.post<AggregatorApiResponse, FulfillOffersReq>('/fulfill-offers', params);
    const { actions } = res;
    return this.response(actions);
  };

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  cancelOrders = async (params: CancelOrdersReq): Promise<AggregatorResponse> => {
    const res = await this.post<AggregatorApiResponse, CancelOrdersReq>('/cancel-orders', params);
    const { actions } = res;

    return this.response(actions);
  };

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  createListings = async (params: CreateListingsReq): Promise<AggregatorResponse> => {
    const data = await this.post<AggregatorApiResponse, CreateListingsReq>('/create-listings', params);
    const { actions } = data;

    return this.response(actions);
  };

  /**
   * buy nfts
   * - details: {@link }
   * @param params {@link FulfillListingsReq}
   * @returns Promise<{@link }>
   */
  fulfillListings = async (params: FulfillListingsReq): Promise<AggregatorResponse> => {
    const data = await this.post<AggregatorApiResponse, FulfillListingsReq>('/fulfill-listings', params);
    const { actions } = data;

    return this.response(actions);
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

  private response(actions: AggregatorAction<ActionKind>[]): AggregatorResponse {
    const executor = this.utils.createActionExecutor(actions);
    const executeActions = executor.execute;
    const response: AggregatorResponse = {
      actions,
      executeActions,
    };

    return response;
  }
}
