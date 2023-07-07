import { provider } from 'web3-core';

// # user-land interface , core  should implement this
export enum EVMChain {
  ETH = 'ETH',
}

export interface WalletConfig {
  address: string;
  privateKey: string;
}

export interface Config {
  apiKey?: string;
  chain?: EVMChain;
  baseUrl?: string;
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