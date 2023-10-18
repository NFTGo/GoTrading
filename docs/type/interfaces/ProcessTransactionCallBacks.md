**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > ProcessTransactionCallBacks

# Interface: ProcessTransactionCallBacks

Callbacks in processing transaction

## Contents

- [Properties](ProcessTransactionCallBacks.md#properties)
  - [onError](ProcessTransactionCallBacks.md#onerror)
  - [onReceipt](ProcessTransactionCallBacks.md#onreceipt)
  - [onTransaction](ProcessTransactionCallBacks.md#ontransaction)

## Properties

### onError

> **onError**: [`ErrorHandler`](../type-aliases/ErrorHandler.md)

Callback after any error occurred before transaction completed

#### Source

[action/processor.ts:20](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/processor.ts#L20)

***

### onReceipt

> **onReceipt**: [`ReceiptHandler`](../type-aliases/ReceiptHandler.md)

Callback after transaction completed

#### Source

[action/processor.ts:16](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/processor.ts#L16)

***

### onTransaction

> **onTransaction**: [`TransactionHashHandler`](../type-aliases/TransactionHashHandler.md)

Callback after transaction been sent

#### Source

[action/processor.ts:12](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/processor.ts#L12)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
