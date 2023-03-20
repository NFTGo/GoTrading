// ...根据nfts数组获取approval和sign信息的代码
import { ListingItem, ListingStepsDetailInfo, NFTInfoForListing, PrepareListingParams } from './interface';
import { AggregatorUtils } from '../utils';
import { marketplaceMeta } from './const';

export async function getApprovalAndSignInfo(nfts: NFTInfoForListing[]): Promise<ListingStepsDetailInfo> {
  // const nfts
  const address = 1;
  const params = nfts.map<PrepareListingParams>((param) => {
    const { contract, tokenId, marketplace, ethPrice, listingTime, expirationTime, isCreatorFeesEnforced } = param;
    const { orderKind, orderbook, options } = marketplaceMeta[marketplace];
    return {
      orderKind,
      orderbook,
      automatedRoyalties: true,
      royaltyBps: isCreatorFeesEnforced === false ? 50 : undefined,
      options,
      currency: '0x0000000000000000000000000000000000000000',
      token: `${contract}:${tokenId}`,
      weiPrice: String((ethPrice * Math.pow(10, 18)).toFixed(0)),
      listingTime: (listingTime / 1000).toFixed(0),
      expirationTime: (expirationTime / 1000).toFixed(0),
    };
  });

  // const response = await fetch('/api', {
  //   params,
  //   maker: address,
  //   source: 'nftgo.io',
  // });
  // const data = await response.json();
  // return data;

  return {
    steps: [
      {
        id: 'nft-approval',
        action: 'Approve NFT contract',
        description: 'Each NFT collection you want to trade requires a one-time approval transaction',
        kind: 'transaction',
        items: [
          {
            status: 'complete',
            orderIndexes: [0],
          },
        ],
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
                    {
                      name: 'offerer',
                      type: 'address',
                    },
                    {
                      name: 'zone',
                      type: 'address',
                    },
                    {
                      name: 'offer',
                      type: 'OfferItem[]',
                    },
                    {
                      name: 'consideration',
                      type: 'ConsiderationItem[]',
                    },
                    {
                      name: 'orderType',
                      type: 'uint8',
                    },
                    {
                      name: 'startTime',
                      type: 'uint256',
                    },
                    {
                      name: 'endTime',
                      type: 'uint256',
                    },
                    {
                      name: 'zoneHash',
                      type: 'bytes32',
                    },
                    {
                      name: 'salt',
                      type: 'uint256',
                    },
                    {
                      name: 'conduitKey',
                      type: 'bytes32',
                    },
                    {
                      name: 'counter',
                      type: 'uint256',
                    },
                  ],
                  OfferItem: [
                    {
                      name: 'itemType',
                      type: 'uint8',
                    },
                    {
                      name: 'token',
                      type: 'address',
                    },
                    {
                      name: 'identifierOrCriteria',
                      type: 'uint256',
                    },
                    {
                      name: 'startAmount',
                      type: 'uint256',
                    },
                    {
                      name: 'endAmount',
                      type: 'uint256',
                    },
                  ],
                  ConsiderationItem: [
                    {
                      name: 'itemType',
                      type: 'uint8',
                    },
                    {
                      name: 'token',
                      type: 'address',
                    },
                    {
                      name: 'identifierOrCriteria',
                      type: 'uint256',
                    },
                    {
                      name: 'startAmount',
                      type: 'uint256',
                    },
                    {
                      name: 'endAmount',
                      type: 'uint256',
                    },
                    {
                      name: 'recipient',
                      type: 'address',
                    },
                  ],
                },
                value: {
                  kind: 'single-token',
                  offerer: '0xabb497c397810cd5c98ae71d04077059aec3a6b1',
                  zone: '0x0000000000000000000000000000000000000000',
                  offer: [
                    {
                      itemType: 2,
                      token: '0x70ed66a46d14fb9ed8b9222e5ae02589df2b4427',
                      identifierOrCriteria: '1847',
                      startAmount: '1',
                      endAmount: '1',
                    },
                  ],
                  consideration: [
                    {
                      itemType: 0,
                      token: '0x0000000000000000000000000000000000000000',
                      identifierOrCriteria: '0',
                      startAmount: '900000000000000000',
                      endAmount: '900000000000000000',
                      recipient: '0xabb497c397810cd5c98ae71d04077059aec3a6b1',
                    },
                    {
                      itemType: 0,
                      token: '0x0000000000000000000000000000000000000000',
                      identifierOrCriteria: '0',
                      startAmount: '100000000000000000',
                      endAmount: '100000000000000000',
                      recipient: '0xfbc8ff6f62b84f535f224f9b14b5b92f37cb1263',
                    },
                  ],
                  orderType: 0,
                  startTime: 1689031810,
                  endTime: 1679031810,
                  zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
                  salt: '4708294031557716240414926707210786040406576',
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
                      offerer: '0xabb497c397810cd5c98ae71d04077059aec3a6b1',
                      zone: '0x0000000000000000000000000000000000000000',
                      offer: [
                        {
                          itemType: 2,
                          token: '0x70ed66a46d14fb9ed8b9222e5ae02589df2b4427',
                          identifierOrCriteria: '1847',
                          startAmount: '1',
                          endAmount: '1',
                        },
                      ],
                      consideration: [
                        {
                          itemType: 0,
                          token: '0x0000000000000000000000000000000000000000',
                          identifierOrCriteria: '0',
                          startAmount: '900000000000000000',
                          endAmount: '900000000000000000',
                          recipient: '0xabb497c397810cd5c98ae71d04077059aec3a6b1',
                        },
                        {
                          itemType: 0,
                          token: '0x0000000000000000000000000000000000000000',
                          identifierOrCriteria: '0',
                          startAmount: '100000000000000000',
                          endAmount: '100000000000000000',
                          recipient: '0xfbc8ff6f62b84f535f224f9b14b5b92f37cb1263',
                        },
                      ],
                      orderType: 0,
                      startTime: 1689031810,
                      endTime: 1679031810,
                      zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
                      salt: '4708294031557716240414926707210786040406576',
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

export function parseApprovalData(rawData: ListingStepsDetailInfo): ListingItem[] {
  const { steps } = rawData;
  const approvalData = steps[0].items;
  return approvalData;
}

export function parseListingData(rawData: ListingStepsDetailInfo) {
  const { steps } = rawData;
  const listingData = steps[1].items;
  return listingData;
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

export function approveWithPolicy(data: [ListingItem[], ListingItem[]], policyOption: ApprovePolicyOption) {
  const [approvalItems, listingItems] = data;
  const { autoApprove, skipUnapproved } = policyOption;

  const inCompletes = approvalItems.filter((item) => item.status === 'incomplete');
  const inCompletesIndexes = inCompletes.map((item) => item.orderIndexes).flat();

  if (inCompletesIndexes.length === 0) {
    return listingItems;
  }

  if (autoApprove) {
    // do something approve
    return listingItems;
  } else if (skipUnapproved) {
    // filter listingItems
    return listingItems.filter((item) => !item.orderIndexes.some((i) => inCompletesIndexes.includes(i)));
  } else {
    throw new Error('There are NFT collections that have not been authorized yet.');
  }
}

/**
 * Strategies will be developed here based on exchange regulations, such as handling royalty fees and transaction fees.
 */
export function listingWithPolicy(policyOption?: any) {}

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

export function cancelOrders(policyOption: any) {}
