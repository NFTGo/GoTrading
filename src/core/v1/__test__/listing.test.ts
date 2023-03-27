import { HTTPClient, ListingIndexerConfig, EVMChain } from '../../interface';
const HttpsProxyAgent = require('https-proxy-agent');
import Web3 from 'web3';
import { bootstrap } from 'global-agent';
import { ListingIndexerStable } from '../listing-indexer';
import { ExternalHTTPClient } from '../../internal-http-client';
import { AggregatorUtils } from '../utils';
import { mockListingStepData, mockNFTs } from './mock';

const providerUrl = 'https://rpc.tenderly.co/fork/d73c8e08-3381-4d11-9f4d-b38c2a13ffa7';
// const providerUrl = 'https://mainnet.infura.io/v3/';
// proxy env
bootstrap();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const HTTP_PROXY = 'http://192.168.31.186:9090';

const mockApi = {
  apiKey: '11',
  requestsPerInterval: 2,
  interval: 1000,
};
let config: ListingIndexerConfig = {
  apiKey: process.env.API_KEY || '', // Replace with your own API Key.
  baseUrl: 'https://data-api.nftgo.dev/',
  chain: EVMChain.ETH,
  web3Provider: new Web3.providers.HttpProvider(providerUrl),
  walletConfig: {
    address: process.env.ADDRESS || '',
    privateKey: process.env.PRIVATE_KEY || '',
  },
  agent: new HttpsProxyAgent(HTTP_PROXY),
  openSeaApiKeyConfig: mockApi,
  looksRareApiKeyConfig: mockApi,
  x2y2ApiKeyConfig: mockApi,
};

describe('ListingIndexerStable Function Unit Test', () => {
  const utils = new AggregatorUtils(config.web3Provider, config.walletConfig);
  let httpClient: HTTPClient = new ExternalHTTPClient(config?.agent);
  let listingIndexer: ListingIndexerStable;

  beforeEach(() => {
    listingIndexer = new ListingIndexerStable(httpClient, config, utils);
  });

  test('should create an instance of ListingIndexerStable', () => {
    expect(listingIndexer).toBeInstanceOf(ListingIndexerStable);
  });

  test('prepareListing api should return prepareListing data', async () => {
    try {
      const result = await listingIndexer.prepareListing(mockNFTs);
      expect(result).toEqual(mockListingStepData);
    } catch (e) {
      console.error(e);
    }
  }, 10000);

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

  // test('listing with policy', async () => {
  //   const data = listingIndexer.parseListingData(mockListingStepData);
  //   // const res = await listingIndexer.approveWithPolicy(data as any, {
  //   //   autoApprove: true,
  //   // });
  //   const res = await listingIndexer.listingWithPolicy(data);
  //   console.info(res);
  // });

  // test('main process', async () => {
  //   const result = await listingIndexer.bulkListing(mockNFTs);
  //   console.info(result);
  //   expect(true).toEqual(true);
  // }, 20000);

  //   test('bulkListing should call runPipeline with correct parameters', async () => {
  //     const nfts: NFTInfoForListing[] = [];
  //     const config: BulkListingOptions = {};

  //     const runPipelineSpy = jest.spyOn(require('../../helpers/pipeline'), 'runPipeline');
  //     await listingIndexer.bulkListing(nfts, config);

  //     expect(runPipelineSpy).toBeCalledWith(expect.any(Array), nfts);
  //   });
});
