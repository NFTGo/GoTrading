export type LooksRareListingOrderParams = {
  isOrderAsk: boolean;
  signer: string;
  collection: string;
  price: string;
  tokenId: string;
  amount: string;
  strategy: string;
  currency: string;
  nonce: string;
  startTime: number;
  endTime: number;
  minPercentageToAsk: number;
  params: string;
  v?: number;
  r?: string;
  s?: string;
};
