import {AggregatorInterface} from './aggregator';
import {OrderFetcherInterface} from './order-fetcher';
import {Utils} from './utils';

export interface GoTrading {
  orderFetcher?: OrderFetcherInterface;
  utils?: Utils | null;
  aggregator?: AggregatorInterface;
}
