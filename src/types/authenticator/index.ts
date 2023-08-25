export interface Authenticator<P = unknown, R = unknown> {
  authorize: (params: P) => Promise<R>;
}

export type BlurAuthenticatorParams = {
  address: string;
  force?: boolean;
};

export type BlurAuthenticator = Authenticator<BlurAuthenticatorParams, string>;

export type X2Y2AuthenticatorParams = {
  address: string;
};

export type X2Y2AuthenticatorResult = {
  message: string;
  signature: string;
};

export type X2Y2Authenticator = Authenticator<X2Y2AuthenticatorParams, X2Y2AuthenticatorResult>;
