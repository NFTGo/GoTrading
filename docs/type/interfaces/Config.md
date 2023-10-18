**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > Config

# Interface: Config

SDK Config

## Contents

- [Properties](Config.md#properties)
  - [agent](Config.md#agent)
  - [apiKey](Config.md#apikey)
  - [baseUrl](Config.md#baseurl)
  - [chain](Config.md#chain)
  - [looksRareApiKeyConfig](Config.md#looksrareapikeyconfig)
  - [openSeaApiKeyConfig](Config.md#openseaapikeyconfig)
  - [walletConfig](Config.md#walletconfig)
  - [web3Provider](Config.md#web3provider)
  - [x2y2ApiKeyConfig](Config.md#x2y2apikeyconfig)

## Properties

### agent

> **agent**?: `Agent`

Http proxy agent.

#### Source

[config.ts:53](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/config.ts#L53)

***

### apiKey

> **apiKey**?: `string`

NFTGo Data api key. Get one form https://nftgo.io/developers

#### Source

[config.ts:29](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/config.ts#L29)

***

### baseUrl

> **baseUrl**: `string`

Data api base url. Default as https://data-api.nftgo.io

#### Source

[config.ts:21](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/config.ts#L21)

***

### chain

> **chain**: [`EVMChain`](../enumerations/EVMChain.md)

EVM chain. ETHEREUM as Default

#### Source

[config.ts:25](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/config.ts#L25)

***

### looksRareApiKeyConfig

> **looksRareApiKeyConfig**?: [`ApiKeyConfig`](../type-aliases/ApiKeyConfig.md)

LooksRare api key. Used to post orders to LooksRare

#### Source

[config.ts:45](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/config.ts#L45)

***

### openSeaApiKeyConfig

> **openSeaApiKeyConfig**?: [`ApiKeyConfig`](../type-aliases/ApiKeyConfig.md)

Opensea api key. Used to post orders to Opensea

#### Source

[config.ts:41](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/config.ts#L41)

***

### walletConfig

> **walletConfig**?: [`WalletConfig`](WalletConfig.md)

Web3 wallet config. Ignore web3Provider if walletConfig has been set

#### Source

[config.ts:33](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/config.ts#L33)

***

### web3Provider

> **web3Provider**?: `provider`

Web3 provider. Will be ignored if walletConfig has been set

#### Source

[config.ts:37](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/config.ts#L37)

***

### x2y2ApiKeyConfig

> **x2y2ApiKeyConfig**?: [`ApiKeyConfig`](../type-aliases/ApiKeyConfig.md)

X2Y2 api key. Used to post orders to X2Y2

#### Source

[config.ts:49](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/config.ts#L49)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
