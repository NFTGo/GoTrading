import { ActionKind, AggregatorAction, Config, HTTPClient, Utils } from '@/types';
import { InternalAggregatorUtils } from './internal-utils';
import { BrowserActionTaskExecutor } from './action';
import { AggregateActionProcessor } from './action/processor';

/**

 * @param config same config with sdk {@link Config}
 * @param httpClient http request functions {@link HTTPClient}
 * @returns utils {@link Utils}
 */
export function createUtils(config: Config, httpClient: HTTPClient): Utils {
  const internalUtils = new InternalAggregatorUtils(config, httpClient);
  const processor = new AggregateActionProcessor(internalUtils, config, httpClient);

  internalUtils.createActionExecutor = (actions: AggregatorAction<ActionKind>[]) => {
    return new BrowserActionTaskExecutor(actions, processor);
  };
  internalUtils.processor = processor;
  const utils = internalUtils as Utils;
  return utils;
}
