import { AggregatorAction, Config, GoTrading, Utils } from '@/types';
import { createConfig } from './config';
import { OrderFetcher } from './order-fetcher';
import { Aggregator } from './aggregator';
import { HTTPClientStable } from 'src/http/client';
import { InternalAggregatorUtils } from './utils';
import { BrowserActionTaskExecutor } from './utils/action/executor/executor';

export declare function initIndexer(config: unknown): GoTrading;

export function init(options: Partial<Config>): GoTrading {
  const config = createConfig();

  const httpClient = new HTTPClientStable();

  const orderFetcher = new OrderFetcher(httpClient, config);

  const internalUtils = new InternalAggregatorUtils();

  internalUtils.createActionExecutor = (actions: AggregatorAction[]) => {
    return new BrowserActionTaskExecutor(actions); // need processor
  };

  const utils = internalUtils as Utils;

  const aggregator = new Aggregator(httpClient, config, utils);

  const goTrading: GoTrading = Object.freeze({
    orderFetcher,
    aggregator,
    utils,
    config,
  });

  return goTrading;
}
