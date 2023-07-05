import {BASE_URL} from '../../config';
import {isInvalidParam} from '../../helpers/is-invalid-param';
import {HTTPClient, EVMChain, Config, Utils} from '../../interface';
import {
  AggregatorApiResponse,
  AggregatorInterface,
  AggregatorResponse,
  CancelOrdersReq,
  CreateListingsReq,
  CreateOffersReq,
  FulfillListingsReq,
  FulfillOffersReq,
} from './interface';
import {executeAllActions} from './use-cases';

export class Aggregator implements AggregatorInterface {
  constructor(
    private client: HTTPClient,
    private config: Config,
    private utils: Utils
  ) {}

  /**
   *
   * - details: {@link }
   * @param params {@link }
   * @returns Promise<{@link }>
   */
  createOffers(params: CreateOffersReq): Promise<AggregatorResponse<any>> {
    return new Promise<AggregatorResponse<any>>((resolve, reject) => {
      this.post<AggregatorApiResponse, CreateOffersReq>(
        '/create-offers/v1',
        params
      ).then(res => {
        resolve({
          actions: res.actions,
          executeActions: () => {
            return executeAllActions(res.actions, this.utils);
          },
        });
      });
    });
  }

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  fulfillOffers(params: FulfillOffersReq): Promise<AggregatorResponse<any>> {
    return new Promise<AggregatorResponse<any>>((resolve, reject) => {
      this.post<AggregatorApiResponse, FulfillOffersReq>(
        '/aggregate-accept-offers',
        params
      ).then(res => {
        resolve({
          actions: res.actions,
          executeActions: () => {
            return executeAllActions(res.actions, this.utils);
          },
        });
      });
    });
  }

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  cancelOrders(params: CancelOrdersReq): Promise<AggregatorResponse<any>> {
    return new Promise<AggregatorResponse<any>>((resolve, reject) => {
      this.post<AggregatorApiResponse, CancelOrdersReq>(
        '/cancel-orders',
        params
      ).then(res => {
        resolve({
          actions: res.actions,
          executeActions: () => {
            return executeAllActions(res.actions, this.utils);
          },
        });
      });
    });
  }

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  createListings(params: CreateListingsReq): Promise<AggregatorResponse<any>> {
    return new Promise<AggregatorResponse<any>>((resolve, reject) => {
      this.post<AggregatorApiResponse, CreateListingsReq>(
        '/create-listings/v1',
        params
      ).then(res => {
        console.info('res', res);
        // FIXME: common error message handler
        const {data} = res as any;
        const {actions} = data;
        resolve({
          actions: actions,
          executeActions: () => {
            return executeAllActions(actions, this.utils);
          },
        });
      });
    });
  }

  /**
   * buy nfts
   * - details: {@link }
   * @param params {@link FulfillListingsReq}
   * @returns Promise<{@link }>
   */
  fulfillListings(
    params: FulfillListingsReq
  ): Promise<AggregatorResponse<any>> {
    return new Promise<AggregatorResponse<any>>((resolve, reject) => {
      this.post<AggregatorApiResponse, FulfillListingsReq>(
        '/aggregate-accept-listings',
        params
      ).then(res => {
        resolve({
          actions: res.actions,
          executeActions: () => {
            return executeAllActions(res.actions, this.utils);
          },
        });
      });
    });
  }

  /**
   *
   * - details: {@link }
   * @param params {@link }
   * @returns Promise<{@link }>
   */
  postOrders(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve('');
    });
  }

  private get headers() {
    return {'X-API-KEY': this.config.apiKey, 'X-FROM': 'js_sdk'};
  }

  private get url() {
    return (
      (this.config?.baseUrl ?? BASE_URL) +
      '/aggregator' +
      '/v1' +
      '/' +
      (this.config?.chain ?? EVMChain.ETH) +
      '/nft'
    );
  }

  private post<R, P = undefined>(path: string, params: P) {
    return this.client.post<R, P>(this.url + path, params, this.headers);
  }
}
