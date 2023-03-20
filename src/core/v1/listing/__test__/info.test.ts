import { getApprovalAndSignInfo } from '../base';
import { NFTInfoForListing } from '../interface';

describe('getApprovalAndSignInfo', () => {
  const sampleNFT: NFTInfoForListing = {
    // Add appropriate NFT information here to match your NFTInfoForListing interface
    marketplace: 'OpenSea',
    ethPrice: 1000000000000000000,
    expirationTime: 1679031810,
    listingTime: 1689031810,
  };

  it('should return the correct ListingStepsDetailInfo object', async () => {
    const result = await getApprovalAndSignInfo([sampleNFT]);
    const isExist = result.steps && result.steps.length === 2;
    expect(isExist).toEqual(true);
  });
});
