- FilteredNFTsParam
```ts
export interface FilteredNFTsParam {
  /**
   * Select specific traits for nft. Use '-' to join trait type and trait value, and ',' to join different traits. For example, 'Eyes-Bored,Fur-Trippy'. Default is None for not selecting traits.
   */
  traits?: string;
  /**
   * Sort by listing_price_low_to_high / listing_price_high_to_low / last_price_low_to_high / last_price_high_to_low / rarity_low_to_high / rarity_high_to_low / sales_time
   */
  sortBy?: SortBy;
  /**
   * The index of data segments. The returned data is divided into many segments. One segment is returned at a time. {offset} parameter indicates the index of data segments.
   */
  offset?: number; // default: 0
  /**
   * The size of a returned data segment
   */
  limit?: number; // default: 10
  /**
   * Queries can be searched with this keyword.
   */
  keyWord?: string;
  /**
   * Queries can be bounded by a Min price and Max Price.
   */
  min_price?: number;
  /**
   * Queries can be bounded by a Min price and Max Price.
   */
  max_price?: number;
}
```
- SortBy
```ts
export type SortBy =
  | 'listing_price_low_to_high'
  | 'listing_price_high_to_low'
  | 'last_price_low_to_high'
  | 'last_price_high_to_low'
  | 'rarity_low_to_high'
  | 'rarity_high_to_low'
  | 'sales_time';
```
