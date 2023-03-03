- ***TradeAggregatorParams***
```ts
export interface TradeAggregatorParams {
  /**
   * Buyer Address，Address of buyer.
   */
  buyerAddress: string;
  /**
   * Is Safe，Is it safe mode? true or false
   */
  isSafe?: boolean;
  /**
   * Order Ids，A list of orderIds.order id is from listing API.
   */
  orderIds: string[];
}
```

