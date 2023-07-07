import { ExtraArgs } from './extra-args';

/**
 * AggregateAcceptListingRequest
 */
export interface FulfillListingsReq {
  authToken?: string;
  buyer: string;
  noDirect?: boolean;
  orderIds: string[];
  safeMode: boolean;
}

/**
 * fulfill offers
 */
export interface FulfillOffersReq {
  extraArgs?: ExtraArgs;
  offerFulfillmentIntentions: OfferFulfillmentIntention[];
  sellerAddress: string;
}

export interface OfferFulfillmentIntention {
  contractAddress: string;
  orderId: string;
  quantity: number;
  tokenId: string;
}
