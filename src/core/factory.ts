import { Aggregator, Config, EVMChain, GoTrading } from './interface';
import { AggregatorStable } from './v1/aggregator';
import { InternalHTTPClient } from './internal-http-client';

/**
 * user-land create aggregator client method
 * @param config init client config {@link Config}
 * @returns sdk-client {@link Aggregator}
 */
export function init(config: Config): GoTrading {
  return {
    aggregator: new AggregatorStable(new InternalHTTPClient(), {
      ...config,
      baseUrl: config?.baseUrl || 'https://aggregator.data-api.nftgo.io',
      chain: config?.chain || EVMChain.ETH,
    }),
  };
}
