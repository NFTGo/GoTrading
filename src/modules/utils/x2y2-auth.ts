import { X2Y2Authenticator, X2Y2AuthenticatorParams } from '@/types';

import Web3 from 'web3';

export class X2Y2MarketplaceAuthenticator implements X2Y2Authenticator {
  constructor(private web3: Web3) {}

  authorize = async ({ address }: X2Y2AuthenticatorParams) => {
    const message = this.web3.utils
      .utf8ToHex(`Before canceling the listing, please sign X2Y2 to let us verify that you are the owner of this address:
    ${address}
    This will not cost you any gas fees.
    `);

    const signature = await this.web3.eth.sign(message, address);

    return {
      message,
      signature,
    };
  };
}
