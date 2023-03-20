// ...根据nfts数组获取approval和sign信息的代码
import { NFTInfoForListing } from './interface';
import { AggregatorUtils } from '../utils';

export async function getApprovalAndSignInfo(nfts: NFTInfoForListing[]): Promise<any> {
  return {
    steps: [
      {
        id: 'nft-approval',
        action: 'Approve NFT contract',
        description: 'Each NFT collection you want to trade requires a one-time approval transaction',
        kind: 'transaction',
        items: [{ status: 'complete', orderIndexes: [0] }],
      },
      {
        id: 'order-signature',
        action: 'Authorize listing',
        description: 'A free off-chain signature to create the listing',
        kind: 'signature',
        items: [
          {
            status: 'incomplete',
            data: {
              sign: {
                signatureKind: 'eip712',
                domain: {
                  name: 'Seaport',
                  version: '1.4',
                  chainId: 1,
                  verifyingContract: '0x00000000000001ad428e4906ae43d8f9852d0dd6',
                },
                types: {
                  OrderComponents: [
                    { name: 'offerer', type: 'address' },
                    { name: 'zone', type: 'address' },
                    { name: 'offer', type: 'OfferItem[]' },
                    { name: 'consideration', type: 'ConsiderationItem[]' },
                    { name: 'orderType', type: 'uint8' },
                    { name: 'startTime', type: 'uint256' },
                    { name: 'endTime', type: 'uint256' },
                    { name: 'zoneHash', type: 'bytes32' },
                    { name: 'salt', type: 'uint256' },
                    { name: 'conduitKey', type: 'bytes32' },
                    { name: 'counter', type: 'uint256' },
                  ],
                  OfferItem: [
                    { name: 'itemType', type: 'uint8' },
                    { name: 'token', type: 'address' },
                    { name: 'identifierOrCriteria', type: 'uint256' },
                    { name: 'startAmount', type: 'uint256' },
                    { name: 'endAmount', type: 'uint256' },
                  ],
                  ConsiderationItem: [
                    { name: 'itemType', type: 'uint8' },
                    { name: 'token', type: 'address' },
                    { name: 'identifierOrCriteria', type: 'uint256' },
                    { name: 'startAmount', type: 'uint256' },
                    { name: 'endAmount', type: 'uint256' },
                    { name: 'recipient', type: 'address' },
                  ],
                },
                value: {
                  kind: 'single-token',
                  offerer: '0x3e24914f74cd66e3ee7d1f066a880a6c69404e13',
                  zone: '0x0000000000000000000000000000000000000000',
                  offer: [
                    {
                      itemType: 2,
                      token: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
                      identifierOrCriteria:
                        '49192847250963616308588609813616528462652700069388429320289774529014260090265',
                      startAmount: '1',
                      endAmount: '1',
                    },
                  ],
                  consideration: [
                    {
                      itemType: 0,
                      token: '0x0000000000000000000000000000000000000000',
                      identifierOrCriteria: '0',
                      startAmount: '9950000000000000000',
                      endAmount: '9950000000000000000',
                      recipient: '0x3e24914f74cd66e3ee7d1f066a880a6c69404e13',
                    },
                    {
                      itemType: 0,
                      token: '0x0000000000000000000000000000000000000000',
                      identifierOrCriteria: '0',
                      startAmount: '50000000000000000',
                      endAmount: '50000000000000000',
                      recipient: '0x0000a26b00c1f0df003000390027140000faa719',
                    },
                  ],
                  orderType: 0,
                  startTime: 1678954344,
                  endTime: 1679555355,
                  zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
                  salt: '4708294033398437617793943288981601192823091',
                  conduitKey: '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
                  counter: '0',
                  signature: '0x0000000000000000000000000000000000000000000000000000000000000000',
                },
              },
              post: {
                endpoint: '/order/v3',
                method: 'POST',
                body: {
                  order: {
                    kind: 'seaport-v1.4',
                    data: {
                      kind: 'single-token',
                      offerer: '0x3e24914f74cd66e3ee7d1f066a880a6c69404e13',
                      zone: '0x0000000000000000000000000000000000000000',
                      offer: [
                        {
                          itemType: 2,
                          token: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
                          identifierOrCriteria:
                            '49192847250963616308588609813616528462652700069388429320289774529014260090265',
                          startAmount: '1',
                          endAmount: '1',
                        },
                      ],
                      consideration: [
                        {
                          itemType: 0,
                          token: '0x0000000000000000000000000000000000000000',
                          identifierOrCriteria: '0',
                          startAmount: '9950000000000000000',
                          endAmount: '9950000000000000000',
                          recipient: '0x3e24914f74cd66e3ee7d1f066a880a6c69404e13',
                        },
                        {
                          itemType: 0,
                          token: '0x0000000000000000000000000000000000000000',
                          identifierOrCriteria: '0',
                          startAmount: '50000000000000000',
                          endAmount: '50000000000000000',
                          recipient: '0x0000a26b00c1f0df003000390027140000faa719',
                        },
                      ],
                      orderType: 0,
                      startTime: 1678954344,
                      endTime: 1679555355,
                      zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
                      salt: '4708294033398437617793943288981601192823091',
                      conduitKey: '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
                      counter: '0',
                      signature: '0x0000000000000000000000000000000000000000000000000000000000000000',
                    },
                  },
                  orderbook: 'opensea',
                  source: 'nftgo.io',
                },
              },
            },
            orderIndexes: [0],
          },
        ],
      },
    ],
    errors: [],
  };
}

export function parseApprovalData(rawData: any) {
  const { steps } = rawData;
  const approvalData = steps[0].items;
  return approvalData;
}

export interface ApprovePolicyOption {
  /**
   * If true, automatically approves all unapproved NFTs.
   */
  autoApprove: boolean;

  /**
   * If true, skips unapproved NFTs and proceeds with the approved ones.
   */
  skipUnapproved: boolean;
}
export function approveWithPolicy(data: any, policyOption: ApprovePolicyOption) {
  const { autoApprove } = policyOption;
  const inCompletes = data.filter.filter((item) => item.status === 'incomplete').map((item) => item.orderIndexes);
}

export function listingWithPolicy(policyOption: any) {}
export function cancelOrders(policyOption: any) {}

export function parseListingData(rawData: any) {
  return [];
}

export const getSignApprovedFn = (utils: AggregatorUtils) =>
  async function SignApprovedFn(approvalSignInfo: any): Promise<any> {
    return new Promise((resolve, reject) => {
      utils
        .sendTransaction(approvalSignInfo as object)
        .on('error', () => {
          reject(new Error('approved sign failed'));
        })
        .on('receipt', (receipt) => {
          const error = receipt?.logs.length === 0 || !receipt?.status;
          if (error) {
            reject(new Error('approved sign failed'));
          } else {
            resolve('success');
          }
        });
      return Promise.resolve(true);
    });
  };

export const getSignListingFn = (utils: AggregatorUtils) =>
  async function SignListingFn(listingData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      utils
        .sendTransaction(listingData as object)
        .on('error', () => {
          reject(new Error('approved sign failed'));
        })
        .on('receipt', (receipt) => {
          const error = receipt?.logs.length === 0 || !receipt?.status;
          if (error) {
            reject(new Error('approved sign failed'));
          } else {
            resolve('success');
          }
        });
      return Promise.resolve(true);
    });
  };

export async function isNFTOwnedByUser(userAddress: string, nftInfo: any): Promise<any> {
  // ...判断NFT是否为用户拥有的代码
  return Promise.resolve(true);
}
