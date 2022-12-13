/**
 * The NFTGo API SDK supported chains
 */
export enum EvmChain {
  ETH = 'eth',
}

/**
 * Last Sale，Last sale price of the NFT
 *
 * Sale
 */
export interface Sale {
  /**
   * Price，Transaction price
   */
  price: Price;
  /**
   * Price Token，Trade price quoted in transaction token
   */
  price_token: number;
  /**
   * Price Usd，The transaction price converted to USD
   */
  price_usd: number;
  /**
   * Time，Transaction timestamp in seconds
   */
  time: number;
  /**
   * Token Contract Address，Contract address of the token the sale was transacted in
   */
  token_contract_address: string;
  /**
   * Token Symbol，Symbol of the token the sale was transacted in
   */
  token_symbol: string;
  /**
   * Tx Hash，Transaction Hash
   */
  tx_hash: string;
  /**
   * Tx Url，Transaction url
   */
  tx_url: string;
}

/**
 * Price，Transaction price
 *
 * Price，Price in cryptocurrency or US dollars
 *
 * Listing Price，Listing price of the NFT
 */
export interface Price {
  /**
   * Crypto Unit，The crypto unit of measurement, e.g. ETH, USDC, DAI.
   */
  crypto_unit: string;
  /**
   * Quantity，(Deprecated) This field is deprecated and will be removed in the future. Use
   * {value} instead. Total value in the measure of {crypto_unit}
   */
  quantity: number;
  /**
   * Usd，Total US dollar value of the cryptocurrency. It equals to quantity * crypto_unit *
   * usd_price_per_crypto_unit
   */
  usd?: number;
  /**
   * Value，Total value in the measure of {crypto_unit}
   */
  value: number;
}
