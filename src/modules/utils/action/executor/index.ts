import {TradeAggregatorAction, ActionKind} from '@/types';
import {BrowserActionTaskExecutor} from './executor';
import {createTasks} from '../task';

export function createExecutor(actions: TradeAggregatorAction<ActionKind>[]) {
  const tasks = createTasks(actions);
  return new BrowserActionTaskExecutor(tasks);
}
