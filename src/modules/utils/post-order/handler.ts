import { ApiKeyConfig, HTTPClient, OrderKind, OrderType } from '@/types';
import * as Models from './utils';

import { ExternalServiceRateLimiter } from '@/common';
import { RateLimiter } from 'limiter';
import { BaseException } from '@/exceptions';
import { _TypedDataEncoder, defaultAbiCoder } from 'ethers/lib/utils';
import { IPostOrderHandler } from './utils';
import { SafeAny } from 'src/types/safe-any';

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
  async handle(payload: SafeAny): Promise<SafeAny> {
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

    const apiKey = await this.rateLimiter.getAPIKeyWithRateLimiter();
    if (orderType === OrderType.Listing) {
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
      const orderHash = this.hash(seaportOrder);
      return {
        orderHash,
        result,
      };
    } else {
      // OrderType.Offer
      // We'll always have only one of the below cases:
      // Only relevant/present for attribute bids
      const attribute = payload.attribute;
      // Only relevant for collection bids
      const slug = payload.slug;
      // Only relevant for token set bids
      const tokenSetId = payload.tokenSetId;
      const isNonFlagged = payload.isNonFlagged;

      let schema;
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
        const orderHash = this.hash(seaportOrder);
        return {
          orderHash,
          result,
        };
      } else {
        // post token offer
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
        const orderHash = this.hash(seaportOrder);
        return {
          orderHash,
          result,
        };
      }
    }
  }

  hash(order: Models.SeaportV1D5.Types.OrderComponents) {
    const ORDER_EIP712_TYPES = {
      OrderComponents: [
        { name: 'offerer', type: 'address' },
        { name: 'zone', type: 'address' },
        { name: 'offer', type: 'OfferItem[]' },
        { name: 'consideration', type: 'ConsiderationItem[]' },
        { name: 'orderType', type: 'uint8' },
        { name: 'startTime', type: 'uint256' },
        { name: 'endTime', type: 'uint256' },
        { name: 'zoneHash', type: 'bytes32' },
        { name: 'salt', type: 'uint256' },
        { name: 'conduitKey', type: 'bytes32' },
        { name: 'counter', type: 'uint256' },
      ],
      OfferItem: [
        { name: 'itemType', type: 'uint8' },
        { name: 'token', type: 'address' },
        { name: 'identifierOrCriteria', type: 'uint256' },
        { name: 'startAmount', type: 'uint256' },
        { name: 'endAmount', type: 'uint256' },
      ],
      ConsiderationItem: [
        { name: 'itemType', type: 'uint8' },
        { name: 'token', type: 'address' },
        { name: 'identifierOrCriteria', type: 'uint256' },
        { name: 'startAmount', type: 'uint256' },
        { name: 'endAmount', type: 'uint256' },
        { name: 'recipient', type: 'address' },
      ],
    };
    return _TypedDataEncoder.hashStruct('OrderComponents', ORDER_EIP712_TYPES, order);
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
  async handle(payload: SafeAny): Promise<SafeAny> {
    const order = payload.order;
    const orderbook = payload.orderbook;

    if (!['looks-rare'].includes(orderbook)) {
      throw BaseException.invalidParamError('orderbook', `${this.protocol} only supports looks-rare`);
    }

    const looksrareOrder: Models.LooksRareV2.Types.MakerOrderParams = order.data;
    const apiKey = await this.rateLimiter.getAPIKeyWithRateLimiter();
    const result = this.client.post(
      this.url,
      {
        ...looksrareOrder,
      },
      { 'X-Api-Key': apiKey },
      true
    );
    const orderHash = this.hash(looksrareOrder);
    return {
      orderHash,
      result,
    };
  }
  hash(order: Models.LooksRareV2.Types.MakerOrderParams) {
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

  async handle(payload: SafeAny): Promise<SafeAny> {
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
    const result = this.client.post(this.url, orderParams, { 'X-Api-Key': apiKey }, true);
    const orderHash = x2y2Order.itemHash;
    return {
      orderHash,
      result,
    };
  }
}
