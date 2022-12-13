import { TXInfo } from '@/src/common/types/trading';

/**
 * Body_aggregate_eth_v1_nft_aggregate_aggregate_post
 */
export interface AggregateParams {
  /**
   * Buyer Address，Address of buyer.
   */
  buyer_address: string;
  /**
   * Is Safe，Is it safe mode? true or false
   */
  is_safe?: boolean;
  /**
   * Order Ids，A list of orderIds.order id is from listing API.
   */
  order_ids: string[];
}

/**
 * AggregateResult
 */
export interface AggregateResponse {
  /**
   * Gas Limit，The gas limit
   */
  gas_limit: number;
  /**
   * Saving Gas，The saving gas
   */
  saving_gas: number;
  tx_info: TXInfo;
  /**
   * Used Gas，The used gas
   */
  used_gas: number;
}
