import {OrderKind, Orderbook} from '../../interface';

const BigNumber = require('bignumber.js');

export function getCurrentTimeStamp(offset: number) {
  const now = new Date();
  const cal = now.getTime() + offset;
  const timestampInSeconds = Math.floor(cal / 1000);
  return timestampInSeconds;
}

export function getWeiPrice(tokenPrice: number) {
  const ethAmount = new BigNumber(tokenPrice);
  const weiAmount = ethAmount.times(new BigNumber('10').pow(18));
  return weiAmount.toString();
}

export function getOpenSeaOrder(order: any) {
  return {
    token: order.contract + ':' + order.tokenId,
    weiPrice: getWeiPrice(order.ethPrice),
    listingTime: getCurrentTimeStamp(0).toString(),
    expirationTime: getCurrentTimeStamp(3600000).toString(),
    options: {
      'seaport-v1.5': {
        useOffChainCancellation: false,
      },
    },
    orderbook: Orderbook.Opensea,
    orderKind: OrderKind.SeaportV15,
  };
}

export function getLooksRareOrder(order: any) {
  return {
    token: order.contract + ':' + order.tokenId,
    weiPrice: getWeiPrice(order.ethPrice),
    listingTime: getCurrentTimeStamp(0).toString(),
    expirationTime: getCurrentTimeStamp(3600000).toString(),
    options: {},
    orderbook: Orderbook.LooksRare,
    orderKind: OrderKind.LooksRareV2,
  };
}

export function getX2Y2Order(order: any) {
  return {
    token: order.contract + ':' + order.tokenId,
    weiPrice: getWeiPrice(order.ethPrice),
    listingTime: getCurrentTimeStamp(0).toString(),
    expirationTime: getCurrentTimeStamp(3600000).toString(),
    options: {},
    orderbook: Orderbook.X2Y2,
    orderKind: OrderKind.X2Y2,
  };
}

export function getBlurOrder(order: any) {
  return {
    token: order.contract + ':' + order.tokenId,
    weiPrice: getWeiPrice(order.ethPrice),
    listingTime: getCurrentTimeStamp(0).toString(),
    expirationTime: getCurrentTimeStamp(3600000).toString(),
    options: {},
    orderbook: Orderbook.Blur,
    orderKind: OrderKind.Blur,
  };
}
