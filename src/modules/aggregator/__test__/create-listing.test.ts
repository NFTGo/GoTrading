import {initWeb3Provider, initConfig, walletConfig} from './config';
import {Aggregator} from '..';
import {AggregatorUtils} from '../../../utils';
import {HTTPClientStable} from '../../../http-client';
import {OrderKind, Orderbook} from '../../interface';
import {getCurrentTimeStamp, getWeiPrice} from './utils';

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

console.info(walletConfig);
describe('create listing', () => {
  test('should return create listing actions', async () => {
    const maker = walletConfig.address;
    const actions = await aggregator.createListings({
      maker,
      params: [
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
      ],
    });
    console.info('actions', actions);
    expect(actions).toEqual([]);
  });
});
