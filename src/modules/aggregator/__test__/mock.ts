import { ListingStepsDetailInfo, Marketplace, NFTInfoForListing } from '../listing/interface';

const mock1155Order = {
  contract: '0xa342f5d851e866e18ff98f351f2c6637f4478db5',
  tokenId: '24526111578964355427464788391204295010760968458116003736309517252594046615553',
  ethPrice: 10,
};
const mock721Order = {
  contract: '0xee467844905022d2a6cc1da7a0b555608faae751',
  tokenId: '5745',
  ethPrice: 200,
};

function getMockOrder(item: any, market: Marketplace): NFTInfoForListing {
  return {
    marketplace: market,
    contract: item.contract,
    tokenId: item.tokenId,
    ethPrice: item.ethPrice,
    listingTime: +Date.now(),
    expirationTime: +Date.now() + 3600000, // add one hour
  };
}

export const mockOpenSeaOrder: NFTInfoForListing = getMockOrder(mock721Order, 'OpenSea');
export const mockLooksRareOrder: NFTInfoForListing = getMockOrder(mock721Order, 'LooksRare');
export const mockX2y2Order: NFTInfoForListing = getMockOrder(mock721Order, 'X2Y2');

export const mockOpenSea1155Order: NFTInfoForListing = getMockOrder(mock1155Order, 'OpenSea');

export const bulkNFTS: NFTInfoForListing[] = [mockOpenSeaOrder, mockLooksRareOrder, mockX2y2Order];
export const bulk1155NFTS: NFTInfoForListing[] = [mockOpenSea1155Order, mockOpenSea1155Order];
export const mockNFTs: NFTInfoForListing[] = [
  mockOpenSeaOrder,
  // mockX2y2Order,
  // mockLooksRareOrder,
];

