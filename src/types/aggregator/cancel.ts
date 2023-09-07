import { Order } from '../order';

/**
 * cancel orders
 */
export interface CancelOrdersReq {
  callerAddress: string;
  extraArgs?: {
    blurAuth: string;
  };
  orders: Order[];
}
