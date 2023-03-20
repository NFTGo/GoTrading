import { runPipeline } from '../../helpers/pipeline';
import { Config, HTTPClient, ListingIndexer, PostListingOrderParams, PostListingOrderResponse } from '../interface';
import {
  approveWithPolicy,
  getApprovalAndSignInfo,
  listingWithPolicy,
  parseApprovalData,
  parseListingData,
} from './listing';
import { NFTInfoForListing, BulkListingOptions } from './listing/interface';
import { AggregatorUtils } from './utils';

export class ListingIndexerStable implements ListingIndexer {
  constructor(private client: HTTPClient, private config: Config, private utils?: AggregatorUtils) {}

  postListingOrder(params: PostListingOrderParams): Promise<PostListingOrderResponse> {
    throw new Error('Method not implemented.');
  }

  // bulk listing
  async bulkListing(nfts: NFTInfoForListing[], config: BulkListingOptions) {
    const tasks = [getApprovalAndSignInfo, [parseApprovalData, parseListingData], approveWithPolicy, listingWithPolicy];
    try {
      await runPipeline(tasks, nfts);
    } catch (error) {
      throw error;
    }
  }
}
