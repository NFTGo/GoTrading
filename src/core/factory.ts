import { Aggregator, Config, EVMChain, GoTrading, ListingIndexerConfig } from './interface';
import { AggregatorStable } from './v1/aggregator';
import { HTTPClientStable } from './http-client';
import { AggregatorUtils } from './v1/utils';
import { AggregatorApiException, AggregatorBaseException } from './exception';
import { ListingIndexerStable } from './v1/listing-indexer';

function initAggregatorUtils(config: Config) {
  if (!config.apiKey) {
    throw AggregatorApiException.missApiKeyError();
  }
  if (config.chain && !Object.values(EVMChain).includes(config.chain)) {
    throw AggregatorBaseException.invalidParamError('chain', `${config.chain} chain is not supported currently.`);
  }
  const aggregatorUtils =
    (globalThis as any)?.ethereum || config?.web3Provider || config?.walletConfig
      ? new AggregatorUtils(config.web3Provider, config.walletConfig)
      : undefined;

  return aggregatorUtils;
}
/**
 * user-land create aggregator client method
 * @param config init client config {@link Config}
 * @returns sdk-client {@link Aggregator} {@link AggregatorUtils}
 *
 */
export function init(config: Config): GoTrading {
  const aggregatorUtils = initAggregatorUtils(config);
  const aggregatorApi = new AggregatorStable(new HTTPClientStable(config.agent), config, aggregatorUtils);
  return {
    aggregator: aggregatorApi,
    utils: aggregatorUtils,
  };
}

export function initListingIndexer(config: ListingIndexerConfig) {
  const aggregatorUtils = initAggregatorUtils(config);
  if (!aggregatorUtils) {
    throw AggregatorBaseException.missingParamError('web3Provider');
  }
  const listingIndexer = new ListingIndexerStable(new HTTPClientStable(config.agent), config, aggregatorUtils);
  return {
    listingIndexer,
    utils: aggregatorUtils,
  };
}
