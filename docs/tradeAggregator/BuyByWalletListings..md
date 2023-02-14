# Buy by wallet listings
- ***complete example***
```ts
// init sdk client
import { init, AggregateParams, AggregateResponse, SingleAddressListingsResponse } from 'gotrading-js';
const configs = {
  apiKey: 'YOUR-API-KEY', // Replace with your own API Key.
};
// create a goTrading sdk client
const goTradingSDK = init(configs);

const walletAddress = "0x8ae57a027c63fca8070d1bf38622321de8004c67";
const listingInfo:SingleAddressListingsResponse  = goTradingSDK.tradeAggregator.getListingsOfWallet(walletAddress);
const orderIds = [];
for (const nft in result.nfts) {
  orderIds.push(nft.listingData.order_id)
}
params = AggregateParams({
    buyer_address="buyerAddress", // Replace with buyer address.
    is_safe="False",
    order_ids=orderIds
})

const result: AggregateResponse = goTradingSDK.tradeAggregator.getAggregateInfo(params);
console.log(result);
// you can use this result info to request METAMASK.
```

- ***interface***
  - [***SingleAddressListingsResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/SingleAddressListingsResponse.md)
  - [***AggregateParams***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/TradeAggregatorParams.md)
  - [***AggregateResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/TradeAggregatorResponse.md)
