import { AbiItem } from 'web3-utils';

export const PUNK_CONTRACT_ADDRESS = '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb';

export const DecodeLogInterface: {
  Transfer721: AbiItem;
  BatchTransfer1155: AbiItem;
  SingleTransfer1155: AbiItem;
  PunkTransfer: AbiItem;
  PunkBought: AbiItem;
} = {
  Transfer721: {
    // 721
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
  BatchTransfer1155: {
    // multi 1155
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
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
        indexed: false,
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
    ],
    name: 'TransferBatch',
    type: 'event',
  },
  SingleTransfer1155: {
    // single 1155
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
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
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'TransferSingle',
    type: 'event',
  },
  PunkTransfer: {
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
  // one punk sale will trigger both Transfer721 and PunkBought
  PunkBought: {
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
