**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > PostOrderReq

# Interface: PostOrderReq

post order (listings & offers)

## Contents

- [Properties](PostOrderReq.md#properties)
  - [attribute](PostOrderReq.md#attribute)
  - [bulkData](PostOrderReq.md#bulkdata)
  - [collection](PostOrderReq.md#collection)
  - [extraArgs](PostOrderReq.md#extraargs)
  - [isNonFlagged](PostOrderReq.md#isnonflagged)
  - [order](PostOrderReq.md#order)
  - [orderType](PostOrderReq.md#ordertype)
  - [orderbook](PostOrderReq.md#orderbook)
  - [orderbookApiKey](PostOrderReq.md#orderbookapikey)
  - [slug](PostOrderReq.md#slug)
  - [source](PostOrderReq.md#source)
  - [tokenSetId](PostOrderReq.md#tokensetid)

## Properties

### attribute

> **attribute**?: [`Attribute`](Attribute.md)

#### Source

[post-order.ts:8](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/post-order.ts#L8)

***

### bulkData

> **bulkData**?: `object`

#### Type declaration

##### data

> **data**: `object`

##### data.merkleProof

> **data.merkleProof**: `string`[]

##### data.orderIndex

> **data.orderIndex**: `number`

##### kind

> **kind**: [`OrderKind`](../enumerations/OrderKind.md)

#### Source

[post-order.ts:9](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/post-order.ts#L9)

***

### collection

> **collection**?: `string`

#### Source

[post-order.ts:16](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/post-order.ts#L16)

***

### extraArgs

> **extraArgs**: `object`

#### Type declaration

##### version

> **version**: `string`

#### Source

[post-order.ts:17](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/post-order.ts#L17)

***

### isNonFlagged

> **isNonFlagged**?: `boolean`

#### Source

[post-order.ts:20](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/post-order.ts#L20)

***

### order

> **order**: `object`

#### Type declaration

##### data

> **data**: `any`

##### kind

> **kind**: [`OrderKind`](../enumerations/OrderKind.md)

#### Source

[post-order.ts:21](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/post-order.ts#L21)

***

### orderType

> **orderType**: [`OrderType`](../enumerations/OrderType.md)

#### Source

[post-order.ts:25](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/post-order.ts#L25)

***

### orderbook

> **orderbook**: [`Orderbook`](../enumerations/Orderbook.md)

#### Source

[post-order.ts:27](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/post-order.ts#L27)

***

### orderbookApiKey

> **orderbookApiKey**?: `string`

#### Source

[post-order.ts:28](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/post-order.ts#L28)

***

### slug

> **slug**?: `string`

#### Source

[post-order.ts:26](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/post-order.ts#L26)

***

### source

> **source**?: `string`

#### Source

[post-order.ts:29](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/post-order.ts#L29)

***

### tokenSetId

> **tokenSetId**?: `string`

#### Source

[post-order.ts:30](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/post-order.ts#L30)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
