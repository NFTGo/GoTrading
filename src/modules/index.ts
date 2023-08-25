import { Config, GoTrading } from '@/types';
import { OrderFetcher } from './order-fetcher';
import { Aggregator } from './aggregator';
import { HTTPClientStable } from '@/http';
import { createUtils } from './utils';
import { ensureConfig } from './config';

export function init(option: Partial<Config>): GoTrading {
  const config = ensureConfig(option);

  const httpClient = new HTTPClientStable();

  const orderFetcher = new OrderFetcher(httpClient, config);

  const utils = createUtils(config, httpClient);

  const aggregator = new Aggregator(httpClient, config, utils);

  const goTrading: GoTrading = Object.freeze({
    orderFetcher,
    aggregator,
    utils,
    config,
  });

  return goTrading;
}
