import { initConfig } from './common/config';
import { Aggregator } from '../src/modules/aggregator';
import { createUtils } from '../src/modules/utils';
import { HTTPClientStable } from '../src/http';

import { setGlobalDispatcher, ProxyAgent } from 'undici';
import { getWeiPrice } from './common/utils';

const HTTP_PROXY = 'http://127.0.0.1:9999';

const proxyAgent = new ProxyAgent(HTTP_PROXY);
setGlobalDispatcher(proxyAgent);

const config = initConfig();
const utils = createUtils(config);
const httpClient = new HTTPClientStable();

const aggregator = new Aggregator(httpClient, config, utils);

const params = [
  // {
  //   collection: '0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63',
  //   weiPrice: '10000000000',
  //   orderKind: 'blur',
  //   orderbook: 'blur',
  //   listingTime: '1688017270',
  //   expirationTime: '1699017270',
  // },
  {
    collection: '0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63',
    weiPrice: getWeiPrice(0.001),
    orderKind: 'seaport-v1.5',
    orderbook: 'opensea',
    listingTime: '1688017270',
    expirationTime: '1689017270',
  },
];
describe('create offer main process', () => {
  test('create offer', async () => {
    const address = config.walletConfig?.address || '';
    const res = await aggregator.createOffers({
      maker: address,
      params: params as any,
    });
    const { executeActions } = res;
    await executeActions({
      onTaskExecuted: task => {
        console.info(task);
      },
    });
    expect(executeActions).toEqual(expect.any(Function));
  });
});
