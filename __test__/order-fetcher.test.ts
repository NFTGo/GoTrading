require('dotenv').config();

import { OrderType } from '@/types';
import { init } from '../src';
import Web3 from 'web3';

describe('Test order fetcher sdk', () => {
  const endpoint = process.env.PROVIDER_URL!,
    // address = process.env.ADDRESS!,
    // privateKey = process.env.PRIVATE_KEY!,
    apiKey = process.env.API_KEY!,
    web3Provider = new Web3.providers.HttpProvider(endpoint);

  const contractAddress = '0xED5AF388653567Af2F388E6224dC7C4b3241C544';

  const sdk = init({
    apiKey,
    baseUrl: 'https://data-api.nftgo.dev',
    web3Provider,
    // agent:
    // walletConfig: {
    //   address,
    //   privateKey,
    // },
  });

  it('fetch Azuki Listing NFT', async () => {
    const orders = await sdk.orderFetcher.getOrdersByContract({
      contractAddress,
      limit: 1,
      offset: 0,
      orderType: OrderType.Listing,
    });
    expect(orders.listingDTOs.length).toBe(1);
    expect(typeof orders.listingDTOs?.[0].orderHash).toBe('string');
  });

  it('fetch orders by ids', async () => {
    const orders = await sdk.orderFetcher.getOrdersByIds({
      orders: [
        {
          orderId: '650d79013a36395019514b9d',
          orderType: OrderType.Listing,
        },
      ],
    });
    expect(orders.listingDTOs.length).toBe(1);
    expect(typeof orders.listingDTOs?.[0].orderHash).toBe('string');
  });

  it('fetch orders by maker', async () => {
    const orders = await sdk.orderFetcher.getOrdersByMaker({
      maker: '0x08c1ae7e46d4a13b766566033b5c47c735e19f6f',
      orderType: OrderType.Offer,
      includePrivate: true,
    });
    console.log(orders, orders.offerDTOs?.[0]?.orderHash);
    expect(orders.offerDTOs.length > 0).toBe(true);
    expect(typeof orders.offerDTOs?.[0].orderHash).toBe('string');
  });

  it('fetch orders by NFT', async () => {
    const orders = await sdk.orderFetcher.getOrdersByNFT({
      contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
      tokenId: '2632',
      orderType: OrderType.Offer,
    });
    expect(orders.offerDTOs.length > 0).toBe(true);
    expect(typeof orders.offerDTOs?.[0].orderHash).toBe('string');
  });
});
