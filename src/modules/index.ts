import { Config, GoTrading } from '@/types';
import { OrderFetcher } from './order-fetcher';
import { Aggregator } from './aggregator';
import { HTTPClientStable } from 'src/http/client';
import { createUtils } from './utils';

export function init(config: Config): GoTrading {
  const httpClient = new HTTPClientStable();

  const orderFetcher = new OrderFetcher(httpClient, config);

  const utils = createUtils(config);

  const aggregator = new Aggregator(httpClient, config, utils);

  const goTrading: GoTrading = Object.freeze({
    orderFetcher,
    aggregator,
    utils,
    config,
  });

  return goTrading;
}
