**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > CreateOfferInput

# Interface: CreateOfferInput

## Contents

- [Properties](CreateOfferInput.md#properties)
  - [attributeKey](CreateOfferInput.md#attributekey)
  - [attributeValue](CreateOfferInput.md#attributevalue)
  - [automatedRoyalties](CreateOfferInput.md#automatedroyalties)
  - [collection](CreateOfferInput.md#collection)
  - [currency](CreateOfferInput.md#currency)
  - [excludeFlaggedTokens](CreateOfferInput.md#excludeflaggedtokens)
  - [expirationTime](CreateOfferInput.md#expirationtime)
  - [listingTime](CreateOfferInput.md#listingtime)
  - [marketplaceFeeBps](CreateOfferInput.md#marketplacefeebps)
  - [nonce](CreateOfferInput.md#nonce)
  - [orderKind](CreateOfferInput.md#orderkind)
  - [orderbook](CreateOfferInput.md#orderbook)
  - [orderbookApiKey](CreateOfferInput.md#orderbookapikey)
  - [quantity](CreateOfferInput.md#quantity)
  - [royaltyBps](CreateOfferInput.md#royaltybps)
  - [salt](CreateOfferInput.md#salt)
  - [token](CreateOfferInput.md#token)
  - [weiPrice](CreateOfferInput.md#weiprice)

## Properties

### attributeKey

> **attributeKey**?: `string`

Bid on a particular attribute key. This is case sensitive. Example: `Composition`

#### Source

[aggregator/create.ts:89](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L89)

***

### attributeValue

> **attributeValue**?: `string`

Bid on a particular attribute value. This is case sensitive. Example: `Teddy (#33)`

#### Source

[aggregator/create.ts:93](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L93)

***

### automatedRoyalties

> **automatedRoyalties**?: `boolean`

If true, royalty amounts and recipients will be set automatically.

#### Source

[aggregator/create.ts:114](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L114)

***

### collection

> **collection**?: `string`

Bid on a particular collection with collection-contract. Example:
`0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63

#### Source

[aggregator/create.ts:85](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L85)

***

### currency

> **currency**?: `string`

ERC20 token address that the offer is providing with. Default to be WETH

#### Source

[aggregator/create.ts:150](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L150)

***

### excludeFlaggedTokens

> **excludeFlaggedTokens**?: `boolean`

If true flagged tokens will be excluded

#### Source

[aggregator/create.ts:130](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L130)

***

### expirationTime

> **expirationTime**?: `string`

Unix timestamp (seconds) indicating when listing will expire. Example: `1656080318`

#### Source

[aggregator/create.ts:138](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L138)

***

### listingTime

> **listingTime**?: `string`

Unix timestamp (seconds) indicating when listing will be listed. Example: `1656080318`

#### Source

[aggregator/create.ts:134](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L134)

***

### marketplaceFeeBps

> **marketplaceFeeBps**?: `number`

For self-build marketplaces, include the marketplaceFeeBps within the order to collect marketplace fee.
Note that 1 Bps stands for 0.01%. For example, using 100 means your marketplace fee address will receive
1% of the order's total price.

#### Source

[aggregator/create.ts:126](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L126)

***

### nonce

> **nonce**?: `string`

Optional. Set a custom nonce

#### Source

[aggregator/create.ts:142](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L142)

***

### orderKind

> **orderKind**: [`OrderKind`](../enumerations/OrderKind.md)

Exchange protocol used to create order. Example: `seaport-v1.5`

#### Source

[aggregator/create.ts:105](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L105)

***

### orderbook

> **orderbook**: [`Orderbook`](../enumerations/Orderbook.md)

Orderbook where order is placed. Example: `Reservoir`

#### Source

[aggregator/create.ts:109](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L109)

***

### orderbookApiKey

> **orderbookApiKey**?: `string`

#### Source

[aggregator/create.ts:110](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L110)

***

### quantity

> **quantity**?: `number`

Quantity of tokens user is buying. Only compatible with ERC1155 tokens. Example: `5`

#### Source

[aggregator/create.ts:97](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L97)

***

### royaltyBps

> **royaltyBps**?: `number`

Set a maximum amount of royalties to pay, rather than the full amount. Only relevant when
using automated royalties. 1 BPS = 0.01% Note: OpenSea does not support values below 50
bps.

#### Source

[aggregator/create.ts:120](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L120)

***

### salt

> **salt**?: `string`

Optional. Random string to make the order unique

#### Source

[aggregator/create.ts:146](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L146)

***

### token

> **token**?: `string`

Bid on a particular token. Example: `0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63:123

#### Source

[aggregator/create.ts:80](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L80)

***

### weiPrice

> **weiPrice**: `string`

Amount bidder is willing to offer in wei. Example: `1000000000000000000`

#### Source

[aggregator/create.ts:101](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/create.ts#L101)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
