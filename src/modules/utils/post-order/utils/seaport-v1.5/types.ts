export enum OrderType {
  FULL_OPEN,
  PARTIAL_OPEN,
  FULL_RESTRICTED,
  PARTIAL_RESTRICTED,
  CONTRACT,
}

export enum ItemType {
  NATIVE,
  ERC20,
  ERC721,
  ERC1155,
  ERC721_WITH_CRITERIA,
  ERC1155_WITH_CRITERIA,
}

export type OfferItem = {
  itemType: ItemType;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
};

export type ConsiderationItem = {
  itemType: ItemType;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
  recipient: string;
};

export type ListingOrderParams = {
  offerer: string;
  zone: string;
  offer: OfferItem[];
  consideration: ConsiderationItem[];
  orderType: OrderType;
  startTime: number;
  endTime: number;
  zoneHash: string;
  salt: string;
  conduitKey: string;
  counter: string;
  signature: string;
};

export type OrderComponents = {
  offerer: string;
  zone: string;
  offer: OfferItem[];
  consideration: ConsiderationItem[];
  orderType: OrderType;
  startTime: number;
  endTime: number;
  zoneHash: string;
  salt: string;
  conduitKey: string;
  counter: string;
  signature?: string;
  totalOriginalConsiderationItems?: number;
};
