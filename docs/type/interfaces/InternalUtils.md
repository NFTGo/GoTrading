**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > InternalUtils

# Interface: InternalUtils

## Contents

- [Extended By](InternalUtils.md#extended-by)
- [Properties](InternalUtils.md#properties)
  - [blurAuthenticator](InternalUtils.md#blurauthenticator)
  - [createActionExecutor](InternalUtils.md#createactionexecutor)
  - [getSigner](InternalUtils.md#getsigner)
  - [processor](InternalUtils.md#processor)
  - [signMessage](InternalUtils.md#signmessage)
  - [x2y2Authenticator](InternalUtils.md#x2y2authenticator)
- [Methods](InternalUtils.md#methods)
  - [decodeLog()](InternalUtils.md#decodelog)
  - [inspectTransaction()](InternalUtils.md#inspecttransaction)
  - [sendSafeModeTransaction()](InternalUtils.md#sendsafemodetransaction)
  - [sendTransaction()](InternalUtils.md#sendtransaction)

## Extended By

- [`Utils`](Utils.md)

## Properties

### blurAuthenticator

> **blurAuthenticator**?: [`BlurAuthenticator`](../type-aliases/BlurAuthenticator.md)

#### Source

[utils.ts:9](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L9)

***

### createActionExecutor

> **createActionExecutor**?: (`actions`) => [`ActionTaskExecutor`](ActionTaskExecutor.md)

#### Parameters

▪ **actions**: `never`[]

#### Source

[utils.ts:12](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L12)

***

### getSigner

> **getSigner**: () => `Wallet` \| `JsonRpcSigner`

Get ehters signer

#### Returns

ethers.providers.JsonRpcSigner | ethers.Wallet

#### Source

[utils.ts:50](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L50)

***

### processor

> **processor**?: [`ActionProcessor`](ActionProcessor.md)

#### Source

[utils.ts:19](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L19)

***

### signMessage

> **signMessage**: (`message`) => `Promise`\<`undefined` \| `string`\>

Standard sign message

#### Parameters

▪ **message**: `string`

string

#### Returns

Promise<string | undefined>

#### Source

[utils.ts:44](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L44)

***

### x2y2Authenticator

> **x2y2Authenticator**?: [`X2Y2Authenticator`](../type-aliases/X2Y2Authenticator.md)

#### Source

[utils.ts:10](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L10)

## Methods

### decodeLog()

> **decodeLog**(`log`): `null` \| [`DecodeLogRes`](DecodeLogRes.md)

Decode transaction log, return contract, token id, trading amount, buyer

#### Parameters

▪ **log**: `Log`

[Log]([object Object]) single log returned by send transaction method

#### Returns

res [DecodeLogRes](DecodeLogRes.md)

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

#### Source

[utils.ts:31](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/utils.ts#L31)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
