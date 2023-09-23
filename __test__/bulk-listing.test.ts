import { ActionKind, AggregatorAction, OrderKind, Orderbook, init } from '../src';
import { BigNumber } from 'bignumber.js';
import Web3 from 'web3';
import { OffLineProcessor } from './common/off-line-processor';
import { BrowserActionTaskExecutor } from '../src/modules/utils/action';

describe('fulfill listing main process', () => {
  const mockActions = [
    {
      name: 'order-signature',
      description: 'Free off-chain signature to create the order',
      kind: 'signature',
      data: {
        orderIndexes: [1, 0],
        sign: {
          signatureKind: 'eip712',
          domain: {
            name: 'Seaport',
            version: '1.5',
            chainId: 1,
            verifyingContract: '0x00000000000000adc04c56bf30ac9d3c0aaf14dc',
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
            BulkOrder: [{ name: 'tree', type: 'OrderComponents[2]' }],
          },
          value: {
            tree: [
              {
                kind: 'single-token',
                offerer: '0x9398ba28015f0ce82b00ccb0da0c686a86dbad36',
                zone: '0x0000000000000000000000000000000000000000',
                offer: [
                  {
                    itemType: 2,
                    token: '0x3d053c1b9ef47f14e9d97e076b96c3a7c5054b1d',
                    identifierOrCriteria: '7078',
                    startAmount: '1',
                    endAmount: '1',
                  },
                ],
                consideration: [
                  {
                    itemType: 0,
                    token: '0x0000000000000000000000000000000000000000',
                    identifierOrCriteria: '0',
                    startAmount: '702000000000000000',
                    endAmount: '702000000000000000',
                    recipient: '0x9398ba28015f0ce82b00ccb0da0c686a86dbad36',
                  },
                  {
                    itemType: 0,
                    token: '0x0000000000000000000000000000000000000000',
                    identifierOrCriteria: '0',
                    startAmount: '58500000000000000',
                    endAmount: '58500000000000000',
                    recipient: '0x03d8c18655473bf155768c8d9fd1f10a022b345f',
                  },
                  {
                    itemType: 0,
                    token: '0x0000000000000000000000000000000000000000',
                    identifierOrCriteria: '0',
                    startAmount: '19500000000000000',
                    endAmount: '19500000000000000',
                    recipient: '0x0000a26b00c1f0df003000390027140000faa719',
                  },
                ],
                orderType: 0,
                startTime: 1694783545,
                endTime: 1694883545,
                zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
                salt: '0x360c6ebe1d4da48b00000000000000001a57400a70383da878f97229e1cba1eb',
                conduitKey: '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
                counter: '0',
                signature: '0x0000000000000000000000000000000000000000000000000000000000000000',
              },
              {
                kind: 'single-token',
                offerer: '0x9398ba28015f0ce82b00ccb0da0c686a86dbad36',
                zone: '0x0000000000000000000000000000000000000000',
                offer: [
                  {
                    itemType: 2,
                    token: '0x3d053c1b9ef47f14e9d97e076b96c3a7c5054b1d',
                    identifierOrCriteria: '7079',
                    startAmount: '1',
                    endAmount: '1',
                  },
                ],
                consideration: [
                  {
                    itemType: 0,
                    token: '0x0000000000000000000000000000000000000000',
                    identifierOrCriteria: '0',
                    startAmount: '702000000000000000',
                    endAmount: '702000000000000000',
                    recipient: '0x9398ba28015f0ce82b00ccb0da0c686a86dbad36',
                  },
                  {
                    itemType: 0,
                    token: '0x0000000000000000000000000000000000000000',
                    identifierOrCriteria: '0',
                    startAmount: '58500000000000000',
                    endAmount: '58500000000000000',
                    recipient: '0x03d8c18655473bf155768c8d9fd1f10a022b345f',
                  },
                  {
                    itemType: 0,
                    token: '0x0000000000000000000000000000000000000000',
                    identifierOrCriteria: '0',
                    startAmount: '19500000000000000',
                    endAmount: '19500000000000000',
                    recipient: '0x0000a26b00c1f0df003000390027140000faa719',
                  },
                ],
                orderType: 0,
                startTime: 1694783545,
                endTime: 1694883545,
                zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
                salt: '0x360c6ebe1d4da48b00000000000000007b473991111b4ba60ad453505276e530',
                conduitKey: '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
                counter: '0',
                signature: '0x0000000000000000000000000000000000000000000000000000000000000000',
              },
            ],
          },
          primaryType: 'BulkOrder',
          __no_us: true,
        },
        body: {
          items: [
            {
              order: {
                kind: 'seaport-v1.5',
                data: {
                  kind: 'single-token',
                  offerer: '0x9398ba28015f0ce82b00ccb0da0c686a86dbad36',
                  zone: '0x0000000000000000000000000000000000000000',
                  offer: [
                    {
                      itemType: 2,
                      token: '0x3d053c1b9ef47f14e9d97e076b96c3a7c5054b1d',
                      identifierOrCriteria: '7078',
                      startAmount: '1',
                      endAmount: '1',
                    },
                  ],
                  consideration: [
                    {
                      itemType: 0,
                      token: '0x0000000000000000000000000000000000000000',
                      identifierOrCriteria: '0',
                      startAmount: '702000000000000000',
                      endAmount: '702000000000000000',
                      recipient: '0x9398ba28015f0ce82b00ccb0da0c686a86dbad36',
                    },
                    {
                      itemType: 0,
                      token: '0x0000000000000000000000000000000000000000',
                      identifierOrCriteria: '0',
                      startAmount: '58500000000000000',
                      endAmount: '58500000000000000',
                      recipient: '0x03d8c18655473bf155768c8d9fd1f10a022b345f',
                    },
                    {
                      itemType: 0,
                      token: '0x0000000000000000000000000000000000000000',
                      identifierOrCriteria: '0',
                      startAmount: '19500000000000000',
                      endAmount: '19500000000000000',
                      recipient: '0x0000a26b00c1f0df003000390027140000faa719',
                    },
                  ],
                  orderType: 0,
                  startTime: 1694783545,
                  endTime: 1694883545,
                  zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
                  salt: '0x360c6ebe1d4da48b00000000000000001a57400a70383da878f97229e1cba1eb',
                  conduitKey: '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
                  counter: '0',
                  signature: '0x0000000000000000000000000000000000000000000000000000000000000000',
                },
              },
              orderbook: 'opensea',
              bulkData: {
                kind: 'seaport-v1.5',
                data: {
                  orderIndex: 0,
                  merkleProof: ['0x3a748491e16062bb996595b113d220763c11583dc5870d024af22254d72d65a3'],
                },
              },
            },
            {
              order: {
                kind: 'seaport-v1.5',
                data: {
                  kind: 'single-token',
                  offerer: '0x9398ba28015f0ce82b00ccb0da0c686a86dbad36',
                  zone: '0x0000000000000000000000000000000000000000',
                  offer: [
                    {
                      itemType: 2,
                      token: '0x3d053c1b9ef47f14e9d97e076b96c3a7c5054b1d',
                      identifierOrCriteria: '7079',
                      startAmount: '1',
                      endAmount: '1',
                    },
                  ],
                  consideration: [
                    {
                      itemType: 0,
                      token: '0x0000000000000000000000000000000000000000',
                      identifierOrCriteria: '0',
                      startAmount: '702000000000000000',
                      endAmount: '702000000000000000',
                      recipient: '0x9398ba28015f0ce82b00ccb0da0c686a86dbad36',
                    },
                    {
                      itemType: 0,
                      token: '0x0000000000000000000000000000000000000000',
                      identifierOrCriteria: '0',
                      startAmount: '58500000000000000',
                      endAmount: '58500000000000000',
                      recipient: '0x03d8c18655473bf155768c8d9fd1f10a022b345f',
                    },
                    {
                      itemType: 0,
                      token: '0x0000000000000000000000000000000000000000',
                      identifierOrCriteria: '0',
                      startAmount: '19500000000000000',
                      endAmount: '19500000000000000',
                      recipient: '0x0000a26b00c1f0df003000390027140000faa719',
                    },
                  ],
                  orderType: 0,
                  startTime: 1694783545,
                  endTime: 1694883545,
                  zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
                  salt: '0x360c6ebe1d4da48b00000000000000007b473991111b4ba60ad453505276e530',
                  conduitKey: '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
                  counter: '0',
                  signature: '0x0000000000000000000000000000000000000000000000000000000000000000',
                },
              },
              orderbook: 'opensea',
              bulkData: {
                kind: 'seaport-v1.5',
                data: {
                  orderIndex: 1,
                  merkleProof: ['0xaa357fbbed4a1c61e5720802a1a2c12cd3d6c73a12e2923de8947be58ec73234'],
                },
              },
            },
          ],
          source: 'czy-dev.io',
          __no_us: true,
        },
      },
    },
    {
      name: 'post-order-to-marketplace',
      description: 'Post order to marketplace',
      kind: 'pass-through',
      data: {
        endpoint: '/trade/v1/nft/post-order',
        method: 'POST',
        orderIndexes: [1],
        payload: {
          order: {
            kind: 'seaport-v1.5',
            data: {
              kind: 'single-token',
              offerer: '0x9398ba28015f0ce82b00ccb0da0c686a86dbad36',
              zone: '0x0000000000000000000000000000000000000000',
              offer: [
                {
                  itemType: 2,
                  token: '0x3d053c1b9ef47f14e9d97e076b96c3a7c5054b1d',
                  identifierOrCriteria: '7078',
                  startAmount: '1',
                  endAmount: '1',
                },
              ],
              consideration: [
                {
                  itemType: 0,
                  token: '0x0000000000000000000000000000000000000000',
                  identifierOrCriteria: '0',
                  startAmount: '702000000000000000',
                  endAmount: '702000000000000000',
                  recipient: '0x9398ba28015f0ce82b00ccb0da0c686a86dbad36',
                },
                {
                  itemType: 0,
                  token: '0x0000000000000000000000000000000000000000',
                  identifierOrCriteria: '0',
                  startAmount: '58500000000000000',
                  endAmount: '58500000000000000',
                  recipient: '0x03d8c18655473bf155768c8d9fd1f10a022b345f',
                },
                {
                  itemType: 0,
                  token: '0x0000000000000000000000000000000000000000',
                  identifierOrCriteria: '0',
                  startAmount: '19500000000000000',
                  endAmount: '19500000000000000',
                  recipient: '0x0000a26b00c1f0df003000390027140000faa719',
                },
              ],
              orderType: 0,
              startTime: 1694783545,
              endTime: 1694883545,
              zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
              salt: '0x360c6ebe1d4da48b00000000000000001a57400a70383da878f97229e1cba1eb',
              conduitKey: '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
              counter: '0',
              signature: '0x0000000000000000000000000000000000000000000000000000000000000000',
            },
          },
          orderbook: 'opensea',
          bulkData: {
            kind: 'seaport-v1.5',
            data: {
              orderIndex: 0,
              merkleProof: ['0x3a748491e16062bb996595b113d220763c11583dc5870d024af22254d72d65a3'],
            },
          },
          orderType: 'listing',
          extraArgs: { version: 'v4' },
        },
      },
    },
    {
      name: 'post-order-to-marketplace',
      description: 'Post order to marketplace',
      kind: 'pass-through',
      data: {
        endpoint: '/trade/v1/nft/post-order',
        method: 'POST',
        orderIndexes: [0],
        payload: {
          order: {
            kind: 'seaport-v1.5',
            data: {
              kind: 'single-token',
              offerer: '0x9398ba28015f0ce82b00ccb0da0c686a86dbad36',
              zone: '0x0000000000000000000000000000000000000000',
              offer: [
                {
                  itemType: 2,
                  token: '0x3d053c1b9ef47f14e9d97e076b96c3a7c5054b1d',
                  identifierOrCriteria: '7079',
                  startAmount: '1',
                  endAmount: '1',
                },
              ],
              consideration: [
                {
                  itemType: 0,
                  token: '0x0000000000000000000000000000000000000000',
                  identifierOrCriteria: '0',
                  startAmount: '702000000000000000',
                  endAmount: '702000000000000000',
                  recipient: '0x9398ba28015f0ce82b00ccb0da0c686a86dbad36',
                },
                {
                  itemType: 0,
                  token: '0x0000000000000000000000000000000000000000',
                  identifierOrCriteria: '0',
                  startAmount: '58500000000000000',
                  endAmount: '58500000000000000',
                  recipient: '0x03d8c18655473bf155768c8d9fd1f10a022b345f',
                },
                {
                  itemType: 0,
                  token: '0x0000000000000000000000000000000000000000',
                  identifierOrCriteria: '0',
                  startAmount: '19500000000000000',
                  endAmount: '19500000000000000',
                  recipient: '0x0000a26b00c1f0df003000390027140000faa719',
                },
              ],
              orderType: 0,
              startTime: 1694783545,
              endTime: 1694883545,
              zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
              salt: '0x360c6ebe1d4da48b00000000000000007b473991111b4ba60ad453505276e530',
              conduitKey: '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
              counter: '0',
              signature: '0x0000000000000000000000000000000000000000000000000000000000000000',
            },
          },
          orderbook: 'opensea',
          bulkData: {
            kind: 'seaport-v1.5',
            data: {
              orderIndex: 1,
              merkleProof: ['0xaa357fbbed4a1c61e5720802a1a2c12cd3d6c73a12e2923de8947be58ec73234'],
            },
          },
          orderType: 'listing',
          extraArgs: { version: 'v4' },
        },
      },
    },
  ] as AggregatorAction<ActionKind>[];
  const endpoint = process.env.PROVIDER_URL!,
    address = process.env.ADDRESS!,
    privateKey = process.env.PRIVATE_KEY!,
    apiKey = process.env.API_KEY!,
    web3Provider = new Web3.providers.HttpProvider(endpoint);

  const sdk = init({
    apiKey,
    baseUrl: process.env.BASE_URL,
    web3Provider,
    walletConfig: {
      address,
      privateKey,
    },
  });

  test('Execute Action should be success', async () => {
    const processor = new OffLineProcessor();

    const executor = new BrowserActionTaskExecutor(mockActions, processor);

    for (const task of executor) {
      await task.execute();
      expect(task.status).toBe('success');
    }
  });
});
