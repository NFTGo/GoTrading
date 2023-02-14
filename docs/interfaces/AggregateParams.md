- ***AggregateParams***
```ts
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
```

