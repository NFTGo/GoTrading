- ***SingleNFTListingsResponse***
```ts
export interface SingleAddressListingsResponse {
  /**
   * Last Updated，Last updated timestamp in seconds
   */
  lastUpdated: number;
  /**
   * Nft List
   */
  nftList: ListingInfo[];
}
```

- ***ListingInfo***
```ts
export interface ListingInfo {
  /**
   * Contract，Address of the contract for this NFT collection, beginning with 0x
   */
  contract?: string;
  /**
   * Eth Price，The price(eth) of the NFT
   */
  eth_price?: number;
  /**
   * Expired Time，The listing expire time of the NFT
   */
  expired_time?: number;
  /**
   * Listing Time，The listing time of the NFT
   */
  listing_time?: number;
  /**
   * Market Link，The listing market link the NFT
   */
  market_link?: string;
  /**
   * Market Name，The listing market name the NFT
   */
  market_name?: string;
  /**
   * Order Id，ID for aggregate
   */
  order_id?: string;
  /**
   * Seller Address，The seller address of the NFT
   */
  seller_address?: string;
  /**
   * Token Id，The token ID for this NFT. Each item in an NFT collection will be assigned a
   * unique id, the value generally ranges from 0 to N, with N being the total number of
   * NFTs in a collection.
   */
  token_id?: string;
  /**
   * Usd Price，The usd price(usd) of the NFT
   */
  usd_price?: number;
}
```
