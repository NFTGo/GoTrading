import {
  ApprovalItem,
  ApprovePolicyOption,
  BulkListingOptions,
  BulkSeaPortPostData,
  ErrorListingItem,
  ListingItem,
  ListingStepsDetailInfo,
  NFTInfoForListing,
  PostData,
  PrepareListingParams,
  SignData,
  SignedListingItem,
} from './listing/interface';

import {
  ApiKeyConfig,
  EVMChain,
  HTTPClient,
  ListingIndexer,
  ListingIndexerConfig,
  ListingOrderProtocol,
  PostListingOrderParams,
  PostListingOrderResponse,
} from '../interface';
import { AggregatorApiException, ListingIndexerApiException } from '../exception';
import { arrayify, defaultAbiCoder, joinSignature, splitSignature } from 'ethers/lib/utils';
import * as Models from '../../models';
import { ExternalServiceRateLimiter } from './utils/rate-limiter';
import { RateLimiter } from 'limiter';
import { marketplaceMeta } from './listing/const';
import { AggregatorUtils } from './utils';
import { BASE_URL } from '../conifg';
import { camel } from '../../helpers/key-format';
import { isInvalidParam } from '../../helpers/is-invalid-param';

export class ListingIndexerStable implements ListingIndexer {
  private postOrderHandlers = new Map<ListingOrderProtocol, IPostOrderHandler>();

  private get url() {
    return (this.config?.baseUrl ?? BASE_URL) + (this.config?.chain ?? EVMChain.ETH) + '/v1';
  }

  private get headers() {
    return { 'X-API-KEY': this.config.apiKey, 'X-FROM': 'js_sdk' };
  }

