import { BigNumber, UnsignedTransaction } from 'ethers';
import { TransactionReceipt } from 'web3-core';
import { isInvalidParam } from '../../helpers/is-invalid-param';
import { AggregatorApiException, AggregatorBaseException, AggregatorBulkBuyException } from '../exception';
import {
  Aggregator,
  HTTPClient,
  FilteredNFTsParam,
  FilteredNFTsResponse,
  AggregateParams,
  AggregateResponse,
  SingleAddressListingsResponse,
  SingleNFTListingsResponse,
  EVMChain,
  NFT,
  ListingInfo,
  NFTBaseInfo,
  NFTInfoForTrade,
  NftsListingInfo,
  MultiNFTListingsResponse,
  OrderInfo,
  BulkBuyParams,
} from '../interface';
import { AggregatorUtils } from './utils';

/**
 * @description
 * implement aggregator version 1 for nftgo-aggregator
 */
export class AggregatorStable implements Aggregator {
  constructor(
    private client: HTTPClient,
    private config: {
      apiKey: string;
      chain: EVMChain;
      baseUrl?: string;
    },
    private utils?: AggregatorUtils
  ) {}

  getListingOfNFT(contract: string, tokenId: string): Promise<SingleNFTListingsResponse> {
    if (isInvalidParam(contract)) {
      throw AggregatorApiException.missingParamError('collection contract');
    }

    if (isInvalidParam(tokenId)) {
      throw AggregatorApiException.missingParamError('tokenId');
    }

    return this.get(`/nft/${contract}/${tokenId}/listing`);
  }

  private getListingsOfNFTs(nfts: NFTBaseInfo[]): Promise<MultiNFTListingsResponse> {
    if (!(nfts.length > 0)) {
      throw AggregatorApiException.missingParamError('nfts');
    }

    return this.post(`/nft-aggregate/orders`, {
      nfts: nfts.map((nft) => ({
        contract: nft.contract,
        tokenId: nft.tokenId,
      })),
    });
  }

  getListingsOfWallet(address: string): Promise<SingleAddressListingsResponse> {
    if (isInvalidParam(address)) {
      throw AggregatorApiException.missingParamError('address');
    }

    return this.get('/address/listing', { address });
  }

  getAggregateInfo(params: AggregateParams): Promise<AggregateResponse> {
    if (isInvalidParam(params.buyerAddress)) {
      throw AggregatorApiException.missingParamError('buyerAddress');
    }

    if (isInvalidParam(params.orderIds)) {
      throw AggregatorApiException.missingParamError('orderIds');
    }

    return this.post('/nft-aggregate/aggregate', params);
  }

  getListingsOfCollection(contract: string, params?: FilteredNFTsParam): Promise<FilteredNFTsResponse> {
    if (isInvalidParam(contract)) {
      throw AggregatorApiException.missingParamError('collection contract');
    }

    const limit = params?.limit;

    if (limit && limit > 1000) {
      throw AggregatorApiException.invalidLimitError(`/collection/${contract}/filtered_nfts`, 1000);
    }

    return this.get(`/collection/${contract}/filtered_nfts`, {
      offset: 0,
      limit: 10,
      ...params,
    });
  }

  private getDetailsOfNFTs(nfts: NFTBaseInfo[]): Promise<{ nfts: Partial<NFT>[] }> {
    if (!(nfts.length > 0)) {
      throw AggregatorBaseException.missingParamError('nfts');
    }
    return this.post(`/nft-aggregate/multi_nfts`, {
      nfts: nfts.map((nft) => ({
        contract: nft.contract,
        tokenId: nft.tokenId,
      })),
    });
  }

