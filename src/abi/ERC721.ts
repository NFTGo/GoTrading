import { AbiItem } from 'web3-utils';

export const ERC721Abi: Record<'transfer', AbiItem> = {
  transfer: {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
};

export const CryptoPunkAbi: Record<'transfer' | 'bought', AbiItem> = {
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
      { indexed: true, name: 'punkIndex', type: 'uint256' },
      { indexed: false, name: 'value', type: 'uint256' },
      { indexed: true, name: 'fromAddress', type: 'address' },
      { indexed: true, name: 'toAddress', type: 'address' },
    ],
    name: 'PunkBought',
    type: 'event',
  },
};
