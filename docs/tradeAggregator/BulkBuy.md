# Bulk Buy
## ***complete example***
- For server-side:
```ts
import { init, NFTInfoForTrade } from '@nftgo/gotrading';
import Web3 from 'web3';

const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io') //Replace with your own provider
const configs = {
  apiKey: "YOUR-API-KEY", // Replace with your own API Key.
  web3Provider: provider,
   walletConfig: {
    address: "Your wallet address",
    privateKey: "Your private key"
  }, // Replace with your wallet info.
  agent: new HttpsProxyAgent({ // if you have problem connect to our api end point, please config your http agent
    host: "your host ip",
    port: "your agent port",
  }),
};

// create tradeAggregator client
const {aggregator, utils} = init(configs);

// list some NFTs you want to buy
// we recommend you using our aggregator.getListingsOfNFT method to check whether your nfts have valid listings
const nfts: NFTInfoForTrade[] = [ // replace with your own nft list
  {
    contract: "0xcfff4c8c0df0e2431977eba7df3d3de857f4b76e",
    tokenId: "16",
    amount: 1
  },
    {
    contract: "0xcfff4c8c0dF0E2431977EbA7dF3D3De857f4B76e",
    tokenId: "18",
    amount: 1
  }
]

// config your bulk
const bulkBuyConfig = {
  ignoreUnListedNFTs: false, // Do you want to ignore unlisted NFTs?
  ignoreInvalidOrders: false, // Do you want to ignore invalid orders?
  ignoreSuspiciousNFTs: false, // Do you want to ignore suspicious NFTs?
  withSafeMode: false, // Use Safe Mode or Without Safe Mode.
};

// buy nfts
aggregator.bulkBuy({
  nfts,
  onSendingTransaction: (hash: string) => console.log(hash), // callback on sending a transaction
  onFinishTransaction: ( // callback on a transaction finished
    successNFTs: NFTBaseInfo[],
    failNFTs: NFTBaseInfo[],
    nftsListingInfo: NftsListingInfo
  ) => console.log(successNFTs, failNFTs, nftsListingInfo),
  onError: (error: Error, nftsListingInfo?: NftsListingInfo) =>
    console.log(error, nftsListingInfo), // callback on any error occurs
  config: bulkBuyConfig,
});
```
- For client-side:
```ts
import { init } from '@nftgo/gotrading';
import Web3 from 'web3';

// for client
const provider = window.ethereum;
const configs = {
  apiKey: 'YOUR-API-KEY', // Replace with your own API Key.
};

// create tradeAggregator client
const {aggregator, utils} = init(configs);
// list some NFTs you want to buy
// we recommend you using our aggregator.getListingsOfNFT method to check whether your nfts have valid listings
const nfts: NFTInfoForTrade[] = [ // replace with your own nft list
  {
    contract: "0xcfff4c8c0df0e2431977eba7df3d3de857f4b76e",
    tokenId: "16",
    amount: 1
  },
    {
    contract: "0xcfff4c8c0dF0E2431977EbA7dF3D3De857f4B76e",
    tokenId: "18",
    amount: 1
  }
]

// config your bulk
const bulkBuyConfig = {
  ignoreUnListedNFTs: false, // Do you want to ignore unlisted NFTs?
  ignoreInvalidOrders: false, // Do you want to ignore invalid orders?
  ignoreSuspiciousNFTs: false, // Do you want to ignore suspicious NFTs?
  withSafeMode: false, // Use Safe Mode or Without Safe Mode.
};

// buy nfts
aggregator.bulkBuy({
  nfts,
  onSendingTransaction: (hash: string) => console.log(hash), // callback on sending a transaction
  onFinishTransaction: ( // callback on a transaction finished
    successNFTs: NFTBaseInfo[],
    failNFTs: NFTBaseInfo[],
    nftsListingInfo: NftsListingInfo
  ) => console.log(successNFTs, failNFTs, nftsListingInfo),
  onError: (error: Error, nftsListingInfo?: NftsListingInfo) =>
    console.log(error, nftsListingInfo), // callback on any error occurs
  config: bulkBuyConfig,
});
```
