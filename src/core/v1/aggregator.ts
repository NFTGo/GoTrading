import { isInvalidParam } from '../../helpers/is-invalid-param';
import { AggregatorException } from '../exception';
import {
  Aggregator,
  HTTPClient,
  Config,
  FilteredNFTsParam,
  FilteredNFTsResponse,
  AggregateParams,
  AggregateResponse,
  SingleAddressListingsResponse,
  SingleNFTListingsResponse,
} from '../interface';

/**
 * @description
 * implement aggregator version 1 for nftgo-aggregator
 */
export class AggregatorStable implements Aggregator {
  constructor(private client: HTTPClient, private config: Config) {}

  getListingOfNFT(contract: string, tokenId: string): Promise<SingleNFTListingsResponse> {
    if (isInvalidParam(contract)) {
      throw AggregatorException.missingParamError('collection contract');
    }

    if (isInvalidParam(tokenId)) {
      throw AggregatorException.missingParamError('tokenId');
    }

    return this.get(`/nft/${contract}/${tokenId}/listing`);
  }

  getListingsOfWallet(address: string): Promise<SingleAddressListingsResponse> {
    if (isInvalidParam(address)) {
      throw AggregatorException.missingParamError('address');
    }

    return this.get('/address/listing', { address });
  }

  getAggregateInfo(params: AggregateParams): Promise<AggregateResponse> {
    if (isInvalidParam(params.buyerAddress)) {
      throw AggregatorException.missingParamError('buyerAddress');
    }

    if (isInvalidParam(params.orderIds)) {
      throw AggregatorException.missingParamError('orderIds');
    }

    return this.post('/nft-aggregate/aggregate', params);
  }

  getListingsOfCollection(contract: string, params: FilteredNFTsParam): Promise<FilteredNFTsResponse> {
    if (isInvalidParam(contract)) {
      throw AggregatorException.missingParamError('collection contract');
    }

    if (isInvalidParam(params)) {
      throw AggregatorException.missingParamError('params');
    }

    const { limit } = params;

    if (limit && limit > 1000) {
      throw AggregatorException.invalidLimitError(1000);
    }

    return this.get(`/collection/${contract}/filtered_nfts`, params);
  }

  private get headers() {
    return { 'X-API-KEY': this.config.apiKey, 'X-FROM': 'js_sdk' };
  }

  private get url() {
    return this.config.baseUrl + this.config.chain + '/v1';
  }

  private post<R, P = undefined>(path: string, params: P) {
    return this.client.post<R, P>(this.url + path, params, this.headers);
  }

  private get<R, Q = undefined>(path: string, query?: Q) {
    return this.client.get<R, Q>(this.url + path, query, this.headers);
  }
}
