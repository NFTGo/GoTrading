import { HTTPClient } from '../../interface';
import { ListingIndexerStable } from '../listing-indexer';
import { HTTPClientStable } from '../../http-client';
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
let httpClient: HTTPClient = new HTTPClientStable(config?.agent);

describe('bulkListing main process Test', () => {
  const utils = new AggregatorUtils(config.web3Provider, config.walletConfig);
  let listingIndexer: ListingIndexerStable;

  beforeEach(() => {
    listingIndexer = new ListingIndexerStable(httpClient, config, utils);
  });

  test('should create an instance of ListingIndexerStable', () => {
    expect(listingIndexer).toBeInstanceOf(ListingIndexerStable);
  });

  test('【OpenSea】single listing process test(auto approval)', async () => {
    const result = await listingIndexer.bulkListing([mockOpenSeaOrder], {
      autoApprove: true,
    });
    expect(result).toEqual([[0], []]);
  }, 30000);
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
