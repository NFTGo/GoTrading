import { SafeAny } from '../safe-any';

/**
 * Actions which trade aggregate response for frontend developer to process user interaction
 */
export type AggregatorAction<T = unknown> = T extends ActionKind
  ? {
      name: ActionName;
      description: string;
      kind: T;
      data: ActionDataMap[T];
    }
  : never;

export enum ActionKind {
  Transaction = 'transaction',
  Signature = 'signature',
  PassThrough = 'pass-through',
  Controller = 'controller',
}

export interface ActionDataMap {
  [ActionKind.Transaction]: TransactionActionInfo;
  [ActionKind.Signature]: SignatureActionInfo;
  [ActionKind.PassThrough]: PassThroughActionInfo;
  [ActionKind.Controller]: PassThroughActionInfo;
}

export type TransactionActionInfo = {
  orderIndexes?: number[];
  safeMode?: boolean;
  txAssociatedOrderIds: string[];
  usdGas?: string;
  gasLimit?: string;
  txData: TxData;
};

export type TxData = {
  from: string;
  to: string;
  data: string;
  value: string;
};

export interface SignData {
  domain: {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
  };
  signatureKind: 'eip191' | 'eip712';
  types: Record<string, SafeAny[]>;
  value: Record<string, SafeAny>;
  message?: string;
}

export type SignatureActionInfo = {
  orderIndexes: number[];
  sign: SignData;
  body: object;
};

/**
 * Pass through means pass payload to a NFTGo data api endpoint
 */
export type PassThroughActionInfo = {
  orderIndexes: number[];
  endpoint: string;
  method: 'POST' | 'GET';
  payload: SafeAny;
};

/**
 * All action can be divided into four action kinds {@link ActionKind}
 */
export enum ActionName {
  AcceptOffer = 'accept-offer',
  AcceptListing = 'accept-listing',
  NftApproval = 'nft-approval',
  CurrencyApproval = 'currency-approval',
  PassThrough = 'pass-through',
  Contoller = 'controller',
  PostOrderToMarketplace = 'post-order-to-marketplace',
  CurrencyWrapping = 'currency-wrapping',
  OrderSignature = 'order-signature',
  CancelOrders = 'cancel-orders',
  Failed = 'failed',
}
