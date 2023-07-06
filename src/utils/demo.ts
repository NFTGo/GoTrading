const aggregator = new Aggregator(httpClient, config, utils);

const {actions, executeActions} = await aggregator.createOffers({});
const iterator = executeActions();
for await (const action of iterator) {
  const {status} = action.execute();
  if (status === 'success') {
    action.next();
  }
}
//
const {actions} = await aggregator.createOffers({});

const {actions} = await aggregator.createListings({});

await aggregator.utils.executeActions(actions);
