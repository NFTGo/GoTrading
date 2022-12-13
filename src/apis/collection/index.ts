import { invalidLimitError, missingParamError } from '@/src/common/http/nftgo.error';
import { NFTGoConfig, nftgoGet } from '@/src/common/http/nftgo.http';
import { isEmpty } from '@/utils';
import NFTGoConst from '@/utils/const';

import BaseApi from '../base-api';
import { FilteredNFTsParam, FilteredNFTsResponse } from './type';

/**
 * Collection related API
 */
export default class NFTGoCollection extends BaseApi<NFTGoConfig> {
  /**
   * Return filtered items of an NFT collection. You can select traits, sorting and listing to filter a subset of items.
   * - details: {@link https://docs.nftgo.io/reference/get_filtered_nfts_eth_v1_collection__contract_address__filtered_nfts_get}
   * @param collectionContract The contract address of the collection
   * @param params The query params {@link FilteredNFTsParam}
   * @returns Promise<{@link FilteredNFTsResponse}>
   */
  getFilteredNFTs(collectionContract: string, params: FilteredNFTsParam): Promise<FilteredNFTsResponse> {
    if (isEmpty(collectionContract)) {
      return missingParamError('collectionContract');
    }

    if (isEmpty(params)) {
      return missingParamError('params');
    }

    const { limit } = params;

    if (limit && limit > 1000) {
      return invalidLimitError(1000);
    }

    return nftgoGet<FilteredNFTsParam, FilteredNFTsResponse>(
      this.config,
      NFTGoConst.API.evm.collection.getFilteredNFTs(collectionContract),
      params
    );
  }
}
