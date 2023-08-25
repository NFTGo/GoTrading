import { BrowserActionTaskExecutor } from '../src/modules/utils/action';
import { ActionKind, ActionProcessor, AggregatorAction } from '../src';

describe('Test executor', () => {
  it('test controller task', async () => {
    const allActions = [
      {
        kind: ActionKind.Transaction,
      },
      {
        kind: ActionKind.Controller,
      },
      {
        kind: ActionKind.Signature,
      },
      {
        kind: ActionKind.PassThrough,
      },
    ];
    const actions = allActions.slice(0, 2) as unknown as AggregatorAction<ActionKind>[];

    const processor: ActionProcessor = {
      async processControllerAction() {
        console.log('get next action');
        return allActions.slice(-2);
      },
      async processSignatureAction() {
        console.log('signature success');
        return 'signature';
      },

      async processTransactionAction() {
        console.log('transaction success');
      },

      async processPassThroughAction() {
        console.log('post order success');
      },
    } as unknown as ActionProcessor;

    const executor = new BrowserActionTaskExecutor(actions, processor);

    let index = 0;

    for (const task of executor) {
      await task.execute();
      expect(task.action.kind).toBe(allActions[index].kind);
      index++;
    }
  });
});
