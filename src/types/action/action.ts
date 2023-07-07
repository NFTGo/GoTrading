import {JSON} from '../json';

/**
 * actions witch trade aggregate response for frontend developer to process user interaction
 */
export type TradeAggregatorAction<T = unknown> = T extends ActionKind
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
}

export interface ActionDataMap {
  [ActionKind.Transaction]: TransactionActionInfo;
  [ActionKind.Signature]: SignatureActionInfo;
  [ActionKind.PassThrough]: PassThroughActionInfo;
}

export type TransactionActionInfo = {
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

export type SignatureActionInfo = {
  orderIndexes: number[];
  sign: object;
  body: object;
};

export type PassThroughActionInfo = {
  endpoint: string;
  method: string;
  payload: JSON;
};

export enum ActionName {
  AcceptOffer = 'accept-offer',
  CurrencyApproval = 'currency-approval',
  CurrencyWrapping = 'currency-wrapping',
  NftApproval = 'nft-approval',
  OrderSignature = 'order-signature',
  PassThrough = 'pass-through',
}