  constructor(private client: HTTPClient, private config: ListingIndexerConfig, private utils: AggregatorUtils) {
    if (config.openSeaApiKeyConfig) {
      this.postOrderHandlers.set(
        ListingOrderProtocol.SEAPORTV14,
        new SeaportV1D4Handler(client, config.openSeaApiKeyConfig)
      );
    }

    if (config.looksRareApiKeyConfig) {
      this.postOrderHandlers.set(
        ListingOrderProtocol.LOOKSRARE,
        new LooksRareHandler(client, config.looksRareApiKeyConfig)
      );
    }

    if (config.x2y2ApiKeyConfig) {
      this.postOrderHandlers.set(ListingOrderProtocol.X2Y2, new X2Y2Handler(client, config.x2y2ApiKeyConfig));
    }
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
      case '/order/v3':
        if (signature) {
          try {
            const { v, r, s } = splitSignature(signature);
            payload.order.data = {
              ...payload.order.data,
              signature,
              v,
              r,
              s,
            };
            result = await handler.handle(payload);
            return {
              code: 'SUCCESS',
              msg: 'success',
              data: result,
            };
          } catch (e: any) {
            console.error(e);
            throw ListingIndexerApiException.marketplacePostOrderError(e.message);
          }
        }

      case '/order/v4':
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
            console.error(e);
            throw ListingIndexerApiException.marketplacePostOrderError(e.message);
          }
        }
        result = await handler.handle(payload);
        return {
          code: 'SUCCESS',
          msg: 'success',
          data: result,
        };
      default:
        throw ListingIndexerApiException.invalidPostOrderVersionError(params.version);
    }
  }

  async prepareListing(nfts: NFTInfoForListing[], maker: string): Promise<ListingStepsDetailInfo> {
    if (!Array.isArray(nfts) || nfts.length === 0) {
      throw ListingIndexerApiException.invalidParam('nfts', 'nfts should not be empty');
    }
    if (isInvalidParam(maker)) {
      throw ListingIndexerApiException.invalidParam('maker', 'prepare need check nfts maker');
    }
    const params = nfts.map<PrepareListingParams>((param) => {
      const {
        contract,
        tokenId,
        marketplace,
        ethPrice,
        listingTime,
        expirationTime,
        automatedRoyalties,
        royaltyBps,
        fees,
      } = param;
      const { orderKind, orderbook, options } = marketplaceMeta[marketplace];
      return {
        orderKind,
        orderbook,
        automatedRoyalties,
        royaltyBps: royaltyBps ?? undefined,
        fees: fees ?? undefined,
        options,
        currency: '0x0000000000000000000000000000000000000000',
        token: `${contract}:${tokenId}`,
        weiPrice: String((ethPrice * Math.pow(10, 18)).toFixed(0)),
        listingTime: (listingTime / 1000).toFixed(0),
        expirationTime: (expirationTime / 1000).toFixed(0),
      };
    });
    const data = await this.client.post(
      this.url + '/nft-aggregate/listings',
      {
        params,
        maker,
        source: 'nftgo.io',
      },
      this.headers
    );
    const camelData = camel(data);
    return camelData as ListingStepsDetailInfo;
  }

  parseApprovalData(rawData: ListingStepsDetailInfo): ApprovalItem[] {
    const { steps } = rawData;
    const approvalData = steps[0].items;
    return approvalData;
  }

  parseListingData(rawData: ListingStepsDetailInfo) {
    const { steps } = rawData;
    const listingData = steps[1].items;
    return listingData;
  }

  async approveWithPolicy(
    data: [ApprovalItem[], ListingItem[]],
    policyOption: ApprovePolicyOption
  ): Promise<ListingItem[]> {
    if (!Array.isArray(data) || data.length !== 2) {
      throw ListingIndexerApiException.invalidParam('data', "The length of the array for 'data' should be 2.");
    }
    if (isInvalidParam(policyOption)) {
      throw ListingIndexerApiException.invalidParam('policyOption', 'policyOption should not be empty');
    }
    const [approvalItems, listingItems] = data;
    const { autoApprove, skipUnapproved } = policyOption;

    const inCompletes = approvalItems.filter((item) => item.status === 'incomplete');
    const inCompletesIndexes = inCompletes.map((item) => item.orderIndexes).flat();

    if (inCompletesIndexes.length === 0) {
      return Promise.resolve(listingItems);
    }

    if (autoApprove) {
      const signs = inCompletesIndexes.map((i) => {
        const data = inCompletes.find((item) => item.orderIndexes.includes(i))?.data;
        return this.signApproveInfo(data);
      });
      const result = await Promise.allSettled(signs);
      if (result.every((e) => e.status === 'fulfilled')) {
        return listingItems;
      } else {
        const msgs = result.filter((e) => e.status === 'rejected').map((e) => (e as PromiseRejectedResult).reason);
        throw new Error('Approve failed:' + msgs.join(', '));
      }
    } else if (skipUnapproved) {
      // filter listingItems
      const filteredListingItems = listingItems.filter(
        (item) => !item.orderIndexes.some((i) => inCompletesIndexes.includes(i))
      );
      return Promise.resolve(filteredListingItems);
    } else {
      throw new Error('There are NFT collections that have not been authorized yet.');
    }
  }

  async signListingOrders(listingItems: ListingItem[]): Promise<[SignedListingItem[], ErrorListingItem[]]> {
    if (!Array.isArray(listingItems) || listingItems.length === 0) {
      throw ListingIndexerApiException.invalidParam('listingItems', 'listingItems should not be empty');
    }
    const listings = listingItems.map((item) => {
      const { status, data, orderIndexes } = item;
      if (status === 'complete' || !data || orderIndexes?.length === 0) {
        return Promise.resolve('complete');
      } else {
        const { sign, post } = data;
        return new Promise((resolve, reject) => {
          this.signListingInfo(sign)
            .then((signature) => {
              resolve({
                signature,
                post,
                orderIndexes,
              });
            })
            .catch((err) => {
              reject(new Error('listing error:' + err.message));
            });
        });
      }
    });
    const data = await Promise.allSettled(listings);
    const signaturedOrders = data
      .filter((e) => e.status === 'fulfilled')
      .map((e) => (e as PromiseFulfilledResult<SignedListingItem>).value);
    const errorOrders = data
      .map((e, i) => ({ ...e, orderIndexes: listingItems[i].orderIndexes }))
      .filter((e) => e.status === 'rejected')
      .map((e) => ({
        reason: (e as PromiseRejectedResult).reason,
        reasonStep: 'sign listing error',
        orderIndexes: e.orderIndexes,
      }));
    return [signaturedOrders, errorOrders];
  }

  async bulkPostListingOrders(signaturedOrders: SignedListingItem[]): Promise<[number[], ErrorListingItem[]]> {
    if (!Array.isArray(signaturedOrders) || signaturedOrders.length === 0) {
      throw ListingIndexerApiException.invalidParam('signaturedOrders', 'signaturedOrders should not be empty');
    }
    function isBulkSeaPortV4(postData: PostData | BulkSeaPortPostData): postData is BulkSeaPortPostData {
      return (postData as BulkSeaPortPostData).body.items !== undefined;
    }
    const bulkPostOrderIndexes = signaturedOrders
      .map((e) => {
        const { post, orderIndexes } = e;
        if (isBulkSeaPortV4(post)) {
          return post.body.items.map((ele) => ele.bulkData.data.orderIndex);
        } else {
          return orderIndexes;
        }
      })
      .flat();
    const bulkPostOrders = signaturedOrders
      .map((e) => {
        const { signature, post, orderIndexes } = e;
        const { endpoint, body } = post;
        if (isBulkSeaPortV4(post)) {
          return post.body.items.map((ele) => {
            return this.postListingOrder({
              version: endpoint,
              protocol: post.body.items[0].order.kind as ListingOrderProtocol,
              payload: ele,
              signature: signature,
            });
          });
        } else {
          return this.postListingOrder({
            version: endpoint,
            protocol: post.body.order.kind as ListingOrderProtocol,
            payload: body,
            signature: signature,
          });
        }
      })
      .flat();
    const data = await Promise.allSettled(bulkPostOrders);
    const successItems: number[] = [];
    const errorItems: ErrorListingItem[] = [];
    data.forEach((e, i) => {
      const index = bulkPostOrderIndexes[i];
      if (e.status === 'fulfilled') {
        const { code } = e.value;
        if (code === 'SUCCESS') {
          successItems.push(index);
        } else {
          errorItems.push({
            reason: 'post listing failed',
            reasonStep: 'post listing response error',
            orderIndexes: [index],
          });
        }
      } else {
        errorItems.push({
          reason: 'post listing request failed:' + (e as PromiseRejectedResult).reason,
          reasonStep: 'post listing request error',
          orderIndexes: [index],
        });
      }
    });
    return [successItems, errorItems];
  }

  async signApproveInfo(approvalSignInfo: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.utils
        ?.sendTransaction(approvalSignInfo as object)
        .on('error', (err) => {
          reject(new Error(err.message));
        })
        .on('receipt', (receipt) => {
          const error = receipt?.logs.length === 0 || !receipt?.status;
          if (error) {
            reject(new Error('approved sign failed'));
          } else {
            resolve(true);
          }
        });
      return Promise.resolve(true);
    });
  }

  async signListingInfo(sign: SignData): Promise<string> {
    const { domain, types, value } = sign;
    const signer = this.utils?._ethersSigner;
    let signature: string = '0x0000000000000000000000000000000000000000000000000000000000000000';
    if (signer) {
      if (sign.signatureKind === 'eip191') {
        if (sign.message?.match(/0x[0-9a-fA-F]{64}/)) {
          // If the message represents a hash, we need to convert it to raw bytes first
          signature = await signer.signMessage(arrayify(sign.message));
        } else {
          signature = await signer.signMessage(sign.message ?? '');
        }
      } else if (sign.signatureKind === 'eip712') {
        signature = await signer._signTypedData(domain, types, value);
      }
    }
    return signature;
  }

  // bulk listing
  async bulkListing(nfts: NFTInfoForListing[], config?: BulkListingOptions) {
    const { autoApprove, skipUnapproved, onFinish, onError, maker: configMaker } = config ?? {};
    try {
      if (!Array.isArray(nfts) || nfts.length === 0) {
        throw ListingIndexerApiException.invalidParam('nfts', 'nfts should not be empty');
      }
      /**
       * The first step is to obtain the items that need to be listed, relevant authorization signatures, and listing parameters
       */
      const maker = configMaker ?? this.config.walletConfig?.address;
      if (!maker) {
        throw ListingIndexerApiException.invalidParam('maker', 'maker address is required');
      }
      const data = await this.prepareListing(nfts, maker ?? this.config.walletConfig?.address);
      /**
       * Then, do some simple data formatting and prepare to hand it over to the next process.
       */
      const approvalData = this.parseApprovalData(data);
      const listingData = this.parseListingData(data);
      /**
       * Next: authorize unlicensed items or skip them.
       */
      const approvalResult = await this.approveWithPolicy([approvalData, listingData], {
        autoApprove,
        skipUnapproved,
      });

      /**
       * Next, sign the post order for the authorized items.
       */
      const [listingResult, errorOrders] = await this.signListingOrders(approvalResult);
      /**
       * Finally, for each different exchange, make post order requests using different strategies.
       */
      const [successIndexes, errorItems] = await this.bulkPostListingOrders(listingResult);
      const errorIndexes = [...errorOrders, ...errorItems];
      onFinish?.(successIndexes, errorIndexes);
      return [successIndexes, errorIndexes] as [number[], ErrorListingItem[]];
    } catch (error) {
      onError?.(error as Error);
      throw error;
    }
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
    this.rateLimiter = new ExternalServiceRateLimiter(
      apiKeyConfig.apiKey,
      new RateLimiter({ tokensPerInterval: apiKeyConfig.requestsPerInterval, interval: apiKeyConfig.interval })
    );
  }
  async handle(payload: any): Promise<any> {
    const order = payload.order;
    const orderbook = payload.orderbook;

    if (!['opensea'].includes(payload.orderbook)) {
      throw ListingIndexerApiException.unsupportedOrderbookError(orderbook, this.protocol);
    }
    const seaportOrder: Models.SeaportV1D4.Types.ListingOrderParams = {
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
          protocol_address: Models.SeaportV1D4.Addresses.Exchange[Models.Utils.Network.Ethereum],
        },
        { 'X-Api-Key': apiKey },
        true
      );
      console.log('result', result);
      return result;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  }
}

