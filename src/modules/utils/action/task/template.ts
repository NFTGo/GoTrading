import {
  ActionTask,
  ActionTaskStatus,
  AggregatorAction,
  ActionKind,
  ActionProcessor,
  ProcessPassThroughActionParams,
} from '@/types';

export abstract class ActionTaskTemplate<T extends ActionKind> implements ActionTask {
  status: ActionTaskStatus = 'ready';
  pre: ActionTask | null = null;
  error: Error | null = null;
  result: ProcessPassThroughActionParams | boolean | null = null;
  constructor(public action: AggregatorAction<T>, public index: number, protected processor: ActionProcessor) {}
  execute = async () => {
    try {
      this.result = await this.run();
      this.status = 'success';
    } catch (e: unknown) {
      this.error = e as Error;
      this.status = 'fail';
    }
  };
  protected abstract run(): Promise<null | ProcessPassThroughActionParams | boolean>;
}
