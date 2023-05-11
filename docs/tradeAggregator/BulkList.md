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

```ts
  // You need to initialize a listingIndexer as shown in the code above.
  const listingNFTS: NFTInfoForListing[] = [
    {
      contract: baycContract,
      tokenId: '1',
      ethPrice: 60,
      marketplace: 'OpenSea',
    },
  ];
  const maker = '0x0000' ?? this.config.walletConfig?.address

  const bulkListing = () => {
    /**
     * Step 1: Prepare listing:
     * This function takes two parameters: a list of NFTs to be listed and the owner's address.
     * The prepareListing function returns the specific parameter details required for the subsequent steps of the process
     * such as the parameters needed for signing and posting.
     */
    const data = await listingIndexer.prepareListing(listingNFTS, maker);
    /**
     * Then, do some simple data formatting and prepare to hand it over to the next process.
     */
    const approvalData = listingIndexer.parseApprovalData(data);
    const listingData = listingIndexer.parseListingData(data);
     /**
     * Step 2: Approve Listing Item with Policy:
     * This function will authorize the approvedItems and return the final set of ListingItems.
     * Note that NFTs must be authorized before being listed, and only one authorization is required per collection per address.
     */
    const approvalResult = await listingIndexer.approveWithPolicy([approvalData, listingData]);
    /**
     * Step 3: Sign Listing Item:
     * This function takes in an array of ListingItem objects that need to be listed.
     * The user will sign these items using their configured private key, typically stored in their wallet on the client-side.
     * Once signed, the function returns an array containing two elements:
        SignedListingItem[]: the successfully signed ListingItems.
        ErrorListingItem[]: any ListingItems that failed to be signed.
    */
    const [listingResult, errorOrders] = await listingIndexer.signListingOrders(approvalResult);
    /**
     * Step 4: Post Listing Item:
     * This function will post the listing order to the target marketplace.
     * It takes as input the SignedListingItem that was previously signed in the previous step.
     * This is the final step of the listing process, where a request is made to the market API.
     * The function will return information about the final result of the listing.
     */
    const [successIndexes, errorItems] = await listingIndexer.bulkPostListingOrders(listingResult);
    const errorIndexes = [...errorOrders, ...errorItems];
```
>

## ***interface***
- ***interface***
  - [***ListingNFTParams***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/ListingNFTParams.md)
  - [***ListingStepNFTParams***](https://github.com/NFTGo/GoTrading-js/blob/feat/draft/docs/interfaces/ListingNFTParams.md)
