import { Config, EVMChain } from '@/types';

export function ensureConfig(option: Partial<Config>): Config {
  const baseUrl = 'https://data-api.nftgo.io';

  const chain = EVMChain.ETHEREUM;

  const config: Config = {
    baseUrl,
    chain,
    ...option,
  };

  // TODO: field validation such as chian and base url
  // e.g. config.baseUrl.test(/^https:\/\/*/,)

  return config;
}
