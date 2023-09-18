import { ApiKeyConfig, HTTPClient, OrderKind, OrderType } from '@/types';
import * as Models from './utils';

import { ExternalServiceRateLimiter } from '@/common';
import { RateLimiter } from 'limiter';
import { BaseException } from '@/exceptions';
import { _TypedDataEncoder, defaultAbiCoder } from 'ethers/lib/utils';
import { IPostOrderHandler } from './utils';

export class SeaportV1D5Handler implements IPostOrderHandler {
  protocol = OrderKind.SeaportV15;
  listingUrl = 'https://api.opensea.io/v2/orders/ethereum/seaport/listings';
  offerCollectionUrl = 'https://api.opensea.io/v2/offers';
  offerTokenUrl = 'https://api.opensea.io/v2/orders/ethereum/seaport/offers';
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
    const orderType = payload.orderType;
    if (!['opensea'].includes(orderbook)) {
      throw BaseException.invalidParamError('orderbook', `${this.protocol} only supports opensea`);
    }

    const seaportOrder: Models.SeaportV1D5.Types.OrderComponents = {
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
    const orderHash = await this.hash(seaportOrder);
    console.log(orderHash);
    const apiKey = await this.rateLimiter.getAPIKeyWithRateLimiter();
    if (orderType === OrderType.Listing) {
      try {
        const result = await this.client.post(
          this.listingUrl,
          {
            parameters: {
              ...seaportOrder,
              totalOriginalConsiderationItems: order.data.consideration.length,
            },
            signature: order.data.signature,
            protocol_address: Models.SeaportV1D5.Addresses.Exchange[Models.Utils.Network.Ethereum],
          },
          { 'X-Api-Key': apiKey },
          true
        );
        return result;
      } catch (error) {
        throw error;
      }
    } else {
      // OrderType.Offer
      // We'll always have only one of the below cases:
      // Only relevant/present for attribute bids
      const attribute = payload.attribute;
      // Only relevant for collection bids
      const collection = payload.collection;
      const slug = payload.slug;
      // Only relevant for token set bids
      const tokenSetId = payload.tokenSetId;
      const isNonFlagged = payload.isNonFlagged;

      let schema: any;
      if (attribute) {
        schema = {
          kind: 'attribute',
          data: {
            collection: attribute.slug,
            isNonFlagged: isNonFlagged || undefined,
            trait: {
              key: attribute.key,
              value: attribute.value,
            },
          },
        };
      } else if (slug && isNonFlagged) {
        schema = {
          kind: 'collection-non-flagged',
          data: {
            collection: {
              slug,
            },
          },
        };
      } else if (slug) {
        schema = {
          kind: 'collection',
          data: {
            collection: {
              slug,
            },
          },
        };
      } else if (tokenSetId) {
        schema = {
          kind: 'token-set',
          data: {
            tokenSetId,
          },
        };
      }

      if (schema && ['collection', 'collection-non-flagged', 'attribute'].includes(schema.kind)) {
        // post collection/trait offer
        try {
          const result = await this.client.post(
            this.offerCollectionUrl,
            {
              criteria: schema.data,
              protocol_data: {
                parameters: {
                  ...seaportOrder,
                  totalOriginalConsiderationItems: order.data.consideration.length,
                },
                signature: order.data.signature,
              },
              protocol_address: Models.SeaportV1D5.Addresses.Exchange[Models.Utils.Network.Ethereum],
            },
            { 'X-Api-Key': apiKey },
            true
          );
          return result;
        } catch (error) {
          throw error;
        }
      } else {
        // post token offer
        try {
          const result = await this.client.post(
            this.offerTokenUrl,
            {
              parameters: {
                ...seaportOrder,
                totalOriginalConsiderationItems: order.data.consideration.length,
              },
              signature: order.data.signature,
              protocol_address: Models.SeaportV1D5.Addresses.Exchange[Models.Utils.Network.Ethereum],
            },
            { 'X-Api-Key': apiKey },
            true
          );
          return result;
        } catch (error) {
          throw error;
        }
      }
    }
  }

  async hash(order: Models.SeaportV1D5.Types.OrderComponents) {
    const EIP712_TYPES = {
      Order: [
        { name: 'trader', type: 'address' },
        { name: 'collection', type: 'address' },
        { name: 'listingsRoot', type: 'bytes32' },
        { name: 'numberOfListings', type: 'uint256' },
        { name: 'expirationTime', type: 'uint256' },
        { name: 'assetType', type: 'uint8' },
        { name: 'makerFee', type: 'FeeRate' },
        { name: 'salt', type: 'uint256' },
        { name: 'orderType', type: 'uint8' },
        { name: 'nonce', type: 'uint256' },
      ],
      FeeRate: [
        { name: 'rate', type: 'uint16' },
        { name: 'recipient', type: 'address' },
      ],
    };
    return _TypedDataEncoder.hashStruct('OrderComponents', EIP712_TYPES, order);
  }
}

export class LooksRareV2Handler implements IPostOrderHandler {
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
      throw BaseException.invalidParamError('orderbook', `${this.protocol} only supports looks-rare`);
    }

    const looksrareOrder: Models.LooksRareV2.Types.MakerOrderParams = order.data;
    const apiKey = await this.rateLimiter.getAPIKeyWithRateLimiter();
    const orderHash = await this.hash(looksrareOrder);
    console.log(orderHash);
    return this.client.post(
      this.url,
      {
        ...looksrareOrder,
      },
      { 'X-Api-Key': apiKey },
      true
    );
  }

  async hash(order: Models.LooksRareV2.Types.MakerOrderParams) {
    const EIP712_TYPES = {
      Maker: [
        { name: 'quoteType', type: 'uint8' },
        { name: 'globalNonce', type: 'uint256' },
        { name: 'subsetNonce', type: 'uint256' },
        { name: 'orderNonce', type: 'uint256' },
        { name: 'strategyId', type: 'uint256' },
        { name: 'collectionType', type: 'uint8' },
        { name: 'collection', type: 'address' },
        { name: 'currency', type: 'address' },
        { name: 'signer', type: 'address' },
        { name: 'startTime', type: 'uint256' },
        { name: 'endTime', type: 'uint256' },
        { name: 'price', type: 'uint256' },
        { name: 'itemIds', type: 'uint256[]' },
        { name: 'amounts', type: 'uint256[]' },
        { name: 'additionalParameters', type: 'bytes' },
      ],
    };
    return _TypedDataEncoder.hashStruct('Maker', EIP712_TYPES, order);
  }
}

export class X2Y2Handler implements IPostOrderHandler {
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
      throw BaseException.invalidParamError('orderbook', `${this.protocol} only supports x2y2`);
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
