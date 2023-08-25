import { UtilsException } from '@/exceptions';
import { Config } from '@/types';
import Web3 from 'web3';
import { ethers } from 'ethers';

// TODO: use chain lib instate of specific lib
export class EthereumLib {
  web3?: Web3;
  ethersWallet?: ethers.providers.Web3Provider;
  ethersSigner?: ethers.Signer;

  constructor(private config: Config) {
    const provider = this.config.web3Provider ?? Reflect.get(globalThis, 'ethereum');
    const walletConfig = this.config?.walletConfig;
    if (provider) {
      this.web3 = new Web3(provider);

      this.ethersWallet = new ethers.providers.Web3Provider(provider);
      if (walletConfig) {
        if (typeof walletConfig.address !== 'string') {
          throw UtilsException.invalidParamError('walletConfig.address');
        }
        if (typeof walletConfig.privateKey !== 'string') {
          throw UtilsException.invalidParamError('walletConfig.privateKey');
        }
        this.ethersSigner = new ethers.Wallet(
          walletConfig.privateKey,
          new ethers.providers.JsonRpcProvider(provider.host)
        );
        this.web3.eth.accounts.wallet.add(walletConfig);
      } else {
        this.ethersSigner = this.ethersWallet.getSigner(0);
      }
    }
  }
}
