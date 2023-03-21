import { arrayify } from 'ethers/lib/utils';
import { runPipeline } from '../../helpers/pipeline';
import { Config, HTTPClient, ListingIndexer, PostListingOrderParams, PostListingOrderResponse } from '../interface';
import { Indexer } from './indexer';
import { marketplaceMeta } from './listing/const';
import {
  NFTInfoForListing,
  BulkListingOptions,
  ApprovePolicyOption,
  ListingItem,
  ListingStepsDetailInfo,
  PrepareListingParams,
  SignData,
} from './listing/interface';
import { AggregatorUtils } from './utils';

export class ListingIndexerStable extends Indexer implements ListingIndexer {
  constructor(client: HTTPClient, config: Config, utils: AggregatorUtils) {
    super(client, config, utils);
  }

  async prepareListing(nfts: NFTInfoForListing[]): Promise<ListingStepsDetailInfo> {
    const params = nfts.map<PrepareListingParams>((param) => {
      const { contract, tokenId, marketplace, ethPrice, listingTime, expirationTime, isCreatorFeesEnforced } = param;
      const { orderKind, orderbook, options } = marketplaceMeta[marketplace];
      return {
        orderKind,
        orderbook,
        automatedRoyalties: true,
        royaltyBps: isCreatorFeesEnforced === false ? 50 : undefined,
        options,
        currency: '0x0000000000000000000000000000000000000000',
        token: `${contract}:${tokenId}`,
        weiPrice: String((ethPrice * Math.pow(10, 18)).toFixed(0)),
        listingTime: (listingTime / 1000).toFixed(0),
        expirationTime: (expirationTime / 1000).toFixed(0),
      };
    });

    const response = await this.post('/nft-aggregate/listings', (config) => ({
      params,
      maker: config.walletConfig?.address,
      source: 'nftgo.io',
    }));
    console.info('response', JSON.stringify(response));
    // const data = await response.json();
    const data = response as ListingStepsDetailInfo;
    return data;
  }

  parseApprovalData(rawData: ListingStepsDetailInfo): ListingItem[] {
    const { steps } = rawData;
    const approvalData = steps[0].items;
    return approvalData;
  }

  parseListingData(rawData: ListingStepsDetailInfo) {
    const { steps } = rawData;
    const listingData = steps[1].items;
    return listingData;
  }

  async approveWithPolicy(
    data: [ListingItem[], ListingItem[]],
    policyOption: ApprovePolicyOption
  ): Promise<ListingItem[]> {
    const [approvalItems, listingItems] = data;
    const { autoApprove, skipUnapproved } = policyOption;

    const inCompletes = approvalItems.filter((item) => item.status === 'incomplete');
    const inCompletesIndexes = inCompletes.map((item) => item.orderIndexes).flat();

    if (inCompletesIndexes.length === 0) {
      return Promise.resolve(listingItems);
    }

    if (autoApprove) {
      const signs = inCompletesIndexes.map((i) => {
        const data = inCompletes.find((item) => item.orderIndexes.includes(i))?.data;
        return this.signApproveInfo(data);
      });
      const result = await Promise.allSettled(signs);
      if (result.every((e) => e.status === 'fulfilled')) {
        return listingItems;
      } else {
        const msgs = result.filter((e) => e.status === 'rejected').map((e) => (e as PromiseRejectedResult).reason);
        throw new Error('Approve failed:' + msgs.join(', '));
      }
    } else if (skipUnapproved) {
      // filter listingItems
      const filteredListingItems = listingItems.filter(
        (item) => !item.orderIndexes.some((i) => inCompletesIndexes.includes(i))
      );
      return Promise.resolve(filteredListingItems);
    } else {
      throw new Error('There are NFT collections that have not been authorized yet.');
    }
  }

  async listingWithPolicy(listingItems: ListingItem[]) {}

  async signApproveInfo(approvalSignInfo: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.utils
        ?.sendTransaction(approvalSignInfo as object)
        .on('error', (err) => {
          reject(new Error(err.message));
        })
        .on('receipt', (receipt) => {
          const error = receipt?.logs.length === 0 || !receipt?.status;
          if (error) {
            reject(new Error('approved sign failed'));
          } else {
            resolve(true);
          }
        });
      return Promise.resolve(true);
    });
  }

  async signListingInfo(sign: SignData): Promise<string> {
    const { domain, types, value } = sign;
    const signer = this.utils?._ethersSigner;
    let signature: string = '0x0000000000000000000000000000000000000000000000000000000000000000';
    if (signer) {
      if (sign.signatureKind === 'eip191') {
        if (sign.message?.match(/0x[0-9a-fA-F]{64}/)) {
          // If the message represents a hash, we need to convert it to raw bytes first
          signature = await signer.signMessage(arrayify(sign.message));
        } else {
          signature = await signer.signMessage(sign.message ?? '');
        }
      } else if (sign.signatureKind === 'eip712') {
        signature = await signer._signTypedData(domain, types, value);
      }
    }
    return signature;
  }

  postListingOrder(params: PostListingOrderParams): Promise<PostListingOrderResponse> {
    throw new Error('Method not implemented.');
  }
  // bulk listing
  async bulkListing(nfts: NFTInfoForListing[], config: BulkListingOptions) {
    // const tasks = [getApprovalAndSignInfo, [parseApprovalData, parseListingData], approveWithPolicy, listingWithPolicy];
    const tasks = [] as any;
    try {
      await runPipeline(tasks, nfts);
    } catch (error) {
      throw error;
    }
  }
}
