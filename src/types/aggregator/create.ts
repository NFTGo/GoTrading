import { OrderKind, Orderbook } from '../order';

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
  extraArgs?: {
    blurAuth?: string;
  };
}

export interface CreateListingInput {
  token: string;
  /**
   * only applies to ERC1155
   */
  quantity?: number;
  weiPrice: string;
  /**
   * order protocol
   */
  orderKind: OrderKind;
  /**
   * marketplace orderbook
   */
  orderbook: Orderbook;
  /**
   * Only applies to seaport orders. If true, royalty amount and recipients will be set automatically.
   */
  automatedRoyalties?: boolean;
  /**
   * Only applies to seaport orders. Set a maximum amount of royalties to pay, rather than the full amount.
   * Only relevant when automatedRoyalties is true. 1 BPS = 0.01% Note: OpenSea does not support values below 50 bps.
   */
  royaltyBps?: number;
  /**
   * For self-build marketplaces, include the marketplaceFeeBps within the order to collect marketplace fee.
   * Note that 1 Bps stands for 0.01%. For example, using 100 means your marketplace fee address will receive
   * 1% of the order's total price.
   */
  marketplaceFeeBps?: number;
  /**
   * Unix timestamp (seconds)
   */
  listingTime: string;
  /**
   * Unix timestamp (seconds)
   */
  expirationTime: string;
  nonce?: string;
  salt?: string;
  /**
   * default to be ethereum
   */
  currency?: string;
}

/**
 * create offers
 */

//CreateOffersV1Request
export interface CreateOffersReq {
  maker: string;
  params: CreateOfferInput[];
  extraArgs?: {
    blurAuth?: string;
  };
}

export interface CreateOfferInput {
  /**
   * Bid on a particular token. Example: `0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63:123
   */
  token?: string;
  /**
   * Bid on a particular collection with collection-id. Example:
   * `0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63
   */
  collection?: string;
  /**
   * Bid on a particular attribute key. This is case sensitive. Example: `Composition`
   */
  attributeKey?: string;
  /**
   * Bid on a particular attribute value. This is case sensitive. Example: `Teddy (#33)`
   */
  attributeValue?: string;
  /**
   * Quantity of tokens user is buying. Only compatible with ERC1155 tokens. Example: `5`
   */
  quantity?: number;
  /**
   * Amount bidder is willing to offer in wei. Example: `1000000000000000000`
   */
  weiPrice: string;
  /**
   * Exchange protocol used to create order. Example: `seaport-v1.5`
   */
  orderKind: OrderKind;
  /**
   * Orderbook where order is placed. Example: `Reservoir`
   */
  orderbook: Orderbook;
  orderbookApiKey?: string;
  /**
   * If true, royalty amounts and recipients will be set automatically.
   */
  automatedRoyalties?: boolean;
  /**
   * Set a maximum amount of royalties to pay, rather than the full amount. Only relevant when
   * using automated royalties. 1 BPS = 0.01% Note: OpenSea does not support values below 50
   * bps.
   */
  royaltyBps?: number;
  /**
   * For self-build marketplaces, include the marketplaceFeeBps within the order to collect marketplace fee.
   * Note that 1 Bps stands for 0.01%. For example, using 100 means your marketplace fee address will receive
   * 1% of the order's total price.
   */
  marketplaceFeeBps?: number;
  /**
   * If true flagged tokens will be excluded
   */
  excludeFlaggedTokens?: boolean;
  /**
   * Unix timestamp (seconds) indicating when listing will be listed. Example: `1656080318`
   */
  listingTime?: string;
  /**
   * Unix timestamp (seconds) indicating when listing will expire. Example: `1656080318`
   */
  expirationTime?: string;
  /**
   * Optional. Set a custom nonce
   */
  nonce?: string;
  /**
   * Optional. Random string to make the order unique
   */
  salt?: string;
  /**
   * ERC20 token address that the offer is providing with. Default to be WETH
   */
  currency?: string;
}
