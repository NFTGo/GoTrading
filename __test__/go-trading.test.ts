require('dotenv').config();

import { OrderType } from '@/types';
import { init } from '../src';
import Web3 from 'web3';

describe('Test go-trading sdk', () => {
  const endpoint = process.env.PROVIDER_URL!,
    address = process.env.ADDRESS!,
    privateKey = process.env.PRIVATE_KEY!,
    apiKey = process.env.API_KEY!,
    web3Provider = new Web3.providers.HttpProvider(endpoint);

  const contractAddress = '0xED5AF388653567Af2F388E6224dC7C4b3241C544';

  const sdk = init({
    apiKey,
    baseUrl: 'https://data-api.nftgo.dev',
    web3Provider,
    walletConfig: {
      address,
      privateKey,
    },
  });

  it('fetch Azuki Listing NFT', async () => {
    const orders = await sdk.orderFetcher.getOrdersByContract({
      contractAddress,
      limit: 1,
      offset: 0,
      orderType: OrderType.Listing,
    });
    expect(orders.listingDTOs.length).toBe(1);
  });

  // it("make azuki's blur bid", async () => {
  //   //const blurAuth = await sdk.utils.
  //   const { actions, executeActions } = await sdk.aggregator.createOffers({
  //     blurAuth: 'TODO: ',
  //     maker: address,
  //     params: [],
  //     source: 'nftgo.io',
  //   });
  //   console.log({
  //     actions,
  //   });
  //   expect(1).toBe(1);
  // });
});
