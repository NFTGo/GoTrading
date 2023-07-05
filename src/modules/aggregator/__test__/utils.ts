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
