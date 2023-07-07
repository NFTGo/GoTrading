import { initConfig } from './common/config';
import { Aggregator } from '../src/modules/aggregator';
import { createUtils } from '../src/modules/utils';
import { HTTPClientStable } from '../src/http';

import { setGlobalDispatcher, ProxyAgent } from 'undici';

const HTTP_PROXY = 'http://127.0.0.1:9999';

const proxyAgent = new ProxyAgent(HTTP_PROXY);
setGlobalDispatcher(proxyAgent);

const config = initConfig();
const utils = createUtils(config);
const httpClient = new HTTPClientStable();

const aggregator = new Aggregator(httpClient, config, utils);

const orders = [
  {
    contractAddress: '0xe2e73bc9952142886424631709e382f6bc169e18',
    maker: '0xec9e512fe7e90134d8ca7295329ccb0a57c91ecb',
    orderId: '64a79a9f1bd6088508d7b331',
    tokenId: '2963',
  },
  {
    contractAddress: '0xe2e73bc9952142886424631709e382f6bc169e18',
    maker: '0xd33843650b6e71503f306c177d283c92c002741d',
    orderId: '64a717c11bd6088508a6ffe4',
    tokenId: '3363',
  },
];
describe('fulfill listing main process', () => {
  test('should return buy actions', async () => {
    const buyer = config.walletConfig?.address || '';
    const res = await aggregator.fulfillListings({
      buyer: buyer,
      orderIds: orders.map(order => order.orderId),
      safeMode: false,
    });
    const { executeActions } = res;
    await executeActions({
      onTaskExecuted: task => {
        console.info(task);
      },
    });
    expect(executeActions).toEqual(expect.any(Function));
  });
  // test('should return safe mode buy actions', async () => {
  //   const buyer = config.walletConfig?.address || '';
  //   const res = await aggregator.fulfillListings({
  //     buyer: buyer,
  //     orderIds: orders.map(order => order.orderId),
  //     safeMode: true,
  //   });
  //   const { executeActions } = res;
  //   await executeActions({
  //     onTaskExecuted: task => {
  //       console.info(task);
  //     },
  //   });
  //   expect(executeActions).toEqual(expect.any(Function));
  // });
});
