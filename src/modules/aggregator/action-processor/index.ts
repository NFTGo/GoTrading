import {Utils} from '../../../interface';
import {AggregateAction} from '../interface';
import {signApproveInfo} from './sign-listing-approve';
import {signListingData} from './sign-listing-data';

// order-signature
export async function orderSignature(action: AggregateAction, utils: Utils) {
  const {data} = action;
  const {sign} = data;
  if (!sign) {
    throw new Error('sign is required');
  }
  const signature = await signListingData(sign, utils.getSigner());
  return signature;
}

// nft-approval transaction
export async function nftApprovalTransaction(
  action: AggregateAction,
  utils: Utils
) {
  const {data} = action;
  const {txData, orderIndexes} = data;
  if (!txData) {
    throw new Error('txData is required');
  }
  await signApproveInfo(txData, utils);
  return {
    status: 'success',
    orderIndexes,
  };
}
