import { ListingStepsDetailInfo, Marketplace, NFTInfoForListing } from '../listing/interface';

const mock1155Order = {
  contract: '0xa342f5d851e866e18ff98f351f2c6637f4478db5',
  tokenId: '24526111578964355427464788391204295010760968458116003736309517252594046615553',
  ethPrice: 10,
};
const mock721Order = {
  contract: '0xee467844905022d2a6cc1da7a0b555608faae751',
  tokenId: '5745',
  ethPrice: 200,
};

function getMockOrder(item: any, market: Marketplace): NFTInfoForListing {
  return {
    marketplace: market,
    contract: item.contract,
    tokenId: item.tokenId,
    ethPrice: item.ethPrice,
    listingTime: +Date.now(),
    expirationTime: +Date.now() + 86400000, // add one day
  };
}

export const mockOpenSeaOrder: NFTInfoForListing = getMockOrder(mock721Order, 'OpenSea');
export const mockLooksRareOrder: NFTInfoForListing = getMockOrder(mock721Order, 'LooksRare');
export const mockX2y2Order: NFTInfoForListing = getMockOrder(mock721Order, 'X2Y2');

export const bulkNFTS: NFTInfoForListing[] = [mockOpenSeaOrder, mockLooksRareOrder, mockX2y2Order];
// export const bulk1155NFTS: NFTInfoForListing[] = [mockOpenSeaOrder, mockLooksRareOrder, mockX2y2Order];
export const mockNFTs: NFTInfoForListing[] = [
  mockX2y2Order,
  // mockLooksRareOrder,
];

// mock Data
export const mockListingStepData: ListingStepsDetailInfo = {
  steps: [
    {
      id: 'nft-approval',
      kind: 'transaction',
      action: 'Approve NFT contract',
      description: 'Each NFT collection you want to trade requires a one-time approval transaction',
      items: [
        {
          status: 'complete',
          data: null,
          orderIndexes: [0],
        },
      ],
    },
    {
      id: 'order-signature',
      kind: 'signature',
      action: 'Authorize listing',
      description: 'A free off-chain signature to create the listing',
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
                offerer: '0xdc97a0c27c25e867e7e7b15e83f3297ea8c48c0a',
                zone: '0x0000000000000000000000000000000000000000',
                offer: [
                  {
                    itemType: 2,
                    token: '0xee467844905022d2a6cc1da7a0b555608faae751',
                    identifierOrCriteria: '5745',
                    startAmount: '1',
                    endAmount: '1',
                  },
                ],
                consideration: [
                  {
                    itemType: 0,
                    token: '0x0000000000000000000000000000000000000000',
                    identifierOrCriteria: '0',
                    startAmount: '190000000000000000000',
                    endAmount: '190000000000000000000',
                    recipient: '0xdc97a0c27c25e867e7e7b15e83f3297ea8c48c0a',
                  },
                  {
                    itemType: 0,
                    token: '0x0000000000000000000000000000000000000000',
                    identifierOrCriteria: '0',
                    startAmount: '10000000000000000000',
                    endAmount: '10000000000000000000',
                    recipient: '0x294bd5fa80c4c2e450affe796f16b229946bc706',
                  },
                ],
                orderType: 0,
                startTime: 1679992577,
                endTime: 1680019200,
                zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
                salt: '4708294030933457951572556283668744917388793',
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
                    offerer: '0xdc97a0c27c25e867e7e7b15e83f3297ea8c48c0a',
                    zone: '0x0000000000000000000000000000000000000000',
                    offer: [
                      {
                        itemType: 2,
                        token: '0xee467844905022d2a6cc1da7a0b555608faae751',
                        identifierOrCriteria: '5745',
                        startAmount: '1',
                        endAmount: '1',
                      },
                    ],
                    consideration: [
                      {
                        itemType: 0,
                        token: '0x0000000000000000000000000000000000000000',
                        identifierOrCriteria: '0',
                        startAmount: '190000000000000000000',
                        endAmount: '190000000000000000000',
                        recipient: '0xdc97a0c27c25e867e7e7b15e83f3297ea8c48c0a',
                      },
                      {
                        itemType: 0,
                        token: '0x0000000000000000000000000000000000000000',
                        identifierOrCriteria: '0',
                        startAmount: '10000000000000000000',
                        endAmount: '10000000000000000000',
                        recipient: '0x294bd5fa80c4c2e450affe796f16b229946bc706',
                      },
                    ],
                    orderType: 0,
                    startTime: 1679992577,
                    endTime: 1680019200,
                    zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
                    salt: '4708294030933457951572556283668744917388793',
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
