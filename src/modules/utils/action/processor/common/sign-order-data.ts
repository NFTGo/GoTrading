import { SignData } from '@/types';
import { arrayify } from 'ethers/lib/utils';
import { Signer } from 'ethers';
import { TypedDataSigner } from '@ethersproject/abstract-signer';

/**
 * sign order data
 * @param data order data need to be signed {@link SignData}
 * @param signer ethers signer
 * @returns signature string
 */
export async function signOrderData(data: SignData, signer: Signer & TypedDataSigner): Promise<string> {
  const { domain, types, value } = data;

  let signature = '0x0000000000000000000000000000000000000000000000000000000000000000';
  if (signer) {
    if (data.signatureKind === 'eip191') {
      if (data.message?.match(/0x[0-9a-fA-F]{64}/)) {
        // If the message represents a hash, we need to convert it to raw bytes first
        signature = await signer.signMessage(arrayify(data.message));
      } else {
        signature = await signer.signMessage(data.message ?? '');
      }
    } else if (data.signatureKind === 'eip712') {
      signature = await signer._signTypedData(domain, types, value);
    }
  }
  return signature;
}
