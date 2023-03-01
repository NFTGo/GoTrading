# Trade with safe mode
```ts
const buyerAddress = "0x1234567890123456789012345678901234567890";// Replace with buyer address.
const params: AggregateParams = {
  buyer_address: buyerAddress,
  is_safe: true,
  order_ids: orderIds,
};

const aggregateResponse = await aggregator.getAggregateInfo(params);

utils
  ?.sendSafeModeTransaction({
    from: aggregateResponse.tx_info.from_address,
    to: aggregateResponse.tx_info.to_address,
    data: aggregateResponse.tx_info.data,
    value: BigNumber.from(aggregateResponse.tx_info.value.toString()),
    chainId: 1,
    gasLimit: BigNumber.from(aggregateResponse.gas_limit.toString()),
  })
  .on('transaction_hash', (hash)=>{
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
