**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > Transaction

# Interface: Transaction

## Contents

- [Methods](Transaction.md#methods)
  - [finally()](Transaction.md#finally)
  - [on()](Transaction.md#on)

## Methods

### finally()

> **finally**(`handler`): `void`

#### Parameters

▪ **handler**: [`FinallyHandler`](../type-aliases/FinallyHandler.md)

#### Source

[utils.ts:77](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L77)

***

### on()

#### on(type, handler)

> **on**(`type`, `handler`): [`Transaction`](Transaction.md)

##### Parameters

▪ **type**: `"transactionHash"`

▪ **handler**: [`TransactionHashHandler`](../type-aliases/TransactionHashHandler.md)

##### Source

[utils.ts:67](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L67)

#### on(type, handler)

> **on**(`type`, `handler`): [`Transaction`](Transaction.md)

##### Parameters

▪ **type**: `"receipt"`

▪ **handler**: [`ReceiptHandler`](../type-aliases/ReceiptHandler.md)

##### Source

[utils.ts:69](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L69)

#### on(type, handler)

> **on**(`type`, `handler`): [`Transaction`](Transaction.md)

##### Parameters

▪ **type**: `"error"`

▪ **handler**: [`ErrorHandler`](../type-aliases/ErrorHandler.md)

##### Source

[utils.ts:71](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L71)

#### on(type, handler)

> **on**(`type`, `handler`): [`Transaction`](Transaction.md)

##### Parameters

▪ **type**: `"error"` \| `"transactionHash"` \| `"receipt"`

▪ **handler**: (`receipt`) => `void`

##### Source

[utils.ts:73](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L73)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
