export type X2Y2ListingOrderParams = {
  id: number;
  type: string;
  currency: string;
  price: string;
  maker: string;
  taker: string;
  deadline: number;
  itemHash: string;
  nft: {
    token: string;
    tokenId?: string;
  };
  royalty_fee: number;
};
