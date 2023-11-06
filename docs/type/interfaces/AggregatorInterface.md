**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > AggregatorInterface

# Interface: AggregatorInterface

## Contents

- [Methods](AggregatorInterface.md#methods)
  - [cancelOrders()](AggregatorInterface.md#cancelorders)
  - [createListings()](AggregatorInterface.md#createlistings)
  - [createOffers()](AggregatorInterface.md#createoffers)
  - [fulfillListings()](AggregatorInterface.md#fulfilllistings)
  - [fulfillOffers()](AggregatorInterface.md#fulfilloffers)

## Methods

### cancelOrders()

> **cancelOrders**(`params`): `Promise`\<[`AggregatorResponse`](AggregatorResponse.md)\>

Get the actions you need to execute to cancel orders
- details: [https://docs.nftgo.io/reference/post_trade-v1-nft-cancel-orders](https://docs.nftgo.io/reference/post_trade-v1-nft-cancel-orders)

#### Parameters

▪ **params**: [`CancelOrdersReq`](CancelOrdersReq.md)

[CancelOrdersReq](CancelOrdersReq.md)

#### Returns

Promise<[AggregatorResponse](AggregatorResponse.md)>

#### Source

[aggregator/aggregator.ts:29](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/aggregator.ts#L29)

***

### createListings()

> **createListings**(`params`): `Promise`\<[`AggregatorResponse`](AggregatorResponse.md)\>

Get the actions you need to execute to create listings
- details: [https://docs.nftgo.io/reference/post_trade-v1-nft-create-listings](https://docs.nftgo.io/reference/post_trade-v1-nft-create-listings)

#### Parameters

▪ **params**: [`CreateListingsReq`](CreateListingsReq.md)

[CreateListingsReq](CreateListingsReq.md)

#### Returns

Promise<[AggregatorResponse](AggregatorResponse.md)>

#### Source

[aggregator/aggregator.ts:37](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/aggregator.ts#L37)

***

### createOffers()

> **createOffers**(`params`): `Promise`\<[`AggregatorResponse`](AggregatorResponse.md)\>

Get the actions you need to execute to create offers
- details: [https://docs.nftgo.io/reference/post_trade-v1-nft-create-offers](https://docs.nftgo.io/reference/post_trade-v1-nft-create-offers)

#### Parameters

▪ **params**: [`CreateOffersReq`](CreateOffersReq.md)

[CreateOffersReq](CreateOffersReq.md)

#### Returns

Promise<[AggregatorResponse](AggregatorResponse.md)>

#### Source

[aggregator/aggregator.ts:13](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/aggregator.ts#L13)

***

### fulfillListings()

> **fulfillListings**(`params`): `Promise`\<[`AggregatorResponse`](AggregatorResponse.md)\>

Get the actions you need to execute to fulfill listings
- details: [https://docs.nftgo.io/reference/post_trade-v1-nft-fulfill-listings](https://docs.nftgo.io/reference/post_trade-v1-nft-fulfill-listings)

#### Parameters

▪ **params**: [`FulfillListingsReq`](FulfillListingsReq.md)

[FulfillListingsReq](FulfillListingsReq.md)

#### Returns

Promise<[AggregatorResponse](AggregatorResponse.md)>

#### Source

[aggregator/aggregator.ts:45](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/aggregator.ts#L45)

***

### fulfillOffers()

> **fulfillOffers**(`params`): `Promise`\<[`AggregatorResponse`](AggregatorResponse.md)\>

Get the actions you need to execute to fulfill offers
- details: [https://docs.nftgo.io/reference/post_trade-v1-nft-fulfill-offers](https://docs.nftgo.io/reference/post_trade-v1-nft-fulfill-offers)

#### Parameters

▪ **params**: [`FulfillOffersReq`](FulfillOffersReq.md)

[FulfillOffersReq](FulfillOffersReq.md)

#### Returns

Promise<[AggregatorResponse](AggregatorResponse.md)>

#### Source

[aggregator/aggregator.ts:21](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/aggregator.ts#L21)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
