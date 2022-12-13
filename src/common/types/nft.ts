import { Price, Sale } from './common';
import { Listinginfo } from './listing';

/**
 * _NFT_pro
 */
export interface NFTPro {
  /**
   * Animation Url，The url of animation associated with the NFT
   */
  animation_url?: string;
  /**
   * Blockchain，Name of the blockchain the NFT belongs to
   */
  blockchain: string;
  /**
   * Collection Name，Name of the collection the NFT belongs to
   */
  collection_name?: string;
  /**
   * Collection Opensea Slug，Opensea Slug of the collection the NFT belongs to
   */
  collection_opensea_slug?: string;
  /**
   * Collection Slug，NFTGo Slug of the collection the NFT belongs to
   */
  collection_slug?: string;
  /**
   * Contract Address，Contract address of the collection the NFT belongs to
   */
  contract_address: string;
  /**
   * Description，The description of the NFT
   */
  description?: string;
  /**
   * Image，The url or base64 data of image or video associated with the NFT
   */
  image?: string;
  /**
   * Last Sale，Last sale price of the NFT
   */
  last_sale?: Sale;
  listing_data?: Listinginfo;
  /**
   * Listing Price，Listing price of the NFT
   */
  listing_price?: Price;
  /**
   * Listing Time，Listing time of the NFT, formatted as timestamp in second.
   */
  listing_time?: number;
  /**
   * Marketplace，Listing marketplace of the NFT
   */
  marketplace?: string;
  /**
   * Marketplace Link，Marketplace link of the NFT
   */
  marketplace_link?: string;
  /**
   * Name，The name of the NFT
   */
  name?: string;
  /**
   * Owner Addresses，List of owner addresses currently holding the NFT.         A list of one
   * address if it's an ERC721 NFT. A list of addresses if it's an ERC1155 NFT.
   */
  owner_addresses?: string[];
  /**
   * Rarity，NFT Rarity score. Calculation methods can be seen as below:
   * https://mirror.xyz/nftgoio.eth/kHWaMtNY6ZOvDzr7PR99D03--VNu6-ZOjYuf6E9-QH0
   */
  rarity?: Rarity;
  /**
   * Token Id，The token ID of the NFT
   */
  token_id: string;
  /**
   * Traits，The list of NFT traits. Traits consist of a series of types and values, referring
   * to the feature of an NFT. For example, if a project has avatar NFTs, the traits may
   * include headwear, facial traits, clothes, etc. Traits make each item in an NFT collection
   * unique and determine its rarity in a collection.
   */
  traits?: Trait[];
}

/**
 * Rarity，NFT Rarity score. Calculation methods can be seen as below:
 * https://mirror.xyz/nftgoio.eth/kHWaMtNY6ZOvDzr7PR99D03--VNu6-ZOjYuf6E9-QH0
 *
 * Rarity，https://mirror.xyz/nftgoio.eth/kHWaMtNY6ZOvDzr7PR99D03--VNu6-ZOjYuf6E9-QH0
 */
export interface Rarity {
  /**
   * Rank，The rarity rank
   */
  rank: number;
  /**
   * Score，Rarity score. See methodology:
   * https://mirror.xyz/nftgoio.eth/kHWaMtNY6ZOvDzr7PR99D03--VNu6-ZOjYuf6E9-QH0
   */
  score: number;
  /**
   * Total，Total number of NFTs belonging to the colleciton involved in calculation of rarity
   */
  total: number;
}

/**
 * Trait，Trait of an NFT
 */
export interface Trait {
  /**
   * Percentage，The rarity percentage of trait
   */
  percentage?: number;
  /**
   * Type，The type of trait
   */
  type?: string;
  /**
   * Value，The value of trait
   */
  value?: string;
}
