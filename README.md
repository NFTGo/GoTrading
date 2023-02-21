# GoTrading-js


## Introduction

<!-- Introduction -->

The GoTrading-js helps you build your own marketplace or other apps with NFT trading needs. We’ve included orders from over 10 major marketplaces, so you can get access to full amount of listings, find the lowest price and complete your purchase directly through GoTrading SDK. Our functionality is based on Reservior and has many improvements over the original functions.


## Process
![image info](./process.jpg)
## Quickstart
### 1. Install the SDK.

> With `npm` :
```shell
npm install gotrading
```

> With `yarn` :
```shell
yarn add gotrading
```

### 2. Import and init the SDK.

```ts
import { init } from 'gotrading';

const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')
const configs = {
  api_key: 'YOUR-API-KEY', // Replace with your own API Key.
  web3_provider: provider, // Replace with your provider,
};

// create tradeAggregator client
const {aggregator, utils} = init(configs);
```
> ***Get your own NFTGo DEVELOPERS API Key***
>
> To get your own API key, please contact with us on [NFTGo developer platform](https://developer.nftgo.io/)  and get your API key from our customer managers.
## GoTrading aggregator API

- ***Do trading***

You can use the aggregator to do trading, and the request will return the data you use to generate the transaction with metamask.
```ts
const orderIds = "orderIds";

const result = aggregator.getListingsOfCollection(baycContract);
console.log(result);
```

> ***How to get orderIds?***
>
> GoTrading SDk suppoort the following three methods to get orderIds from listing info;


  - ***Get the listing info of a single nft.***

```ts
// Get the listing info of BAYC No.1
const baycContract = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
const tokenId = 1;

const listingInfo = aggregator.getListingOfNFT(baycContract, tokenId)
console.log(listingInfo.order_id)
```

  - ***Get the listing info of a Wallet address.***
```ts
// rollbot wallet address.
const walletAddress = "0x8ae57a027c63fca8070d1bf38622321de8004c67";
const listingInfo = aggregator.getListingsOfWallet(walletAddress);

for (const listingData in listingInfo) {
    console.log(listingData.order_id)
}
```

  - ***Get listing info of the Collection.***
```ts
// Bored Ape Yacht Club contract address.
const baycContract = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

const result = aggregator.getListingsOfCollection(baycContract);

for (const nft in result.nfts) {
    console.log(nft.listingData.order_id)
}
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

> If you have any questions, issues, or feedback, please file an issue on GitHub, or drop us a message on our [Discord](https://discord.gg/wtbFBuhh) channel for the SDK.
