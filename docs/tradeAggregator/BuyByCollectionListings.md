# Buy by collection listings
##  ***complete example***
```ts
// init sdk client
import { BigNumber } from "ethers";
import { FilteredNFTsParam, AggregateParams, AggregateResponse, init } from "gotrading";

const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')

const configs = {
  api_key: 'YOUR-API-KEY', // Replace with your own API Key.
  web3_provider: provider, // Replace with your provider,
};
// create tradeAggregator client
const {aggregator, utils} = init(configs);

// Get the listing info of BAYC.
const baycContract = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'; // Replace with your test collection

params = FilteredNFTsParam({
  limit: 10,
  offset: 0
})
const collectionResponse = await aggregator.getListingsOfCollection(baycContract);

let orderIds:string[] = [];
for (const nft of collectionResponse.nfts) {
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
}).on('error', (error)=>{
  console.log('transaction fail: ', error);
});
```
>
> This is [Safe Mode Example](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/tradeAggregator/tradeWithSafeMode.md).

## ***interface***
  - [***FilteredNFTsParam***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/FilteredNFTsParam.md)
  - [***FilteredNFTsResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/FilteredNFTsResponse.md)
  - [***AggregateParams***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/TradeAggregatorParams.md)
  - [***AggregateResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/TradeAggregatorResponse.md)
