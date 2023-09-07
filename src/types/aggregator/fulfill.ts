import { ExtraArgs } from './extra-args';

/**
 * AggregateAcceptListingRequest
 */
export interface FulfillListingsReq {
  buyer: string;
  noDirect?: boolean;
  orderIds: string[];
  safeMode: boolean;
  extraArgs?: {
    blurAuth?: string;
  }
}

/**
 * fulfill offers
 */
export interface FulfillOffersReq {
  offerFulfillmentIntentions: OfferFulfillmentIntention[];
  sellerAddress: string;
  extraArgs?: {
    blurAuth?: string;
  }
}

export interface OfferFulfillmentIntention {
  contractAddress: string;
  orderId: string;
  quantity: number;
  tokenId: string;
}
