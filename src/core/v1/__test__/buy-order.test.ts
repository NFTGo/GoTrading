import { NFTBaseInfo, NFTInfoForTrade, NftsListingInfo } from '../../interface';
import { init } from '../../../index';
import { initConfig } from './config';
// const maker = process.env.ADDRESS ?? '';
const config = initConfig();

const bulkBuyConfig = {
  ignoreUnListedNFTs: false, // Do you want to ignore unlisted NFTs?
  ignoreInvalidOrders: false, // Do you want to ignore invalid orders?
  ignoreSuspiciousNFTs: false, // Do you want to ignore suspicious NFTs?
  withSafeMode: false, // Use Safe Mode or Without Safe Mode.
};

const nfts: NFTInfoForTrade[] = [
  {
    contract: '',
    tokenId: '',
    amount: 1, // How many you want to buy. Usually used in ERC1155 nfts
  },
];

describe('Bulk Buy aggregator', () => {
  const { aggregator } = init(config);
  const blurAuthService = aggregator.blurLoginAuthService;
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('bulk buy', () => {
    it('should return the access token if already exists', async () => {
      const result = await blurAuthService.getAccessToken();
      expect(result).toBe(undefined);
    });
    it('should return bulk buy result', async () => {
      const result = await aggregator.bulkBuy({
        nfts,
        onSendingTransaction: (hash: string) => console.log(hash), // Callback on sending a transaction
        onFinishTransaction: (
          // Callback on a transaction finished
          successNFTs: NFTBaseInfo[],
          failNFTs: NFTBaseInfo[],
          nftsListingInfo: NftsListingInfo
        ) => console.log(successNFTs, failNFTs, nftsListingInfo),
        onError: (error: Error, nftsListingInfo?: NftsListingInfo) => console.log(error, nftsListingInfo), // Callback on any error occurs
        config: bulkBuyConfig,
      });
      expect(result).toBeTruthy();
    }, 30000);
    it('should return the access token if already exists', async () => {
      const token = await blurAuthService.getAccessToken();
      console.info('token', token);
      expect(typeof token).toEqual('string');
    });
  });
});
