import { Order, OrderKind, OrderType } from './order';

/**
 * Response template for all order fetcher api
 */
export interface OrderFetcherApiResponse<T> {
  /**
   * Response code
   */
  code: string;
  /**
   * Response data. Specified by every api
   */
  data: T;
  /**
   * Response message
   */
  msg: string;
  /**
   * Http status code
   */
  statusCode: number;
}

/**
 * TokenPrice
 */
export interface TokenPrice {
  /**
   * Detail of token amount
   */
  amount: TokenAmount;
  /**
   * Detail of token currency
   */
  currency: TokenCurrency;
}

/**
 * TokenAmount
 */
export interface TokenAmount {
  /**
   * Token amount in decimal
   */
  decimal: number;
  /**
   * Token amount in platform token
   */
  platform: number | null;
  /**
   * Token amount in the smallest denomination
   */
  raw: string;
  /**
   * Amount in USD
   */
  usd: number | null;
}

/**
 * TokenCurrency
 */
export interface TokenCurrency {
  /**
   * Chain of the currency
   */
  chain: string;
  /**
   * Contract address of the currency
   */
  contractAddress: string;
  /**
   * The smallest denomination for the currency
   */
  decimals: number;
  /**
   * Token symbol
   */
  symbol: string;
}

/**
 * OrderStatus
 */
export enum OrderStatus {
  Active = 'active',
  Cancelled = 'cancelled',
  Expired = 'expired',
  Filled = 'filled',
  Inactive = 'inactive',
}

export enum MarketId {
  Alienswap = 'alienswap',
  Artblocks = 'artblocks',
  Blur = 'blur',
  Ensvision = 'ensvision',
  Looksrare = 'looksrare',
  Magically = 'magically',
  Opensea = 'opensea',
  Ordinalsmarket = 'ordinalsmarket',
  Reservoir = 'reservoir',
  Sound = 'sound',
  Sudoswap = 'sudoswap',
  X2Y2 = 'x2y2',
}

/**
 * ListingOrderDTO
 */
export interface ListingOrderDTO {
  /**
   * Listing associated NFT contract address
   */
  contractAddress: string;
  /**
   * Time that order will expire
   */
  expiration: number;
  /**
   * False means order can be fulfilled by anyone
   */
  isPrivate: boolean;
  /**
   * Listing's maker address
   */
  maker: string;
  /**
   * The marketplace uniqueId that order belongs to
   * {@link MarketId}
   */
  marketId: MarketId;
  /**
   * Time that order is crreated
   */
  orderCreateTime?: number;
  /**
   * Time that order will expire
   */
  orderExpirationTime?: number;
  orderGeneratedTime: number;
  /**
   * Unique order id. Shared between marketplaces
   */
  orderId: string;
  /**
   * Unique order hash. Provided and used by NFTGo
   */
  orderHash: string;
  /**
   * Order price
   * {@link TokenPrice}
   */
  price: TokenPrice;
  quantityFilled: number;
  /**
   * Number of tokens remaining for this listing
   */
  quantityRemaining: number;
  /**
   * Order's status
   * {@link OrderStatus}
   */
  status: OrderStatus;
  /**
   * Listing's taker address, generally points to zero address implies any address can fulfill the listing
   */
  taker: string;
  /**
   * Listing associated NFT token ID
   */
  tokenId: string;
  /**
   * Number of tokens when listing was created
   */
  totalQuantity: number;
}

/**
 * OfferDTO
 */
export interface OfferDTO {
  /**
   * Offer associated NFT contract address
   */
  contractAddress: string;
  /**
   * Describes the offer kind, this can be token, contract or trait offer.
   */
  criteria: string;
  /**
   * False means order can be fulfilled by anyone
   */
  isPrivate: boolean;
  /**
   * Offer's marketplace protocol
   * {@link OrderKind}
   */
  kind: OrderKind;
  /**
   * Offer's maker address
   */
  maker: string;
  /**
   * The marketplace uniqueId that order belongs to
   * {@link MarketId}
   */
  marketId: string;
  /**
   * Time that order is crreated
   */
  orderCreateTime?: number;
  /**
   * Time that order will expire
   */
  orderExpirationTime: number;
  /**
   * Unique order id. Shared between marketplaces
   */
  orderId: string;
  /**
   * Unique order hash. Provided and used by NFTGo
   */
  orderHash: string;
  /**
   * Offer price
   * {@link TokenPrice}
   */
  price: TokenPrice;
  /**
   * Number of tokens remaining for this offer
   */
  quantityRemaining: number;
  rawData?: string;
  /**
   * Offer's status
   * {@link OrderStatus}
   */
  status: OrderStatus;
  /**
   * Offer's taker address, generally points to zero address implies any address can fulfill the offer
   */
  taker: string;
  /**
   * Offer associated NFT token ID
   */
  tokenId?: string;
  /**
   * Number of tokens when offer was created
   */
  totalQuantity: number;
}

export interface GetOrdersByContractReq {
  contractAddress: string;
  includePrivate?: boolean;
  limit?: number;
  offset?: number;
  orderType: OrderType;
}

export interface GetOrdersByIdsReq {
  orders: Order[];
}
export interface GetOrdersByMakerReq {
  includePrivate?: boolean;
  maker: string;
  orderType: OrderType;
}
export interface GetOrdersByNftsReq {
  contractAddress: string;
  includePrivate?: boolean;
  limit?: number;
  offset?: number;
  orderType: OrderType;
  tokenId: string;
}

export interface OrdersFetcherResp {
  listingDTOs: ListingOrderDTO[];
  offerDTOs: OfferDTO[];
}

export interface OrderFetcherInterface {
  /**
   * Return listings and offers of a collection by contract
   * - details: {@link https://docs.nftgo.io/reference/post_orderbook-v1-orders-get-orders-by-contract}
   * @param params {@link GetOrdersByContractReq}
   * @returns Promise<{@link OrdersFetcherResp}>
   */
  getOrdersByContract(params: GetOrdersByContractReq): Promise<OrdersFetcherResp>;

  /**
   * Return listings and offers of a NFT
   * - details: {@link https://docs.nftgo.io/reference/post_orderbook-v1-orders-get-orders-by-nft}
   * @param params {@link GetOrdersByNftsReq}
   * @returns Promise<{@link OrdersFetcherResp}>
   */
  getOrdersByNFT(params: GetOrdersByNftsReq): Promise<OrdersFetcherResp>;

  /**
   * Return listings and offers by order ids
   * - details: {@link https://docs.nftgo.io/reference/post_orderbook-v1-orders-get-orders-by-ids}
   * @param params {@link GetOrdersByIdsReq}
   * @returns Promise<{@link OrdersFetcherResp}>
   */
  getOrdersByIds(params: GetOrdersByIdsReq): Promise<OrdersFetcherResp>;

  /**
   * Return listings and offers of a wallet address
   * - details: {@link https://docs.nftgo.io/reference/post_orderbook-v1-orders-get-orders-by-maker}
   * @param params {@link GetOrdersByMakerReq}
   * @returns Promise<{@link OrdersFetcherResp}>
   */
  getOrdersByMaker(params: GetOrdersByMakerReq): Promise<OrdersFetcherResp>;
}
