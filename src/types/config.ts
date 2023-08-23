import { provider } from 'web3-core';

// # user-land interface , core  should implement this
export enum EVMChain {
  ETHEREUM = 'ethereum',
  SEPOLIA = 'sepolia',
}

export interface WalletConfig {
  address: string;
  privateKey: string;
}

export interface Config {
  baseUrl: string;
  chain: EVMChain;
  apiKey?: string;
  walletConfig?: WalletConfig;
  web3Provider?: provider;
  openSeaApiKeyConfig?: ApiKeyConfig;
  looksRareApiKeyConfig?: ApiKeyConfig;
  x2y2ApiKeyConfig?: ApiKeyConfig;
}

export type ApiKeyConfig = {
  apiKey: string;
  requestsPerInterval: number;
  interval: number;
};
