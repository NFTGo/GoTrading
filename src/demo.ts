import { init } from './modules';
import { Config, FulfillListingsReq } from './types';

async function demo() {
  const config: Config = {};

  const { aggregator, utils } = init(config);

  const req: FulfillListingsReq = {
    buyer: '',
    orderIds: [],
    safeMode: false,
  };

  const { actions, executeActions } = await aggregator.fulfillListings(req);

  const executor = utils.createActionExecutor(actions);

  for (const task of executor) {
    await task.execute();
    console.log(task.action.name, task.status);
  }

  executeActions({
    onTaskExecuted(task) {
      console.log(task.action.name, task.status);
    },
  });
}
