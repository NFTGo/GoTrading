import {
  ApiKeyConfig,
  HTTPClient,
  ListingIndexer,
  ListingIndexerConfig,
  ListingOrderProtocol,
  PostListingOrderParams,
  PostListingOrderResponse
} from "../interface";
import {ListingIndexerApiException} from "../exception";
import {defaultAbiCoder, joinSignature, splitSignature} from "ethers/lib/utils";
import * as Models from "../../models";
import {ExternalServiceRateLimiter} from "./utils/rate-limiter";
import {RateLimiter} from "limiter";

export class ListingIndexerStable implements ListingIndexer {
  private postOrderHandlers = new Map<ListingOrderProtocol, IPostOrderHandler>();
  constructor(private client: HTTPClient, private config: ListingIndexerConfig) {
    this.postOrderHandlers.set(ListingOrderProtocol.SEAPORTV14, new SeaportV1D4Handler(client, config.openSeaApiKeyConfig));
    this.postOrderHandlers.set(ListingOrderProtocol.LOOKSRARE, new LooksRareHandler(client, config.looksRareApiKeyConfig));
    this.postOrderHandlers.set(ListingOrderProtocol.X2Y2, new X2Y2Handler(client, config.x2y2ApiKeyConfig));
  }
  /**
   * post single listing order
   * this method needs to be compatible with both post order v3 and post order v4
   * @param params
   */
  async postListingOrder(params: PostListingOrderParams): Promise<PostListingOrderResponse> {
    const payload = params.payload;
    const signature = params.signature ?? payload.order.data.signature;
    // get post order handler by protocol
    const handler = this.postOrderHandlers.get(params.protocol);
    if (!handler) {
      throw ListingIndexerApiException.unsupportedListProtocolError(params.protocol);
    }

    let result;

    switch (params.version) {
      case "/order/v3":
        if (signature) {
          try {
            const {v, r, s} = splitSignature(signature);
            payload.order.data = {
              ...payload.order.data,
              signature,
              v,
              r,
              s,
            };
          } catch (e: any) {
            throw ListingIndexerApiException.invalidSignatureError(signature);
          }
        }

        result = await handler.handle(payload);
        return {
          code: "SUCCESS",
          msg: "success",
          data: result,
        }
      case "/order/v4":
        const bulkData = payload.bulkData;
        if (signature) {
          try {
            const { v, r, s } = splitSignature(signature);

            if (bulkData?.kind === 'seaport-v1.4') {
              // Encode the merkle proof of inclusion together with the signature
              payload.order.data.signature = Models.SeaportV1D4.Utils.encodeBulkOrderProofAndSignature(
                bulkData.data.orderIndex,
                bulkData.data.merkleProof,
                signature
              );
            } else {
              // If the signature is provided via query parameters, use it
              payload.order.data = {
                ...payload.order.data,
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
            throw ListingIndexerApiException.invalidSignatureError(signature);
          }
        }
        result = await handler.handle(payload);
        return {
          code: "SUCCESS",
          msg: "success",
          data: result,
        }
      default:
        throw ListingIndexerApiException.invalidPostOrderVersionError(params.version)
    }
  }

  async postBatchListingOrders(params: PostListingOrderParams[]): Promise<PostListingOrderResponse[]> {
    const results = await Promise.all(params.map(async (param) => {
      try {
        return await this.postListingOrder(param);
      } catch (e: any) {
        return {
          code: e.code,
          msg: e.message,
          data: null,
        }
      }
    }));
    return results;
  }
}

/**
 * post handler that encapsulates the logic of posting order to orderbook
 */
export interface IPostOrderHandler {
  protocol: ListingOrderProtocol;
  url: string;
  rateLimiter: ExternalServiceRateLimiter;
  handle: (payload: any) => Promise<any>;
}

class SeaportV1D4Handler implements IPostOrderHandler {
  protocol = ListingOrderProtocol.SEAPORTV14;
  url = 'https://api.opensea.io/v2/orders/ethereum/seaport/listings';
  rateLimiter: ExternalServiceRateLimiter;
  constructor(private client: HTTPClient, apiKeyConfig: ApiKeyConfig) {
    this.rateLimiter = new ExternalServiceRateLimiter(apiKeyConfig.apiKey, new RateLimiter({ tokensPerInterval: apiKeyConfig.requestsPerInterval, interval: apiKeyConfig.interval }));
  }
  async handle(payload: any): Promise<any> {
    const order = payload.order;
    const orderbook = payload.orderbook;

    if (!['opensea'].includes(payload.orderbook)) {
      throw ListingIndexerApiException.unsupportedOrderbookError(orderbook, this.protocol);
    }
    const seaportOrder: Models.SeaportV1D4.Types.ListingOrderParams = order.data;

    const apiKey = await this.rateLimiter.getAPIKeyWithRateLimiter();
    return this.client.post(this.url, JSON.stringify({
      parameters: {
        ...seaportOrder,
        totalOriginalConsiderationItems: order.params.consideration.length,
      },
      signature: order.data.signature,
      protocol_address: Models.SeaportV1D4.Addresses.Exchange[Models.Utils.Network.Ethereum]
    }), { 'X-Api-Key': apiKey });
  }
}

class LooksRareHandler implements IPostOrderHandler {
  protocol = ListingOrderProtocol.LOOKSRARE;
  url = 'https://api.looksrare.org/api/v1/orders';
  rateLimiter: ExternalServiceRateLimiter;
  constructor(private client: HTTPClient, apiKeyConfig: ApiKeyConfig) {
    this.rateLimiter = new ExternalServiceRateLimiter(apiKeyConfig.apiKey, new RateLimiter({ tokensPerInterval: apiKeyConfig.requestsPerInterval, interval: apiKeyConfig.interval }));
  }
  async handle(payload: any): Promise<any> {
    const order = payload.order;
    const orderbook = payload.orderbook;

    if (!['looks-rare'].includes(orderbook)) {
      throw ListingIndexerApiException.unsupportedOrderbookError(orderbook, this.protocol);
    }

    const looksrareOrder: Models.LooksRare.Types.LooksRareListingOrderParams = order.data;
    const apiKey = await this.rateLimiter.getAPIKeyWithRateLimiter();

    return this.client.post(this.url, JSON.stringify({
      ...looksrareOrder,
      signature: joinSignature({
        v: order.params.v,
        r: order.params.r as string,
        s: order.params.s,
      }),
      tokenId: order.params.tokenId,
      params: [],
    }), { 'X-Api-Key': apiKey });
  }
}

class X2Y2Handler implements IPostOrderHandler {
  protocol = ListingOrderProtocol.X2Y2;
  url = 'https://api.x2y2.org/api/orders/add';
  rateLimiter: ExternalServiceRateLimiter;
  constructor(private client: HTTPClient, apiKeyConfig: ApiKeyConfig) {
    this.rateLimiter = new ExternalServiceRateLimiter(apiKeyConfig.apiKey, new RateLimiter({ tokensPerInterval: apiKeyConfig.requestsPerInterval, interval: apiKeyConfig.interval }));
  }
  async handle(payload: any): Promise<any> {
    const order = payload.order;
    const orderbook = payload.orderbook;

    if (!['x2y2'].includes(orderbook)) {
      throw ListingIndexerApiException.unsupportedOrderbookError(orderbook, this.protocol);
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
      isCollection: order.dataMask !== '0x',
    }

    return this.client.post(this.url, JSON.stringify({
      ...orderParams,
    }), { 'X-Api-Key': apiKey });
  }
}
