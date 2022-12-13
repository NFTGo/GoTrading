import { Listinginfo } from '@/src/common/types/listing';

/**
 * NftListing，如果 Model 的数据存在有效期， 则它应该继承 LastUpdatedModel
 */
export interface SingleNFTListingsResponse {
  /**
   * Last Updated，Last updated timestamp in seconds
   */
  last_updated: number;
  /**
   * Nft List
   */
  nft_list: Listinginfo[];
}

/**
 * NftListing，如果 Model 的数据存在有效期， 则它应该继承 LastUpdatedModel
 */
export interface SingleAddressListingsResponse {
  /**
   * Last Updated，Last updated timestamp in seconds
   */
  last_updated: number;
  /**
   * Nft List
   */
  nft_list: Listinginfo[];
}
