# Trade with safe mode
```ts
const buyerAddress = "0x1234567890123456789012345678901234567890";// Replace with buyer address.
const params: AggregateParams = {
  buyerAddress: buyerAddress,
  isSafe: true,
  orderIds: orderIds,
};

const aggregateResponse = await aggregator.getAggregateInfo(params);

utils
  ?.sendSafeModeTransaction({
    from: aggregateResponse.txInfo.fromAddress,
    to: aggregateResponse.txInfo.toAddress,
    data: aggregateResponse.txInfo.data,
    value: BigNumber.from(aggregateResponse.txInfo.value.toString()),
    chainId: 1,
    gasLimit: BigNumber.from(aggregateResponse.gasLimit.toString()),
  })
  .on('transactionHash', (hash)=>{
    console.log(hash);
  })
  .on('receipt', (receipt)=>{
    if (receipt.logs.length) {
      for (const log of receipt.logs) {
        // not every log with useful info
        const decodedLog = utils.decodeLog(log);
      }
    } else {
      console.log('transaction fail for some unknown reason');
    }
  })
  .on('error', (error)=>{
    console.log('transaction fail: ', error);
  });
```
