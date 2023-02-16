# Buy by collection listings
- ***complete example***
```ts
// init sdk client
import { BigNumber } from "ethers";
import { AggregateParams, AggregateResponse, init } from "gotrading-js";

const configs = {
  api_key: 'YOUR-API-KEY', // Replace with your own API Key.
  web3_provider: 'your provider', //window.ethereum or any other provider,
};
// create a goTrading sdk client
const {aggregator, utils} = init(configs);

// Get the listing info of BAYC
const baycContract = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';

const collectionResponse = await aggregator.getListingsOfCollection(baycContract);
let orderIds:string[] = [];
for (let nft of collectionResponse.nfts) {
  orderIds.push(nft.listing_data?.order_id as string);
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
  value: BigNumber.from(aggregateResponse.tx_info.value).toHexString()
}).on('transaction_hash', (hash) {
  console.log(hash);
}).on('receipt', (receipt) {
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

// with safe mode
const params: AggregateParams = {
  buyer_address: 'buyerAddress', // Replace with buyer address.
  is_safe: true,
  order_ids: orderIds,
};

const aggregateResponse = await aggregator.getAggregateInfo(params);

utils
  ?.sendSafeModeTransaction({
    from: aggregateResponse.tx_info.from_address,
    to: aggregateResponse.tx_info.to_address,
    data: aggregateResponse.tx_info.data,
    value: BigNumber.from(aggregateResponse.tx_info.value),
    chainId: 1,
    gasLimit: BigNumber.from(aggregateResponse.gas_limit),
  })
  .on('transaction_hash', (hash) {
    console.log(hash);
  })
  .on('receipt', (receipt) {
    if (receipt.logs.length) {
      for (const log of receipt.logs) {
        // not every log with useful info
        const decodedLog = utils.decodeLog(log);
      }
    } else {
      console.log('transaction fail for some unknown reason');
    }
  })
  .on('error', (error) {
    console.log('transaction fail: ', error);
  });
```

- ***interface***
  - [***FilteredNFTsResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/FilteredNFTsResponse.md)
  - [***AggregateParams***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/TradeAggregatorParams.md)
  - [***AggregateResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/TradeAggregatorResponse.md)
