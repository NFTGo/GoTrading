**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > CreateListingInput

# Interface: CreateListingInput

## Contents

- [Properties](CreateListingInput.md#properties)
  - [automatedRoyalties](CreateListingInput.md#automatedroyalties)
  - [currency](CreateListingInput.md#currency)
  - [expirationTime](CreateListingInput.md#expirationtime)
  - [listingTime](CreateListingInput.md#listingtime)
  - [marketplaceFeeBps](CreateListingInput.md#marketplacefeebps)
  - [nonce](CreateListingInput.md#nonce)
  - [orderKind](CreateListingInput.md#orderkind)
  - [orderbook](CreateListingInput.md#orderbook)
  - [quantity](CreateListingInput.md#quantity)
  - [royaltyBps](CreateListingInput.md#royaltybps)
  - [salt](CreateListingInput.md#salt)
  - [token](CreateListingInput.md#token)
  - [weiPrice](CreateListingInput.md#weiprice)

## Properties

### automatedRoyalties

> **automatedRoyalties**?: `boolean`

Only applies to seaport orders. If true, royalty amount and recipients will be set automatically.

#### Source

[aggregator/create.ts:35](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L35)

***

### currency

> **currency**?: `string`

default to be ethereum

#### Source

[aggregator/create.ts:60](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L60)

***

### expirationTime

> **expirationTime**: `string`

Unix timestamp (seconds)

#### Source

[aggregator/create.ts:54](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L54)

***

### listingTime

> **listingTime**: `string`

Unix timestamp (seconds)

#### Source

[aggregator/create.ts:50](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L50)

***

### marketplaceFeeBps

> **marketplaceFeeBps**?: `number`

For self-build marketplaces, include the marketplaceFeeBps within the order to collect marketplace fee.
Note that 1 Bps stands for 0.01%. For example, using 100 means your marketplace fee address will receive
1% of the order's total price.

#### Source

[aggregator/create.ts:46](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L46)

***

### nonce

> **nonce**?: `string`

#### Source

[aggregator/create.ts:55](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L55)

***

### orderKind

> **orderKind**: [`OrderKind`](../enumerations/OrderKind.md)

order protocol

#### Source

[aggregator/create.ts:27](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L27)

***

### orderbook

> **orderbook**: [`Orderbook`](../enumerations/Orderbook.md)

marketplace orderbook

#### Source

[aggregator/create.ts:31](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L31)

***

### quantity

> **quantity**?: `number`

only applies to ERC1155

#### Source

[aggregator/create.ts:22](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L22)

***

### royaltyBps

> **royaltyBps**?: `number`

Only applies to seaport orders. Set a maximum amount of royalties to pay, rather than the full amount.
Only relevant when automatedRoyalties is true. 1 BPS = 0.01% Note: OpenSea does not support values below 50 bps.

#### Source

[aggregator/create.ts:40](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L40)

***

### salt

> **salt**?: `string`

#### Source

[aggregator/create.ts:56](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L56)

***

### token

> **token**: `string`

#### Source

[aggregator/create.ts:18](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L18)

***

### weiPrice

> **weiPrice**: `string`

#### Source

[aggregator/create.ts:23](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L23)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
