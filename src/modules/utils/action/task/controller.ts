import { ActionKind, AggregatorAction } from '@/types';
import { ActionTaskTemplate } from './template';

export class ControllerActionTask extends ActionTaskTemplate<ActionKind.Controller> {
  updateTask?: (action: AggregatorAction<ActionKind>[]) => void;

  protected run = async () => {
    const actions = await this.processor.processControllerAction(this.action);
    this.updateTask?.(actions);
    return null;
  };
}
