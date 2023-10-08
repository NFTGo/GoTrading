export interface Authenticator<P = unknown, R = unknown> {
  authorize: (params: P) => Promise<R>;
}

export type BlurAuthenticatorParams = {
  address: string;
  force?: boolean;
};

export interface BlurAuthChallenge {
  expiresOn: string;
  hmac: string;
  message: string;
  walletAddress: string;
}

export interface BlurAuthLoginParams extends BlurAuthChallenge {
  signature: string;
}

export type BlurAuthenticator = Authenticator<BlurAuthenticatorParams, string> & {
  signBlurAuthChallenge: (params: BlurAuthLoginParams) => Promise<string>;
  getAuthChallenge(address: string): Promise<BlurAuthChallenge>;
  getAuthSignature(message: string): Promise<string>;
};

export type X2Y2AuthenticatorParams = {
  address: string;
};

export type X2Y2AuthenticatorResult = {
  message: string;
  signature: string;
};

export type X2Y2Authenticator = Authenticator<X2Y2AuthenticatorParams, X2Y2AuthenticatorResult>;
