**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > ActionTaskExecutor

# Interface: ActionTaskExecutor

Convert actions to tasks and provide an `execute` function that can complete all tasks step by step

## Contents

- [Properties](ActionTaskExecutor.md#properties)
  - [[iterator]](ActionTaskExecutor.md#iterator)
- [Methods](ActionTaskExecutor.md#methods)
  - [execute()](ActionTaskExecutor.md#execute)

## Properties

### [iterator]

> **[iterator]**: () => `Generator`\<[`ActionTask`](ActionTask.md), `any`, `unknown`\>

#### Source

[action/executor.ts:12](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/executor.ts#L12)

## Methods

### execute()

> **execute**(`options`?): `Promise`\<`void`\>

Execute tasks step by step

#### Parameters

▪ **options?**: [`ExecuteOptions`](ExecuteOptions.md)

[ExecuteOptions](ExecuteOptions.md)

#### Source

[action/executor.ts:11](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/executor.ts#L11)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
