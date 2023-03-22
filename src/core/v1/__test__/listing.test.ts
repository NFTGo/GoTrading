import { HTTPClient, Config, EVMChain } from '../../interface';
import { HttpsProxyAgent } from 'https-proxy-agent';

import { ListingIndexerStable } from '../listing-indexer';
import { NFTInfoForListing } from '../listing/interface';
import { InternalHTTPClient } from '../../internal-http-client';
import { AggregatorUtils } from '../utils';

let mockNFTs: NFTInfoForListing[] = [
  {
    marketplace: 'OpenSea',
    contract: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
    tokenId: '49192847250963616308588609813616528462652700069388429320289774529014260090265',
    ethPrice: 11,
    listingTime: 1679379726,
    expirationTime: 1679555359,
  },
  {
    marketplace: 'OpenSea',
    contract: '0xee467844905022d2a6cc1da7a0b555608faae751',
    tokenId: '5745',
    ethPrice: 11,
    listingTime: 1679379726,
    expirationTime: 1679984526,
  },
];

const HTTP_PROXY = 'http://127.0.0.1:9091';
const proxyUrl = new URL(HTTP_PROXY);

let config: Config = {
  apiKey: '11',
  baseUrl: 'https://data-api.nftgo.dev/',
  chain: EVMChain.ETH,
  walletConfig: {
    address: '0x3e24914f74Cd66e3ee7d1F066A880A6c69404E13',
    privateKey: '0xabcdef1234567890',
  },
  agent: new HttpsProxyAgent({
    host: proxyUrl.hostname,
    port: proxyUrl.port,
  }),
};

const utils = new AggregatorUtils(config.web3Provider, config.walletConfig);
let httpClient: HTTPClient = new InternalHTTPClient(config?.agent);

describe('ListingIndexerStable', () => {
  let listingIndexer: ListingIndexerStable;

  beforeEach(() => {
    listingIndexer = new ListingIndexerStable(httpClient, config, utils);
  });

  test('should create an instance of ListingIndexerStable', () => {
    expect(listingIndexer).toBeInstanceOf(ListingIndexerStable);
  });

  test('prepareListing test', async () => {
    expect.assertions(1);
    try {
      const result = await listingIndexer.prepareListing(mockNFTs);
      // const length = result.length;
      const boolean = Boolean(result);
      expect(boolean).toEqual(true);
    } catch (e) {
      console.error(e);
    }
  });

  //   test('approveWithPolicy should throw "Method not implemented." error', () => {
  //     expect(() => {
  //       listingIndexer.approveWithPolicy([[], []], {
  //         autoApprove: true,
  //       });
  //     }).toThrowError('Method not implemented.');
  //   });

  //   test('postListingOrder should throw "Method not implemented." error', async () => {
  //     expect.assertions(1);
  //     try {
  //       await listingIndexer.postListingOrder({});
  //     } catch (error) {
  //       expect((error as any).message).toBe('Method not implemented.');
  //     }
  //   });

  //   test('bulkListing should call runPipeline with correct parameters', async () => {
  //     const nfts: NFTInfoForListing[] = [];
  //     const config: BulkListingOptions = {};

  //     const runPipelineSpy = jest.spyOn(require('../../helpers/pipeline'), 'runPipeline');
  //     await listingIndexer.bulkListing(nfts, config);

  //     expect(runPipelineSpy).toBeCalledWith(expect.any(Array), nfts);
  //   });
});
