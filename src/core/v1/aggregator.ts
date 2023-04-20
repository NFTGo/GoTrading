import { BigNumber } from 'ethers';
import { TransactionReceipt } from 'web3-core';
import { isInvalidParam } from '../../helpers/is-invalid-param';
import { BASE_URL } from '../conifg';
import { AggregatorApiException, AggregatorBaseException, AggregatorBulkBuyException } from '../exception';
import {
  Aggregator,
  HTTPClient,
  CollectionListingsParam,
  CollectionListingResponse,
  AggregateParams,
  AggregateResponse,
  SingleAddressListingsResponse,
  SingleNFTListingsResponse,
  EVMChain,
  NFT,
  ListingOrder,
  NFTBaseInfo,
  NFTInfoForTrade,
  NftsListingInfo,
  MultiNFTListingsResponse,
  OrderInfo,
  BulkBuyParams,
  Config,
} from '../interface';
import { AggregatorUtils } from './utils';
import { BlurAuthService, BlurAuthServiceImpl } from './utils/blur-auth';

/**
 * @description
 * implement aggregator version 1 for nftgo-aggregator
 */
export class AggregatorStable implements Aggregator {
  blurLoginAuthService: BlurAuthServiceImpl;
  constructor(private client: HTTPClient, private config: Config, private utils?: AggregatorUtils) {
    this.blurLoginAuthService = new BlurAuthService(this.utils as AggregatorUtils, this.client, this.config);
  }

  getListingsOfNFT(contract: string, tokenId: string): Promise<SingleNFTListingsResponse> {
    if (isInvalidParam(contract)) {
      throw AggregatorApiException.missingParamError('collection contract');
    }

    if (isInvalidParam(tokenId)) {
      throw AggregatorApiException.missingParamError('tokenId');
    }

    return this.get(`/nft/${contract}/${tokenId}/listing`);
  }

