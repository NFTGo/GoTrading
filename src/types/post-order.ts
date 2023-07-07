import {OrderKind, Orderbook, OrderType} from './order';
import { SafeAny } from './safe-any';

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
    data: SafeAny;
    kind: OrderKind;
  };
  orderType: OrderType;
  slug?: string;
  orderbook: Orderbook;
  orderbookApiKey?: string;
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
