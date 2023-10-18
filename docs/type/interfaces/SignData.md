**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > SignData

# Interface: SignData

## Contents

- [Properties](SignData.md#properties)
  - [domain](SignData.md#domain)
  - [message](SignData.md#message)
  - [signatureKind](SignData.md#signaturekind)
  - [types](SignData.md#types)
  - [value](SignData.md#value)

## Properties

### domain

> **domain**: `object`

#### Type declaration

##### chainId

> **chainId**: `number`

##### name

> **name**: `string`

##### verifyingContract

> **verifyingContract**: `string`

##### version

> **version**: `string`

#### Source

[action/action.ts:46](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/action.ts#L46)

***

### message

> **message**?: `string`

#### Source

[action/action.ts:55](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/action.ts#L55)

***

### signatureKind

> **signatureKind**: `"eip191"` \| `"eip712"`

#### Source

[action/action.ts:52](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/action.ts#L52)

***

### types

> **types**: `Record`\<`string`, `any`[]\>

#### Source

[action/action.ts:53](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/action.ts#L53)

***

### value

> **value**: `Record`\<`string`, `any`\>

#### Source

[action/action.ts:54](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/action.ts#L54)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
