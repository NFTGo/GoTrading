import Web3 from 'web3';
import { init } from '../../src';

export function createEnvTestSdk() {
  const endpoint = process.env.PROVIDER_URL!,
    address = process.env.ADDRESS!,
    privateKey = process.env.PRIVATE_KEY!,
    apiKey = process.env.API_KEY!,
    web3Provider = new Web3.providers.HttpProvider(endpoint);

  const sdk = init({
    apiKey,
    baseUrl: process.env.BASE_URL,
    web3Provider,
    walletConfig: {
      address,
      privateKey,
    },
  });

  return {
    sdk,
    address,
  };
}
