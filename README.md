# GoTrading-js
[![node](https://img.shields.io/badge/node-%3E%3D%2016.14-brightgreen.svg)](https://nodejs.org/en/) [![Discord][discord-image]][discord-url] [![Twitter][twitter-image]][twitter-url]



## Introduction

<!-- Introduction -->

GoTrading is an open-source development kit that enables you to build your own NFT trading aggregator and marketplace. The SDK provides a comprehensive set of tools and APIs that greatly simplify the development process of a general trading aggregator like Gem.xyz or blur.io, and allow developers to access real-time order feed and NFT transaction data. We implement our aggregated orderbook based on [Reservoir Protocol](https://reservoir.tools/), and provide hight-level functions to help you to build your unified interface for retrieving listing data, bulk buying & listing NFTs, and selling NFTs instantly(accept bids) across all mainstream marketplaces, such as Opensea, Looksrare, Blur, x2y2, Sudoswap, etc.

## Key Features
 - Simple and easy-to-use API
 - Real-time market data access
 - Code is easy to customize and extend
## Process
![image info](./process.jpg)

## Requirements

- Node.js >= 16.14
- web3
- ethers

You can do this by running the following commands:
```bash
npm install web3 ethers
```

## Quickstart
### 1. Install the SDK.

> With `npm` :
```bash
npm install @nftgo/gotrading
```

> With `yarn` :
```bash
yarn add @nftgo/gotrading
```

### 2. Import and init the SDK.

```ts
import { init } from '@nftgo/gotrading';
import Web3 from 'web3';

const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')
const configs = {
  api_key: 'YOUR-API-KEY', // Replace with your own API Key.
  web3_provider: provider, // Replace with your provider.
};

// create tradeAggregator client
const {aggregator, utils} = init(configs);
```
> ***Get your own NFTGo DEVELOPERS API Key***
>

> If you need to obtain an API key or a custom plan, please contact our support team. You can reach us by submitting a [form](https://forms.monday.com/forms/7fd30cd3cef08cf3b3dbccd1c72892b5), and we will respond to you within 1-2 business days.
>
> Please note that we may need to understand your use case and requirements in order to provide you with the API key and custom plan that best suits your needs. Thank you for your interest in our service, and we look forward to working with you.
###  3. BulkBuy NFTs
```ts
import { NFTInfoForTrade } from '@nftgo/gotrading';

// buy some NFTs
const nfts: NFTInfoForTrade[] = [
  {
  contract: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  tokenId: 608,
  amount: 1
},
  {
  contract: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
  tokenId: 4666,
  amount: 1
},
]

const config = {
      ignoreUnListedNFTs: false, // Do you want to ignore unlisted NFTs?
      ignoreInvalidOrders: false, // Do you want to ignore invalid orders?
      ignoreSuspiciousOrders: false, // Do you want to ignore suspicious NFTs?
      withSafeMode: false, // Use Safe Mode or Without Safe Mode.
    }

aggregator.bulkBuy(
  nfts,
  {},
  configs
  )

```

## GoTrading Complete Process
### Step1 Get Listing Info
  - ***1.1 Get the listing info of a single nft.***

```ts
// Get the listing info of BAYC No.1
const baycContract = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
const tokenId = 1;

const listingInfo = aggregator.getListingOfNFT(baycContract, tokenId)
console.log(listingInfo.order_id)
```

  - ***1.2 Get listing info of the Collection.***
```ts
// Bored Ape Yacht Club contract address.
const baycContract = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

const result = aggregator.getListingsOfCollection(baycContract);

for (const nft in result.nfts) {
    console.log(nft.listingData.order_id)
}
```

  - ***1.3 Get the listing info of a Wallet address.***
```ts
// rollbot wallet address.
const walletAddress = "0x8ae57a027c63fca8070d1bf38622321de8004c67";
const listingInfo = aggregator.getListingsOfWallet(walletAddress);

for (const listingData in listingInfo) {
    console.log(listingData.order_id)
}
```
### Step2 Select target NFT
```ts
// get all listing NFT order ids of a wallet address.
const orderIds = [];
for (const nft of result.nfts) {
  orderIds.push(nft.listing_data?.nft_list[0].order_id as string);
}
```

### Step3 Get transaction data
>
> You can use the aggregator to do trading, and the request will return the data you use to generate the transaction with metamask.
```ts
const orderIds = "orderIds"; // Replace with Step2 OrderIds.

const params: AggregateParams = ({
  buyer_address: 'buyerAddress', // Replace with buyer address.
  is_safe: false,
  order_ids: orderIds,
});

const aggregateResponse = await aggregator.getAggregateInfo(params);

console.log(result);
```

### Step4 Invoke Contract to purchase
```ts
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

## Complete example
  - [***BuyByCollectionListings***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/tradeAggregator/BuyByCollectionListings.md)

  - [***BuyByNFTListings***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/tradeAggregator/BuyByNFTListings.md)

  - [***BuyByWalletListings.***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/tradeAggregator/BuyByWalletListings..md)


## Interface example
  - [***SingleAddressListingsResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/SingleAddressListingsResponse.md)
  - [***SingleNFTListingsResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/SingleNftListingResponse.md)
  - [***FilteredNFTsParam***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/FilteredNFTsParam.md)
  - [***FilteredNFTsResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/FilteredNFTsResponse.md)
  - [***AggregateParams***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/TradeAggregatorParams.md)
  - [***AggregateResponse***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/TradeAggregatorResponse.md)


## Questions & Feedback

> If you have any questions, issues, or feedback, please file an issue on GitHub, or drop us a message on our [Discord][discord-url] channel for the SDK.

##  License

This project is licensed under the [BSD-3-Clause license](LICENSE).




[discord-image]: https://img.shields.io/discord/1040195071401787413?color=brightgreen&label=Discord&logo=discord&logoColor=blue
[discord-url]:  https://discord.gg/xQEmETVwcw
[twitter-image]: https://img.shields.io/twitter/follow/NFTGo?label=NFTGo&style=social
[twitter-url]:  https://twitter.com/NFTGoDevs
