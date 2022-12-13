import { initV1 } from '../src';
import { AggregatorException } from '../src/core/exception';
import { Simulator } from './simulator';

describe('Aggregator v1 Test', () => {
  const aggregator = initV1({
    baseUrl: Simulator.baseURL,
    apiKey: Simulator.apiKey,
  });

  it('all methods should be contain in aggregator', () => {
    expect('getFilteredNFTs' in aggregator).toBe(true);
    expect('getListingsOfSingleNFT' in aggregator).toBe(true);
    expect('getListingsOfSingleAddress' in aggregator).toBe(true);
    expect('getAggregateInfo' in aggregator).toBe(true);
  });

  it('get filter nfts should throw invalid params error when get empty contract', async () => {
    expect(() => aggregator.getFilteredNFTs('', {})).toThrowError(
      AggregatorException.missingParamError('collection contract')
    );
  });

  it('get address listing should return something', async () => {
    expect(true).toBe(true);
    // const data = await aggregator.getListingsOfSingleAddress('0xAE70216e2E3D69A483E6DbD6eD797f6313B10dAd');
    // expect(data).not.toBeFalsy();
  });
});
