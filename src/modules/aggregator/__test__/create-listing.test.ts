import {initWeb3Provider, initConfig, walletConfig} from './config';
import {Aggregator} from '..';
import {AggregatorUtils} from '../../../utils';
import {HTTPClientStable} from '../../../http-client';
import {OrderKind, Orderbook} from '../../interface';
import {getCurrentTimeStamp, getWeiPrice} from './utils';
import {setGlobalDispatcher, ProxyAgent} from 'undici';

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
  {
    token: mock721Order.contract + ':' + mock721Order.tokenId,
    weiPrice: getWeiPrice(mock721Order.ethPrice),
    listingTime: getCurrentTimeStamp(0).toString(),
    expirationTime: getCurrentTimeStamp(3600000).toString(),
    options: {
      'seaport-v1.5': {
        useOffChainCancellation: false,
      },
    },
    orderbook: Orderbook.Opensea,
    orderKind: OrderKind.SeaportV15,
  },
  {
    token: mock721Order.contract + ':' + mock721Order.tokenId,
    weiPrice: getWeiPrice(mock721Order.ethPrice),
    listingTime: getCurrentTimeStamp(0).toString(),
    expirationTime: getCurrentTimeStamp(3600000).toString(),
    options: {},
    orderbook: Orderbook.LooksRare,
    orderKind: OrderKind.LooksRareV2,
  },
  {
    token: mock721Order.contract + ':' + mock721Order.tokenId,
    weiPrice: getWeiPrice(mock721Order.ethPrice),
    listingTime: getCurrentTimeStamp(0).toString(),
    expirationTime: getCurrentTimeStamp(3600000).toString(),
    options: {},
    orderbook: Orderbook.Blur,
    orderKind: OrderKind.Blur,
  },
];

describe('create listing main process', () => {
  test('should return create listing actions', async () => {
    const maker = walletConfig.address;
    const res = await aggregator.createListings({
      maker,
      params: orders,
    });
    const {actions, executeActions} = res;
    expect(executeActions).toEqual(expect.any(Function));
    expect(actions).toEqual(expect.any(Array));
  });
  test('should excute actions', async () => {
    const maker = '0x3e24914f74Cd66e3ee7d1F066A880A6c69404E13';
    const res = await aggregator.createListings({
      maker,
      params: orders,
    });
    const {actions, executeActions} = res;
    expect(executeActions).toEqual(expect.any(Function));
    expect(actions).toEqual(expect.any(Array));
  });
});

describe('create listing error', () => {
  test('should return error when maker is incorrect', async () => {
    const maker = '0x3e24914f74Cd66e3ee7d1F066A880A6c69404E13';
    const res = await aggregator.createListings({
      maker,
      params: orders,
    });
    const {actions, executeActions} = res;
    expect(executeActions).toEqual(expect.any(Function));
    expect(actions).toEqual(expect.any(Array));
  });
});
