import { Agent } from 'https';
import { provider } from 'web3-core';

export enum EVMChain {
  ETHEREUM = 'ethereum',
  SEPOLIA = 'sepolia',
}

export interface WalletConfig {
  address: string;
  privateKey: string;
}

/**
 * SDK Config
 */
export interface Config {
  /**
   * Data api base url. Default as https://data-api.nftgo.io
   */
  baseUrl: string;
  /**
   * EVM chain. ETHEREUM as Default
   */
  chain: EVMChain;
  /**
   * NFTGo Data api key. Get one form https://nftgo.io/developers
   */
  apiKey?: string;
  /**
   * Web3 wallet config. Ignore web3Provider if walletConfig has been set
   */
  walletConfig?: WalletConfig;
  /**
   * Web3 provider. Will be ignored if walletConfig has been set
   */
  web3Provider?: provider;
  /**
   * Opensea api key. Used to post orders to Opensea
   */
  openSeaApiKeyConfig?: ApiKeyConfig;
  /**
   * LooksRare api key. Used to post orders to LooksRare
   */
  looksRareApiKeyConfig?: ApiKeyConfig;
  /**
   * X2Y2 api key. Used to post orders to X2Y2
   */
  x2y2ApiKeyConfig?: ApiKeyConfig;
  /**
   * Http proxy agent.
   */
  agent?: Agent;
}

export type ApiKeyConfig = {
  apiKey: string;
  requestsPerInterval: number;
  interval: number;
};
