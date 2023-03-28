const HttpsProxyAgent = require('https-proxy-agent');
import { HTTPClient, ListingIndexerConfig, EVMChain } from '../../interface';
import Web3 from 'web3';
import { ListingIndexerStable } from '../listing-indexer';
import { ExternalHTTPClient } from '../../internal-http-client';
import { AggregatorUtils } from '../utils';
import { mockListingStepData, mockNFTs, mockPostOrderParams } from './mock';

// const providerUrl = 'https://rpc.tenderly.co/fork/d73c8e08-3381-4d11-9f4d-b38c2a13ffa7';
// const providerUrl = 'https://mainnet.infura.io/v3/b1a0f70afcec4336be3baedce97b486e';
const providerUrl = 'https://cloudflare-eth.com/';
// export https_proxy=http://10.10.36.44:9999 http_proxy=http://10.10.36.44:9999
// proxy env
// export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
// const HTTP_PROXY = 'http://10.10.36.44:9999';
const HTTP_PROXY = 'http://127.0.0.1:7890';
const openseaApi = {
  apiKey: process.env.OPENSEA_API_KEY || '',
  requestsPerInterval: 2,
  interval: 1000,
};
const looksrareApi = {
  apiKey: process.env.LOOKSRARE_API_KEY || '',
  requestsPerInterval: 2,
  interval: 1000,
};
const x2y2Api = {
  apiKey: process.env.X2Y2_API_KEY || '',
  requestsPerInterval: 2,
  interval: 1000,
};

const web3Provider = new Web3.providers.HttpProvider(providerUrl);
// const web3 = new Web3(web3Provider);
// web3.eth.getBlockNumber().then((result) => {
//   console.log('Latest Ethereum Block is ', result);
// });
let config: ListingIndexerConfig = {
  apiKey: process.env.API_KEY || '', // Replace with your own API Key.
  baseUrl: 'https://data-api.nftgo.dev/',
  chain: EVMChain.ETH,
  web3Provider,
  walletConfig: {
    address: process.env.ADDRESS || '',
    privateKey: process.env.PRIVATE_KEY || '',
  },
  agent: new HttpsProxyAgent(HTTP_PROXY),
  openSeaApiKeyConfig: openseaApi,
  looksRareApiKeyConfig: looksrareApi,
  x2y2ApiKeyConfig: x2y2Api,
};

let httpClient: HTTPClient = new ExternalHTTPClient(config?.agent);
describe('ListingIndexerStable Function Unit Test', () => {
  const utils = new AggregatorUtils(config.web3Provider, config.walletConfig);
  let listingIndexer: ListingIndexerStable;

  beforeEach(() => {
    listingIndexer = new ListingIndexerStable(httpClient, config, utils);
  });

  test('should create an instance of ListingIndexerStable', () => {
    expect(listingIndexer).toBeInstanceOf(ListingIndexerStable);
  });

  // test('prepareListing api should return prepareListing data', async () => {
  //   try {
  //     const result = await listingIndexer.prepareListing(mockNFTs);
  //     expect(result).toEqual(mockListingStepData);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, 10000);

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

  // test('post order with mock', async () => {
  //   const result = await listingIndexer.postListingOrder(mockPostOrderParams);
  //   console.info(result);
  //   expect(true).toEqual(true);
  // }, 20000);
  test('main process test(auto approval)', async () => {
    const result = await listingIndexer.bulkListing(mockNFTs, {
      autoApprove: true,
    });
    expect(result).toHaveReturned();
  }, 30000);

  // test('bulkListing should call runPipeline with correct parameters', async () => {
  //   const nfts: NFTInfoForListing[] = [];
  //   const config: BulkListingOptions = {};

  //   const runPipelineSpy = jest.spyOn(require('../../helpers/pipeline'), 'runPipeline');
  //   await listingIndexer.bulkListing(nfts, config);

  //   expect(runPipelineSpy).toBeCalledWith(expect.any(Array), nfts);
  // });
});
