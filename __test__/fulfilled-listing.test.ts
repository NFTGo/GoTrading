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
    contractAddress: '0xaaf03a65cbd8f01b512cd8d530a675b3963de255',
    maker: '0xa4201337ff45e434dc9f567da1ec566474dc4793',
    orderId: '64a6b1c41bd6088508703ea2',
    tokenId: '22703',
  },
  {
    contractAddress: '0xaaf03a65cbd8f01b512cd8d530a675b3963de255',
    maker: '0xe8bb5796e841e2814266e1bd04f02edd8fb5ea29',
    orderId: '64a66dc01bd6088508640e59',
    tokenId: '176',
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
    const { actions } = res;
    expect(actions).toEqual(expect.any(Array));
  });
});
