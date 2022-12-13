import { missingParamError } from '@/src/common/http/nftgo.error';
import { NFTGoConfig, nftgoGet } from '@/src/common/http/nftgo.http';
import { isEmpty } from '@/utils';
import NFTGoConst from '@/utils/const';

import BaseApi from '../base-api';
import { SingleAddressListingsResponse, SingleNFTListingsResponse } from './type';

/**
 * Collection related API
 */
export default class NFTGoListing extends BaseApi<NFTGoConfig> {
  /**
   * Return a list of listing info about a single NFT.
   * - details: {@link }
   * @param collectionContract The contract address of the collection
   * @param tokenId The token id of the nft
   * @returns Promise<{@link SingleNFTListingsResponse}>
   */
  getListingsOfSingleNFT(collectionContract: string, tokenId: string): Promise<SingleNFTListingsResponse> {
    if (isEmpty(collectionContract)) {
      return missingParamError('collectionContract');
    }

    if (isEmpty(tokenId)) {
      return missingParamError('tokenId');
    }

    return nftgoGet<undefined, SingleNFTListingsResponse>(
      this.config,
      NFTGoConst.API.evm.listing.getListingsOfNFT(collectionContract, tokenId)
    );
  }

  /**
   * Return a list of listing info about a Ethereum address.
   * - details: {@link}
   * @param collectionContract The contract address of the collection
   * @param address The address of an account
   * @returns Promise<{@link SingleAddressListingsResponse}>
   */
  getListingsOfSingleAddress(address: string): Promise<SingleAddressListingsResponse> {
    if (isEmpty(address)) {
      return missingParamError('address');
    }

    return nftgoGet<{ address: string }, SingleAddressListingsResponse>(
      this.config,
      NFTGoConst.API.evm.listing.getListingsOfAddress,
      { address }
    );
  }
}
