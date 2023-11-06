**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > OfferDTO

# Interface: OfferDTO

OfferDTO

## Contents

- [Properties](OfferDTO.md#properties)
  - [contractAddress](OfferDTO.md#contractaddress)
  - [criteria](OfferDTO.md#criteria)
  - [isPrivate](OfferDTO.md#isprivate)
  - [kind](OfferDTO.md#kind)
  - [maker](OfferDTO.md#maker)
  - [marketId](OfferDTO.md#marketid)
  - [orderCreateTime](OfferDTO.md#ordercreatetime)
  - [orderExpirationTime](OfferDTO.md#orderexpirationtime)
  - [orderHash](OfferDTO.md#orderhash)
  - [orderId](OfferDTO.md#orderid)
  - [price](OfferDTO.md#price)
  - [quantityRemaining](OfferDTO.md#quantityremaining)
  - [rawData](OfferDTO.md#rawdata)
  - [status](OfferDTO.md#status)
  - [taker](OfferDTO.md#taker)
  - [tokenId](OfferDTO.md#tokenid)
  - [totalQuantity](OfferDTO.md#totalquantity)

## Properties

### contractAddress

> **contractAddress**: `string`

Offer associated NFT contract address

#### Source

[order-fetcher.ts:187](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L187)

***

### criteria

> **criteria**: `string`

Describes the offer kind, this can be token, contract or trait offer.

#### Source

[order-fetcher.ts:191](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L191)

***

### isPrivate

> **isPrivate**: `boolean`

False means order can be fulfilled by anyone

#### Source

[order-fetcher.ts:195](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L195)

***

### kind

> **kind**: [`OrderKind`](../enumerations/OrderKind.md)

Offer's marketplace protocol
[OrderKind](../enumerations/OrderKind.md)

#### Source

[order-fetcher.ts:200](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L200)

***

### maker

> **maker**: `string`

Offer's maker address

#### Source

[order-fetcher.ts:204](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L204)

***

### marketId

> **marketId**: `string`

The marketplace uniqueId that order belongs to
[MarketId](../enumerations/MarketId.md)

#### Source

[order-fetcher.ts:209](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L209)

***

### orderCreateTime

> **orderCreateTime**?: `number`

Time that order is crreated

#### Source

[order-fetcher.ts:213](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L213)

***

### orderExpirationTime

> **orderExpirationTime**: `number`

Time that order will expire

#### Source

[order-fetcher.ts:217](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L217)

***

### orderHash

> **orderHash**: `string`

Unique order hash. Provided and used by NFTGo

#### Source

[order-fetcher.ts:225](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L225)

***

### orderId

> **orderId**: `string`

Unique order id. Shared between marketplaces

#### Source

[order-fetcher.ts:221](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L221)

***

### price

> **price**: [`TokenPrice`](TokenPrice.md)

Offer price
[TokenPrice](TokenPrice.md)

#### Source

[order-fetcher.ts:230](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L230)

***

### quantityRemaining

> **quantityRemaining**: `number`

Number of tokens remaining for this offer

#### Source

[order-fetcher.ts:234](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L234)

***

### rawData

> **rawData**?: `string`

#### Source

[order-fetcher.ts:235](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L235)

***

### status

> **status**: [`OrderStatus`](../enumerations/OrderStatus.md)

Offer's status
[OrderStatus](../enumerations/OrderStatus.md)

#### Source

[order-fetcher.ts:240](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L240)

***

### taker

> **taker**: `string`

Offer's taker address, generally points to zero address implies any address can fulfill the offer

#### Source

[order-fetcher.ts:244](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L244)

***

### tokenId

> **tokenId**?: `string`

Offer associated NFT token ID

#### Source

[order-fetcher.ts:248](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L248)

***

### totalQuantity

> **totalQuantity**: `number`

Number of tokens when offer was created

#### Source

[order-fetcher.ts:252](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L252)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
