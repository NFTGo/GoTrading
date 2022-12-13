import { initHttpConfig } from '../src/common/http/nftgo.http';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class NFTGoInit {
  static created: boolean = false;

  static onCreate() {
    if (this.created) {
      return;
    }
    this.created = true;
    initHttpConfig();
  }
}
