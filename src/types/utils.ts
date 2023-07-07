import {ActionTaskExecutor, AggregatorAction} from './action';

export interface AggregatorUtils {
  createActionExecutor(actions: AggregatorAction[]): ActionTaskExecutor;
  // blur auth
}
