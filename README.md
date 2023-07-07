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
import { init } from '@nftgo/gotrading';
import Web3 from 'web3';

// Create a new Web3 Provider to interact with the Ethereum network.
const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io') //Replace with your own provider

// Configure the necessary parameters for the Trade Aggregator API client.
const configs = {
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

import { init } from './modules';
import { Config, FulfillListingsReq } from './types';

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
