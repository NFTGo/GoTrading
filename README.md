# GoTrading-js


## Introduction

<!-- Introduction -->

The GoTrading-js helps you build your own marketplace or other apps with NFT trading needs. We’ve included orders from over 10 major marketplaces, so you can get access to full amount of listings, find the lowest price and complete your purchase directly through GoTrading SDK. Our functionality is based on Reservior and has many improvements over the original functions.


## Quickstart
### 1. Install the SDK.

> With `npm` :
```shell
npm install gotrading-js
```

> With `yarn` :
```shell
yarn add gotrading-js
```

### 2. Import and init the SDK.

```ts
import { init } from 'gotrading-js';

const configs = {
  apiKey: 'YOUR-API-KEY', // Replace with your own API Key.
};

// create a goTrading sdk client
const goTradingSDK = init(configs);
```
> ***Get your own NFTGo DEVELOPERS API Key***
>
> To get your own API key, please contact with us on [NFTGo developer platform](https://developer.nftgo.io/)  and get your API key from our customer managers.
## Usage Example

***Do trading***

You can use the aggregator to do trading, and the request will return the data you use to generate the transaction with metamask.
```ts
const orderIds = "orderIds";

const result = goTradingSDK.aggregator.getListingsOfCollection(baycContract);
console.log(result);
```

> ***How to get orderIds?***
>
> GoTrading SDk approval three methods to get orderIds from listing info;


***Get the listing info of a single nft.***

```ts
// Get the listing info of BAYC No.1
const baycContract = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
const tokenId = 1;

const listingInfo = goTradingSDK.aggregator.getListingOfNFT(baycContract, tokenId)
console.log(listingInfo.order_id)
```

***Get the listing info of a Wallet address.***
```ts
// rollbot wallet address.
const walletAddress = "0x8ae57a027c63fca8070d1bf38622321de8004c67";
const listingInfo = goTradingSDK.aggregator.getListingsOfWallet(walletAddress);

for (const listing_data in listingInfo) {
    console.log(listing_data.order_id)
}
```

***Get listing info of the Collection.***
```ts
import { init } from 'GoTrading-js';

const goTradingSDK = init({
  apiKey: 'YOUR-API-KEY', // Replace with your own API Key.
});

// Bored Ape Yacht Club contract address.
const baycContract = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

const result = goTradingSDK.aggregator.getListingsOfCollection(baycContract);

for (const nft in result.nfts) {
    console.log(nft.listing_data.order_id)
}
```


## interface example
***AggregateResponse***
```ts
export interface AggregateResponse {
  /**
   * Gas Limit，The gas limit
   */
  gas_limit: number;
  /**
   * Saving Gas，The saving gas
   */
  saving_gas: number;
  tx_info: TXInfo;
  /**
   * Used Gas，The used gas
   */
  used_gas: number;
}
```
***TxInfo***
```ts
export interface TXInfo {
  /**
   * Data，The price(eth) of the NFT
   */
  data: string;
  /**
   * From Address，The address of the from
   */
  from_address: string;
  /**
   * To Address，The address of the to
   */
  to_address: string;
  /**
   * Value，The price(eth) of the NFT
   */
  value: number;
}
```

## Questions & Feedback
???


If you have any questions, issues, or feedback, please file an issue on GitHub, or drop us a message on our Discord channel for the SDK?
