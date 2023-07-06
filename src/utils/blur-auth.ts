import {BASE_URL} from '../config';
import {BaseException} from '../exceptions/base';
import {EVMChain, HTTPClient, Config} from '../interface';

interface BlurAuthChallenge {
  expiresOn: string;
  hmac: string;
  message: string;
  walletAddress: string;
}

interface BlurAuthLoginParams extends BlurAuthChallenge {
  signature: string;
}

interface Signer {
  signMessage: (message: string) => Promise<string>;
}

export interface BlurAuthServiceImpl {
  authorize: (address: string, force?: boolean) => Promise<string>;
}

export class BlurMarketAuthenticator implements BlurAuthServiceImpl {
  private accessToken: string | undefined;
  private signer: Signer;
  private httpClient: HTTPClient;
  private config: Config;

  constructor(signer: Signer, httpClient: HTTPClient, config: Config) {
    this.signer = signer;
    this.httpClient = httpClient;
    this.config = config;
  }
  private get headers() {
    return {'X-API-KEY': this.config.apiKey, 'X-FROM': 'js_sdk'};
  }

  private get url() {
    return (
      (this.config?.baseUrl ?? BASE_URL) +
      (this.config?.chain ?? EVMChain.ETH) +
      '/v1'
    );
  }

  private async getAuthSignature(message: string) {
    const signature = this.signer.signMessage(message);
    return signature;
  }
  private async getAuthChallenge(address: string) {
    const res = await this.httpClient.get<BlurAuthChallenge, {address: string}>(
      this.url + '/nft-aggregate/blur_auth_challenge',
      {
        address,
      },
      this.headers
    );
    return res;
  }
  private async signBlurAuthChallenge(
    params: BlurAuthLoginParams
  ): Promise<string> {
    const res = await this.httpClient.post<
      {accessToken: string},
      BlurAuthLoginParams
    >(this.url + '/nft-aggregate/blur_login', params, this.headers);
    return res?.accessToken;
  }
  async authorize(address: string, force = false) {
    if (!address) {
      throw new BaseException('address is required');
    }
    if (this.accessToken && !force) {
      return this.accessToken;
    }
    const challenge = await this.getAuthChallenge(address);
    const {message} = challenge;
    const signature = await this.getAuthSignature(message);
    const token = await this.signBlurAuthChallenge({
      ...challenge,
      signature,
    });
    this.accessToken = token;
    return token;
  }
}
