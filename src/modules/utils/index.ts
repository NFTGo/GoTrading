import { ActionKind, AggregatorAction, Config, HTTPClient, Utils } from '@/types';
import { InternalAggregatorUtils } from './internal-utils';
import { BrowserActionTaskExecutor } from './action';
import { AggregateActionProcessor } from './action/processor';

export function createUtils(config: Config, http: HTTPClient): Utils {
  const internalUtils = new InternalAggregatorUtils(config, http);
  const processor = new AggregateActionProcessor(internalUtils, config, http);

  internalUtils.createActionExecutor = (actions: AggregatorAction<ActionKind>[]) => {
    return new BrowserActionTaskExecutor(actions, processor);
  };
  internalUtils.processor = processor;
  const utils = internalUtils as Utils;
  return utils;
}
