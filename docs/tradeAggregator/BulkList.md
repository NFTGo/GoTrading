# Quick Start for ListingIndexerStable

## Introduction

If you need to list NFTs, you can use the `ListingIndexerStable` class for easy operation. It supports single and batch listing, and can be listed on multiple marketplaces such as opensea x2y2 looksrare. In addition, this class also supports setting royalty information and other features.

## Usage

Here are some actual examples of code.

## ***complete example***
- For server-side:
```ts
// init sdk client
import Web3 from 'web3';
import { initListingIndexer, NFTInfoForListing } from '@nftgo/gotrading';

// server
const provider = new Web3.providers.HttpProvider('https://cloudflare-eth.com/');

const openseaApi = {
  apiKey: 'apiKey', // replace with your own api key
  requestsPerInterval: 2,
  interval: 1000,
};
//Replace with your own provider
const config = {
  apiKey: 'api key', // Replace with your own API Key.
  web3Provider: provider, // Replace with your provider,
  walletConfig: {
    address: 'Your wallet address',
    privateKey: 'Your private key',
  }, // Replace with your wallet info.
  openSeaApiKeyConfig: openseaApi,
  //   looksRareApiKeyConfig: looksrareApi,
  //   x2y2ApiKeyConfig: x2y2Api,
};
// create Indexer client
const { listingIndexer } = initListingIndexer(config);

// Get the listing info of BAYC No.1
const baycContract = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';

const listingNFTS: NFTInfoForListing[] = [
  {
    contract: baycContract,
    tokenId: '1',
    ethPrice: 60,
    marketplace: 'OpenSea',
  },
  {
    contract: baycContract,
    tokenId: '2',
    ethPrice: 60,
    marketplace: 'OpenSea',
  },
  {
    contract: baycContract,
    tokenId: '2',
    ethPrice: 60,
    marketplace: 'LooksRare',
  },
];

const listingDataResult = await listingIndexer.bulkListing(listingNFTS, {
  autoApprove: true,
  onFinish: (successIndexes, failedItems) => {
    // successIndexes: [0, 1]
    console.log(successIndexes);
  },
  onError: (err) => {
    console.error(err);
  },
});

```

## Client-Side Usage
On the client-side, users need to interact with the MetaMask wallet for authorization, so we need to reassemble the entire listing process.

Here, React framework is used as an example for the code.

- For client-side:

```ts
import React from 'react';
import { initListingIndexer, NFTInfoForListing } from '@nftgo/gotrading';
// You also need to pass in similar configurations to initialize a ListingIndexerStable instance.
const config = {};
const { listingIndexer } = initListingIndexer(config);

// Get the listing info of BAYC No.1
const baycContract = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';

function YourApp() {
  // listingNFTS may be obtained by confirming the price with the user, concatenating aggregator.getListingsOfNFT or other interfaces.
  const listingNFTS: NFTInfoForListing[] = [
    {
      contract: baycContract,
      tokenId: '1',
      ethPrice: 60,
      marketplace: 'OpenSea',
    },
  ];
  // For each asynchronous operation below, you may need to maintain UI loading, error, and success states based on actual business needs.
  const startListing = () => {
    /**
     * The first step is to obtain the items that need to be listed, relevant authorization signatures, and listing parameters
     */
    const data = await listingIndexer.prepareListing(listingNFTS);
    /**
     * Then, do some simple data formatting and prepare to hand it over to the next process.
     */
    const approvalData = listingIndexer.parseApprovalData(data);
    const listingData = listingIndexer.parseListingData(data);
    /**
     * Next: authorize unlicensed items or skip them.
     */
    const approvalResult = await listingIndexer.approveWithPolicy([approvalData, listingData]);
    /**
     * Next, sign the post order for the authorized items.
     */
    const [listingResult, errorOrders] = await listingIndexer.signListingOrders(approvalResult);
    /**
     * Finally, for each different exchange, make post order requests using different strategies.
     */
    const [successIndexes, errorItems] = await listingIndexer.bulkPostListingOrders(listingResult);
    const errorIndexes = [...errorOrders, ...errorItems];
  };
  return (
    <div>
      <button onClick={startListing}>bulk listing</button>
    </div>
  );
}

```
>

## ***interface***
- ***interface***
  - [***ListingNFTParams***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/ListingNFTParams.md)
  - [***ListingStepNFTParams***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/ListingNFTParams.md)
