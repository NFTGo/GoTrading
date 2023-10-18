**@nftgo/gotrading** ∙ [README](../README.md) ∙ [API](../exports.md)

***

[API](../exports.md) > BlurAuthenticator

# Type alias: BlurAuthenticator

> **BlurAuthenticator**: [`Authenticator`](../interfaces/Authenticator.md)\<[`BlurAuthenticatorParams`](BlurAuthenticatorParams.md), `string`\> & `object`

## Type declaration

### signBlurAuthChallenge

> **signBlurAuthChallenge**: (`params`) => `Promise`\<`string`\>

#### Parameters

▪ **params**: [`BlurAuthLoginParams`](../interfaces/BlurAuthLoginParams.md)

### getAuthChallenge()

#### Parameters

▪ **address**: `string`

### getAuthSignature()

#### Parameters

▪ **message**: `string`

## Source

[authenticator/index.ts:21](https://github.com/NFTGo/GoTrading/blob/1fa3b8d/src/types/authenticator/index.ts#L21)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
