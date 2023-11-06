import { CancelOrdersReq } from './cancel';
import { CreateOffersReq, CreateListingsReq } from './create';
import { FulfillOffersReq, FulfillListingsReq } from './fulfill';
import { AggregatorResponse } from './response';

export interface AggregatorInterface {
  /**
   * Get the actions you need to execute to create offers
   * - details: {@link https://docs.nftgo.io/reference/post_trade-v1-nft-create-offers}
   * @param params {@link CreateOffersReq}
   * @returns Promise<{@link AggregatorResponse}>
   */
  createOffers(params: CreateOffersReq): Promise<AggregatorResponse>;

  /**
   * Get the actions you need to execute to fulfill offers
   * - details: {@link https://docs.nftgo.io/reference/post_trade-v1-nft-fulfill-offers}
   * @param params {@link FulfillOffersReq}
   * @returns Promise<{@link AggregatorResponse}>
   */
  fulfillOffers(params: FulfillOffersReq): Promise<AggregatorResponse>;

  /**
   * Get the actions you need to execute to cancel orders
   * - details: {@link https://docs.nftgo.io/reference/post_trade-v1-nft-cancel-orders}
   * @param params {@link CancelOrdersReq}
   * @returns Promise<{@link AggregatorResponse}>
   */
  cancelOrders(params: CancelOrdersReq): Promise<AggregatorResponse>;

  /**
   * Get the actions you need to execute to create listings
   * - details: {@link https://docs.nftgo.io/reference/post_trade-v1-nft-create-listings}
   * @param params {@link CreateListingsReq}
   * @returns Promise<{@link AggregatorResponse}>
   */
  createListings(params: CreateListingsReq): Promise<AggregatorResponse>;

  /**
   * Get the actions you need to execute to fulfill listings
   * - details: {@link https://docs.nftgo.io/reference/post_trade-v1-nft-fulfill-listings}
   * @param params {@link FulfillListingsReq}
   * @returns Promise<{@link AggregatorResponse}>
   */
  fulfillListings(params: FulfillListingsReq): Promise<AggregatorResponse>;
}
