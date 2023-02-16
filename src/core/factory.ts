import { Aggregator, Config, EVMChain, GoTrading } from './interface';
import { AggregatorStable } from './v1/aggregator';
import { InternalHTTPClient } from './internal-http-client';
import { AggregatorUtils } from './v1/utils';

/**
 * user-land create aggregator client method
 * @param config init client config {@link Config}
 * @returns sdk-client {@link Aggregator} {@link AggregatorUtils}
 *
 */
export function init(config: Config): GoTrading {
  const aggregatorApi = new AggregatorStable(new InternalHTTPClient(), {
    ...config,
    base_url: config?.base_url || 'https://aggregator.data-api.nftgo.io/',
    chain: config?.chain || EVMChain.ETH,
  });
  const aggregatorUtils = config.web3_provider ? new AggregatorUtils(config.web3_provider) : null;
  return {
    aggregator: aggregatorApi,
    utils: aggregatorUtils,
  };
}
