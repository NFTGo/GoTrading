import { runPipeline } from '../../../helpers/pipeline';
import {
  approveWithPolicy,
  getApprovalAndSignInfo,
  listingWithPolicy,
  parseApprovalData,
  parseListingData,
} from './base';
import { BulkListingOptions, BulkListingParams, NFTInfoForListing } from './interface';

/**
 * entrys
 */
const tasks = [getApprovalAndSignInfo, [parseApprovalData, parseListingData], approveWithPolicy, listingWithPolicy];
async function bulkListing(nfts: NFTInfoForListing[], config: BulkListingOptions) {
  try {
    await runPipeline(tasks, nfts);
  } catch (error) {
    throw error;
  }
}

export { bulkListing };
