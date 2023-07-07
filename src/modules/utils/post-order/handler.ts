import { ApiKeyConfig, HTTPClient, OrderKind } from '@/types';
import * as Models from './utils';

import { ExternalServiceRateLimiter } from '@/common';
import { RateLimiter } from 'limiter';
import { BaseException } from '@/exceptions';
import { defaultAbiCoder } from 'ethers/lib/utils';
import { IPostOrderHandler } from './utils';

export class SeaportV1D5Handler implements IPostOrderHandler {
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
      throw BaseException.invalidParamError('orderbook', `${this.protocol} only supports opensea`);
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
          protocol_address: Models.SeaportV1D5.Addresses.Exchange[Models.Utils.Network.Ethereum],
        },
        { 'X-Api-Key': apiKey },
        true
      );
      return result;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
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

    return this.client.post(
      this.url,
      {
        ...looksrareOrder,
      },
      { 'X-Api-Key': apiKey },
      true
    );
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
