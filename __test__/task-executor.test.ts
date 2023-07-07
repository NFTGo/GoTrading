import {createExecutor} from '../src-v2/action';
import {TaskExecutedHandle, TradeAggregatorAction, TradeAggregatorActionKind, TradeAggregatorActionName} from '../src-v2/types';

describe('Aggregator v1 Test', () => {
  const signatureAction: TradeAggregatorAction<TradeAggregatorActionKind.Signature> = {
    name: TradeAggregatorActionName.CurrencyApproval,
    kind: TradeAggregatorActionKind.Signature,
    data: {
      orderIndexes: [1, 2, 3],
      sign: {},
      body: {},
    },
    description: '',
  };

  const transactionAction: TradeAggregatorAction<TradeAggregatorActionKind.Transaction> = {
    name: TradeAggregatorActionName.NftApproval,
    kind: TradeAggregatorActionKind.Transaction,
    data: {
      txAssociatedOrderIds: [],
      txData: {
        from: '',
        to: '',
        data: '',
        value: '',
      },
    },
    description: '',
  };

  const passthroughAction: TradeAggregatorAction<TradeAggregatorActionKind.PassThrough> = {
    name: TradeAggregatorActionName.PassThrough,
    kind: TradeAggregatorActionKind.PassThrough,
    data: {
      endpoint: '',
      method: '',
      payload: null,
    },
    description: '',
  };
  const actions: TradeAggregatorAction<TradeAggregatorActionKind>[] = [signatureAction, transactionAction, passthroughAction];

  const executor = createExecutor(actions);

  it('execute all task with callback should be success', () => {
    const handleTaskExecuted: TaskExecutedHandle = task => {
      expect(task.status).toBe('success');
    };

    executor.execute({
      onTaskExecuted: handleTaskExecuted,
    });
  });

  it('execute all task step by step', () => {
    for (const task of executor) {
      task.execute();
      expect(task.status).toBe('success');
    }
  });

  it('task index should be 0, 1, 2', () => {
    let index: number = 0;
    for (const task of executor) {
      expect(task.index).toBe(index);
      index++;
    }
  });
});
