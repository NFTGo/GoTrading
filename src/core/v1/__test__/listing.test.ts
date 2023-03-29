import { HTTPClient } from '../../interface';
import { ListingIndexerStable } from '../listing-indexer';
import { ExternalHTTPClient } from '../../internal-http-client';
import { AggregatorUtils } from '../utils';
import {
  bulk1155NFTS,
  mockListingStepData,
  mockLooksRareOrder,
  mockNFTs,
  mockOpenSeaOrder,
  mockX2y2Order,
} from './mock';
import { initConfig } from './config';

const config = initConfig('https://cloudflare-eth.com/');
let httpClient: HTTPClient = new ExternalHTTPClient(config?.agent);

describe('bulkListing main process Test', () => {
  const utils = new AggregatorUtils(config.web3Provider, config.walletConfig);
  let listingIndexer: ListingIndexerStable;

  beforeEach(() => {
    listingIndexer = new ListingIndexerStable(httpClient, config, utils);
  });

  test('should create an instance of ListingIndexerStable', () => {
    expect(listingIndexer).toBeInstanceOf(ListingIndexerStable);
  });

  // test('【OpenSea】single listing process test(auto approval)', async () => {
  //   const result = await listingIndexer.bulkListing([mockOpenSeaOrder], {
  //     autoApprove: true,
  //   });
  //   expect(result).toEqual([[0], []]);
  // }, 30000);
  test('【OpenSea】bulk listing 1155 process test(auto approval)', async () => {
    const result = await listingIndexer.bulkListing(bulk1155NFTS, {
      autoApprove: true,
    });
    expect(result).toEqual([[0, 1], []]);
  }, 30000);
  // test('【LooksRare】bulk listing process test(auto approval)', async () => {
  //   const result = await listingIndexer.bulkListing([mockLooksRareOrder], {
  //     autoApprove: true,
  //   });
  //   expect(result).toEqual([[0], []]);
  // }, 30000);
  // test('【X2Y2】bulk listing process test(auto approval)', async () => {
  //   const result = await listingIndexer.bulkListing([mockX2y2Order], {
  //     autoApprove: true,
  //   });
  //   expect(result).toEqual([[0], []]);
  // }, 30000);

  // TODO: bulk listing (skip approval)
  // TODO: bulk listing (reject approval)
  // TODO: bulk listing (auto approval)
  // TODO: Duplicated order payload
});

// test('approveWithPolicy auto Approve', async () => {
//   const data = [
//     listingIndexer.parseApprovalData(mockListingStepData),
//     listingIndexer.parseListingData(mockListingStepData),
//   ];
//   const res = await listingIndexer.approveWithPolicy(data as any, {
//     autoApprove: true,
//   });
//   console.info(res);
//   expect(true).toEqual(true);
// });

// test('post order with mock', async () => {
//   const result = await listingIndexer.postListingOrder(mockPostOrderParams);
//   console.info(result);
//   expect(true).toEqual(true);
// }, 20000);
