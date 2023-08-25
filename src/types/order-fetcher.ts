import { Order, OrderKind, OrderType } from './order';

export interface OrderFetcherApiResponse<T> {
  code: string;
  data: T;
  msg: string;
  statusCode: number;
}

/**
 * TokenPrice
 */
export interface TokenPrice {
  amount: TokenAmount;
  currency: TokenCurrency;
}

/**
 * TokenAmount
 */
export interface TokenAmount {
  decimal: number;
  platform: number | null;
  raw: string;
  usd: number | null;
}

/**
 * TokenCurrency
 */
export interface TokenCurrency {
  chain: string;
  contractAddress: string;
  decimals: number;
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
  contractAddress: string;
  expiration: number;
  isPrivate: boolean;
  maker: string;
  marketId: MarketId;
  orderCreateTime?: number;
  orderExpirationTime?: number;
  orderGeneratedTime: number;
  orderId: string;
  price: TokenPrice;
  quantityFilled: number;
  quantityRemaining: number;
  status: OrderStatus;
  taker: string;
  tokenId: string;
  totalQuantity: number;
}

/**
 * OfferDTO
 */
export interface OfferDTO {
  contractAddress: string;
  criteria: string;
  isPrivate: boolean;
  kind: OrderKind;
  maker: string;
  marketId: string;
  orderCreateTime: number;
  orderExpirationTime: number;
  orderId: string;
  price: TokenPrice;
  quantityRemaining: number;
  rawData?: string;
  status: OrderStatus;
  taker: string;
  tokenId?: string;
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
   * Return listings and offers of a contract
   * - details: {@link }
   * @param params {@link GetOrdersByContractReq}
   * @returns Promise<{@link OrdersFetcherResp}>
   */
  getOrdersByContract(params: GetOrdersByContractReq): Promise<OrdersFetcherResp>;

  /**
   * Return listings and offers of a NFT
   * - details: {@link }
   * @param params {@link GetOrdersByNftsReq}
   * @returns Promise<{@link OrdersFetcherResp}>
   */
  getOrdersByNFT(params: GetOrdersByNftsReq): Promise<OrdersFetcherResp>;

  /**
   * Return listings and offers of an order
   * - details: {@link }
   * @param params {@link GetOrdersByIdsReq}
   * @returns Promise<{@link OrdersFetcherResp}>
   */
  getOrdersByIds(params: GetOrdersByIdsReq): Promise<OrdersFetcherResp>;

  /**
   * Return listings and offers of a maker
   * - details: {@link }
   * @param params {@link GetOrdersByMakerReq}
   * @returns Promise<{@link OrdersFetcherResp}>
   */
  getOrdersByMaker(params: GetOrdersByMakerReq): Promise<OrdersFetcherResp>;
}
