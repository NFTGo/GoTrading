import { NFTBaseInfo } from '../../interface';

export type Marketplace = 'OpenSea' | 'LooksRare' | 'X2Y2';

export interface ApprovePolicyOption {
  /**
   * If true, automatically approves all unapproved NFTs.
   * default: false
   */
  autoApprove?: boolean;

  /**
   * If true, skips unapproved NFTs and proceeds with the approved ones.
   * default: false
   */
  skipUnapproved?: boolean;
}

export interface PrepareListingParams {
  token: string;
  weiPrice: string;
  orderKind: string;
  orderbook: string;
  automatedRoyalties?: boolean;
  listingTime: string;
  expirationTime: string;
  currency: '0x0000000000000000000000000000000000000000';
  fees?: string[];
}
interface BulkSeaPortOrder {
  order: {
    kind: 'seaport-v1.4';
    data: {
      kind: 'single-token';
      offerer: string;
      zone: string;
      offer: {
        itemType: number;
        token: string;
        identifierOrCriteria: string;
        startAmount: string;
        endAmount: string;
      }[];
      consideration: {
        itemType: number;
        token: string;
        identifierOrCriteria: string;
        startAmount: string;
        endAmount: string;
        recipient: string;
      }[];
      orderType: number;
      startTime: number;
      endTime: number;
      zoneHash: string;
      salt: string;
      conduitKey: string;
      counter: string;
      signature: string;
    };
  };
  orderbook: string;
  bulkData: {
    kind: 'seaport-v1.4';
    data: {
      orderIndex: number;
      merkleProof: string[];
    };
  };
}

export interface BulkSeaPortPostData {
  body: {
    items: BulkSeaPortOrder[];
    source: string;
  };
  endpoint: '/order/v4';
  method: 'POST';
}

export interface PostData {
  body: {
    order: {
      data: Record<string, any>;
      kind: string;
    };
    orderbook: string;
    source: string;
  };
  endpoint: '/order/v3' | '/order/v4';
  method: 'POST';
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
  // If it is not seaportv1.4, the following fields will be included.
  orderIndex?: number;
  status?: 'complete' | 'incomplete';
  message?: string;
}

interface ListingAction {
  post: PostData | BulkSeaPortPostData;
  sign: SignData;
}

export interface ListingItem {
  status: 'complete' | 'incomplete';
  orderIndexes: number[];
  data?: ListingAction;
}

export interface SignedListingItem {
  signature: string;
  post: PostData | BulkSeaPortPostData;
  orderIndexes: number[];
}

export interface ErrorListingItem {
  reason: string;
  reasonStep?: string;
  orderIndexes: number[];
}

export interface ApprovalItem {
  status: 'complete' | 'incomplete';
  orderIndexes: number[];
  data?: {
    from: string;
    to: string;
    data: string;
  } | null;
}

interface StepInfo<T> {
  id: string;
  action: string;
  description: string;
  kind: 'transaction' | 'signature';
  items: T[];
}
export interface ListingStepsDetailInfo {
  steps: [StepInfo<ApprovalItem>, StepInfo<ListingItem>];
  errors: any[];
}
export interface NFTInfoForListing extends NFTBaseInfo {
  marketplace: Marketplace;
  ethPrice: number;
  // The meaning of the field is the time when the order was placed, usually either now or at some specific point in time. It is measured in milliseconds.
  listingTime: number;
  // the expiration time of the order, measured in milliseconds.
  expirationTime: number;
  // List of fees (formatted as `feeRecipient:feeBps`) to be bundled within the order. Example: `0xF296178d553C8Ec21A2fBD2c5dDa8CA9ac905A00:100`
  fees?: string[];
  royaltyBps?: number;
  // Only Opensea requires this field to be configured, which means that the royalty set by the exchange will be automatically used.
  automatedRoyalties?: boolean;
}

export interface BulkListingParams {
  nfts: NFTInfoForListing[];
  config?: BulkListingOptions;
}
/**
 * Interface for bulk listing options.
 */
export interface BulkListingOptions extends ApprovePolicyOption {
  // When used on the browser, you need to manually pass in the maker's address information, for example, obtained asynchronously through window.ethereum
  maker?: string;
  onFinish?: (successIndexes: number[], failedItems?: ErrorListingItem[]) => void;
  onError?: (err: Error) => void;
}
