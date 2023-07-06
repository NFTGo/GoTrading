import {initWeb3Provider, initConfig, walletConfig} from './config';
import {Aggregator} from '..';
import {AggregatorUtils} from '../../../utils';
import {HTTPClientStable} from '../../../http-client';
import {OrderKind, Orderbook} from '../../interface';
import {
  getCurrentTimeStamp,
  getX2Y2Order,
  getOpenSeaOrder,
  getWeiPrice,
  getBlurOrder,
} from './utils';
import {setGlobalDispatcher, ProxyAgent} from 'undici';
import {BlurMarketAuthenticator} from '../../../utils/blur-auth';

const HTTP_PROXY = 'http://127.0.0.1:9999';

const proxyAgent = new ProxyAgent(HTTP_PROXY);
setGlobalDispatcher(proxyAgent);

const config = initConfig();
const provider = initWeb3Provider();
const utils = new AggregatorUtils(provider, walletConfig);
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
  getX2Y2Order(mock721Order),
  // getBlurOrder(mock721Order),
  // getOpenSeaOrder(mock721Order2),
  // getLooksRareOrder(mock721Order),
  // getLooksRareOrder(mock721Order2),
];

const blurOrders = [getBlurOrder(mock721Order)];

describe('create listing main process', () => {
  let executeAllActions = () => {};
  test('should return create listing actions', async () => {
    const maker = walletConfig.address;
    const res = await aggregator.createListings({
      maker,
      params: orders,
    });
    const {actions, executeActions} = res;
    executeAllActions = executeActions;
    expect(executeActions).toEqual(expect.any(Function));
    expect(actions).toEqual(expect.any(Array));
  });
  test('should execute all actions', async () => {
    await expect(executeAllActions()).resolves.toEqual(true);
  });
});

describe('[blur order] create listing main process', () => {
  let blurAuthToken = '';
  beforeAll(async () => {
    const authenticator = new BlurMarketAuthenticator(
      utils,
      httpClient,
      config
    );
    blurAuthToken = await authenticator.authorize(walletConfig.address);
    // 执行初始化操作或设置步骤
    console.log('Starting test suite...');
  });
  let executeAllActions = () => {};
  test('should return create listing actions', async () => {
    const maker = walletConfig.address;
    const res = await aggregator.createListings({
      maker,
      blurAuth: blurAuthToken,
      params: blurOrders,
    });
    const {actions, executeActions} = res;
    executeAllActions = executeActions;
    expect(executeActions).toEqual(expect.any(Function));
    expect(actions).toEqual(expect.any(Array));
  });
  test('should execute all actions', async () => {
    await expect(executeAllActions()).resolves.toEqual(true);
  });
});

describe('[error test] interface create listing', () => {
  test('[empty blur token] listing should return error when blur token is empty', async () => {
    const maker = walletConfig.address;
    const func = async () => {
      await aggregator.createListings({
        maker,
        params: [getBlurOrder(mock721Order)],
      });
    };
    await expect(func()).rejects.toThrow();
  });
  test('[incorrect maker] listing should return error when maker is incorrect', async () => {
    const maker = '0x3e24914f74Cd66e3ee7d1F066A880A6c69404E13';
    const func = async () => {
      await aggregator.createListings({
        maker,
        params: orders,
      });
    };
    await expect(func()).rejects.toThrow();
  });
});
