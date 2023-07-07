import { initConfig } from './common/config';
import { Aggregator } from '../src/modules/aggregator';
import { createUtils } from '../src/modules/utils';
import { HTTPClientStable } from '../src/http';
import { getX2Y2Order, getOpenSeaOrder, getBlurOrder, getLooksRareOrder } from './common/utils';
import { setGlobalDispatcher, ProxyAgent } from 'undici';
import { BlurMarketAuthenticator } from '../src/modules/utils/blur-auth';

const HTTP_PROXY = 'http://127.0.0.1:9999';

const proxyAgent = new ProxyAgent(HTTP_PROXY);
setGlobalDispatcher(proxyAgent);

const config = initConfig();
const utils = createUtils(config);
const httpClient = new HTTPClientStable();

const aggregator = new Aggregator(httpClient, config, utils);

const mock721Order = {
  contract: '0xee467844905022d2a6cc1da7a0b555608faae751',
  tokenId: '5745',
  ethPrice: 1.45,
};
const mock721Order2 = {
  contract: '0xbe9371326f91345777b04394448c23e2bfeaa826',
  tokenId: '19516',
  ethPrice: 1.45,
};

const orders = [
  // getX2Y2Order(mock721Order),
  // getBlurOrder(mock721Order),
  getOpenSeaOrder(mock721Order),
  // getOpenSeaOrder(mock721Order2),
  // getLooksRareOrder(mock721Order),
  // getLooksRareOrder(mock721Order2),
];

const blurOrders = [getBlurOrder(mock721Order)];

// describe('[create listing] interface result test', () => {
//   let blurAuthToken = '';
//   const address = config.walletConfig?.address || '';
//   beforeAll(async () => {
//     console.log('getting blur auth token...');
//     const authenticator = new BlurMarketAuthenticator(utils, httpClient, config);
//     blurAuthToken = await authenticator.authorize(address);
//   }, 20000);
//   test('[blur order] blur order response', async () => {
//     const maker = address;
//     console.info('blurAuthToken:', blurAuthToken);
//     const res = await aggregator.createListings({
//       maker,
//       blurAuth: blurAuthToken,
//       params: blurOrders,
//     });
//     const { actions, executeActions } = res;
//     expect(executeActions).toEqual(expect.any(Function));
//     expect(actions).toEqual(expect.any(Array));
//   });

//   test('[empty blur token] listing should return error when blur token is empty', async () => {
//     const maker = address;
//     const func = async () => {
//       await aggregator.createListings({
//         maker,
//         params: [getBlurOrder(mock721Order)],
//       });
//     };
//     await expect(func()).rejects.toThrow();
//   });

//   test('[incorrect maker] listing should return error when maker is incorrect', async () => {
//     const maker = '0x3e24914f74Cd66e3ee7d1F066A880A6c69404E13';
//     const func = async () => {
//       await aggregator.createListings({
//         maker,
//         params: orders,
//       });
//     };
//     await expect(func()).rejects.toThrow();
//   });
// });

describe('[create listing] execute actions test', () => {
  test('should return create listing actions', async () => {
    const maker = config.walletConfig?.address || '';
    const res = await aggregator.createListings({
      maker,
      params: orders,
    });
    const { executeActions } = res;
    await executeActions({
      onTaskExecuted: task => {
        console.info(task);
      },
    });
    expect(executeActions).toEqual(expect.any(Function));
    // await executeAllActions();
  });
});
