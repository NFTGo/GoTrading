import { Order } from '../order';

/**
 * cancel orders
 */
export interface CancelOrdersReq {
  callerAddress: string;
  extraArgs?: {
    blurAuth?: string;
    sign?: string;
    signMessage?: string;
  };
  orders: (Order & { orderHash?: string })[];
}
