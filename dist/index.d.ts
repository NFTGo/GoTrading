interface Aggregator {
    /**
     * Return a list of listing info about a single NFT.
     * - details: {@link }
     * @param collectionContract The contract address of the collection
     * @param tokenId The token id of the nft
     * @returns Promise<{@link SingleNFTListingsResponse}>
     */
    getListingsOfSingleNFT(contract: string, tokenId: string): Promise<SingleNFTListingsResponse>;
    /**
     * Return a list of listing info about a Ethereum address.
     * - details: {@link}
     * @param collectionContract The contract address of the collection
     * @param address The address of an account
     * @returns Promise<{@link SingleAddressListingsResponse}>
     */
    getListingsOfSingleAddress(address: string): Promise<SingleAddressListingsResponse>;
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
    getFilteredNFTs(contract: string, params: FilteredNFTsParam): Promise<FilteredNFTsResponse>;
}
interface HTTPClient {
    get<R, Q = undefined>(url: string, query: Q | undefined, headers?: HeadersInit): Promise<R>;
    post<R, P = undefined>(url: string, data: P, headers?: HeadersInit): Promise<R>;
}
interface Config {
    apiKey: string;
    baseUrl: string;
}
/**
 * Last Sale，Last sale price of the NFT
 *
 * Sale
 */
interface Sale {
    /**
     * Price，Transaction price
     */
    price: Price;
    /**
     * Price Token，Trade price quoted in transaction token
     */
    price_token: number;
    /**
     * Price Usd，The transaction price converted to USD
     */
    price_usd: number;
    /**
     * Time，Transaction timestamp in seconds
     */
    time: number;
    /**
     * Token Contract Address，Contract address of the token the sale was transacted in
     */
    token_contract_address: string;
    /**
     * Token Symbol，Symbol of the token the sale was transacted in
     */
    token_symbol: string;
    /**
     * Tx Hash，Transaction Hash
     */
    tx_hash: string;
    /**
     * Tx Url，Transaction url
     */
    tx_url: string;
}
/**
 * Price，Transaction price
 *
 * Price，Price in cryptocurrency or US dollars
 *
 * Listing Price，Listing price of the NFT
 */
interface Price {
    /**
     * Crypto Unit，The crypto unit of measurement, e.g. ETH, USDC, DAI.
     */
    crypto_unit: string;
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
interface ListingInfo {
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
     * Token Id，The token ID for this NFT. Each item in an NFT collection     will be assigned a
     * unique id, the value generally ranges from 0 to     N,  with N being the total number of
     * NFTs in a collection.
     */
    token_id?: string;
    /**
     * Usd Price，The usd price(usd) of the NFT
     */
    usd_price?: number;
}
/**
 * _NFT_pro
 */
interface NFTPro {
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
     * Owner Addresses，List of owner addresses currently holding the NFT.         A list of one
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
/**
 * Rarity，NFT Rarity score. Calculation methods can be seen as below:
 * https://mirror.xyz/nftgoio.eth/kHWaMtNY6ZOvDzr7PR99D03--VNu6-ZOjYuf6E9-QH0
 *
 * Rarity，https://mirror.xyz/nftgoio.eth/kHWaMtNY6ZOvDzr7PR99D03--VNu6-ZOjYuf6E9-QH0
 */
interface Rarity {
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
interface Trait {
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
interface TXInfo {
    /**
     * Data，The price(eth) of the NFT
     */
    data: string;
    /**
     * From Address，The address of the from
     */
    from_address: string;
    /**
     * To Address，The address of the to
     */
    to_address: string;
    /**
     * Value，The price(eth) of the NFT
     */
    value: number;
}
type SortBy = 'listing_price_low_to_high' | 'listing_price_high_to_low' | 'last_price_low_to_high' | 'last_price_high_to_low' | 'rarity_low_to_high' | 'rarity_high_to_low' | 'sales_time';
interface FilteredNFTsParam {
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
interface FilteredNFTsResponse {
    /**
     * Nfts，List of NFTs in the collection
     */
    nfts: NFTPro[];
    /**
     * Total，Total number of items
     */
    total: number;
}
/**
 * NftListing，如果 Model 的数据存在有效期， 则它应该继承 LastUpdatedModel
 */
interface SingleNFTListingsResponse {
    /**
     * Last Updated，Last updated timestamp in seconds
     */
    last_updated: number;
    /**
     * Nft List
     */
    nft_list: ListingInfo[];
}
/**
 * NftListing，如果 Model 的数据存在有效期， 则它应该继承 LastUpdatedModel
 */
interface SingleAddressListingsResponse {
    /**
     * Last Updated，Last updated timestamp in seconds
     */
    last_updated: number;
    /**
     * Nft List
     */
    nft_list: ListingInfo[];
}
/**
 * Body_aggregate_eth_v1_nft_aggregate_aggregate_post
 */
interface AggregateParams {
    /**
     * Buyer Address，Address of buyer.
     */
    buyer_address: string;
    /**
     * Is Safe，Is it safe mode? true or false
     */
    is_safe?: boolean;
    /**
     * Order Ids，A list of orderIds.order id is from listing API.
     */
    order_ids: string[];
}
/**
 * AggregateResult
 */
interface AggregateResponse {
    /**
     * Gas Limit，The gas limit
     */
    gas_limit: number;
    /**
     * Saving Gas，The saving gas
     */
    saving_gas: number;
    tx_info: TXInfo;
    /**
     * Used Gas，The used gas
     */
    used_gas: number;
}

/**
 * user-land create aggregator client method
 * @param config init client config {@link Config}
 * @returns sdk-client {@link Aggregator}
 */
declare function initV1(config: Config): Aggregator;

export { AggregateParams, AggregateResponse, Aggregator, Config, FilteredNFTsParam, FilteredNFTsResponse, HTTPClient, ListingInfo, NFTPro, Price, Rarity, Sale, SingleAddressListingsResponse, SingleNFTListingsResponse, SortBy, TXInfo, Trait, initV1 };
