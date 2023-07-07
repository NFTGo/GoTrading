import * as SeaportV1D5 from './seaport-v1.5';
import * as LooksRare from './looks-rare';
import * as LooksRareV2 from './looks-rare-v2';
import * as X2Y2 from './x2y2';
import * as Utils from './utils';

import { OrderKind } from '@/types';
import { ExternalServiceRateLimiter } from '@/common';

export interface IPostOrderHandler {
  protocol: OrderKind;
  rateLimiter: ExternalServiceRateLimiter;
  handle: (payload: any) => Promise<any>;
}

export { SeaportV1D5, LooksRare, LooksRareV2, X2Y2, Utils };
