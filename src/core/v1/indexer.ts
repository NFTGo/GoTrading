import { BigNumber } from 'ethers';
import { TransactionReceipt } from 'web3-core';
import { isInvalidParam } from '../../helpers/is-invalid-param';
import { BASE_URL } from '../conifg';
import { AggregatorApiException, AggregatorBaseException, AggregatorBulkBuyException } from '../exception';
import {
  Aggregator,
  HTTPClient,
  CollectionListingsParam,
  CollectionListingResponse,
  AggregateParams,
  AggregateResponse,
  SingleAddressListingsResponse,
  SingleNFTListingsResponse,
  EVMChain,
  NFT,
  ListingOrder,
  NFTBaseInfo,
  NFTInfoForTrade,
  NftsListingInfo,
  MultiNFTListingsResponse,
  OrderInfo,
  BulkBuyParams,
  Config,
} from '../interface';
import { AggregatorUtils } from './utils';

function isFunction(fn: any): fn is Function {
  return typeof fn === 'function';
}
/**
 * @description
 * implement aggregator version 1 for nftgo-aggregator
 */
export class Indexer {
  utils: AggregatorUtils | undefined;
  constructor(private client: HTTPClient, private config: Config, utils?: AggregatorUtils) {
    this.utils = utils;
  }

  private get headers() {
    return { 'X-API-KEY': this.config.apiKey, 'X-FROM': 'js_sdk' };
  }

  private get url() {
    return (this.config?.baseUrl ?? BASE_URL) + (this.config?.chain ?? EVMChain.ETH) + '/v1';
  }

  post<R, P = any>(path: string, params: P | ((config: Config) => P)) {
    const postParams = isFunction(params) ? params(this.config) : params;
    console.info(JSON.stringify(postParams));
    return this.client.post<R, P>(this.url + path, postParams, this.headers);
  }

  get<R, Q = undefined>(path: string, query?: Q) {
    return this.client.get<R, Q>(this.url + path, query, this.headers);
  }
}
