import { ActionTaskExecutor, ActionTask, ExecuteOptions, Config, AggregatorAction } from '@/types';
import { createTask } from '../task';

export class BrowserActionTaskExecutor implements ActionTaskExecutor {
  private tasks: ActionTask[] = [];

  constructor(actions: AggregatorAction[]) {
    for (let index = 0; index < actions.length; index++) {
      const action = actions[index];
      const task = createTask(action, index);
      if (index !== 0) {
        task.pre = this.tasks[index - 1];
      }
      this.tasks.push(task);
    }
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
