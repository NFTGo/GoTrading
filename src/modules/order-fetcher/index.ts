import { BASE_URL } from '../../config';
import { HTTPClient, EVMChain, Config } from '../../interface';
import {
  GetOrdersByContractReq,
  GetOrdersByIdsReq,
  GetOrdersByMakerReq,
  GetOrdersByNftsReq,
  OrderFetcherInterface,
  OrdersFetcherResp,
} from './interface';

export class OrderFetcher implements OrderFetcherInterface {
  constructor(private client: HTTPClient, private config: Config) {}

  getOrdersByContract(params: GetOrdersByContractReq): Promise<OrdersFetcherResp> {
    return this.post('/get-orders-by-contract', params);
  }

  getOrdersByNFT(params: GetOrdersByNftsReq): Promise<OrdersFetcherResp> {
    return this.post('/get-orders-by-nft', params);
  }

  getOrdersByIds(params: GetOrdersByIdsReq): Promise<OrdersFetcherResp> {
    return this.post('/get-orders-by-ids', params);
  }

  getOrdersByMaker(params: GetOrdersByMakerReq): Promise<OrdersFetcherResp> {
    return this.post('/get-orders-by-maker', params);
  }

  private get headers() {
    return { 'X-API-KEY': this.config.apiKey, 'X-FROM': 'js_sdk' };
  }

  private get url() {
    return (this.config?.baseUrl ?? BASE_URL) + '/orderbook' + '/v1' + (this.config?.chain ?? EVMChain.ETH) + '/orders';
  }

  private post<R, P = undefined>(path: string, params: P) {
    return this.client.post<R, P>(this.url + path, params, this.headers);
  }
}
