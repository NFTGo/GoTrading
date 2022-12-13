import { missingParamError } from '@/src/common/http/nftgo.error';
import { NFTGoConfig, nftgoPost } from '@/src/common/http/nftgo.http';
import { isEmpty } from '@/utils';
import NFTGoConst from '@/utils/const';

import BaseApi from '../base-api';
import { AggregateParams, AggregateResponse } from './type';

/**
 * Collection related API
 */
export default class NFTGoTrading extends BaseApi<NFTGoConfig> {
  /**
   * Return a list of listing info about a single NFT.
   * - details: {@link }
   * @param parmas The post data{@link AggregateParams}
   * @returns Promise<{@link AggregateResponse}>
   */
  getAggregateInfo(parmas: AggregateParams): Promise<AggregateResponse> {
    if (isEmpty(parmas.buyer_address)) {
      return missingParamError('buyer_address');
    }

    if (isEmpty(parmas.order_ids)) {
      return missingParamError('order_ids');
    }

    return nftgoPost<AggregateParams, AggregateResponse>(
      this.config,
      NFTGoConst.API.evm.trading.getAggregateInfo,
      parmas
    );
  }
}
