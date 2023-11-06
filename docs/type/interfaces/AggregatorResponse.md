**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > AggregatorResponse

# Interface: AggregatorResponse

## Contents

- [Properties](AggregatorResponse.md#properties)
  - [actions](AggregatorResponse.md#actions)
  - [executeActions](AggregatorResponse.md#executeactions)
  - [invalidOrderHashes](AggregatorResponse.md#invalidorderhashes)
  - [invalidOrderIds](AggregatorResponse.md#invalidorderids)

## Properties

### actions

> **actions**: [`AggregatorAction`](../type-aliases/AggregatorAction.md)\<[`ActionKind`](../enumerations/ActionKind.md)\>[]

#### Source

[aggregator/response.ts:10](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/response.ts#L10)

***

### executeActions

> **executeActions**: (`options`?) => `Promise`\<`void`\>

Execute tasks step by step

#### Parameters

▪ **options?**: [`ExecuteOptions`](ExecuteOptions.md)

[ExecuteOptions](ExecuteOptions.md)

#### Source

[aggregator/response.ts:13](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/response.ts#L13)

***

### invalidOrderHashes

> **invalidOrderHashes**?: `string`[]

#### Source

[aggregator/response.ts:11](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/response.ts#L11)

***

### invalidOrderIds

> **invalidOrderIds**?: `string`[]

#### Source

[aggregator/response.ts:12](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/aggregator/response.ts#L12)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
