# Buy by NFT listings
## ***complete example***
- For server-side:
```ts
// init sdk client
import Web3 from "web3";
import { BigNumber } from "ethers";
import { init, AggregateParams, AggregateResponse, SingleNFTListingsResponse } from "@nftgo/gotrading";

// server
const provider = new Web3.providers.HttpProvider(
  "https://rpc.tenderly.co/fork/823ef734-4730-4063-bb00-640c54940021"
); //Replace with your own provider
const web3Instance = new Web3(provider); // replace with your provider
web3Instance.eth.accounts.wallet.add({
   address: "your wallet address",
  privateKey: "your private key",
});
const configs = {
  apiKey: "api key", // Replace with your own API Key.
  web3Provider: "provider", // Replace with your provider,
  agent: new HttpsProxyAgent({
    host: "127.0.0.1",
    port: "7890",
  }),
};
// create tradeAggregator client
const {aggregator, utils} = init(configs);

// Get the listing info of BAYC No.1
const baycContract = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
const tokenId = "1";

const listingOrders = await aggregator.getListingsOfNFT(baycContract, tokenId);
let orderIds: string[] = [];
if (lisitngOrders.length > 0) {
  orderIds.push(listingOrders[0].orderId as string);
}

const buyerAddress = "0x1234567890123456789012345678901234567890";// Replace with buyer address.
// without safe mode
const params: AggregateParams = ({
  buyerAddress: buyerAddress,
  isSafe: false,
  orderIds: orderIds,
});

const aggregateResponse = await aggregator.getAggregateInfo(params);

utils?.sendTransaction({
  from: aggregateResponse.txInfo.fromAddress,
  to: aggregateResponse.txInfo.toAddress,
  data: aggregateResponse.txInfo.data,
  value: BigNumber.from(aggregateResponse.txInfo.value.toString()).toHexString()
}).on('transactionHash', (hash)=>{
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
- For client-side:

```ts
// init sdk client
import { BigNumber } from "ethers";
import { init, AggregateParams, AggregateResponse, SingleNFTListingsResponse } from '@nftgo/gotrading';

const provider = window.ethereum;
const configs = {
  apiKey: "api key", // Replace with your own API Key.
  web3Provider: "provider", // Replace with your provider,
};
// create tradeAggregator client
const {aggregator, utils} = init(configs);

// Get the listing info of BAYC No.1
const baycContract = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
const tokenId = 1;

const listingOrders = await aggregator.getListingsOfNFT(baycContract, tokenId);
let orderIds: string[] = [];
orderIds.push(listingOrders[0].orderId as string);

const buyerAddress = "0x1234567890123456789012345678901234567890";// Replace with buyer address.
// without safe mode
const params: AggregateParams = ({
  buyerAddress: buyerAddress,
  isSafe: false,
  orderIds: orderIds,
});

const aggregateResponse = await aggregator.getAggregateInfo(params);

utils?.sendTransaction({
  from: aggregateResponse.txInfo.fromAddress,
  to: aggregateResponse.txInfo.toAddress,
  data: aggregateResponse.txInfo.data,
  value: BigNumber.from(aggregateResponse.txInfo.value.toString()).toHexString()
}).on('transactionHash', (hash)=>{
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
> This is [Safe Mode Example](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/BuyByCollectionListings.md).

## ***interface***
- ***interface***
  - [***SingleNFTListingsResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/SingleNftListingResponse.md)
  - [***AggregateParams***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/TradeAggregatorParams.md)
  - [***AggregateResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/TradeAggregatorResponse.md)
