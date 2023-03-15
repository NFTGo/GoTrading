import { Aggregator, Config, EVMChain, GoTrading } from './interface';
import { AggregatorStable } from './v1/aggregator';
import { InternalHTTPClient } from './internal-http-client';
import { AggregatorUtils } from './v1/utils';
import { AggregatorApiException, AggregatorBaseException } from './exception';

/**
 * user-land create aggregator client method
 * @param config init client config {@link Config}
 * @returns sdk-client {@link Aggregator} {@link AggregatorUtils}
 *
 */
export function init(config: Config): GoTrading {
  if (!config.apiKey) {
    throw AggregatorApiException.missApiKeyError();
  }
  if (config.chain && !Object.values(EVMChain).includes(config.chain)) {
    throw AggregatorBaseException.invalidParamError('chain', `${config.chain} chain is not supported currently.`);
  }
  const aggregatorUtils =
    config?.web3Provider || config?.walletConfig
      ? new AggregatorUtils(config.web3Provider, config.walletConfig)
      : undefined;
  const aggregatorApi = new AggregatorStable(
    new InternalHTTPClient(config.agent),
    {
      ...config,
      baseUrl: config?.baseUrl || 'https://aggregator.data-api.nftgo.io/',
      chain: config?.chain || EVMChain.ETH,
    },
    aggregatorUtils
  );
  return {
    aggregator: aggregatorApi,
    utils: aggregatorUtils,
  };
}
