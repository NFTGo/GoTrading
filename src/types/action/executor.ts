import { ActionTask } from './task';

/**
 * Convert actions to tasks and provide an `execute` function that can complete all tasks step by step
 */
export interface ActionTaskExecutor {
  /**
   * Execute tasks step by step
   * @param options {@link ExecuteOptions}
   */
  execute(options?: ExecuteOptions): Promise<void>;
  [Symbol.iterator]: () => Generator<ActionTask>;
}

export interface ExecuteOptions {
  /**
   * Callback after every task executed
   */
  onTaskExecuted: TaskExecutedHandle;
}

export type TaskExecutedHandle = (task: ActionTask) => void;
