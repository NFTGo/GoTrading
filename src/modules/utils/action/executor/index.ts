import { ActionTaskExecutor, ActionTask, ExecuteOptions, AggregatorAction, ActionProcessor, ActionKind } from '@/types';
import { createTask } from '../task';

export class BrowserActionTaskExecutor implements ActionTaskExecutor {
  private tasks: ActionTask[] = [];

  constructor(actions: AggregatorAction<ActionKind>[], public processor: ActionProcessor) {
    this.pushTask(actions);
  }

  private pushTask = (actions: AggregatorAction<ActionKind>[]) => {
    let index = this.tasks.length;
    for (const action of actions) {
      const task = createTask({ action, index, processor: this.processor, updateTask: this.pushTask });
      if (index !== 0) {
        task.pre = this.tasks[index - 1];
      }
      this.tasks.push(task);
      index++;
    }
  };

  execute = async (option?: ExecuteOptions) => {
    const handle = option?.onTaskExecuted;
    for (const task of this.tasks) {
      await task.execute();
      handle?.(task);
    }
  };

  *[Symbol.iterator]() {
    for (const task of this.tasks) {
      yield task;
    }
  }
}
