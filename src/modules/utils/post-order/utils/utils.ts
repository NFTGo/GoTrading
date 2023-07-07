export enum Network {
  // Ethereum
  Ethereum = 1,
  EthereumGoerli = 5,
  // Optimism
  Optimism = 10,
  // Bsc
  Bsc = 56,
  // Gnosis
  Gnosis = 100,
  // Polygon
  Polygon = 137,
  PolygonMumbai = 80001,
  // Arbitrum
  Arbitrum = 42161,
  // Avalanche
  Avalanche = 43114,
  AvalancheFuji = 43113,
  // Scroll
  ScrollAlpha = 534353,
  MantleTestnet = 5001,
}

export type ChainIdToAddress = {[chainId: number]: string};
