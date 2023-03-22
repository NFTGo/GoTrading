import { Marketplace } from './interface';

export const orderKindMap = {
  seaport: 'opensea',
  x2y2: 'x2y2',
  'looks-rare': 'looksrare',
};

export const marketplaceMeta: Record<
  Marketplace,
  { orderKind: string; orderbook: string; options?: Record<string, any> }
> = {
  OpenSea: {
    orderKind: 'seaport-v1.4',
    orderbook: 'opensea',
    options: {
      'seaport-v1.4': {
        useOffChainCancellation: false,
      },
    },
  },
  X2Y2: {
    orderKind: 'x2y2',
    orderbook: 'x2y2',
  },
  LooksRare: {
    orderKind: 'looks-rare',
    orderbook: 'looks-rare',
  },
};
