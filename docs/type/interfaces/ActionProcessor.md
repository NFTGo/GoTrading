**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > ActionProcessor

# Interface: ActionProcessor

Processors for all kinds of actions

## Contents

- [Properties](ActionProcessor.md#properties)
  - [processControllerAction](ActionProcessor.md#processcontrolleraction)
  - [processPassThroughAction](ActionProcessor.md#processpassthroughaction)
  - [processSignatureAction](ActionProcessor.md#processsignatureaction)
  - [processTransactionAction](ActionProcessor.md#processtransactionaction)

## Properties

### processControllerAction

> **processControllerAction**: (`action`) => `Promise`\<[`AggregatorAction`](../type-aliases/AggregatorAction.md)\<[`ActionKind`](../enumerations/ActionKind.md)\>[]\>

Process controller action. It process a http request which returns actions need to be processed

#### Parameters

▪ **action**: `object`

controller action [AggregatorAction](../type-aliases/AggregatorAction.md)[ActionKind.Controller](../enumerations/ActionKind.md#controller)

▪ **action.data**: [`PassThroughActionInfo`](../type-aliases/PassThroughActionInfo.md)

▪ **action.description**: `string`

▪ **action.kind**: [`Controller`](../enumerations/ActionKind.md#controller)

▪ **action.name**: [`ActionName`](../enumerations/ActionName.md)

#### Returns

Promise<AggregatorAction<ActionKind>[]>

#### Source

[action/processor.ts:61](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/processor.ts#L61)

***

### processPassThroughAction

> **processPassThroughAction**: (`action`, `params`) => `Promise`\<`any`\>

Process pass through action. For now, it means request a NFTGo data api with ProcessPassThroughActionParams

#### Parameters

▪ **action**: `object`

pass through action [AggregatorAction](../type-aliases/AggregatorAction.md)[ActionKind.PassThrough](../enumerations/ActionKind.md#passthrough)

▪ **action.data**: [`PassThroughActionInfo`](../type-aliases/PassThroughActionInfo.md)

▪ **action.description**: `string`

▪ **action.kind**: [`PassThrough`](../enumerations/ActionKind.md#passthrough)

▪ **action.name**: [`ActionName`](../enumerations/ActionName.md)

▪ **params**: [`ProcessPassThroughActionParams`](../type-aliases/ProcessPassThroughActionParams.md)

[ProcessPassThroughActionParams](../type-aliases/ProcessPassThroughActionParams.md)

#### Returns

Promise<any>

#### Source

[action/processor.ts:51](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/processor.ts#L51)

***

### processSignatureAction

> **processSignatureAction**: (`action`) => `Promise`\<`string`\>

Process signature action, return a string signature

#### Parameters

▪ **action**: `object`

signature action [AggregatorAction](../type-aliases/AggregatorAction.md)[ActionKind.Signature](../enumerations/ActionKind.md#signature)

▪ **action.data**: [`SignatureActionInfo`](../type-aliases/SignatureActionInfo.md)

▪ **action.description**: `string`

▪ **action.kind**: [`Signature`](../enumerations/ActionKind.md#signature)

▪ **action.name**: [`ActionName`](../enumerations/ActionName.md)

#### Returns

Promise<string>

#### Source

[action/processor.ts:32](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/processor.ts#L32)

***

### processTransactionAction

> **processTransactionAction**: (`action`, `callbacks`?) => `Promise`\<`boolean`\>

Process signature action, return true if transaction complete

#### Parameters

▪ **action**: `object`

transaction action [AggregatorAction](../type-aliases/AggregatorAction.md)[ActionKind.Transaction](../enumerations/ActionKind.md#transaction)

▪ **action.data**: [`TransactionActionInfo`](../type-aliases/TransactionActionInfo.md)

▪ **action.description?**: `string`

▪ **action.kind?**: [`Transaction`](../enumerations/ActionKind.md#transaction)

▪ **action.name?**: [`ActionName`](../enumerations/ActionName.md)

▪ **callbacks?**: [`ProcessTransactionCallBacks`](ProcessTransactionCallBacks.md)

Callbacks in processing transaction [ProcessTransactionCallBacks](ProcessTransactionCallBacks.md)

#### Returns

Promise<boolean>

#### Source

[action/processor.ts:40](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/action/processor.ts#L40)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
