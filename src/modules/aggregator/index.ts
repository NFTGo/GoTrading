import {BASE_URL} from '../../config';
import {AggregatorApiException} from '../../exceptions';
import {isInvalidParam} from '../../helpers/is-invalid-param';
import {HTTPClient, EVMChain, Config, Utils} from '../../interface';
import {nftApprovalTransaction, orderSignature} from './action-processor';
import {
  AggregatorApiResponse,
  AggregatorApiStatusResponse,
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
            return Promise.resolve(true);
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
  async createListings(
    params: CreateListingsReq
  ): Promise<AggregatorResponse<any>> {
    const data = await this.post<AggregatorApiResponse, CreateListingsReq>(
      '/create-listings/v1',
      params
    );
    const {actions} = data;

    return {
      actions: actions,
      executeActions: async () => {
        // 临时写一个for await
        // const approvalTempResult =
        const res = [];
        for (const action of actions) {
          if (action.name === 'nft-approval') {
            const result1 = await nftApprovalTransaction(action, this.utils);
            res.push(result1);
          }
          if (action.name === 'order-signature') {
            const result = await orderSignature(action, this.utils);
            res.push(result);
          }
        }
        console.info('executeActions', res);
        return res;
      },
    };
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

  private async post<ResData, Req = undefined>(path: string, params: Req) {
    const response = await this.client.post<
      AggregatorApiStatusResponse<ResData>,
      Req
    >(this.url + path, params, this.headers);
    const {code, msg, data} = response;
    if (code === 'SUCCESS') {
      return data;
    } else {
      throw new AggregatorApiException(msg, code, path);
    }
  }
}
