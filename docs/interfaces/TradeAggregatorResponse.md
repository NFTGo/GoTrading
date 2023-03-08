- ***TradeAggregatorResponse***
```ts
export interface TradeAggregatorResponse {
  /**
   * Gas Limit, recommended gas limit as input for this transaction.
   */
  gasLimit: number;
  /**
   * Saving Gas, gas saved by using GoTrading aggregator.
   */
  savingGas: number;
  txInfo: TXInfo;
  /**
   * Used Gas，gas used on testnet for this transaction simulation.
   */
  usedGas: number;
}
```
- ***TXInfo***
```ts
export interface TXInfo {
  /**
   * Data，The data of the transaction.
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
