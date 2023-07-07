import { AggregatorAction, ActionKind, ActionProcessor } from '@/types';
import { BrowserActionTaskExecutor } from './executor';
import { createTasks } from '../task';

export function createExecutor(actions: AggregatorAction<ActionKind>[]) {
  const tasks = createTasks(actions);
  return new BrowserActionTaskExecutor(tasks);
}
