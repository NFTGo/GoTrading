import { Aggregator, Config } from './interface';
import { AggregatorV1 } from './aggregator-v1';
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
    api: new AggregatorV1(new InternalHTTPClient(), config),
  };
}
