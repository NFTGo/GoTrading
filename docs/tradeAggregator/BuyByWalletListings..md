# Buy by wallet listings
- ***complete example***
```ts
// init sdk client
import { BigNumber } from "ethers";
import { init, AggregateParams, AggregateResponse, SingleAddressListingsResponse } from '@nftgo/gotrading';
const configs = {
  apiKey: 'YOUR-API-KEY', // Replace with your own API Key.
};
// create tradeAggregator client
const {aggregator, utils} = init(configs);

const walletAddress = "0x8ae57a027c63fca8070d1bf38622321de8004c67";
const listingInfo:SingleAddressListingsResponse  = aggregator.getListingsOfWallet(walletAddress);

const orderIds = [];
for (const nft of result.nfts) {
  orderIds.push(nft.listing_data?.nft_list[0].order_id as string);
}

// without safe mode
const params: AggregateParams = ({
  buyer_address: 'buyerAddress', // Replace with buyer address.
  is_safe: false,
  order_ids: orderIds,
});

const aggregateResponse = await aggregator.getAggregateInfo(params);

utils?.sendTransaction({
  from: aggregateResponse.tx_info.from_address,
  to: aggregateResponse.tx_info.to_address,
  data: aggregateResponse.tx_info.data,
  value: BigNumber.from(aggregateResponse.tx_info.value.toString()).toHexString()
}).on('transaction_hash', (hash)=>{
  console.log(hash);
}).on('receipt', (receipt)=>{
  if (receipt.logs.length) {
    for (const log of receipt.logs) {
      // not every log with useful info
      const decodedLog = utils.decodeLog(log);
    }
  }else {
    console.log('transaction fail for some unknown reason')
  }
}).on('error', (error) {
  console.log('transaction fail: ', error);
});
```
>
> This is [Safe Mode Example](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/BuyByCollectionListings.md).

## ***interface***
  - [***SingleAddressListingsResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/SingleAddressListingsResponse.md)
  - [***AggregateParams***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/TradeAggregatorParams.md)
  - [***AggregateResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/TradeAggregatorResponse.md)
