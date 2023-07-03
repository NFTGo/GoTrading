import { BASE_URL } from '../config';
import { BaseException } from '../exceptions/base';
import { EVMChain, HTTPClient } from '../interface';

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
  authorize: (address: string) => Promise<string>;
  getAccessToken: () => string | undefined;
}

export class BlurAuthService implements BlurAuthServiceImpl {
  private accessToken: string | undefined;
  private signer: Signer;
  private httpClient: HTTPClient;
  private config: any;
  // FIXME: config and httpClient should be merged into one
  constructor(signer: Signer, httpClient: HTTPClient, config: any) {
    this.signer = signer;
    this.httpClient = httpClient;
    this.config = config;
  }
  private get headers() {
    return { 'X-API-KEY': this.config.apiKey, 'X-FROM': 'js_sdk' };
  }

  private get url() {
    return (this.config?.baseUrl ?? BASE_URL) + (this.config?.chain ?? EVMChain.ETH) + '/v1';
  }
  private async getBlurAuthSignature(message: string) {
    const signature = this.signer.signMessage(message);
    return signature;
  }
  private async getBlurAuthChallenge(address: string) {
    const res = await this.httpClient.get<BlurAuthChallenge, { address: string }>(
      this.url + '/nft-aggregate/blur_auth_challenge',
      {
        address,
      },
      this.headers
    );
    return res;
  }
  private async signBlurAuthChallenge(params: BlurAuthLoginParams): Promise<string> {
    const res = await this.httpClient.post<{ accessToken: string }, BlurAuthLoginParams>(
      this.url + '/nft-aggregate/blur_login',
      params,
      this.headers
    );
    return res?.accessToken;
  }
  getAccessToken() {
    return this.accessToken;
  }
  async authorize(address: string) {
    if (!address) {
      throw new BaseException('address is required');
    }
    if (this.accessToken) {
      return this.accessToken;
    }
    const challenge = await this.getBlurAuthChallenge(address);
    const { message } = challenge;
    const signature = await this.getBlurAuthSignature(message);
    const token = await this.signBlurAuthChallenge({
      ...challenge,
      signature,
    });
    this.accessToken = token;
    return token;
  }
}

export function isHasBlurOrder(cartItem: any) {
  const { itemOrders } = cartItem ?? {};
  if (!itemOrders || itemOrders.length === 0) {
    return false;
  }
  return Boolean(itemOrders?.[0]?.orderDetail?.market.name === 'blur');
}
