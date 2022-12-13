import { NFTPro } from '@/src/common/types/nft';

export type SortBy =
  | 'listing_price_low_to_high'
  | 'listing_price_high_to_low'
  | 'last_price_low_to_high'
  | 'last_price_high_to_low'
  | 'rarity_low_to_high'
  | 'rarity_high_to_low'
  | 'sales_time';
export interface FilteredNFTsParam {
  /**
   * Select specific traits for nft. Use '-' to join trait type and trait value, and ',' to join different traits. For example, 'Eyes-Bored,Fur-Trippy'. Default is None for not selecting traits.
   */
  traits?: string;
  /**
   * Sort by listing_price_low_to_high / listing_price_high_to_low / last_price_low_to_high / last_price_high_to_low / rarity_low_to_high / rarity_high_to_low / sales_time
   */
  sort_by?: SortBy;
  /**
   * Whether the asset is listing
   */
  is_listing?: boolean;
  /**
   * The index of data segments. The returned data is divided into many segments. One segment is returned at a time. {offset} parameter indicates the index of data segments.
   */
  offset?: number;
  /**
   * The size of a returned data segment
   */
  limit?: number;
  /**
   * Queries can be searched with this keyword.
   */
  key_word?: string;
  /**
   * Queries can be bounded by a Min price and Max Price.
   */
  min_price?: number;
  /**
   * Queries can be bounded by a Min price and Max Price.
   */
  max_price?: number;
}

/**
 * _NFT_pro_list，如果 Model 可能只包含部分数据， 则它应该继承 Total
 */
export interface FilteredNFTsResponse {
  /**
   * Nfts，List of NFTs in the collection
   */
  nfts: NFTPro[];
  /**
   * Total，Total number of items
   */
  total: number;
}
