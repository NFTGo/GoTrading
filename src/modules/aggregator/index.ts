import {BASE_URL} from '../../config';
import {AggregatorApiException} from '../../exceptions';
import {nftApprovalTransaction, orderSignature} from './action-processor';
import {
  ApiKeyConfig,
  Config,
  EVMChain,
  HTTPClient,
  Utils,
} from '../../interface';
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
  PostOrderReq,
  PostOrderResponse,
} from './interface';
import {executeAllActions} from './use-cases';
import {OrderKind} from '../interface';
import {ExternalServiceRateLimiter} from '../../utils/rate-limiter';
import {RateLimiter} from 'limiter';
import {BaseException} from '../../exceptions/base';
import {defaultAbiCoder, joinSignature, splitSignature} from 'ethers/lib/utils';
import * as Models from '../../utils/interface';

export class Aggregator implements AggregatorInterface {
  private postOrderHandlers = new Map<OrderKind, IPostOrderHandler>();
  constructor(
    private client: HTTPClient,
    private config: Config,
    private utils: Utils
  ) {
    // TODO: init the postOrderHandlers here, opensea, looksrare, x2y2
  }

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
  async fulfillListings(
    params: FulfillListingsReq
  ): Promise<AggregatorResponse<any>> {
    const data = await this.post<AggregatorApiResponse, FulfillListingsReq>(
      '/aggregate-accept-listings',
      params
    );
    const {actions} = data;

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
        this.post<AggregatorApiResponse, PostOrderReq>(
          '/post-order/v1',
          params
        ).then(res => {
          resolve(res);
        });
      });
    } else {
      const signature = params.signature;
      const handler = this.postOrderHandlers.get(params.order.kind);
      if (!handler) {
        throw BaseException.invalidParamError(
          'order.kind',
          'unsupported orderKind ' + params.order.kind
        );
      }

      switch (params.extraArgs.version) {
        case 'v3':
          if (signature) {
            try {
              const {v, r, s} = splitSignature(signature);
              params.order.data = {
                ...params.order.data,
                signature,
                v,
                r,
                s,
              };
              // TODO: need to await?
            } catch (e) {
              throw BaseException.invalidParamError(
                'signature',
                'invalid signature ' + signature
              );
            }
          }
          handler.handle(params.order);
          break;
        case 'v4':
          if (signature) {
            try {
              const {v, r, s} = splitSignature(signature);

              if (params.bulkData?.kind === 'seaport-v1.5') {
                // Encode the merkle proof of inclusion together with the signature
                params.order.data.signature =
                  Models.SeaportV1D5.Utils.encodeBulkOrderProofAndSignature(
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
              throw BaseException.invalidParamError(
                'signature',
                'invalid signature ' + signature
              );
            }
          }
          handler.handle(params.order);
          break;
        default:
          throw BaseException.invalidParamError(
            'extraArgs.version',
            'unsupported version ' + params.extraArgs.version
          );
      }
    }
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

export interface IPostOrderHandler {
  protocol: OrderKind;
  url: string;
  rateLimiter: ExternalServiceRateLimiter;
  handle: (payload: any) => Promise<any>;
}

class SeaportV1D5Handler implements IPostOrderHandler {
  protocol = OrderKind.SeaportV15;
  url = 'https://api.opensea.io/v2/orders/ethereum/seaport/listings';
  rateLimiter: ExternalServiceRateLimiter;
  constructor(private client: HTTPClient, apiKeyConfig: ApiKeyConfig) {
    this.rateLimiter = new ExternalServiceRateLimiter(
      apiKeyConfig.apiKey,
      new RateLimiter({
        tokensPerInterval: apiKeyConfig.requestsPerInterval,
        interval: apiKeyConfig.interval,
      })
    );
  }
  async handle(payload: any): Promise<any> {
    const order = payload.order;
    const orderbook = payload.orderbook;

    if (!['opensea'].includes(payload.orderbook)) {
      throw BaseException.invalidParamError(
        'orderbook',
        `${this.protocol} only supports opensea`
      );
    }
    const seaportOrder: Models.SeaportV1D5.Types.ListingOrderParams = {
      offerer: order.data.offerer,
      zone: order.data.zone,
      offer: order.data.offer,
      consideration: order.data.consideration,
      orderType: order.data.orderType,
      startTime: order.data.startTime,
      endTime: order.data.endTime,
      zoneHash: order.data.zoneHash,
      salt: order.data.salt,
      conduitKey: order.data.conduitKey,
      counter: order.data.counter,
      signature: order.data.signature,
    };

    const apiKey = await this.rateLimiter.getAPIKeyWithRateLimiter();
    try {
      const result = await this.client.post(
        this.url,
        {
          parameters: {
            ...seaportOrder,
            totalOriginalConsiderationItems: order.data.consideration.length,
          },
          signature: order.data.signature,
          protocol_address:
            Models.SeaportV1D5.Addresses.Exchange[
              Models.Utils.Network.Ethereum
            ],
        },
        {'X-Api-Key': apiKey},
        true
      );
      return result;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  }
}

class LooksRareV2Handler implements IPostOrderHandler {
  protocol = OrderKind.LooksRareV2;
  url = 'https://api.looksrare.org/api/v2/orders';
  rateLimiter: ExternalServiceRateLimiter;
  constructor(private client: HTTPClient, apiKeyConfig: ApiKeyConfig) {
    this.rateLimiter = new ExternalServiceRateLimiter(
      apiKeyConfig.apiKey,
      new RateLimiter({
        tokensPerInterval: apiKeyConfig.requestsPerInterval,
        interval: apiKeyConfig.interval,
      })
    );
  }
  async handle(payload: any): Promise<any> {
    const order = payload.order;
    const orderbook = payload.orderbook;

    if (!['looks-rare'].includes(orderbook)) {
      throw BaseException.invalidParamError(
        'orderbook',
        `${this.protocol} only supports looks-rare`
      );
    }

    const looksrareOrder: Models.LooksRareV2.Types.MakerOrderParams =
      order.data;
    const apiKey = await this.rateLimiter.getAPIKeyWithRateLimiter();

    return this.client.post(
      this.url,
      {
        ...looksrareOrder,
      },
      {'X-Api-Key': apiKey},
      true
    );
  }
}

class X2Y2Handler implements IPostOrderHandler {
  protocol = OrderKind.X2Y2;
  url = 'https://api.x2y2.org/api/orders/add';
  rateLimiter: ExternalServiceRateLimiter;

  constructor(private client: HTTPClient, apiKeyConfig: ApiKeyConfig) {
    this.rateLimiter = new ExternalServiceRateLimiter(
      apiKeyConfig.apiKey,
      new RateLimiter({
        tokensPerInterval: apiKeyConfig.requestsPerInterval,
        interval: apiKeyConfig.interval,
      })
    );
  }

  async handle(payload: any): Promise<any> {
    const order = payload.order;
    const orderbook = payload.orderbook;

    if (!['x2y2'].includes(orderbook)) {
      throw BaseException.invalidParamError(
        'orderbook',
        `${this.protocol} only supports x2y2`
      );
    }

    const x2y2Order: Models.X2Y2.Types.X2Y2ListingOrderParams = order.data;
    const apiKey = await this.rateLimiter.getAPIKeyWithRateLimiter();

    const orderParams = {
      order: defaultAbiCoder.encode(
        [
          `(
            uint256 salt,
            address user,
            uint256 network,
            uint256 intent,
            uint256 delegateType,
            uint256 deadline,
            address currency,
            bytes dataMask,
            (uint256 price, bytes data)[] items,
            bytes32 r,
            bytes32 s,
            uint8 v,
            uint8 signVersion
          )`,
        ],
        [x2y2Order]
      ),
      isBundle: false,
      bundleName: '',
      bundleDesc: '',
      orderIds: [],
      changePrice: false,
      isCollection: order.data.dataMask !== '0x',
    };

    return this.client.post(this.url, orderParams, {'X-Api-Key': apiKey}, true);
  }
}
