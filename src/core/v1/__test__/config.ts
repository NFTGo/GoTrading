const HttpsProxyAgent = require('https-proxy-agent');
import { ListingIndexerConfig, EVMChain } from '../../interface';
import Web3 from 'web3';

const DefaultProviderUrl = 'https://rpc.tenderly.co/fork/66ebeb77-c3c1-468f-a66c-b5f4bdf608d0';
// const providerUrl = 'https://mainnet.infura.io/v3/b1a0f70afcec4336be3baedce97b486e';
// const DefaultProviderUrl = 'https://cloudflare-eth.com/';

const openseaApi = {
  apiKey: process.env.OPENSEA_API_KEY || '',
  requestsPerInterval: 2,
  interval: 1000,
};
const looksrareApi = {
  apiKey: process.env.LOOKSRARE_API_KEY || '',
  requestsPerInterval: 2,
  interval: 1000,
};
const x2y2Api = {
  apiKey: process.env.X2Y2_API_KEY || '',
  requestsPerInterval: 2,
  interval: 1000,
};

const HTTP_PROXY = 'http://10.10.36.62:9999';
// const HTTP_PROXY = 'http://127.0.0.1:7890';

export function initConfig(providerUrl = DefaultProviderUrl) {
  const web3Provider = new Web3.providers.HttpProvider(providerUrl);
  let config: ListingIndexerConfig = {
    apiKey: process.env.API_KEY || '', // Replace with your own API Key.
    baseUrl: 'https://data-api.nftgo.dev/',
    chain: EVMChain.ETH,
    web3Provider,
    walletConfig: {
      address: process.env.ADDRESS || '',
      privateKey: process.env.PRIVATE_KEY || '',
    },
    agent: new HttpsProxyAgent(HTTP_PROXY),
    openSeaApiKeyConfig: openseaApi,
    looksRareApiKeyConfig: looksrareApi,
    x2y2ApiKeyConfig: x2y2Api,
  };
  return config;
}

export function testProvider(provider: any) {
  const web3 = new Web3(provider);
  web3.eth.getBlockNumber().then((result) => {
    console.log('Latest Ethereum Block is ', result);
  });
}
