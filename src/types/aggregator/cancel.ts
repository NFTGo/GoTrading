import { Order } from '../order';
import { ExtraArgs } from './extra-args';

/**
 * cancel orders
 */
export interface CancelOrdersReq {
  callerAddress: string;
  extraArgs?: ExtraArgs;
  orders: Order[];
}
