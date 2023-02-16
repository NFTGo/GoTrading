import { BigNumber, UnsignedTransaction } from 'ethers';
import { isInvalidParam } from '../../helpers/is-invalid-param';
import { AggregatorApiException } from '../exception';
import {
  Aggregator,
  HTTPClient,
  Config,
  FilteredNFTsParam,
  FilteredNFTsResponse,
  AggregateParams,
  AggregateResponse,
  SingleAddressListingsResponse,
  SingleNFTListingsResponse,
  Transaction,
  BuyNFTsWithOrderIdsParams,
} from '../interface';

/**
 * @description
 * implement aggregator version 1 for nftgo-aggregator
 */
export class AggregatorStable implements Aggregator {
  constructor(private client: HTTPClient, private config: Config) {}

  getListingOfNFT(contract: string, tokenId: string): Promise<SingleNFTListingsResponse> {
    if (isInvalidParam(contract)) {
      throw AggregatorApiException.missingParamError('collection contract');
    }

    if (isInvalidParam(tokenId)) {
      throw AggregatorApiException.missingParamError('tokenId');
    }

    return this.get(`/nft/${contract}/${tokenId}/listing`);
  }

  getListingsOfWallet(address: string): Promise<SingleAddressListingsResponse> {
    if (isInvalidParam(address)) {
      throw AggregatorApiException.missingParamError('address');
    }

    return this.get('/address/listing', { address });
  }

  getAggregateInfo(params: AggregateParams): Promise<AggregateResponse> {
    if (isInvalidParam(params.buyer_address)) {
      throw AggregatorApiException.missingParamError('buyer_address');
    }

    if (isInvalidParam(params.order_ids)) {
      throw AggregatorApiException.missingParamError('order_ids');
    }

    return this.post('/nft-aggregate/aggregate', params);
  }

  getListingsOfCollection(contract: string, params?: FilteredNFTsParam): Promise<FilteredNFTsResponse> {
    if (isInvalidParam(contract)) {
      throw AggregatorApiException.missingParamError('collection contract');
    }

    if (isInvalidParam(params)) {
      throw AggregatorApiException.missingParamError('params');
    }

    const limit = params?.limit;

    if (limit && limit > 1000) {
      throw AggregatorApiException.invalidLimitError(1000);
    }

    return this.get(`/collection/${contract}/filtered_nfts`, {
      offset: 0,
      limit: 10,
      ...params,
    });
  }

  private get headers() {
    return { 'X-API-KEY': this.config.api_key, 'X-FROM': 'js_sdk' };
  }

  private get url() {
    return this.config.base_url + this.config.chain + '/v1';
  }

  private post<R, P = undefined>(path: string, params: P) {
    return this.client.post<R, P>(this.url + path, params, this.headers);
  }

  private get<R, Q = undefined>(path: string, query?: Q) {
    return this.client.get<R, Q>(this.url + path, query, this.headers);
  }
}

// class BuyNFTWithOrderIds implements Transaction {
//   private transaction_hash_handler: TransactionHashHandler = null;
//   private receipt_handler: ReceiptHandler = null;
//   private error_handler: ErrorHandler = null;
//   private finally_handler: (() => void) | null | undefined = null;
//   on(type: 'transaction_hash', handler: TransactionHashHandler): BuyNFT;
//   on(type: 'receipt', handler: ReceiptHandler): BuyNFT;
//   on(type: 'error', handler: ErrorHandler): BuyNFT;
//   on(
//     type: 'transaction_hash' | 'receipt' | 'error',
//     handler: TransactionHashHandler & ReceiptHandler & ErrorHandler
//   ): BuyNFT {
//     this[`${type}_handler`] = handler;
//     return this;
//   }
//   finally(onfinally?: (() => void) | null | undefined): void {
//     this.finally_handler = onfinally;
//   }
//   buyNFT() {
//     const { order_ids, is_safe_mode, buyer_address, api, web3, provider } = this.params;
//     if (!api) {
//       throw AggregatorUtilsException.initApiFirst();
//     }
//     if (!provider) {
//       throw AggregatorUtilsException.provideProviderFirst();
//     }

//     try {
//       api
//         .getAggregateInfo({
//           order_ids,
//           is_safe: is_safe_mode,
//           buyer_address: buyer_address,
//         })
//         .then((mockRes) => {
//           // 模拟成功，组装基本交易信息
//           const transactionParams: UnsignedTransaction & { from: string } = {
//             from: mockRes.tx_info.from_address,
//             to: mockRes.tx_info.to_address,
//             value: mockRes.tx_info.value,
//             data: mockRes.tx_info.data,
//             chainId: 1,
//           };
//           const gasLimit = BigNumber.from(Math.floor(mockRes.gas_limit));

//           // use safe mode with flash bot
//           if (is_safe_mode) {
//           } else {
//             // when buy nft with NFTGo contract should add gasLimit
//             if (transactionParams?.to?.toLowerCase() === '0x02DBC7FDDEF5A3b5AB6E9B7767e0E3DF57A71D3F'.toLowerCase()) {
//               (transactionParams as any).gas = gasLimit.toHexString();
//             }
//             try {
//             } catch (error) {
//               this.error_handler?.(error as any);
//             }
//           }
//         });
//     } catch (error) {
//       this.error_handler?.(error as Error);
//       this.finally_handler?.();
//     }
//   }
// }
