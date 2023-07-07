import { AggregatorInterface } from './aggregator';
import { Config } from './config';
import { OrderFetcherInterface } from './order-fetcher';
import { Utils } from './utils';

export interface GoTrading {
  orderFetcher?: OrderFetcherInterface;
  utils?: Utils | null;
  aggregator?: AggregatorInterface;
  config: Config;
}
