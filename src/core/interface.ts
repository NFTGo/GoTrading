// # user-land interface , core  should implement this
export enum EVMChain {
  ETH = 'eth',
}
export interface Aggregator {
  /**
   * Return a list of listing info about a single NFT.
   * - details: {@link }
   * @param collectionContract The contract address of the collection
   * @param tokenId The token id of the nft
   * @returns Promise<{@link SingleNFTListingsResponse}>
   */
  getListingOfNFT(contract: string, tokenId: string): Promise<SingleNFTListingsResponse>;

  /**
   * Return a list of listing info about a Ethereum address.
   * - details: {@link}
   * @param collectionContract The contract address of the collection
   * @param address The address of an account
   * @returns Promise<{@link SingleAddressListingsResponse}>
   */
  getListingsOfWallet(address: string): Promise<SingleAddressListingsResponse>;

  /**
   * Return a list of listing info about a single NFT.
   * - details: {@link }
   * @param params The post data{@link AggregateParams}
   * @returns Promise<{@link AggregateResponse}>
   */
  getAggregateInfo(params: AggregateParams): Promise<AggregateResponse>;

  /**
   * Return filtered items of an NFT collection. You can select traits, sorting and listing to filter a subset of items.
   * - details: {@link https://docs.nftgo.io/reference/get_filtered_nfts_eth_v1_collection__contract_address__filtered_nfts_get}
   * @param collectionContract The contract address of the collection
   * @param params The query params {@link FilteredNFTsParam}
   * @returns Promise<{@link FilteredNFTsResponse}>
   */
  getListingsOfCollection(contract: string, params: FilteredNFTsParam): Promise<FilteredNFTsResponse>;
}

export interface GoTrading {
  aggregator: Aggregator;
}

export interface HTTPClient {
  get<R, Q = undefined>(url: string, query: Q | undefined, headers?: HeadersInit): Promise<R>;
  post<R, P = undefined>(url: string, data: P, headers?: HeadersInit): Promise<R>;
}

export interface Config {
  apiKey: string;
  chain?: EVMChain;
  baseUrl: string;
}

// # all below is POJO for response

/**
 * Last Sale，Last sale price of the NFT
 *
 * Sale
 */
export interface Sale {
  /**
   * Price，Transaction price
   */
  price: Price;
  /**
   * Price Token，Trade price quoted in transaction token
   */
  priceToken: number;
  /**
   * Price Usd，The transaction price converted to USD
   */
  priceUsd: number;
  /**
   * Time，Transaction timestamp in seconds
   */
  time: number;
  /**
   * Token Contract Address，Contract address of the token the sale was transacted in
   */
  tokenContractAddress: string;
  /**
   * Token Symbol，Symbol of the token the sale was transacted in
   */
  tokenSymbol: string;
  /**
   * Tx Hash，Transaction Hash
   */
  txHash: string;
  /**
   * Tx Url，Transaction url
   */
  txUrl: string;
}

/**
 * Price，Transaction price
 *
 * Price，Price in cryptocurrency or US dollars
 *
 * Listing Price，Listing price of the NFT
 */
export interface Price {
  /**
   * Crypto Unit，The crypto unit of measurement, e.g. ETH, USDC, DAI.
   */
  cryptoUnit: string;
  /**
   * Quantity，(Deprecated) This field is deprecated and will be removed in the future. Use
   * {value} instead. Total value in the measure of {crypto_unit}
   */
  quantity: number;
  /**
   * Usd，Total US dollar value of the cryptocurrency. It equals to quantity * crypto_unit *
   * usd_price_per_crypto_unit
   */
  usd?: number;
  /**
   * Value，Total value in the measure of {crypto_unit}
   */
  value: number;
}

/**
 * Listinginfo
 */
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

/**
 * NFT
 */
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

/**
 * Rarity，NFT Rarity score. Calculation methods can be seen as below:
 * https://mirror.xyz/nftgoio.eth/kHWaMtNY6ZOvDzr7PR99D03--VNu6-ZOjYuf6E9-QH0
 *
 * Rarity，https://mirror.xyz/nftgoio.eth/kHWaMtNY6ZOvDzr7PR99D03--VNu6-ZOjYuf6E9-QH0
 */
export interface Rarity {
  /**
   * Rank，The rarity rank
   */
  rank: number;
  /**
   * Score，Rarity score. See methodology:
   * https://mirror.xyz/nftgoio.eth/kHWaMtNY6ZOvDzr7PR99D03--VNu6-ZOjYuf6E9-QH0
   */
  score: number;
  /**
   * Total，Total number of NFTs belonging to the colleciton involved in calculation of rarity
   */
  total: number;
}

/**
 * Trait，Trait of an NFT
 */
export interface Trait {
  /**
   * Percentage，The rarity percentage of trait
   */
  percentage?: number;
  /**
   * Type，The type of trait
   */
  type?: string;
  /**
   * Value，The value of trait
   */
  value?: string;
}

/**
 * TXInfo
 */
export interface TXInfo {
  /**
   * Data，The price(eth) of the NFT
   */
  data: string;
  /**
   * From Address，The address of the from
   */
  fromAddress: string;
  /**
   * To Address，The address of the to
   */
  toAddress: string;
  /**
   * Value，The price(eth) of the NFT
   */
  value: number;
}

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
  sortBy?: SortBy;
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
  keyWord?: string;
  /**
   * Queries can be bounded by a Min price and Max Price.
   */
  minPrice?: number;
  /**
   * Queries can be bounded by a Min price and Max Price.
   */
  maxPrice?: number;
}

/**
 * NFTList
 */
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

/**
 * NftListing
 */
export interface SingleNFTListingsResponse {
  /**
   * Last Updated，Last updated timestamp in seconds
   */
  lastUpdated: number;
  /**
   * Nft List
   */
  nftList: ListingInfo[];
}

/**
 * NftListing
 */
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

/**
 * Body_aggregate_eth_v1_nft_aggregate_aggregate_post
 */
export interface AggregateParams {
  /**
   * Buyer Address，Address of buyer.
   */
  buyerAddress: string;
  /**
   * Is Safe，Is it safe mode? true or false
   */
  isSafe?: boolean;
  /**
   * Order Ids，A list of orderIds.order id is from listing API.
   */
  orderIds: string[];
}

/**
 * AggregateResult
 */
export interface AggregateResponse {
  /**
   * Gas Limit，The gas limit
   */
  gasLimit: number;
  /**
   * Saving Gas，The saving gas
   */
  savingGas: number;
  txInfo: TXInfo;
  /**
   * Used Gas，The used gas
   */
  usedGas: number;
}
