# Buy by wallet listings
## ***complete example***
- For server-side:
```ts
// init sdk client
import Web3 from 'web3';
import { BigNumber } from "ethers";
import { CollectionListingsParam, AggregateParams, AggregateResponse, init } from "@nftgo/gotrading";

// server
const provider = new Web3.providers.HttpProvider(
  "https://rpc.tenderly.co/fork/823ef734-4730-4063-bb00-640c54940021"
); //Replace with your own provider
const configs = {
  apiKey: "api key", // Replace with your own API Key.
  web3Provider: "provider", // Replace with your provider,
  walletConfig: {
    address: "Your wallet address",
    privateKey: "Your private key"
  }, // Replace with your wallet info.
};
// create tradeAggregator client
const {aggregator, utils} = init(configs);

const walletAddress = "0x8ae57a027c63fca8070d1bf38622321de8004c67";

const { nfts: walletNFTList } = await aggregator.getListingsOfWallet(walletAddress);
let orderIds:string[] = [];
for (const nft of walletNFTList) {
    orderIds.push(nft.listingData?.listingOrders[0].orderId as string)
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
import { init, AggregateParams, AggregateResponse, SingleAddressListingsResponse } from '@nftgo/gotrading';
const configs = {
  apiKey: 'YOUR-API-KEY', // Replace with your own API Key.
};
// create tradeAggregator client
const {aggregator, utils} = init(configs);

const walletAddress = "0x8ae57a027c63fca8070d1bf38622321de8004c67";

const { nfts: walletNFTList } = await aggregator.getListingsOfWallet(walletAddress);
let orderIds:string[] = [];
for (const nft of walletNFTList) {
    orderIds.push(nft.listingData?.listingOrders[0].orderId as string)
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
>
> This is [Safe Mode Example](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/BuyByCollectionListings.md).

## ***interface***
  - [***SingleAddressListingsResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/SingleAddressListingsResponse.md)
  - [***AggregateParams***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/TradeAggregatorParams.md)
  - [***AggregateResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/TradeAggregatorResponse.md)
