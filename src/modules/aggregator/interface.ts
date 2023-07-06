import {Order, OrderKind, Orderbook} from '../interface';

/**
 * ActionKind
 */
export enum ActionKind {
  PassThrough = 'pass-through',
  Signature = 'signature',
  Transaction = 'transaction',
}

/**
 * ActionName
 */
export enum ActionName {
  AcceptOffer = 'accept-offer',
  CurrencyApproval = 'currency-approval',
  CurrencyWrapping = 'currency-wrapping',
  NftApproval = 'nft-approval',
  OrderSignature = 'order-signature',
  PassThrough = 'pass-through',
}

/**
 * AggregateTransactionInfo
 *
 * AggregatePassThroughInfo
 *
 * AggregateSignatureInfo
 */
export interface ActionData {
  gasLimit?: string;
  txAssociatedOrderIds?: string[];
  txData?: TxData;
  usdGas?: string;
  endpoint?: string;
  method?: string;
  payload?:
    | any[]
    | boolean
    | number
    | number
    | Record<string, any>
    | null
    | string;
  body?: Record<string, any>;
  orderIndexes?: number[];
  sign?: SignData;
}

export interface SignData {
  domain: {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
  };
  signatureKind: 'eip191' | 'eip712';
  types: Record<string, any[]>;
  value: Record<string, any>;
  message?: string;
}

/**
 * AggregateAction
 */
export interface AggregateAction {
  data: ActionData;
  description: string;
  kind: ActionKind;
  name: ActionName;
}

/**
 * TxData
 */
export interface TxData {
  data: string;
  from: string;
  to: string;
  value?: string;
}

/**
 * cancel orders
 */
export interface CancelOrdersReq {
  callerAddress: string;
  extraArgs?: ExtraArgs;
  orders: Order[];
}

export interface ExtraArgs {
  sign?: string;
  signMessage?: string;
}

/**
 * create listings
 */
/**
 * CreateListingV1RequestParam
 */
export interface CreateListingsReq {
  /**
   * order maker address
   */
  maker: string;
  params: CreateListingInput[];
  blurAuth?: string;
  /**
   * app domain
   */
  source?: string;
}

export interface CreateListingInput {
  /**
   * only applies to seaport orders
   */
  automatedRoyalties?: boolean;
  /**
   * default to be ethereum
   */
  currency?: string;
  /**
   * Unix timestamp (seconds)
   */
  expirationTime: string;
  /**
   * only applies to seaport orders
   */
  fees?: string[];
  /**
   * Unix timestamp (seconds)
   */
  listingTime: string;
  nonce?: string;
  options: Options;
  /**
   * marketplace orderbook
   */
  orderbook: Orderbook;
  /**
   * order protocol
   */
  orderKind: OrderKind;
  /**
   * only applies to ERC1155
   */
  quantity?: string;
  /**
   * only applies to seaport orders
   */
  royaltyBps?: number;
  salt?: string;
  token: string;
  weiPrice: string;
}

export interface Options {
  'seaport-v1.5'?: SeaportV14;
}

export interface SeaportV14 {
  replaceOrderId?: string;
  useOffChainCancellation: boolean;
}

/**
 * fulfill listings
 */
/**
 * AggregateAcceptListingRequest
 */
export interface FulfillListingsReq {
  authToken?: string;
  buyer: string;
  noDirect: boolean;
  orderIds: string[];
  safeMode: boolean;
}

/**
 * create offers
 */

//CreateOffersV1Request

export interface CreateOffersReq {
  blurAuth?: string;
  maker: string;
  params: CreateOfferInput[];
  source?: string;
}

