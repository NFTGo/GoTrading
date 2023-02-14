- ***TradeAggregatorResponse***
```ts
export interface TradeAggregatorResponse {
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
```
- ***TXInfo***
```ts
export interface TXInfo {
  /**
   * Data，The price(eth) of the NFT
   */
  data: string;
  /**
   * From Address，The address of the from
   */
  from_address: string;
  /**
   * To Address，The address of the to
   */
  to_address: string;
  /**
   * Value，The price(eth) of the NFT
   */
  value: number;
}
```
