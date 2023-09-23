require('dotenv').config();

import { EVMChain, Config } from '@/types';
import Web3 from 'web3';

const DefaultProviderUrl = 'https://cloudflare-eth.com/';
const HTTP_PROXY = 'http://127.0.0.1:9999';
// const HTTP_PROXY = 'http://127.0.0.1:7890';
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

export function initConfig() {
  const provider = initWeb3Provider();
  const config: Config = {
    apiKey: process.env.API_KEY || '', // Replace with your own API Key.
    baseUrl: process.env.BASE_URL || '',
    chain: EVMChain.ETHEREUM,
    web3Provider: provider,
    walletConfig: {
      address: process.env.ADDRESS || '',
      privateKey: process.env.PRIVATE_KEY || '',
    },
    openSeaApiKeyConfig: openseaApi,
    looksRareApiKeyConfig: looksrareApi,
    x2y2ApiKeyConfig: x2y2Api,
  };
  return config;
}

export function initWeb3Provider(providerUrl = DefaultProviderUrl) {
  const web3Provider = new Web3.providers.HttpProvider(providerUrl);
  return web3Provider;
}

export function checkProviderIsValid(provider: any) {
  const web3 = new Web3(provider);
  web3.eth.getBlockNumber().then(result => {
    console.log('Latest Ethereum Block is ', result);
  });
}
