import {defaultAbiCoder, hexConcat} from "ethers/lib/utils";

export function encodeBulkOrderProofAndSignature(orderIndex: number, merkleProof: string[], signature: string): string {
  return hexConcat([
    signature,
    `0x${orderIndex.toString(16).padStart(6, '0')}`,
    defaultAbiCoder.encode([`uint256[${merkleProof.length}]`], [merkleProof]),
  ]);
}
