import { splitSignature } from 'ethers/lib/utils';
import { BASE_URL } from '@/common';

import { AggregatorApiException, BaseException } from '@/exceptions';

import { IPostOrderHandler } from './utils';
import * as Models from './utils';

import {
  EVMChain,
  HTTPClient,
  Config,
  AggregatorApiResponse,
  AggregatorApiStatusResponse,
  PostOrderReq,
  PostOrderResponse,
  OrderKind,
} from '@/types';
import { SeaportV1D5Handler, LooksRareV2Handler, X2Y2Handler } from './handler';
import { HTTPClientStable } from '@/http';
export class PostOrderHandler {
  private handlers = new Map<OrderKind, IPostOrderHandler>();
  private client: HTTPClient = new HTTPClientStable();

  constructor(private config: Config) {
    if (config.openSeaApiKeyConfig) {
      this.handlers.set(OrderKind.SeaportV15, new SeaportV1D5Handler(this.client, config.openSeaApiKeyConfig));
    }

    if (config.looksRareApiKeyConfig) {
      this.handlers.set(OrderKind.LooksRareV2, new LooksRareV2Handler(this.client, config.looksRareApiKeyConfig));
    }

    if (config.x2y2ApiKeyConfig) {
      this.handlers.set(OrderKind.X2Y2, new X2Y2Handler(this.client, config.x2y2ApiKeyConfig));
    }
  }

  async handle(params: PostOrderReq, signature: string, endpoint: string): Promise<any> {
    // given the orderKind, invoke NFTGo developer API or directly post order to marketplace
    if (params.order.kind === OrderKind.Blur) {
      const res = await this.post<AggregatorApiResponse, PostOrderReq & { signature: string }>(endpoint, {
        ...params,
        signature,
      });
      console.info('res', res);
      return { message: 'blur' };
    } else {
      const handler = this.handlers.get(params.order.kind);
      if (!handler) {
        throw BaseException.invalidParamError('order.kind', 'unsupported orderKind ' + params.order.kind);
      }

      switch (params.extraArgs.version) {
        case 'v3':
          try {
            const { v, r, s } = splitSignature(signature);
            params.order.data = {
              ...params.order.data,
              signature,
              v,
              r,
              s,
            };
            // TODO: need to await?
          } catch (e) {
            throw BaseException.invalidParamError('signature', 'invalid signature ' + signature);
          }

          handler.handle(params.order);
          break;
        case 'v4':
          try {
            const { v, r, s } = splitSignature(signature);

            if (params.bulkData?.kind === 'seaport-v1.5') {
              // Encode the merkle proof of inclusion together with the signature
              params.order.data.signature = Models.SeaportV1D5.Utils.encodeBulkOrderProofAndSignature(
                params.bulkData.data.orderIndex,
                params.bulkData.data.merkleProof,
                signature
              );
            } else {
              // If the signature is provided via query parameters, use it
              params.order.data = {
                ...params.order.data,
                // To cover everything:
                // - orders requiring a single signature field
                // - orders requiring split signature fields
                signature,
                v,
                r,
                s,
              };
            }
          } catch (e: any) {
            throw BaseException.invalidParamError('signature', 'invalid signature ' + signature);
          }
          handler.handle(params.order);
          break;
        default:
          throw BaseException.invalidParamError('extraArgs.version', 'unsupported version ' + params.extraArgs.version);
      }
    }
  }

  private get headers() {
    return { 'X-API-KEY': this.config.apiKey, 'X-FROM': 'js_sdk' } as Record<string, string>;
  }

  private get url() {
    return this.config?.baseUrl ?? BASE_URL;
  }

  private async post<ResData, Req = undefined>(path: string, params: Req) {
    const response = await this.client.post<AggregatorApiStatusResponse<ResData>, Req>(
      this.url + path,
      params,
      this.headers
    );
    const { code, msg, data } = response;
    if (code === 'SUCCESS') {
      return data;
    } else {
      throw new AggregatorApiException(msg, code, path);
    }
  }
}
