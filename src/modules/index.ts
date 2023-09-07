import { Config, GoTrading } from '@/types';
import { OrderFetcher } from './order-fetcher';
import { Aggregator } from './aggregator';
import { HTTPClientStable } from '@/http';
import { createUtils } from './utils';
import { ensureConfig } from './config';
export type Option = Partial<Config>;
export function init(option: Option): GoTrading {
  const config = ensureConfig(option);

  const httpClient = new HTTPClientStable(option?.agent);

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
