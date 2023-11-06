**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > CancelOrdersReq

# Interface: CancelOrdersReq

cancel orders request params

## Contents

- [Properties](CancelOrdersReq.md#properties)
  - [callerAddress](CancelOrdersReq.md#calleraddress)
  - [extraArgs](CancelOrdersReq.md#extraargs)
  - [orders](CancelOrdersReq.md#orders)

## Properties

### callerAddress

> **callerAddress**: `string`

#### Source

[aggregator/cancel.ts:7](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/cancel.ts#L7)

***

### extraArgs

> **extraArgs**?: `object`

#### Type declaration

##### blurAuth

> **blurAuth**?: `string`

##### sign

> **sign**?: `string`

##### signMessage

> **signMessage**?: `string`

#### Source

[aggregator/cancel.ts:8](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/cancel.ts#L8)

***

### orders

> **orders**: [`Order`](Order.md) & `object`[]

#### Source

[aggregator/cancel.ts:13](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/cancel.ts#L13)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
