import { OrderKind, Orderbook } from './order';

/**
 * post order (listings & offers)
 */
export interface PostOrderReq {
  attribute?: Attribute;
  bulkData?: {
    kind: OrderKind;
    data: {
      orderIndex: number;
      merkleProof: string[];
    };
  };
  collection?: string;
  extraArgs: {
    version: string;
  };
  isNonFlagged?: boolean;
  order: {
    data: any;
    kind: OrderKind;
  };
  orderbook: Orderbook;
  orderbookApiKey?: string;
  signature: string;
  source?: string;
  tokenSetId?: string;
}

export interface Attribute {
  collection: string;
  key: string;
  value: string;
}

export interface PostOrderResponse {
  message: string;
}
