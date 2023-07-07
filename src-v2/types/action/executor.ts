import {ActionTask} from './task';

export interface ActionTaskExecutor {
  execute(options?: ExecuteOptions): Promise<void>;
  [Symbol.iterator]: () => Generator<ActionTask>;
}

export interface ExecuteOptions {
  onTaskExecuted: TaskExecutedHandle;
}

export type TaskExecutedHandle = (task: ActionTask) => void;