class LooksRareHandler implements IPostOrderHandler {
  protocol = ListingOrderProtocol.LOOKSRARE;
  url = 'https://api.looksrare.org/api/v1/orders';
  rateLimiter: ExternalServiceRateLimiter;
  constructor(private client: HTTPClient, apiKeyConfig: ApiKeyConfig) {
    this.rateLimiter = new ExternalServiceRateLimiter(
      apiKeyConfig.apiKey,
      new RateLimiter({ tokensPerInterval: apiKeyConfig.requestsPerInterval, interval: apiKeyConfig.interval })
    );
  }
  async handle(payload: any): Promise<any> {
    const order = payload.order;
    const orderbook = payload.orderbook;

    if (!['looks-rare'].includes(orderbook)) {
      throw ListingIndexerApiException.unsupportedOrderbookError(orderbook, this.protocol);
    }

    const looksrareOrder: Models.LooksRare.Types.LooksRareListingOrderParams = order.data;
    const apiKey = await this.rateLimiter.getAPIKeyWithRateLimiter();

    return this.client.post(
      this.url,
      {
        ...looksrareOrder,
        signature: joinSignature({
          v: order.data.v,
          r: order.data.r as string,
          s: order.data.s,
        }),
        tokenId: order.data.tokenId,
        params: [],
      },
      { 'X-Api-Key': apiKey },
      true
    );
  }
}

class X2Y2Handler implements IPostOrderHandler {
  protocol = ListingOrderProtocol.X2Y2;
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
      isCollection: order.data.dataMask !== '0x',
    };

    return this.client.post(this.url, orderParams, { 'X-Api-Key': apiKey }, true);
  }
}
