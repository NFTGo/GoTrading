import { ActionProcessor, AggregatorAction, Config, Utils } from '@/types';
import { InternalAggregatorUtils } from './internal-utils';
import { BrowserActionTaskExecutor } from './action';
import { AggregateActionProcessor } from './action/processor';

export function createUtils(config: Config): Utils {
  const internalUtils = new InternalAggregatorUtils(config);

  const processor: ActionProcessor = new AggregateActionProcessor(internalUtils, config);

  internalUtils.createActionExecutor = (actions: AggregatorAction[]) => {
    return new BrowserActionTaskExecutor(actions, processor); // need processor
  };

  const utils = internalUtils as Utils;

  return utils;
}
