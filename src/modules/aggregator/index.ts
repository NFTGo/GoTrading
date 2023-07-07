import { BASE_URL } from 'src/common';
import { AggregatorApiException } from '@/exceptions';
import { nftApprovalTransaction, orderSignature } from './action-processor';
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
  PostOrderReq,
  PostOrderResponse,
  OrderKind,
} from '@/types';

import { ExternalServiceRateLimiter } from '@/common';
import { RateLimiter } from 'limiter';
import { BaseException } from '../../exceptions/base';
import { defaultAbiCoder, joinSignature, splitSignature } from 'ethers/lib/utils';
import * as Models from '../../utils/interface';

export class Aggregator implements AggregatorInterface {
  private postOrderHandlers = new Map<OrderKind, IPostOrderHandler>();
  constructor(private client: HTTPClient, private config: Config, private utils: Utils) {
    // TODO: init the postOrderHandlers here, opensea, looksrare, x2y2
    this.cancelOrders.bind(this);
    this.createListings.bind(this);
    this.createOffers.bind(this);
  }

  /**
   *
   * - details: {@link }
   * @param params {@link }
   * @returns Promise<{@link }>
   */
  createOffers(params: CreateOffersReq): Promise<AggregatorResponse<any>> {
    return new Promise<AggregatorResponse<any>>((resolve, reject) => {
      this.post<AggregatorApiResponse, CreateOffersReq>('/create-offers/v1', params).then(res => {
        resolve({
          actions: res.actions,
          executeActions: this.utils.createActionExecutor(res.actions).execute,
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
      this.post<AggregatorApiResponse, FulfillOffersReq>('/aggregate-accept-offers', params).then(res => {
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
      this.post<AggregatorApiResponse, CancelOrdersReq>('/cancel-orders', params).then(res => {
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
  async createListings(params: CreateListingsReq): Promise<AggregatorResponse<any>> {
    const data = await this.post<AggregatorApiResponse, CreateListingsReq>('/create-listings/v1', params);
    const { actions } = data;

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

  /**
   *
   * - details: {@link }
   * @param params {@link PostOrderReq}
   * @returns Promise<{@link }>
   */
  postOrders(params: PostOrderReq): Promise<PostOrderResponse> {
    // given the orderKind, invoke NFTGo developer API or directly post order to marketplace
    if (params.order.kind === OrderKind.Blur) {
      return new Promise<PostOrderResponse>((resolve, reject) => {
        this.post<AggregatorApiResponse, PostOrderReq>('/post-order/v1', params).then(res => {
          resolve(res);
        });
      });
    } else {
      const signature = params.signature;
      const handler = this.postOrderHandlers.get(params.order.kind);
      if (!handler) {
        throw BaseException.invalidParamError('order.kind', 'unsupported orderKind ' + params.order.kind);
      }

      switch (params.extraArgs.version) {
        case 'v3':
          if (signature) {
            try {
              const { v, r, s } = splitSignature(signature);
              params.order.data = {
                ...params.order.data,
                signature,
                v,
                r,
                s,
              };
              // TODO: need to await?
            } catch (e) {
              throw BaseException.invalidParamError('signature', 'invalid signature ' + signature);
            }
          }
          handler.handle(params.order);
          break;
        case 'v4':
          if (signature) {
            try {
              const { v, r, s } = splitSignature(signature);

              if (params.bulkData?.kind === 'seaport-v1.5') {
                // Encode the merkle proof of inclusion together with the signature
                params.order.data.signature = Models.SeaportV1D5.Utils.encodeBulkOrderProofAndSignature(
                  params.bulkData.data.orderIndex,
                  params.bulkData.data.merkleProof,
                  signature
                );
              } else {
                // If the signature is provided via query parameters, use it
                params.order.data = {
                  ...params.order.data,
                  // To cover everything:
                  // - orders requiring a single signature field
                  // - orders requiring split signature fields
                  signature,
                  v,
                  r,
                  s,
                };
              }
            } catch (e: any) {
              throw BaseException.invalidParamError('signature', 'invalid signature ' + signature);
            }
          }
          handler.handle(params.order);
          break;
        default:
          throw BaseException.invalidParamError('extraArgs.version', 'unsupported version ' + params.extraArgs.version);
      }
    }
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

export interface IPostOrderHandler {
  protocol: OrderKind;
  url: string;
  rateLimiter: ExternalServiceRateLimiter;
  handle: (payload: any) => Promise<any>;
}
