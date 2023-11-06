**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > HTTPClient

# Interface: HTTPClient

## Contents

- [Methods](HTTPClient.md#methods)
  - [get()](HTTPClient.md#get)
  - [post()](HTTPClient.md#post)

## Methods

### get()

> **get**\<`R`, `Q`\>(`url`, `query`, `headers`?): `Promise`\<`R`\>

#### Type parameters

▪ **R**

▪ **Q** = `undefined`

#### Parameters

▪ **url**: `string`

▪ **query**: `undefined` \| `Q`

▪ **headers?**: `Record`\<`string`, `string`\>

#### Source

[http.ts:2](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/http.ts#L2)

***

### post()

> **post**\<`R`, `P`\>(`url`, `data`, `headers`?, `needOriginResponse`?): `Promise`\<`R`\>

#### Type parameters

▪ **R**

▪ **P** = `undefined`

#### Parameters

▪ **url**: `string`

▪ **data**: `P`

▪ **headers?**: `Record`\<`string`, `string`\>

▪ **needOriginResponse?**: `boolean`

#### Source

[http.ts:3](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/http.ts#L3)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
