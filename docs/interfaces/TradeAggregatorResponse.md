- ***TradeAggregatorResponse***
```ts
export interface TradeAggregatorResponse {
  /**
   * Gas Limit，The gas limit
   */
  gasLimit: number;
  /**
   * Saving Gas，The saving gas
   */
  savingGas: number;
  txInfo: TXInfo;
  /**
   * Used Gas，The used gas
   */
  usedGas: number;
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
  fromAddress: string;
  /**
   * To Address，The address of the to
   */
  toAddress: string;
  /**
   * Value，The price(eth) of the NFT
   */
  value: number;
}
```
