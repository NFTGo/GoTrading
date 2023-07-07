import {JSON} from '../json';

/**
 * actions witch trade aggregate response for frontend developer to process user interaction
 */
export type TradeAggregatorAction<T = unknown> =
  T extends TradeAggregatorActionKind
    ? {
        name: TradeAggregatorActionName;
        description: string;
        kind: T;
        data: TradeAggregatorActionDataMap[T];
      }
    : never;

export enum TradeAggregatorActionKind {
  Transaction = 'transaction',
  Signature = 'signature',
  PassThrough = 'pass-through',
}

export interface TradeAggregatorActionDataMap {
  [TradeAggregatorActionKind.Transaction]: TransactionActionInfo;
  [TradeAggregatorActionKind.Signature]: SignatureActionInfo;
  [TradeAggregatorActionKind.PassThrough]: PassThroughActionInfo;
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

export enum TradeAggregatorActionName {
  AcceptOffer = 'accept-offer',
  NftApproval = 'nft-approval',
  CurrencyApproval = 'currency-approval',
  PassThrough = 'pass-through',
  CurrencyWrapping = 'currency-wrapping',
}
