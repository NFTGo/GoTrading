import { CancelOrdersReq } from './cancel';
import { CreateOffersReq, CreateListingsReq } from './create';
import { FulfillOffersReq, FulfillListingsReq } from './fulfill';
import { AggregatorResponse } from './response';

export interface AggregatorInterface {
  /**
   *
   * - details: {@link }
   * @param params {@link }
   * @returns Promise<{@link }>
   */
  createOffers(params: CreateOffersReq): Promise<AggregatorResponse>;

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  fulfillOffers(params: FulfillOffersReq): Promise<AggregatorResponse>;

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  cancelOrders(params: CancelOrdersReq): Promise<AggregatorResponse>;

  /**
   *
   * - details: {@link }
   * @param params {@link any}
   * @returns Promise<{@link any}>
   */
  createListings(params: CreateListingsReq): Promise<AggregatorResponse>;

  /**
   * buy nfts
   * - details: {@link }
   * @param params {@link FulfillListingsReq}
   * @returns Promise<{@link }>
   */
  fulfillListings(params: FulfillListingsReq): Promise<AggregatorResponse>;
}
