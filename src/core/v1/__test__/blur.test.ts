import { HTTPClient } from '../../interface';
import { HTTPClientStable } from '../../http-client';
import { BlurAuthService } from '../utils/blur-auth';
import { initConfig } from './config';
import { AggregatorUtils } from '../utils';

const maker = process.env.ADDRESS ?? '';
const config = initConfig();
let httpClient: HTTPClient = new HTTPClientStable(config?.agent);
const utils = new AggregatorUtils(config.web3Provider, config.walletConfig);

describe('BlurAuthService', () => {
  const blurAuthService = new BlurAuthService(utils, httpClient, config);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('authorize', () => {
    it('should return the access token if already exists', async () => {
      const result = await blurAuthService.authorize(maker);
      expect(result).toBe(undefined);
      expect(utils.signMessage).not.toHaveBeenCalled();
      expect(httpClient.post).not.toHaveBeenCalled();
    });

    it('should retrieve challenge and access token using signer and http client', async () => {
      const result = await blurAuthService.authorize(maker);
      expect(result).toBeTruthy();
      expect(httpClient.post).toHaveBeenCalledWith('/nft-aggregate/blur_auth_challenge', {
        address: maker,
      });
      expect(httpClient.post).toHaveBeenCalledWith('/nft-aggregate/blur_login', {
        expiresOn: expect.any(String),
        hmac: expect.any(String),
        message: 'mockMessage',
        signature: 'mockSignature',
        walletAddress: maker,
      });
    });
  });

  describe('getAccessToken', () => {
    it('should return the access token', () => {
      const result = blurAuthService.getAccessToken();
      expect(result).toBeTruthy();
    });
  });
});
