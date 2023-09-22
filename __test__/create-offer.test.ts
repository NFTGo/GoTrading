import { OrderKind, Orderbook, init } from '../src';
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
    baseUrl: 'https://data-api.nftgo.dev',
    walletConfig: {
      address,
      privateKey,
    },
  });

  test('should return buy actions', async () => {
    const res = await sdk.aggregator.createOffers({
      maker: process.env.ADDRESS as string, // your address
      params: [
        {
          collection: '0xed5af388653567af2f388e6224dc7c4b3241c544',
          quantity: 1,
          weiPrice: '10000000000000000',
          orderKind: OrderKind.SeaportV15,
          orderbook: Orderbook.Opensea,
          listingTime: (Date.now() / 1000).toFixed(0),
          expirationTime: (Date.now() / 1000 + 3 * 60 * 60).toFixed(0),
          automatedRoyalties: true,
          currency: 'WETH',
        },
      ],
    });

    const { actions, executeActions } = res;
    console.log(actions);
    await executeActions({
      onTaskExecuted: task => {
        console.log(task.action, task.result);
      },
    });
    expect(Array.isArray(actions)).toBe(true);
  });
});
