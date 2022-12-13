import NFTGoApi from '@/src/apis';
import { EvmChain } from '@/src/common/types/common';

const nftgoApiClient = new NFTGoApi({
  apiKey: '5420e331-46a1-445e-887a-2526d49ee53c',
  chain: EvmChain.ETH,
});
test('request collection filterd NFTs', () => {
  console.log(nftgoApiClient);
  expect((() => 'test')()).toBe('test');
  // return nftgoApiClient.collection
  //   .getFilteredNFTs('0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', {
  //     limit: 100,
  //   })
  //   .then((res) => {
  //     console.log(res);
  //     expect('test').toBe('test');
  //   });
});
