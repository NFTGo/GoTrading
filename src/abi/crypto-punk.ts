import {AbiItem} from 'web3-utils';

export const CryptoPunkABI: Record<'transfer' | 'bought', AbiItem> = {
  transfer: {
    // punk
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'punkIndex',
        type: 'uint256',
      },
    ],
    name: 'PunkTransfer',
    type: 'event',
  },
  bought: {
    anonymous: false,
    inputs: [
      {indexed: true, name: 'punkIndex', type: 'uint256'},
      {indexed: false, name: 'value', type: 'uint256'},
      {indexed: true, name: 'fromAddress', type: 'address'},
      {indexed: true, name: 'toAddress', type: 'address'},
    ],
    name: 'PunkBought',
    type: 'event',
  },
};
