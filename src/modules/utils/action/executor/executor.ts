import {
  ActionTaskExecutor,
  ActionTask,
  ExecuteOptions,
  ActionProcessor,
} from '@/types';

export class BrowserActionTaskExecutor implements ActionTaskExecutor {
  constructor(private tasks: ActionTask[], private processor: ActionProcessor) {
    this.execute.bind(this);
  }

  async execute(option?: ExecuteOptions) {
    const handle = option?.onTaskExecuted;
    for (const task of this.tasks) {
      await task.execute();
      handle?.(task);
    }
  }

  *[Symbol.iterator]() {
    for (const task of this.tasks) {
      yield task;
    }
  }
}