  private getOrderStatusOfNFTs(nfts: NFTInfoForTrade[]): Promise<NftsListingInfo> {
    if (isInvalidParam(nfts)) {
      throw AggregatorBaseException.missingParamError('nfts');
    }
    if (!(nfts.length > 0)) {
      throw AggregatorBaseException.invalidParamError('nfts', 'nfts should be a array');
    }
    if (!this.utils) {
      throw AggregatorBaseException.missingParamError('web3Provider');
    }
    if (nfts.reduce((pre, curr) => pre + curr.amount, 0) > 120) {
      throw AggregatorBaseException.invalidParamError('nfts', 'total amount should under 120');
    }
    let listingInfo: NftsListingInfo = {
      validOrders: [],
      expireNFTs: [],
      expireOrders: [],
      unListNFTs: [],
      yourOwnNFTs: [],
      suspiciousNFTs: [],
      suspiciousOrders: [],
    };
    return new Promise<NftsListingInfo>(async (resolve, reject) => {
      try {
        const [orders, details] = await Promise.all([this.getListingsOfNFTs(nfts), this.getDetailsOfNFTs(nfts)]);
        const nftsOrderInfos = new Map<string, OrderInfo>(
          (orders?.orders ?? []).map((order) => [
            this.utils?.genUniqueKeyForNFT({ contract: order.contractAddress, tokenId: order.tokenId }) as string,
            order,
          ])
        );
        const nftsDetails = new Map<string, Partial<NFT>>(
          (details?.nfts ?? []).map((detail) => [
            this.utils?.genUniqueKeyForNFT({ contract: detail.contractAddress, tokenId: detail.tokenId }) as string,
            detail,
          ])
        );
        for (const nft of nfts) {
          const key = this.utils?.genUniqueKeyForNFT({ ...nft }) as string;
          const nftOrderInfo = nftsOrderInfos.get(key);
          const nftDetailInfo = nftsDetails.get(key);
          const is1155 = nftDetailInfo?.contractType === 'ERC1155';
          let lists: ListingInfo[];
          if (is1155) {
            lists = nftOrderInfo?.listingData?.nftList?.slice?.(0, nft.amount) ?? [];
          } else {
            lists = nftOrderInfo?.listingData?.nftList?.[0] ? [nftOrderInfo?.listingData?.nftList?.[0]] : [];
          }
          lists.forEach((list) => {
            if (!list) {
              listingInfo.unListNFTs.push({ ...nft });
            } else if (list?.marketName !== 'sudoswap' && list?.expiredTime && list?.expiredTime <= Date.now()) {
              // sudoswap dosen't have expire time
              listingInfo.expireOrders.push(list);
              listingInfo.expireNFTs.push({ ...nft });
            } else if (nftDetailInfo?.suspicious) {
              // suspicious means not currently tradable on OpenSea
              listingInfo.suspiciousNFTs.push(nft);
              listingInfo.suspiciousOrders.push(list);
            } else {
              listingInfo.validOrders.push(list);
            }
          });
        }
        resolve(listingInfo);
      } catch (error) {
        reject(error);
      }
    });
  }

