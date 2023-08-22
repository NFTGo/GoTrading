import { BaseException } from '@/exceptions';
import { HTTPClient, Config, AggregatorApiStatusResponse } from '@/types';

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
    return { 'X-API-KEY': this.config.apiKey, 'X-FROM': 'js_sdk' } as Record<string, string>;
  }

  private get url() {
    return this.config.baseUrl + '/utils/v1/blur';
  }

  private async getAuthSignature(message: string) {
    const signature = this.signer.signMessage(message);
    return signature;
  }

  private async getAuthChallenge(address: string) {
    const { code, msg, data } = await this.httpClient.post<
      AggregatorApiStatusResponse<BlurAuthChallenge>,
      { address: string }
    >(
      this.url + '/get-auth-challenge',
      {
        address,
      },
      this.headers
    );
    if (code !== 'SUCCESS') {
      throw new BaseException('get challenge failed:', msg);
    }
    return data;
  }
  private async signBlurAuthChallenge(params: BlurAuthLoginParams): Promise<string> {
    const { code, msg, data } = await this.httpClient.post<
      AggregatorApiStatusResponse<{ blurAuth: string }>,
      BlurAuthLoginParams
    >(this.url + '/get-auth', params, this.headers);
    if (code !== 'SUCCESS') {
      throw new BaseException('get blur auth failed:', msg);
    }
    return data?.blurAuth;
  }
  async authorize(address: string, force = false) {
    if (!address) {
      throw new BaseException('address is required');
    }
    if (this.accessToken && !force) {
      return this.accessToken;
    }
    const challenge = await this.getAuthChallenge(address);
    const { message } = challenge;
    const signature = await this.getAuthSignature(message);
    const token = await this.signBlurAuthChallenge({
      ...challenge,
      signature,
    });
    this.accessToken = token;
    return token;
  }
}
