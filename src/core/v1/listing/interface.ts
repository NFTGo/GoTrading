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
  // contract:tokenId
  token: string;
  weiPrice: string;
  orderKind: string;
  orderbook: string;
  automatedRoyalties: boolean;
  listingTime: string;
  expirationTime: string;
  currency: '0x0000000000000000000000000000000000000000';
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
  post: PostData;
  sign: SignData;
}

export interface ListingItem {
  status: 'complete' | 'incomplete';
  orderIndexes: number[];
  data?: ListingAction;
}

export interface SignedListingItem {
  signature: string;
  post: PostData;
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
  };
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
  listingTime: number;
  expirationTime: number;
  isCreatorFeesEnforced?: boolean;
}

export interface BulkListingParams {
  nfts: NFTInfoForListing[];
  config?: BulkListingOptions;
}
/**
 * Interface for bulk listing options.
 */
export interface BulkListingOptions extends ApprovePolicyOption {
  onFinish?: (successIndexes: number[], failedItems?: ErrorListingItem[]) => void;
  onError?: (err: Error) => void;
}