  async bulkBuy({ nfts = [], onError, onFinishTransaction, onSendingTransaction, config }: BulkBuyParams) {
    try {
      const { ignoreInvalidOrders, ignoreSuspiciousOrders, ignoreUnListedNFTs, withSafeMode } = config;
      const listInfos = await this.getOrderStatusOfNFTs(nfts);
      if (!ignoreUnListedNFTs && listInfos.unListNFTs.length > 0) {
        onError?.(AggregatorBulkBuyException.hasUnListedNFT(listInfos.unListNFTs[0]), listInfos);
        return;
      }

      if (!ignoreInvalidOrders && listInfos.expireNFTs.length > 0) {
        onError?.(AggregatorBulkBuyException.hasExpiredNFT(listInfos.expireNFTs[0]), listInfos);
        return;
      }
      if (!ignoreSuspiciousOrders && listInfos.suspiciousNFTs.length > 0) {
        onError?.(AggregatorBulkBuyException.hasSuspiciousNFT(listInfos.suspiciousNFTs[0]), listInfos);
        return;
      }
      if (!(listInfos.validOrders.length > 0)) {
        onError?.(AggregatorBulkBuyException.noValidOrder(), listInfos);
        return;
      }

      const getAggregateResult: (ordersUsedToTrade: ListingInfo[]) => Promise<AggregateResponse | undefined> = async (
        ordersUsedToTrade: ListingInfo[]
      ) => {
        const buyerAddress = this.utils?.account || (await this.utils?._web3Instance.eth.getAccounts())?.[0];
        const aggregateResult = await this.getAggregateInfo({
          buyerAddress: buyerAddress as string,
          orderIds: ordersUsedToTrade?.map((order) => order.orderId),
          isSafe: withSafeMode,
        });
        const invalidIds = aggregateResult?.invalidIds;
        if (invalidIds?.length > 0) {
          const InvalidOrders = ordersUsedToTrade.filter((order) => invalidIds.includes(order.orderId));
          if (!ignoreInvalidOrders) {
            onError?.(
              AggregatorBulkBuyException.hasExpiredNFT({
                contract: InvalidOrders[0].contract,
                tokenId: InvalidOrders[0].tokenId,
              }),
              listInfos
            );
            return undefined;
          } else {
            if (invalidIds.length === ordersUsedToTrade.length) {
              onError?.(AggregatorBulkBuyException.noValidOrder(), listInfos);
              return undefined;
            }
            return await getAggregateResult(ordersUsedToTrade.filter((order) => !invalidIds.includes(order.orderId)));
          }
        } else {
          return aggregateResult;
        }
      };
      const ordersUsedToTrade =
        ignoreSuspiciousOrders && listInfos.suspiciousOrders?.length > 0
          ? listInfos.validOrders.concat(listInfos.suspiciousOrders)
          : listInfos.validOrders;
      const aggregateResult = await getAggregateResult(ordersUsedToTrade);
      if (!aggregateResult) {
        return;
      }

      const onReceipt = (receipt: TransactionReceipt) => {
        const successList = this.utils?.parseTransactedNFTs(receipt);
        if (!successList) {
          onFinishTransaction?.([], nfts, listInfos);
        } else {
          onFinishTransaction?.(
            Array.from(successList.entries().next().value),
            nfts.filter((nft) => successList.has(this.utils?.genUniqueKeyForNFT({ ...nft }) as string)),
            listInfos
          );
        }
      };

      if (withSafeMode) {
        this.utils
          ?.sendSafeModeTransaction({
            from: aggregateResult.txInfo.fromAddress,
            to: aggregateResult.txInfo.toAddress,
            data: aggregateResult.txInfo.data,
            value: BigNumber.from(aggregateResult.txInfo.value.toString()),
            chainId: 1,
            gasLimit: BigNumber.from(aggregateResult.gasLimit.toString()),
          })
          .on('transactionHash', onSendingTransaction)
          .on('receipt', onReceipt)
          .on('error', (error) => {
            onError?.(error, listInfos);
          });
      } else {
        this.utils
          ?.sendTransaction({
            from: aggregateResult.txInfo.fromAddress,
            to: aggregateResult.txInfo.toAddress,
            data: aggregateResult.txInfo.data,
            value: BigNumber.from(aggregateResult.txInfo.value.toString()).toHexString(),
          })
          .on('transactionHash', onSendingTransaction)
          .on('receipt', onReceipt)
          .on('error', (error) => {
            onError?.(error, listInfos);
          });
      }
    } catch (error) {
      onError?.(error as Error);
    }
  }

  private get headers() {
    return { 'X-API-KEY': this.config.apiKey, 'X-FROM': 'js_sdk' };
  }

  private get url() {
    return this.config.baseUrl + this.config.chain + '/v1';
  }

  private post<R, P = undefined>(path: string, params: P) {
    return this.client.post<R, P>(this.url + path, params, this.headers);
  }

  private get<R, Q = undefined>(path: string, query?: Q) {
    return this.client.get<R, Q>(this.url + path, query, this.headers);
  }
}
