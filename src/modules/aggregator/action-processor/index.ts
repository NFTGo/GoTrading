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

// async function signListingInfo(sign: SignData): Promise<string> {
//   const {domain, types, value} = sign;
//   const signer = this.utils?._ethersSigner;
//   let signature =
//     '0x0000000000000000000000000000000000000000000000000000000000000000';
//   if (signer) {
//     if (sign.signatureKind === 'eip191') {
//       if (sign.message?.match(/0x[0-9a-fA-F]{64}/)) {
//         // If the message represents a hash, we need to convert it to raw bytes first
//         signature = await signer.signMessage(arrayify(sign.message));
//       } else {
//         signature = await signer.signMessage(sign.message ?? '');
//       }
//     } else if (sign.signatureKind === 'eip712') {
//       signature = await signer._signTypedData(domain, types, value);
//     }
//   }
//   return signature;
// }

interface AcceptOfferAggregateAction extends AggregateAction {
  name: ActionName.AcceptOffer;
}
function executeAcceptOfferAction(action: AcceptOfferAggregateAction) {
  return Promise.resolve(action);
}
