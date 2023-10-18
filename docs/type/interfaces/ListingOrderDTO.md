**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > ListingOrderDTO

# Interface: ListingOrderDTO

ListingOrderDTO

## Contents

- [Properties](ListingOrderDTO.md#properties)
  - [contractAddress](ListingOrderDTO.md#contractaddress)
  - [expiration](ListingOrderDTO.md#expiration)
  - [isPrivate](ListingOrderDTO.md#isprivate)
  - [maker](ListingOrderDTO.md#maker)
  - [marketId](ListingOrderDTO.md#marketid)
  - [orderCreateTime](ListingOrderDTO.md#ordercreatetime)
  - [orderExpirationTime](ListingOrderDTO.md#orderexpirationtime)
  - [orderGeneratedTime](ListingOrderDTO.md#ordergeneratedtime)
  - [orderHash](ListingOrderDTO.md#orderhash)
  - [orderId](ListingOrderDTO.md#orderid)
  - [price](ListingOrderDTO.md#price)
  - [quantityFilled](ListingOrderDTO.md#quantityfilled)
  - [quantityRemaining](ListingOrderDTO.md#quantityremaining)
  - [status](ListingOrderDTO.md#status)
  - [taker](ListingOrderDTO.md#taker)
  - [tokenId](ListingOrderDTO.md#tokenid)
  - [totalQuantity](ListingOrderDTO.md#totalquantity)

## Properties

### contractAddress

> **contractAddress**: `string`

Listing associated NFT contract address

#### Source

[order-fetcher.ts:116](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L116)

***

### expiration

> **expiration**: `number`

Time that order will expire

#### Source

[order-fetcher.ts:120](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L120)

***

### isPrivate

> **isPrivate**: `boolean`

False means order can be fulfilled by anyone

#### Source

[order-fetcher.ts:124](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L124)

***

### maker

> **maker**: `string`

Listing's maker address

#### Source

[order-fetcher.ts:128](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L128)

***

### marketId

> **marketId**: [`MarketId`](../enumerations/MarketId.md)

The marketplace uniqueId that order belongs to
[MarketId](../enumerations/MarketId.md)

#### Source

[order-fetcher.ts:133](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L133)

***

### orderCreateTime

> **orderCreateTime**?: `number`

Time that order is crreated

#### Source

[order-fetcher.ts:137](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L137)

***

### orderExpirationTime

> **orderExpirationTime**?: `number`

Time that order will expire

#### Source

[order-fetcher.ts:141](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L141)

***

### orderGeneratedTime

> **orderGeneratedTime**: `number`

#### Source

[order-fetcher.ts:142](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L142)

***

### orderHash

> **orderHash**: `string`

Unique order hash. Provided and used by NFTGo

#### Source

[order-fetcher.ts:150](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L150)

***

### orderId

> **orderId**: `string`

Unique order id. Shared between marketplaces

#### Source

[order-fetcher.ts:146](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L146)

***

### price

> **price**: [`TokenPrice`](TokenPrice.md)

Order price
[TokenPrice](TokenPrice.md)

#### Source

[order-fetcher.ts:155](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L155)

***

### quantityFilled

> **quantityFilled**: `number`

#### Source

[order-fetcher.ts:156](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L156)

***

### quantityRemaining

> **quantityRemaining**: `number`

Number of tokens remaining for this listing

#### Source

[order-fetcher.ts:160](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L160)

***

### status

> **status**: [`OrderStatus`](../enumerations/OrderStatus.md)

Order's status
[OrderStatus](../enumerations/OrderStatus.md)

#### Source

[order-fetcher.ts:165](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L165)

***

### taker

> **taker**: `string`

Listing's taker address, generally points to zero address implies any address can fulfill the listing

#### Source

[order-fetcher.ts:169](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L169)

***

### tokenId

> **tokenId**: `string`

Listing associated NFT token ID

#### Source

[order-fetcher.ts:173](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L173)

***

### totalQuantity

> **totalQuantity**: `number`

Number of tokens when listing was created

#### Source

[order-fetcher.ts:177](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L177)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
