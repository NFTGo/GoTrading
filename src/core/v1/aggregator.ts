import { BigNumber, UnsignedTransaction } from 'ethers';
import { isInvalidParam } from '../../helpers/is-invalid-param';
import { AggregatorApiException } from '../exception';
import {
  Aggregator,
  HTTPClient,
  FilteredNFTsParam,
  FilteredNFTsResponse,
  AggregateParams,
  AggregateResponse,
  SingleAddressListingsResponse,
  SingleNFTListingsResponse,
  EVMChain,
} from '../interface';

/**
 * @description
 * implement aggregator version 1 for nftgo-aggregator
 */
export class AggregatorStable implements Aggregator {
  constructor(
    private client: HTTPClient,
    private config: {
      api_key: string;
      chain: EVMChain;
      base_url?: string;
    }
  ) {}

  getListingOfNFT(contract: string, tokenId: string): Promise<SingleNFTListingsResponse> {
    if (isInvalidParam(contract)) {
      throw AggregatorApiException.missingParamError('collection contract');
    }

    if (isInvalidParam(tokenId)) {
      throw AggregatorApiException.missingParamError('tokenId');
    }

    return this.get(`/nft/${contract}/${tokenId}/listing`);
  }

  getListingsOfWallet(address: string): Promise<SingleAddressListingsResponse> {
    if (isInvalidParam(address)) {
      throw AggregatorApiException.missingParamError('address');
    }

    return this.get('/address/listing', { address });
  }

  getAggregateInfo(params: AggregateParams): Promise<AggregateResponse> {
    if (isInvalidParam(params.buyer_address)) {
      throw AggregatorApiException.missingParamError('buyer_address');
    }

    if (isInvalidParam(params.order_ids)) {
      throw AggregatorApiException.missingParamError('order_ids');
    }

    return this.post('/nft-aggregate/aggregate', params);
  }

  getListingsOfCollection(contract: string, params?: FilteredNFTsParam): Promise<FilteredNFTsResponse> {
    if (isInvalidParam(contract)) {
      throw AggregatorApiException.missingParamError('collection contract');
    }

    const limit = params?.limit;

    if (limit && limit > 1000) {
      throw AggregatorApiException.invalidLimitError(1000);
    }

    return this.get(`/collection/${contract}/filtered_nfts`, {
      offset: 0,
      limit: 10,
      ...params,
    });
  }

  private get headers() {
    return { 'X-API-KEY': this.config.api_key, 'X-FROM': 'js_sdk' };
  }

  private get url() {
    return this.config.base_url + this.config.chain + '/v1';
  }

  private post<R, P = undefined>(path: string, params: P) {
    return this.client.post<R, P>(this.url + path, params, this.headers);
  }

  private get<R, Q = undefined>(path: string, query?: Q) {
    return this.client.get<R, Q>(this.url + path, query, this.headers);
  }
}
