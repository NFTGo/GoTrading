import { NFTBaseInfo } from '../../interface';

export interface NFTInfoForListing extends NFTBaseInfo {
  // ...NFT信息定义
}

export interface BulkListingParams {
  nfts: NFTInfoForListing[];
  config?: BulkListingOptions;
}
/**
 * Interface for bulk listing options.
 */
export interface BulkListingOptions {
  /**
   * If true, automatically approves all unapproved NFTs.
   */
  autoApprove: boolean;

  /**
   * If true, skips unapproved NFTs and proceeds with the approved ones.
   */
  skipUnapproved: boolean;

  /**
   * If true, the whole operation fails if there are unapproved NFTs.
   */
  failOnUnapproved: boolean;

  onFinish: (successNFTs: NFTBaseInfo[], failNFTs: NFTBaseInfo[]) => void;
  onSuccess: (successNFTs: NFTBaseInfo[], failNFTs: NFTBaseInfo[]) => void;
}
