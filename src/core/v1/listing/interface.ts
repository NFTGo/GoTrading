import { NFTBaseInfo } from '../../interface';

export type Marketplace = 'OpenSea' | 'LooksRare' | 'X2Y2';

export interface ApprovePolicyOption {
  /**
   * If true, automatically approves all unapproved NFTs.
   */
  autoApprove?: boolean;

  /**
   * If true, skips unapproved NFTs and proceeds with the approved ones.
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

interface PostData {
  body: {
    order: {
      data: Record<string, any>;
      kink: string;
    };
    orderbook: string;
    source: string;
  };
  endpoint: string;
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
  orderIndex: number;
  status: 'complete' | 'incomplete';
  message?: string;
}

interface ListingAction {
  post: PostData;
  sign: SignData;
}

export interface ListingItem {
  status: 'complete' | 'incomplete';
  orderIndexes: number[];
  data?: ListingAction | Record<string, any>;
}

interface StepInfo {
  id: string;
  action: string;
  description: string;
  kind: 'transaction' | 'signature';
  items: ListingItem[];
}
export interface ListingStepsDetailInfo {
  steps: [StepInfo, StepInfo];
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
export interface BulkListingOptions {
  /**
   * If true, automatically approves all unapproved NFTs.
   */
  autoApprove: boolean;

  /**
   * If true, skips unapproved NFTs and proceeds with the approved ones.
   */
  skipUnapproved: boolean;

  /**
   * If true, the whole operation fails if there are unapproved NFTs.
   */
  failOnUnapproved: boolean;

  onFinish: (successNFTs: NFTBaseInfo[], failNFTs: NFTBaseInfo[]) => void;
  onSuccess: (successNFTs: NFTBaseInfo[], failNFTs: NFTBaseInfo[]) => void;
}
