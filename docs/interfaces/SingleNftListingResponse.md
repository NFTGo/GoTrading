- ***SingleNFTListingsResponse***
```ts
export interface SingleNFTListingsResponse {
  /**
   * Last Updated，Last updated timestamp in seconds
   */
  lastUpdated: number;
  /**
   * Nft List
   */
  listingOrders: ListingOrder[];
}
```

- ***ListingOrder***
```ts
export interface ListingOrder {
  /**
   * Contract，Address of the contract for this NFT collection, beginning with 0x
   */
  contract?: string;
  /**
   * Eth Price，The price(eth) of the NFT
   */
  ethPrice?: number;
  /**
   * Expired Time，The listing expire time of the NFT
   */
  expiredTime?: number;
  /**
   * Listing Time，The listing time of the NFT
   */
  listingTime?: number;
  /**
   * Market Link，The listing market link the NFT
   */
  marketLink?: string;
  /**
   * Market Name，The listing market name the NFT
   */
  marketName?: string;
  /**
   * Order Id，ID for aggregate
   */
  orderId?: string;
  /**
   * Seller Address，The seller address of the NFT
   */
  sellerAddress?: string;
  /**
   * Token Id，The token ID for this NFT. Each item in an NFT collection will be assigned a
   * unique id, the value generally ranges from 0 to N, with N being the total number of
   * NFTs in a collection.
   */
  tokenId?: string;
  /**
   * Usd Price，The usd price(usd) of the NFT
   */
  usdPrice?: number;
}
```
