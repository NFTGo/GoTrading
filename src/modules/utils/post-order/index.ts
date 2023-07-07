import { defaultAbiCoder, joinSignature, splitSignature } from 'ethers/lib/utils';

import { ExternalServiceRateLimiter } from '@/common';
import { RateLimiter } from 'limiter';
import { BaseException } from '@/exceptions';
import { PostOrderReq, PostOrderResponse } from '@/types';
import { OrderKind } from 'src/types/order';

export class PostOrderHandler {
  // constructor(private client: any, private apiKeyConfig: any) {

  // }
  private handlers = new Map<OrderKind, IPostOrderHandler>();

  async handle(params: PostOrderReq): Promise<PostOrderResponse> {
    // given the orderKind, invoke NFTGo developer API or directly post order to marketplace
    if (params.order.kind === OrderKind.Blur) {
      return new Promise<PostOrderResponse>((resolve, reject) => {
        this.post<AggregatorApiResponse, PostOrderReq>('/post-order/v1', params).then(res => {
          resolve(res);
        });
      });
    } else {
      const signature = params.signature;
      const handler = this.handlers.get(params.order.kind);
      if (!handler) {
        throw BaseException.invalidParamError('order.kind', 'unsupported orderKind ' + params.order.kind);
      }

      switch (params.extraArgs.version) {
        case 'v3':
          if (signature) {
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
          }
          handler.handle(params.order);
          break;
        case 'v4':
          if (signature) {
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
          }
          handler.handle(params.order);
          break;
        default:
          throw BaseException.invalidParamError('extraArgs.version', 'unsupported version ' + params.extraArgs.version);
      }
    }
  }
}