export interface CreateOfferInput {
  /**
   * Bid on a particular attribute key. This is case sensitive. Example: `Composition`
   */
  attributeKey?: string;
  /**
   * Bid on a particular attribute value. This is case sensitive. Example: `Teddy (#33)`
   */
  attributeValue?: string;
  /**
   * If true, royalty amounts and recipients will be set automatically.
   */
  automatedRoyalties?: boolean;
  /**
   * Bid on a particular collection with collection-id. Example:
   * `0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63
   */
  collection?: string;
  currency?: string;
  /**
   * If true flagged tokens will be excluded
   */
  excludeFlaggedTokens?: boolean;
  /**
   * Unix timestamp (seconds) indicating when listing will expire. Example: `1656080318`
   */
  expirationTime?: string;
  /**
   * List of fees (formatted as `feeRecipient:feeBps`) to be bundled within the order. 1 BPS =
   * 0.01% Example: `0xF296178d553C8Ec21A2fBD2c5dDa8CA9ac905A00:100`
   */
  fees?: string[];
  /**
   * Unix timestamp (seconds) indicating when listing will be listed. Example: `1656080318`
   */
  listingTime?: string;
  /**
   * Optional. Set a custom nonce
   */
  nonce?: string;
  options?: { [key: string]: any };
  /**
   * Orderbook where order is placed. Example: `Reservoir`
   */
  orderbook: Orderbook;
  orderbookApiKey?: string;
  /**
   * Exchange protocol used to create order. Example: `seaport-v1.5`
   */
  orderKind: OrderKind;
  /**
   * Quantity of tokens user is buying. Only compatible with ERC1155 tokens. Example: `5`
   */
  quantity?: string;
  /**
   * Set a maximum amount of royalties to pay, rather than the full amount. Only relevant when
   * using automated royalties. 1 BPS = 0.01% Note: OpenSea does not support values below 50
   * bps.
   */
  royaltyBps?: number;
  /**
   * Optional. Random string to make the order unique
   */
  salt?: string;
  /**
   * Bid on a particular token. Example: `0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63:123
   */
  token?: string;
  /**
   * Bid on a particular token set. Cannot be used with cross-posting to OpenSea. Example:
   * `token:CONTRACT:TOKEN_ID
   */
  tokenSetId?: string;
  /**
   * Amount bidder is willing to offer in wei. Example: `1000000000000000000`
   */
  weiPrice: string;
}

/**
 * fulfill offers
 */
export interface FulfillOffersReq {
  extraArgs?: ExtraArgs;
  offerFulfillmentIntentions: OfferFulfillmentIntention[];
  sellerAddress: string;
}

/**
 * post order (listings & offers)
 */
export interface PostOrderReq {
  attribute?: Attribute;
  bulkData?: {
    kind: OrderKind;
    data: {
      orderIndex: number;
      merkleProof: string[];
    };
  };
  collection?: string;
  extraArgs: {
    version: string;
  };
  isNonFlagged?: boolean;
  order: {
    data: any;
    kind: OrderKind;
  };
  orderbook: Orderbook;
  orderbookApiKey?: string;
  signature: string;
  source?: string;
  tokenSetId?: string;
}

export interface Attribute {
  collection: string;
  key: string;
  value: string;
}

export interface ExtraArgs {
  blurAuthToken?: string;
}

export interface OfferFulfillmentIntention {
  contractAddress: string;
  orderId: string;
  quantity: number;
  tokenId: string;
}

export interface AggregatorApiStatusResponse<T> {
  code: 'SUCCESS' | 'SYSTEM_ERROR';
  msg: string;
  data: T;
}
export interface AggregatorApiResponse {
  actions: AggregateAction[];
}

export interface AggregatorResponse<T> {
  actions: AggregateAction[];
  executeActions: () => Promise<T>;
}

export interface PostOrderResponse {
  message: string;
}

export interface AggregatorInterface {
  /**
   *
   * - details: {@link }
   * @param params {@link }
   * @returns Promise<{@link }>
   */
  createOffers(params: CreateOffersReq): Promise<AggregatorResponse<any>>;

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  fulfillOffers(params: FulfillOffersReq): Promise<AggregatorResponse<any>>;

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  cancelOrders(params: CancelOrdersReq): Promise<AggregatorResponse<any>>;

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  createListings(params: CreateListingsReq): Promise<AggregatorResponse<any>>;

  /**
   * buy nfts
   * - details: {@link }
   * @param params {@link FulfillListingsReq}
   * @returns Promise<{@link }>
   */
  fulfillListings(params: FulfillListingsReq): Promise<AggregatorResponse<any>>;

  /**
   *
   * - details: {@link }
   * @param params {@link }
   * @returns Promise<{@link }>
   */
  postOrders(params: PostOrderReq): Promise<PostOrderResponse>;
}
