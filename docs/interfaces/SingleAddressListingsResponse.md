- ***SingleAddressListingsResponse***
```ts
export interface SingleAddressListingsResponse {
  /**
   * Last Updated，Last updated timestamp in seconds
   */
  lastUpdated: number;
  /**
   * Nft List
   */
  nfts: NFT[];
}
```
- ***NFT***
```ts
export interface NFT {
  /**
   * Animation Url，The url of animation associated with the NFT
   */
  animationUrl?: string;
  /**
   * Blockchain，Name of the blockchain the NFT belongs to
   */
  blockchain: string;
  /**
   * Collection Name，Name of the collection the NFT belongs to
   */
  collectionName?: string;
  /**
   * Collection Opensea Slug，Opensea Slug of the collection the NFT belongs to
   */
  collectionOpenseaSlug?: string;
  /**
   * Collection Slug，NFTGo Slug of the collection the NFT belongs to
   */
  collectionSlug?: string;
  /**
   * Contract Address，Contract address of the collection the NFT belongs to
   */
  contractAddress: string;
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
  lastSale?: Sale;
  listingData?: ListingInfo;
  /**
   * Listing Price，Listing price of the NFT
   */
  listingPrice?: Price;
  /**
   * Listing Time，Listing time of the NFT, formatted as timestamp in second.
   */
  listingTime?: number;
  /**
   * Marketplace，Listing marketplace of the NFT
   */
  marketplace?: string;
  /**
   * Marketplace Link，Marketplace link of the NFT
   */
  marketplaceLink?: string;
  /**
   * Name，The name of the NFT
   */
  name?: string;
  /**
   * Owner Addresses，List of owner addresses currently holding the NFT.A list of one
   * address if it's an ERC721 NFT. A list of addresses if it's an ERC1155 NFT.
   */
  ownerAddresses?: string[];
  /**
   * Rarity，NFT Rarity score. Calculation methods can be seen as below:
   * https://mirror.xyz/nftgoio.eth/kHWaMtNY6ZOvDzr7PR99D03--VNu6-ZOjYuf6E9-QH0
   */
  rarity?: Rarity;
  /**
   * Token Id，The token ID of the NFT
   */
  tokenId: string;
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
