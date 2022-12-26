import { Aggregator, Config, EVMChain } from './interface';
import { AggregatorStable } from './v1/aggregator';
import { InternalHTTPClient } from './internal-http-client';

/**
 * user-land create aggregator client method
 * @param config init client config {@link Config}
 * @returns sdk-client {@link Aggregator}
 */
export function init(config: Config): {
  api: Aggregator;
} {
  return {
    api: new AggregatorStable(new InternalHTTPClient(), { ...config, chain: config?.chain || EVMChain.ETH }),
  };
}
