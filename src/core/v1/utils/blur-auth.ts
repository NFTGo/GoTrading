import { HTTPClient } from '../../interface';

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
  constructor(signer: Signer, httpClient: HTTPClient) {
    this.signer = signer;
    this.httpClient = httpClient;
  }
  private async getBlurAuthSignature(message: string) {
    const signature = this.signer.signMessage(message);
    return signature;
  }
  private async getBlurAuthChallenge(address: string) {
    const res = await this.httpClient.post<BlurAuthChallenge, { address: string }>(
      '/nft-aggregator/blur/auth/challenge',
      {
        address,
      }
    );
    return res;
  }
  private async signBlurAuthChallenge(params: BlurAuthLoginParams): Promise<string> {
    const res = await this.httpClient.post<{ accessToken: string }, BlurAuthLoginParams>(
      '/nft-aggregator/blur/auth/login',
      params
    );
    return res?.accessToken;
  }
  getAccessToken() {
    return this.accessToken;
  }
  async authorize(address: string) {
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
