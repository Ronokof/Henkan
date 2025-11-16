[**henkan**](../README.md)

***

[henkan](../README.md) / TanakaExample

# Interface: TanakaExample

Defined in: [types.ts:333](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L333)

Tanaka Corpus `examples.utf` examples

## Properties

### furigana?

> `readonly` `optional` **furigana**: `string`

Defined in: [types.ts:353](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L353)

The Japanese phrase, with furigana attached

***

### id

> `readonly` **id**: `` `${number}_${number}` ``

Defined in: [types.ts:337](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L337)

The ID of the example

***

### parts

> `readonly` **parts**: [`ExamplePart`](ExamplePart.md)[]

Defined in: [types.ts:349](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L349)

The `B` section, split into parts

***

### phrase

> `readonly` **phrase**: `string`

Defined in: [types.ts:341](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L341)

The Japanese phrase (found in the `A` section, **before** the tab)

***

### translation

> `readonly` **translation**: `string`

Defined in: [types.ts:345](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L345)

The English translation of the phrase (found in the `A` section, **after** the tab)