  private getListingsOfNFTs(nfts: NFTBaseInfo[]): Promise<MultiNFTListingsResponse> {
    if (isInvalidParam(nfts)) {
      throw AggregatorBaseException.missingParamError('nfts');
    }
    if (!(nfts?.length > 0)) {
      throw AggregatorBaseException.invalidParamError('nfts', 'nfts should be an array');
    }

    return this.post(`/nft-aggregate/orders`, {
      nfts: nfts?.map((nft) => ({
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

  getListingsOfCollection(contract: string, params?: CollectionListingsParam): Promise<CollectionListingResponse> {
    if (isInvalidParam(contract)) {
      throw AggregatorApiException.missingParamError('collection contract');
    }

    return this.get(`/collection/${contract}/filtered_nfts`, {
      offset: 0,
      limit: 10,
      ...params,
    });
  }

  private getDetailsOfNFTs(nfts: NFTBaseInfo[]): Promise<{ nfts: Partial<NFT>[] }> {
    if (isInvalidParam(nfts)) {
      throw AggregatorBaseException.missingParamError('nfts');
    }
    if (!(nfts?.length > 0)) {
      throw AggregatorBaseException.invalidParamError('nfts', 'nfts should be a array');
    }
    return this.post(`/nft-aggregate/multi_nfts`, {
      nfts: nfts?.map((nft) => ({
        contract: nft.contract,
        tokenId: nft.tokenId,
      })),
    });
  }

  private getOrderStatusOfNFTs(nfts: NFTInfoForTrade[]): Promise<NftsListingInfo> {
    if (isInvalidParam(nfts)) {
      throw AggregatorBaseException.missingParamError('nfts');
    }
    if (!(nfts?.length > 0)) {
      throw AggregatorBaseException.invalidParamError('nfts', 'nfts should be a array');
    }
    if (!(globalThis as any)?.ethereum && !this.utils) {
      throw AggregatorBaseException.missingParamError('walletProvider or walletConfig');
    }
    let result: NftsListingInfo = {
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
          (orders?.listingOrders ?? []).map((listingOrder) => [
            this.utils?.genUniqueKeyForNFT({
              contract: listingOrder.contractAddress,
              tokenId: listingOrder.tokenId,
            }) as string,
            listingOrder,
          ])
        );
        const nftsDetails = new Map<string, Partial<NFT>>(
          (details?.nfts ?? []).map((nft) => [
            this.utils?.genUniqueKeyForNFT({ contract: nft.contractAddress, tokenId: nft.tokenId }) as string,
            nft,
          ])
        );
        for (const nft of nfts) {
          const key = this.utils?.genUniqueKeyForNFT({ ...nft }) as string;
          const nftOrderInfo = nftsOrderInfos.get(key);
          const nftDetailInfo = nftsDetails.get(key);
          const is1155 = nftDetailInfo?.contractType === 'ERC1155';
          let lists: ListingOrder[];
          if (is1155) {
            lists =
              nftOrderInfo?.listingData?.listingOrders?.slice?.(0, (nft?.amount ?? 1) >= 1 ? nft?.amount : 1) ?? [];
          } else {
            if (typeof nft?.amount === 'number' && nft?.amount !== 1) {
              console.warn('The amount of ERC721 is 1 by default. The amount you set will be ignored.');
            }
            lists = nftOrderInfo?.listingData?.listingOrders?.[0]
              ? [nftOrderInfo?.listingData?.listingOrders?.[0]]
              : [];
          }
          if (lists.length === 0) {
            result.unListNFTs.push({ ...nft });
          } else {
            lists.forEach((list) => {
              if (!list) {
                result.unListNFTs.push({ ...nft });
              } else if (list?.marketName !== 'sudoswap' && list?.expiredTime && list?.expiredTime <= Date.now()) {
                // sudoswap dosen't have expire time
                result.expireOrders.push(list);
                result.expireNFTs.push({ ...nft });
              } else if (nftDetailInfo?.suspicious) {
                // suspicious means not currently tradable on OpenSea
                result.suspiciousNFTs.push(nft);
                result.suspiciousOrders.push(list);
              } else {
                result.validOrders.push(list);
              }
            });
          }
        }
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  async bulkBuy({ nfts = [], onError, onFinishTransaction, onSendingTransaction, config }: BulkBuyParams) {
    try {
      const { ignoreInvalidOrders, ignoreSuspiciousNFTs, ignoreUnListedNFTs, withSafeMode } = config;
      const listInfos = await this.getOrderStatusOfNFTs(nfts);
      if (!ignoreUnListedNFTs && listInfos.unListNFTs.length > 0) {
        onError?.(AggregatorBulkBuyException.hasUnListedNFT(listInfos.unListNFTs[0]), listInfos);
        return;
      }

      if (!ignoreInvalidOrders && listInfos.expireNFTs.length > 0) {
        onError?.(AggregatorBulkBuyException.hasExpiredNFT(listInfos.expireNFTs[0]), listInfos);
        return;
      }
      if (!ignoreSuspiciousNFTs && listInfos.suspiciousNFTs.length > 0) {
        onError?.(AggregatorBulkBuyException.hasSuspiciousNFT(listInfos.suspiciousNFTs[0]), listInfos);
        return;
      }
      if (!(listInfos.validOrders.length > 0)) {
        onError?.(AggregatorBulkBuyException.noValidOrder(), listInfos);
        return;
      }
      [
        {
          contractAddress: '0xed5af388653567af2f388e6224dc7c4b3241c544',
          tokenId: '2418',
          orderId: 'cmVzZXJ2b2lyOjo2NDQwZjBkZTEyMzZhYjgwNDRkOTdhMzg=',
          listingTime: 1681977493000,
          expiredTime: 1682236693000,
          ethPrice: 15.4,
          usdPrice: 30071.7366363824,
          marketName: 'blur',
          marketLink: 'https://blur.io/asset/0xed5af388653567af2f388e6224dc7c4b3241c544/2418',
          sellerAddress: '0x62e724226009de1edb66b8b8be841781aeb256de',
        },
      ];
      const getAggregateResult: (ordersUsedToTrade: ListingOrder[]) => Promise<AggregateResponse | undefined> = async (
        ordersUsedToTrade: ListingOrder[]
      ) => {
        const buyerAddress = this.utils?.account || (await this.utils?._web3Instance.eth.getAccounts())?.[0];
        if (ordersUsedToTrade.some((order) => order?.marketName === 'blur')) {
          console.info('ready to authorize blur login');
          const token = await this.blurLoginAuthService.authorize(buyerAddress as any);
          console.info('finished login:', token);
        }
        const aggregateResult = await this.getAggregateInfo({
          buyerAddress: buyerAddress as string,
          orderIds: ordersUsedToTrade?.map((order) => order.orderId),
          isSafe: withSafeMode,
          accessToken: this.blurLoginAuthService.getAccessToken(),
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
        listInfos.suspiciousOrders?.length > 0
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
            nfts?.filter((nft) => !successList.has(this.utils?.genUniqueKeyForNFT({ ...nft }) as string)),
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
    return (this.config?.baseUrl ?? BASE_URL) + (this.config?.chain ?? EVMChain.ETH) + '/v1';
  }

  private post<R, P = undefined>(path: string, params: P) {
    return this.client.post<R, P>(this.url + path, params, this.headers);
  }

  private get<R, Q = undefined>(path: string, query?: Q) {
    return this.client.get<R, Q>(this.url + path, query, this.headers);
  }
}
