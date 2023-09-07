import { OrderKind, Orderbook, init } from '../src';
import { HttpsProxyAgent } from 'https-proxy-agent';
import Web3 from 'web3';

describe('create offer main process', () => {
  const endpoint = process.env.PROVIDER_URL!,
    address = process.env.ADDRESS!,
    privateKey = process.env.PRIVATE_KEY!,
    apiKey = process.env.API_KEY!,
    web3Provider = new Web3.providers.HttpProvider(endpoint);

  const sdk = init({
    apiKey,
    web3Provider,
    walletConfig: {
      address,
      privateKey,
    },
    agent: new HttpsProxyAgent('http://127.0.0.1:7890'),
  });

  test('should return buy actions', async () => {
    const res = await sdk.aggregator.createOffers({
      maker: process.env.ADDRESS as string, // your address
      params: [
        {
          collection: '0xed5af388653567af2f388e6224dc7c4b3241c544',
          quantity: 1,
          weiPrice: '10000000000000',
          orderKind: OrderKind.SeaportV15,
          orderbook: Orderbook.Opensea,
          listingTime: '1692605611',
          expirationTime: '1692615611',
          automatedRoyalties: true,
        },
      ],
    });

    const { actions } = res;
    console.log({ actions });
    expect(Array.isArray(actions)).toBe(true);
  });
});
