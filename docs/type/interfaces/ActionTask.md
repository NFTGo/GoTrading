**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > ActionTask

# Interface: ActionTask

## Contents

- [Properties](ActionTask.md#properties)
  - [action](ActionTask.md#action)
  - [error](ActionTask.md#error)
  - [index](ActionTask.md#index)
  - [pre](ActionTask.md#pre)
  - [result](ActionTask.md#result)
  - [status](ActionTask.md#status)
- [Methods](ActionTask.md#methods)
  - [execute()](ActionTask.md#execute)

## Properties

### action

> **action**: [`AggregatorAction`](../type-aliases/AggregatorAction.md)\<[`ActionKind`](../enumerations/ActionKind.md)\>

#### Source

[action/task.ts:15](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/task.ts#L15)

***

### error

> **error**: `null` \| `Error`

#### Source

[action/task.ts:14](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/task.ts#L14)

***

### index

> **index**: `number`

#### Source

[action/task.ts:13](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/task.ts#L13)

***

### pre

> **pre**: `null` \| [`ActionTask`](ActionTask.md)

#### Source

[action/task.ts:16](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/task.ts#L16)

***

### result

> **result**: `unknown`

#### Source

[action/task.ts:17](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/task.ts#L17)

***

### status

> **status**: [`ActionTaskStatus`](../type-aliases/ActionTaskStatus.md)

#### Source

[action/task.ts:12](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/task.ts#L12)

## Methods

### execute()

> **execute**(): `Promise`\<`void`\>

#### Source

[action/task.ts:18](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/task.ts#L18)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
