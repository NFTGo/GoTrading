**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > OrderFetcherInterface

# Interface: OrderFetcherInterface

## Contents

- [Methods](OrderFetcherInterface.md#methods)
  - [getOrdersByContract()](OrderFetcherInterface.md#getordersbycontract)
  - [getOrdersByIds()](OrderFetcherInterface.md#getordersbyids)
  - [getOrdersByMaker()](OrderFetcherInterface.md#getordersbymaker)
  - [getOrdersByNFT()](OrderFetcherInterface.md#getordersbynft)

## Methods

### getOrdersByContract()

> **getOrdersByContract**(`params`): `Promise`\<[`OrdersFetcherResp`](OrdersFetcherResp.md)\>

Return listings and offers of a collection by contract
- details: [https://docs.nftgo.io/reference/post_orderbook-v1-orders-get-orders-by-contract](https://docs.nftgo.io/reference/post_orderbook-v1-orders-get-orders-by-contract)

#### Parameters

▪ **params**: [`GetOrdersByContractReq`](GetOrdersByContractReq.md)

[GetOrdersByContractReq](GetOrdersByContractReq.md)

#### Returns

Promise<[OrdersFetcherResp](OrdersFetcherResp.md)>

#### Source

[order-fetcher.ts:292](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L292)

***

### getOrdersByIds()

> **getOrdersByIds**(`params`): `Promise`\<[`OrdersFetcherResp`](OrdersFetcherResp.md)\>

Return listings and offers by order ids
- details: [https://docs.nftgo.io/reference/post_orderbook-v1-orders-get-orders-by-ids](https://docs.nftgo.io/reference/post_orderbook-v1-orders-get-orders-by-ids)

#### Parameters

▪ **params**: [`GetOrdersByIdsReq`](GetOrdersByIdsReq.md)

[GetOrdersByIdsReq](GetOrdersByIdsReq.md)

#### Returns

Promise<[OrdersFetcherResp](OrdersFetcherResp.md)>

#### Source

[order-fetcher.ts:308](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L308)

***

### getOrdersByMaker()

> **getOrdersByMaker**(`params`): `Promise`\<[`OrdersFetcherResp`](OrdersFetcherResp.md)\>

Return listings and offers of a wallet address
- details: [https://docs.nftgo.io/reference/post_orderbook-v1-orders-get-orders-by-maker](https://docs.nftgo.io/reference/post_orderbook-v1-orders-get-orders-by-maker)

#### Parameters

▪ **params**: [`GetOrdersByMakerReq`](GetOrdersByMakerReq.md)

[GetOrdersByMakerReq](GetOrdersByMakerReq.md)

#### Returns

Promise<[OrdersFetcherResp](OrdersFetcherResp.md)>

#### Source

[order-fetcher.ts:316](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L316)

***

### getOrdersByNFT()

> **getOrdersByNFT**(`params`): `Promise`\<[`OrdersFetcherResp`](OrdersFetcherResp.md)\>

Return listings and offers of a NFT
- details: [https://docs.nftgo.io/reference/post_orderbook-v1-orders-get-orders-by-nft](https://docs.nftgo.io/reference/post_orderbook-v1-orders-get-orders-by-nft)

#### Parameters

▪ **params**: [`GetOrdersByNftsReq`](GetOrdersByNftsReq.md)

[GetOrdersByNftsReq](GetOrdersByNftsReq.md)

#### Returns

Promise<[OrdersFetcherResp](OrdersFetcherResp.md)>

#### Source

[order-fetcher.ts:300](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/order-fetcher.ts#L300)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
