**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > Utils

# Interface: Utils

## Contents

- [Extends](Utils.md#extends)
- [Properties](Utils.md#properties)
  - [blurAuthenticator](Utils.md#blurauthenticator)
  - [getSigner](Utils.md#getsigner)
  - [processor](Utils.md#processor)
  - [signMessage](Utils.md#signmessage)
  - [x2y2Authenticator](Utils.md#x2y2authenticator)
- [Methods](Utils.md#methods)
  - [createActionExecutor()](Utils.md#createactionexecutor)
  - [decodeLog()](Utils.md#decodelog)
  - [inspectTransaction()](Utils.md#inspecttransaction)
  - [sendSafeModeTransaction()](Utils.md#sendsafemodetransaction)
  - [sendTransaction()](Utils.md#sendtransaction)

## Extends

- [`InternalUtils`](InternalUtils.md)

## Properties

### blurAuthenticator

> **blurAuthenticator**?: [`BlurAuthenticator`](../type-aliases/BlurAuthenticator.md)

#### Inherited from

[`InternalUtils`](InternalUtils.md).[`blurAuthenticator`](InternalUtils.md#blurauthenticator)

#### Source

[utils.ts:9](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L9)

***

### getSigner

> **getSigner**: () => `Wallet` \| `JsonRpcSigner`

Get ehters signer

#### Returns

ethers.providers.JsonRpcSigner | ethers.Wallet

#### Inherited from

[`InternalUtils`](InternalUtils.md).[`getSigner`](InternalUtils.md#getsigner)

#### Source

[utils.ts:50](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L50)

***

### processor

> **processor**: [`ActionProcessor`](ActionProcessor.md)

#### Overrides

[`InternalUtils`](InternalUtils.md).[`processor`](InternalUtils.md#processor)

#### Source

[utils.ts:55](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L55)

***

### signMessage

> **signMessage**: (`message`) => `Promise`\<`undefined` \| `string`\>

Standard sign message

#### Parameters

▪ **message**: `string`

string

#### Returns

Promise<string | undefined>

#### Inherited from

[`InternalUtils`](InternalUtils.md).[`signMessage`](InternalUtils.md#signmessage)

#### Source

[utils.ts:44](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L44)

***

### x2y2Authenticator

> **x2y2Authenticator**?: [`X2Y2Authenticator`](../type-aliases/X2Y2Authenticator.md)

#### Inherited from

[`InternalUtils`](InternalUtils.md).[`x2y2Authenticator`](InternalUtils.md#x2y2authenticator)

#### Source

[utils.ts:10](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L10)

## Methods

### createActionExecutor()

> **createActionExecutor**(`actions`): [`ActionTaskExecutor`](ActionTaskExecutor.md)

#### Parameters

▪ **actions**: [`AggregatorAction`](../type-aliases/AggregatorAction.md)\<[`ActionKind`](../enumerations/ActionKind.md)\>[]

#### Overrides

InternalUtils.createActionExecutor

#### Source

[utils.ts:54](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L54)

***

### decodeLog()

> **decodeLog**(`log`): `null` \| [`DecodeLogRes`](DecodeLogRes.md)

Decode transaction log, return contract, token id, trading amount, buyer

#### Parameters

▪ **log**: `Log`

[Log]([object Object]) single log returned by send transaction method

#### Returns

res [DecodeLogRes](DecodeLogRes.md)

#### Inherited from

[`InternalUtils`](InternalUtils.md).[`decodeLog`](InternalUtils.md#decodelog)

#### Source

[utils.ts:18](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L18)

***

### inspectTransaction()

> **inspectTransaction**(`params`): [`Transaction`](Transaction.md)

Inspect a transaction

#### Parameters

▪ **params**: [`InspectTransactionParams`](InspectTransactionParams.md)

[InspectTransactionParams](InspectTransactionParams.md) transaction hash, inspect interval

#### Returns

transaction [Transaction](Transaction.md)

#### Inherited from

[`InternalUtils`](InternalUtils.md).[`inspectTransaction`](InternalUtils.md#inspecttransaction)

#### Source

[utils.ts:37](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L37)

***

### sendSafeModeTransaction()

> **sendSafeModeTransaction**(`transactionConfig`): [`Transaction`](Transaction.md)

Send transaction with safe mode, using flash bot

#### Parameters

▪ **transactionConfig**: `Partial`\<`Transaction`\>

[https://docs.ethers.io/v5/api/providers/types/#providers-TransactionRequest](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionRequest) transaction config

#### Returns

transaction [Transaction](Transaction.md)

#### Inherited from

[`InternalUtils`](InternalUtils.md).[`sendSafeModeTransaction`](InternalUtils.md#sendsafemodetransaction)

#### Source

[utils.ts:25](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L25)

***

### sendTransaction()

> **sendTransaction**(`transactionConfig`): [`Transaction`](Transaction.md)

Send transaction

#### Parameters

▪ **transactionConfig**: `TransactionConfig`

[https://web3js.readthedocs.io/en/v1.8.2/web3-eth.html#sendtransaction](https://web3js.readthedocs.io/en/v1.8.2/web3-eth.html#sendtransaction) transaction config

#### Returns

transaction [Transaction](Transaction.md)

#### Inherited from

[`InternalUtils`](InternalUtils.md).[`sendTransaction`](InternalUtils.md#sendtransaction)

#### Source

[utils.ts:31](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L31)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
