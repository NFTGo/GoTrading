import {Utils} from '../../../interface';
import {ActionData, ActionName, AggregateAction} from '../interface';
import {runPipeline} from './pipeline';

// listing action definition
// const actionMap: any = {

//   'order-signature': executeOrderSignature,
//   'pass-through': executePassThrough,
// };
const listingActionMap: any = {
  'order-signature': executeOrderSignature,
  'pass-through': executePassThrough,
};

const signatureActionMap: Record<Partial<ActionName>, () => Promise<any>> = {
  'order-signature': executeOrderSignature,
};
export function executeAllActions(actions: AggregateAction[], utils: Utils) {
  const promises = actions.map(action => {
    const {data, kind} = action;
    const actionExecutor = listingActionMap[kind];
    return () => actionExecutor(data, utils);
  });
  return runPipeline(promises);
}

async function executeOrderSignature(data: ActionData, utils?: Utils) {
  return Promise.resolve(true);
}

async function executePassThrough() {
  // post-order
  console.info('post-order');
  return Promise.resolve(true);
}

interface AcceptOfferAggregateAction extends AggregateAction {
  name: ActionName.AcceptOffer;
}
function executeAcceptOfferAction(action: AcceptOfferAggregateAction) {
  return Promise.resolve(action);
}
