import { HTTPClient } from '../../interface';
import { InternalHTTPClient } from '../../internal-http-client';
import { BlurAuthService } from '../utils/blur-auth';
import { initConfig } from './config';
import { AggregatorUtils } from '../utils';

const maker = process.env.ADDRESS ?? '';
const config = initConfig();
let httpClient: HTTPClient = new InternalHTTPClient(config?.agent);
const utils = new AggregatorUtils(config.web3Provider, config.walletConfig);

describe('BlurAuthService', () => {
  const blurAuthService = new BlurAuthService(utils, httpClient, config);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('authorize', () => {
    it('should retrieve challenge and access token using signer and http client', async () => {
      const result = await blurAuthService.authorize(maker);
      expect(result).toBeTruthy();
    });
  });

  describe('getAccessToken', () => {
    it('should return the access token', () => {
      const result = blurAuthService.getAccessToken();
      expect(result).toBeTruthy();
    });
  });
});
