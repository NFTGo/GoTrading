export interface Order {
  orderId?: string;
  orderHash?: string;
  orderType: OrderType;
}

export enum OrderType {
  Listing = 'listing',
  Offer = 'offer',
}

/**
 * Exchange protocol used to create order. Example: `seaport-v1.5`
 */
export enum OrderKind {
  Blur = 'blur',
  LooksRareV2 = 'looks-rare-v2',
  SeaportV15 = 'seaport-v1.5',
  Sudoswap = 'sudoswap',
  X2Y2 = 'x2y2',
}

/**
 * Orderbook where order is placed. Example: `Reservoir`
 */
export enum Orderbook {
  Blur = 'blur',
  LooksRare = 'looks-rare',
  Opensea = 'opensea',
  X2Y2 = 'x2y2',
  SELF = 'self',
}
