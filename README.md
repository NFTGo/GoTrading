# GoTrading-js
[![node](https://img.shields.io/badge/node-%3E%3D%2016.14-brightgreen.svg)](https://nodejs.org/en/) [![Discord][discord-image]][discord-url] [![Twitter][twitter-image]][twitter-url]

# Table of Contents
- [GoTrading-js](#gotrading-js)
- [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Key Features](#key-features)
  - [Supported Marketplaces](#supported-marketplaces)
  - [Supported Chains](#supported-chains)
  - [Requirements](#requirements)
  - [Quickstart](#quickstart)
    - [1. Install the SDK.](#1-install-the-sdk)
    - [2. Import and init the GoTrading SDK.](#2-import-and-init-the-gotrading-sdk)
    - [3. Fulfill Listings](#3-fulfill-listings)
  - [SDK Core Methods](#sdk-core-methods)
    - [Aggregator](#aggregator)
      - [Create Listings](#create-listings)
      - [Create Offers](#create-offers)
      - [Fulfill Listings](#fulfill-listings)
      - [Fulfill Offers](#fulfill-offers)
      - [Cancel Orders](#cancel-orders)
    - [OrderFetcher](#orderfetcher)
      - [Get Orders By Contract](#get-orders-by-contract)
      - [Get Orders By NFT](#get-orders-by-nft)
      - [Get Orders By Ids](#get-orders-by-ids)
      - [Get Orders By Maker](#get-orders-by-maker)
    - [Utils](#utils)
  - [Questions \& Feedback](#questions--feedback)
  - [License](#license)

## Introduction

<!-- Introduction -->

GoTrading is an open-source development kit that enables you to build your own NFT trading aggregator and marketplace. The SDK provides a comprehensive set of tools and APIs that greatly simplify the development process of a general trading aggregator like Gem.xyz or Blur.io, and allows developers to access real-time order feed and NFT transaction data. With the SDK, you can easily aggregate orders and functionality from mainstream marketplaces such as Opensea, Looksrare, Blur, x2y2, Sudoswap, etc, all in your products and communities.

## Key Features
 - Simple and easy-to-use API
 - Real-time market data access
 - Code is easy to customize and extend
 - Supports Bulk Listing and Bulk Buying

## Supported Marketplaces
GoTrading currently aggregates the following marketplaces, and we will continue to add more marketplaces in the future.

| **Marketplace** | **Create Listings** | **Fulfill Listings** | **Create Offers** | **Fulfill Offers** | **Cancel Listings/Offers** | **Protocol**         |
|-----------------|---------------------|----------------------|-------------------|--------------------|----------------------------|----------------------|
| OpenSea         | Yes                 | Yes                  | Yes               | Yes                | Yes                        | seaport-v1.5         |
| Blur            | Yes                 | Yes                  | Yes               | Yes                | Yes                        | blur                 |
| LooksRare       | Yes                 | Yes                  | Yes               | Yes                | Yes                        | looksrare-v2         |
| X2Y2            | Yes                 | Yes                  | Yes               | Yes                | Yes                        | x2y2                 |
| Sudoswap        | No                  | Yes                  | No                | Yes                | Yes                        | sudoswap/sudoswap-v2 |
| CryptoPunks     | No                  | Yes                  | No                | Yes                | Yes                        | cryptopunks          |
| Artblocks       | No                  | Yes                  | No                | Yes                | Yes                        | seaport-v1.5         |
| Reservoir       | No                  | Yes                  | No                | Yes                | Yes                        | seaport-v1.5         |
| ENSVision       | No                  | Yes                  | No                | Yes                | Yes                        | seaport-v1.5         |
| Magically       | No                  | Yes                  | No                | Yes                | Yes                        | seaport-v1.5         |
| Alienswap       | No                  | Yes                  | No                | Yes                | Yes                        | seaport-v1.5         |
| Ordinals        | No                  | Yes                  | No                | Yes                | Yes                        | seaport-v1.5         |
| Sound           | No                  | Yes                  | No                | Yes                | Yes                        | seaport-v1.5         |



## Supported Chains
GoTrading currently supports the following chains:
- Ethereum Mainnet
- Sepolia Testnet ( Comming Soon )
- Polygon Mainnet ( Comming Soon )



## Requirements
- Node.js >= 16.14
- web3 >= 1.8.2
- ethers >= 5.6.9, < 6.1

You can do this by running the following commands:
```bash
npm install web3 ethers@5.6.9
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

### 2. Import and init the GoTrading SDK.
Instantiate the instance of GoTrading using your etheres provider with API key.
```ts
import { init, Config } from '@nftgo/gotrading';
import Web3 from 'web3';

// Create a new Web3 Provider to interact with the Ethereum network.
const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io') //Replace with your own provider

// Configure the necessary parameters for the Trade Aggregator API client.
const configs: Config = {
  apiKey: "YOUR-API-KEY", // Replace with your own API Key.
  web3Provider: provider,
  walletConfig: {
    address: "Your wallet address",
    privateKey: "Your private key"
  }, // Replace with your wallet info.
};

// Create a Trade Aggregator client instance and return the utility and aggregator objects of the Trade Aggregator API.
const {aggregator, utils, orderFetcher} = init(configs);
```
> If you need to obtain an API key or a custom plan, please contact our support team. You can reach us by submitting a [form](https://forms.monday.com/forms/7fd30cd3cef08cf3b3dbccd1c72892b5), and we will respond to you within 1-2 business days.
>
> Please note that we may need to understand your use case and requirements in order to provide you with the API key and custom plan that best suits your needs. Thank you for your interest in our service, and we look forward to working with you.
###  3. Fulfill Listings
```ts

import { init, Config, FulfillListingsReq } from '@nftgo/gotrading';

async function demo() {
  const config: Config = {};

  const { aggregator, utils } = init(config);

  const {listingDTOs} = await orderFetcher.getOrdersByContract({
    contractAddress: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', // bayc contract address
    orderType: OrderType.Listing
  })
  const req: FulfillListingsReq = {
    buyer: 'xxx', // your address
    orderIds: listingDTOs.map(listingDTO => listingDTO.orderId),
    safeMode: false,
  };

  // get actions, meanwhile we provide executeActions function to deal with actions
  const { actions, executeActions } = await aggregator.fulfillListings(req);


  // case 1
  // RECOMMEND: use execute functions we provide
  await executeActions({
    onTaskExecuted(task) {
      // do something with completed task info
      console.log(task.action.name, task.status);
    },
  });
  console.log('success');

  // case 2
  // execute actions by yourself
  const executor = utils.createActionExecutor(actions);
  for (const task of executor) {
    await task.execute();
    console.log(task.action.name, task.status);
  }
  console.log('success');
}
```

## SDK Core Methods
To use the GoTrading SDK, you need to initialize the SDK with your API key. After initialization, you can use the following methods to interact with the GoTrading API.

```ts
import { init, Config } from '@nftgo/gotrading';

const config: Config = {
  apiKey: 'YOUR-API-KEY',
  openSeaApiKeyConfig: {
    apiKey: 'YOUR-OPENSEA-API-KEY',
    requestsPerInterval: 10, // 10 requests per interval
    interval: 1000, // 1 second
  },
  looksRareApiKeyConfig: {
    apiKey: 'YOUR-LOOKSRARE-API-KEY',
    requestsPerInterval: 10, // 10 requests per interval
    interval: 1000, // 1 second
  },
  x2y2ApiKeyConfig: {
    apiKey: 'YOUR-X2Y2-API-KEY',
    requestsPerInterval: 10, // 10 requests per interval
    interval: 1000, // 1 second
  },
  walletConfig: {
    address: 'Your wallet address',
    privateKey: 'Your private key',
  }, // Replace with your wallet info.
};

const goTrading = init(config);
```

### Aggregator
The Aggregator methods are used to create and fulfill listings and offers across all marketplaces.

#### Create Listings
```ts
import { CreateListingsReq, Orderbook, OrderKind } from '@nftgo/gotrading';

const req: CreateListingsReq = {
  maker: 'xxx', // your address
  params: [
    {
      token: '0x97a20815a061eae224c4fdf3109731f73743db73:2',
      quantity: 1,
      weiPrice: '1000',
      orderKind: OrderKind.SeaportV15,
      orderbook: Orderbook.Opensea,
      listingTime: '1688625367',
      expirationTime: '1689858225',
      currency: '0x0000000000000000000000000000000000000000',
      automatedRoyalties: true,
    },
    {
      token: '0x97a20815a061eae224c4fdf3109731f73743db73:2',
      quantity: 1,
      weiPrice: '1000',
      orderKind: OrderKind.X2Y2,
      orderbook: Orderbook.X2Y2,
      listingTime: '1688625367',
      expirationTime: '1689858225',
      currency: '0x0000000000000000000000000000000000000000',
    },
    {
      token: '0x97a20815a061eae224c4fdf3109731f73743db73:2',
      quantity: 1,
      weiPrice: '1000',
      orderKind: OrderKind.LooksRareV2,
      orderbook: Orderbook.LooksRare,
      listingTime: '1688625367',
      expirationTime: '1689858225',
      currency: '0x0000000000000000000000000000000000000000',
    },
    {
      token: '0x61628d84d0871a38f102d5f16f4e69ee91d6cdd9:7248',
      quantity: 1,
      weiPrice: '1000',
      orderKind: OrderKind.SeaportV15,
      orderbook: Orderbook.Opensea,
      listingTime: '1688625367',
      expirationTime: '1689858225',
      currency: '0x0000000000000000000000000000000000000000',
      automatedRoyalties: true,
    },
  ],
};

const response = await goTrading.aggregator.createListings(req);

await response.executeActions({
  onTaskExecuted(task) {
    console.log(task.action.name, task.status);
  },
});


```
#### Create Offers
```ts
import { CreateOffersReq, Orderbook, OrderKind } from '@nftgo/gotrading';

const req: CreateOffersReq = {
  maker: 'xxx', // your address
  params: [
    {
      collection: '0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63',
      weiPrice: '10000000000',
      orderKind: OrderKind.SeaportV15,
      orderbook: Orderbook.Opensea,
      listingTime: '1689017272',
      expirationTime: '1688017272',
      quantity: 2,
    },
    {
      collection: '0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63',
      weiPrice: '10000000000',
      orderKind: OrderKind.LooksRareV2,
      orderbook: Orderbook.Looksrare,
      listingTime: '1689017272',
      expirationTime: '1688017272',
      quantity: 1,
    }
  ],
};

const response = await goTrading.aggregator.createOffers(req);

await response.executeActions({
  onTaskExecuted(task) {
    console.log(task.action.name, task.status);
  },
});

```

#### Fulfill Listings
```ts
import { FulfillListingsReq, Orderbook, OrderKind } from '@nftgo/gotrading';

const orderIds = ['xxx', 'yyy']; // pass the listing ids you want to fulfill

const req: FulfillListingsReq = {
  buyer: 'xxx', // your address
  orderIds,
};

const response = await goTrading.aggregator.fulfillListings(req);

await response.executeActions({
  onTaskExecuted(task) {
    console.log(task.action.name, task.status);
  },
});

```

#### Fulfill Offers
```ts
import { FulfillOffersReq, Orderbook, OrderKind } from '@nftgo/gotrading';

const orderIds = ['xxx', 'yyy']; // pass the offer ids you want to fulfill

const req: FulfillOffersReq = {
  sellerAddress: 'xxx', // your address
  offerFulfillmentIntentions: [
    {
      orderId: orderIds[0],
      contractAddress: "0x02d66f9d220553d831b239f00b5841280ddcfaf3",
      tokenId: "1",
      quantity: 1,
    },
    {
      orderId: orderIds[1],
      contractAddress: "0x02d66f9d220553d831b239f00b5841280ddcfaf3",
      tokenId: "2",
      quantity: 1,
    },
  ],
};

const response = await goTrading.aggregator.fulfillOffers(req);

await response.executeActions({
  onTaskExecuted(task) {
    console.log(task.action.name, task.status);
  },
});

```

#### Cancel Listings
```ts
import { CancelOrdersReq, Orderbook, OrderKind } from '@nftgo/gotrading';


const cancelOrdersReq: CancelOrdersReq = {
  callerAddress: 'xxx', // your address
  orders: [
    {
      orderId: 'aaa',
      orderType: OrderType.Listing,
    },
    {
      orderId: 'bbb',
      orderType: OrderType.Offer,
    },
  ],
};

const response = await goTrading.aggregator.cancelOrders(cancelOrdersReq);

await response.executeActions({
  onTaskExecuted(task) {
    console.log(task.action.name, task.status);
  },
});

```

### OrderFetcher

#### Get Orders By Contract
```ts
import { OrderType, GetOrdersByContractReq } from '@nftgo/gotrading';

// Get listings by contractAddress
const getOrdersByContractReq: GetOrdersByContractReq = {
  contractAddress: '0x97a20815a061eae224c4fdf3109731f73743db73',
  orderType: OrderType.Listing,
};

const { listingDTOs } = await goTrading.orderFetcher.getOrdersByContract(getOrdersByContractReq);

// Get offers by contractAddress
const getOffersByContractReq: GetOrdersByContractReq = {
  contractAddress: '0x97a20815a061eae224c4fdf3109731f73743db73',
  orderType: OrderType.Offer,
};

const { offerDTOs } = await goTrading.orderFetcher.getOrdersByContract(getOrdersByContractReq);


```

#### Get Orders By NFT
```ts
import { OrderType, GetOrdersByNftsReq } from '@nftgo/gotrading';

// Get listings by nft
const getOrdersByNftsReq: GetOrdersByNftsReq = {
  contractAddress: '0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63',
  tokenId: '1',
  orderType: OrderType.Listing,
};

const { listingDTOs } = await goTrading.orderFetcher.getOrdersByNFT(getOrdersByNftsReq);

// Get offers by nft
const getOffersByNftsReq: GetOrdersByNftsReq = {
  contractAddress: '0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63',
  tokenId: '1',
  orderType: OrderType.Offer,
};

const { offerDTOs } = await goTrading.orderFetcher.getOrdersByNFT(getOffersByNftsReq);

```

#### Get Orders By Ids
```ts
import { OrderType, GetOrdersByIdsReq } from '@nftgo/gotrading';

const getOrdersByIdsReq: GetOrdersByIdsReq = {
  orders: [
    {
      orderId: 'xxx',
      orderType: OrderType.Listing,
    },
    {
      orderId: 'yyy',
      orderType: OrderType.Offer,
    },
  ],
};

const { listingDTOs, offerDTOs } = await goTrading.orderFetcher.getOrdersByIds(getOrdersByIdsReq);

```

#### Get Orders By Maker
```ts
import { OrderType, GetOrdersByMakerReq } from '@nftgo/gotrading';

// Get listings by maker
const getOrdersByMakerReq: GetOrdersByMakerReq = {
  maker: 'xxx', // your address
  orderType: OrderType.Listing,
};

const { listingDTOs } = await goTrading.orderFetcher.getOrdersByMaker(getOrdersByMakerReq);

// Get offers by maker
const getOffersByMakerReq: GetOrdersByMakerReq = {
  maker: 'xxx', // your address
  orderType: OrderType.Offer,
};

const { offerDTOs } = await goTrading.orderFetcher.getOrdersByMaker(getOffersByMakerReq);

```

### Utils

## Questions & Feedback

> If you have any questions, issues, or feedback, please file an issue on GitHub, or drop us a message on our [Discord][discord-url] channel for the SDK.

##  License

This project is licensed under the [BSD-3-Clause license](LICENSE).




[discord-image]: https://img.shields.io/discord/1040195071401787413?color=brightgreen&label=Discord&logo=discord&logoColor=blue
[discord-url]:  https://discord.gg/nftgo
[twitter-image]: https://img.shields.io/twitter/follow/NFTGo?label=NFTGo&style=social
[twitter-url]:  https://twitter.com/NFTGoDevs
