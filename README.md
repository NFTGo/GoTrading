# GoTrading-js


## Introduction

<!-- Introduction -->

GoTrading is an open-source development kit that enables you to build your own NFT trading aggregator and marketplace. The SDK provides a comprehensive set of tools and APIs that greatly simplify the development process of a general trading aggregator like Gem.xyz or blur.io, and allow developers to access real-time order feed and NFT transaction data. We implement our aggregated orderbook based on Reservoir Protocol, and provide hight-level functions to help you to build your unified interface for retrieving listing data, bulk buying&listing NFTs, and selling NFTs instantly(accept bids) across all mainstream marketplaces, such as Opensea, Looksrare, Blur, x2y2, Sudoswap, etc.


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
  web3_provider: provider, // Replace with your provider.
};

// create tradeAggregator client
const {aggregator, utils} = init(configs);
```
> ***Get your own NFTGo DEVELOPERS API Key***
>
> To get your own API key, please contact with us on [NFTGo developer platform](https://developer.nftgo.io/)  and get your API key from our customer managers.
###  3. BulkBuy NFTs
```ts
// buy some NFTs
let nfts: NFTInfoForTrade[] = [
  {
  contract: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  tokenId: 608,
  limit: 1
},
  {
  contract: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
  tokenId: 4666,
  limit: 1
},
]

let config = {
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
