- ***ListingNFTParams***
```ts

export interface NFTBaseInfo {
  contract?: string;
  tokenId?: string;
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

export interface ErrorListingItem {
  // Here the reason for the error will be returned, usually due to signing or errors passed through by the exchange request.
  reason: string;
  // Refers to which stage in the entire order placing process the error occurred.
  reasonStep?: string;
  orderIndexes: number[];
}

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

export interface BulkListingOptions extends ApprovePolicyOption {
  onFinish?: (successIndexes: number[], failedItems?: ErrorListingItem[]) => void;
  onError?: (err: Error) => void;
}

```


- ***ListingStepNFTParams***
```ts

// prepare listing response
export interface ListingStepsDetailInfo {
  steps: [StepInfo<ApprovalItem>, StepInfo<ListingItem>];
  errors: any[];
}

interface StepInfo<T> {
  id: string;
  action: string;
  description: string;
  kind: 'transaction' | 'signature';
  items: T[];
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


interface ListingAction {
  post: PostData | BulkSeaPortPostData;
  sign: SignData;
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

```

