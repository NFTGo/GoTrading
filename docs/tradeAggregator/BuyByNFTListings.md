# Buy by NFT listings
## ***complete example***
```ts
// init sdk client
import { BigNumber } from "ethers";
import { init, AggregateParams, AggregateResponse, SingleNFTListingsResponse } from '@nftgo/gotrading';

const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')

const configs = {
  api_key: 'YOUR-API-KEY', // Replace with your own API Key.
  web3_provider: provider, // Replace with your provider,
};

// create tradeAggregator client
const {aggregator, utils} = init(configs);

// Get the listing info of BAYC No.1
const baycContract = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
const tokenId = 1;

const listingInfo: SingleNFTListingsResponse = aggregator.getListingOfNFT(baycContract, tokenId)
let orderIds: string[] = [];
orderIds.push(listingInfo.nft_list[0].order_id as string);

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
- ***interface***
  - [***SingleNFTListingsResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/SingleNftListingResponse.md)
  - [***AggregateParams***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/TradeAggregatorParams.md)
  - [***AggregateResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/TradeAggregatorResponse.md)
