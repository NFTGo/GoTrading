import {TradeAggregatorAction, TradeAggregatorActionKind} from '@/types';
import {BrowserActionTaskExecutor} from './executor';
import {createTasks} from '../task';

export function createExecutor(actions: TradeAggregatorAction<TradeAggregatorActionKind>[]) {
  const tasks = createTasks(actions);
  return new BrowserActionTaskExecutor(tasks);
}
