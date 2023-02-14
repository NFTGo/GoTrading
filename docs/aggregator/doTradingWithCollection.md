# Do Trading with collection
- ***complete example***
```ts
// init sdk client
import { init, AggregateParams, AggregateResponse, FilteredNFTsResponse } from 'gotrading-js';
const configs = {
  apiKey: 'YOUR-API-KEY', // Replace with your own API Key.
};
// create a goTrading sdk client
const goTradingSDK = init(configs);

// Get the listing info of BAYC
const baycContract = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

const result: FilteredNFTsResponse = goTradingSDK.aggregator.getListingsOfCollection(baycContract)
const orderIds = [];
for (const nft in result.nfts) {
  orderIds.push(nft.listingData.order_id)
}
params = AggregateParams({
    buyer_address="buterAddress",
    is_safe="False",
    order_ids=orderIds
})

const result: AggregateResponse = goTradingSDK.aggregator.getAggregateInfo(params);
console.log(result);
// you can use this result info to request METAMASK.
```

- ***interface***
  - [***FilteredNFTsResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/FilteredNFTsResponse.md)
  - [***AggregateParams***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/AggregateParams.md)
  - [***AggregateResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/AggregateResponse.md)
