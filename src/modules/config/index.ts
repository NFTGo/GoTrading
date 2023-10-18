import { Config, EVMChain } from '@/types';

/**
 * Set config's default values
 * @param option {@link Partial<Config>}
 * @returns Config {@link Config}
 */
export function ensureConfig(option: Partial<Config>): Config {
  const baseUrl = 'https://data-api.nftgo.io';

  const chain = EVMChain.ETHEREUM;

  const config: Config = {
    baseUrl,
    chain,
    ...option,
  };

  return config;
}
