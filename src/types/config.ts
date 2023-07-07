// # user-land interface , core  should implement this
export enum EVMChain {
  ETH = 'ETH',
}

export interface WalletConfig {
  address: string;
  privateKey: string;
}

export interface Config {
  apiKey: string;
  chain?: EVMChain;
  baseUrl?: string;
  walletConfig?: WalletConfig;
}

export interface ListingIndexerConfig extends Config {
  openSeaApiKeyConfig: ApiKeyConfig;
  looksRareApiKeyConfig: ApiKeyConfig;
  x2y2ApiKeyConfig: ApiKeyConfig;
}

type ApiKeyConfig = {
  apiKey: string;
  requestsPerInterval: number;
  interval: number;
};
