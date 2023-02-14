- ***FilteredNFTsResponse***
```ts
export interface FilteredNFTsResponse {
  /**
   * Nfts，List of NFTs in the collection
   */
  nfts: NFT[];
  /**
   * Total，Total number of items
   */
  total: number;
}
```

- ***NFT***
```ts
export interface NFT {
  /**
   * Animation Url，The url of animation associated with the NFT
   */
  animation_url?: string;
  /**
   * Blockchain，Name of the blockchain the NFT belongs to
   */
  blockchain: string;
  /**
   * Collection Name，Name of the collection the NFT belongs to
   */
  collection_name?: string;
  /**
   * Collection Opensea Slug，Opensea Slug of the collection the NFT belongs to
   */
  collection_opensea_slug?: string;
  /**
   * Collection Slug，NFTGo Slug of the collection the NFT belongs to
   */
  collection_slug?: string;
  /**
   * Contract Address，Contract address of the collection the NFT belongs to
   */
  contract_address: string;
  /**
   * Description，The description of the NFT
   */
  description?: string;
  /**
   * Image，The url or base64 data of image or video associated with the NFT
   */
  image?: string;
  /**
   * Last Sale，Last sale price of the NFT
   */
  last_sale?: Sale;
  listing_data?: ListingInfo;
  /**
   * Listing Price，Listing price of the NFT
   */
  listing_price?: Price;
  /**
   * Listing Time，Listing time of the NFT, formatted as timestamp in second.
   */
  listing_time?: number;
  /**
   * Marketplace，Listing marketplace of the NFT
   */
  marketplace?: string;
  /**
   * Marketplace Link，Marketplace link of the NFT
   */
  marketplace_link?: string;
  /**
   * Name，The name of the NFT
   */
  name?: string;
  /**
   * Owner Addresses，List of owner addresses currently holding the NFT.A list of one
   * address if it's an ERC721 NFT. A list of addresses if it's an ERC1155 NFT.
   */
  owner_addresses?: string[];
  /**
   * Rarity，NFT Rarity score. Calculation methods can be seen as below:
   * https://mirror.xyz/nftgoio.eth/kHWaMtNY6ZOvDzr7PR99D03--VNu6-ZOjYuf6E9-QH0
   */
  rarity?: Rarity;
  /**
   * Token Id，The token ID of the NFT
   */
  token_id: string;
  /**
   * Traits，The list of NFT traits. Traits consist of a series of types and values, referring
   * to the feature of an NFT. For example, if a project has avatar NFTs, the traits may
   * include headwear, facial traits, clothes, etc. Traits make each item in an NFT collection
   * unique and determine its rarity in a collection.
   */
  traits?: Trait[];
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
