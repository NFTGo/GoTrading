import { NFTGoConfig } from '../common/http/nftgo.http';
import BaseApi from './base-api';
import NFTGoCollection from './collection';
import NFTGoListing from './listing';
import NFTGoTrading from './trading';

export default class NFTGoApi extends BaseApi<NFTGoConfig> {
  /**
   * The `listing` object contains methods for NFTGo's listing API.
   */
  get listing(): NFTGoListing {
    return new NFTGoListing(this.config);
  }

  /**
   * The `trading` object contains methods for NFTGo's trading API.
   */
  get trading(): NFTGoTrading {
    return new NFTGoTrading(this.config);
  }

  /**
   * The `collection` object contains methods for NFTGo's collection API.
   */
  get collection(): NFTGoCollection {
    return new NFTGoCollection(this.config);
  }
}
