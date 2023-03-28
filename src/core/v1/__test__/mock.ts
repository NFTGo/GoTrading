import { PostListingOrderParams } from '../../interface';
import { ListingStepsDetailInfo, NFTInfoForListing } from '../listing/interface';

export const mockNFTs: NFTInfoForListing[] = [
  {
    marketplace: 'OpenSea',
    contract: '0xee467844905022d2a6cc1da7a0b555608faae751',
    tokenId: '5745',
    ethPrice: 200,
    listingTime: +Date.now(),
    expirationTime: 1680019200000,
  },
  // {
  //   marketplace: 'OpenSea',
  //   contract: '0xa342f5d851e866e18ff98f351f2c6637f4478db5',
  //   tokenId: '24526111578964355427464788391204295010760968458116003736309517252594046615553',
  //   ethPrice: 20,
  //   listingTime: +Date.now(),
  //   expirationTime: 1680019200000,
  // },
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
          status: 'incomplete',
          data: {
            from: '0xdc97a0c27c25e867e7e7b15e83f3297ea8c48c0a',
            to: '0xa342f5d851e866e18ff98f351f2c6637f4478db5',
            data: '0xa22cb4650000000000000000000000001e0049783f008a0085193e00003d00cd54003c710000000000000000000000000000000000000000000000000000000000000001',
          },
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
                offerer: '0xdc97a0c27c25e867e7e7b15e83f3297ea8c48c0a',
                zone: '0x0000000000000000000000000000000000000000',
                offer: [
                  {
                    itemType: 3,
                    token: '0xa342f5d851e866e18ff98f351f2c6637f4478db5',
                    identifierOrCriteria:
                      '24526111578964355427464788391204295010760968458116003736309517252594046615553',
                    startAmount: '1',
                    endAmount: '1',
                  },
                ],
                consideration: [
                  {
                    itemType: 0,
                    token: '0x0000000000000000000000000000000000000000',
                    identifierOrCriteria: '0',
                    startAmount: '9500000000000000000',
                    endAmount: '9500000000000000000',
                    recipient: '0xdc97a0c27c25e867e7e7b15e83f3297ea8c48c0a',
                  },
                  {
                    itemType: 0,
                    token: '0x0000000000000000000000000000000000000000',
                    identifierOrCriteria: '0',
                    startAmount: '500000000000000000',
                    endAmount: '500000000000000000',
                    recipient: '0x7a9fe22691c811ea339d9b73150e6911a5343dca',
                  },
                ],
                orderType: 1,
                startTime: 1689031810,
                endTime: 1679031810,
                zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
                salt: '4708294032045091424174400755225660642155689',
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
                        itemType: 3,
                        token: '0xa342f5d851e866e18ff98f351f2c6637f4478db5',
                        identifierOrCriteria:
                          '24526111578964355427464788391204295010760968458116003736309517252594046615553',
                        startAmount: '1',
                        endAmount: '1',
                      },
                    ],
                    consideration: [
                      {
                        itemType: 0,
                        token: '0x0000000000000000000000000000000000000000',
                        identifierOrCriteria: '0',
                        startAmount: '9500000000000000000',
                        endAmount: '9500000000000000000',
                        recipient: '0xdc97a0c27c25e867e7e7b15e83f3297ea8c48c0a',
                      },
                      {
                        itemType: 0,
                        token: '0x0000000000000000000000000000000000000000',
                        identifierOrCriteria: '0',
                        startAmount: '500000000000000000',
                        endAmount: '500000000000000000',
                        recipient: '0x7a9fe22691c811ea339d9b73150e6911a5343dca',
                      },
                    ],
                    orderType: 1,
                    startTime: 1689031810,
                    endTime: 1679031810,
                    zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
                    salt: '4708294032045091424174400755225660642155689',
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

export const mockPostOrderParams = {
  parameters: {
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
        startAmount: '10945000000000000000',
        endAmount: '10945000000000000000',
        recipient: '0xdc97a0c27c25e867e7e7b15e83f3297ea8c48c0a',
      },
      {
        itemType: 0,
        token: '0x0000000000000000000000000000000000000000',
        identifierOrCriteria: '0',
        startAmount: '55000000000000000',
        endAmount: '55000000000000000',
        recipient: '0x294bd5fa80c4c2e450affe796f16b229946bc706',
      },
    ],
    orderType: 0,
    startTime: 1679988473,
    endTime: 1680593273,
    zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    salt: '4708294032328327061108372455231644260034096',
    conduitKey: '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
    counter: '0',
    signature:
      '0x3b5463e7bcc84c6862ca928523b398cdf9afe91984c5d7a927afceebddd049793fc0306188ce63aa0aba2c9ff587f3c681c8d349e864e68f307c13c7669bc0b81c',
    totalOriginalConsiderationItems: 2,
  },
  signature:
    '0x3b5463e7bcc84c6862ca928523b398cdf9afe91984c5d7a927afceebddd049793fc0306188ce63aa0aba2c9ff587f3c681c8d349e864e68f307c13c7669bc0b81c',
  protocol_address: '0x00000000000001ad428e4906ae43d8f9852d0dd6',
};
