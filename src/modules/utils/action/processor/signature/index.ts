export function signatureActionProcessor() {}

export class SignatureActionProcessor {
  async execute(action: AggregateAction) {
    if (action.name === 'order-signature') {
      return orderSignature(action, this.utils);
    } else if (action.name === 'nft-approval') {
      return nftApprovalTransaction(action, this.utils);
    }
  }
}
