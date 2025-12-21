[**henkan**](../README.md)

***

[henkan](../README.md) / TanakaExample

# Interface: TanakaExample

Defined in: [types.ts:394](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L394)

Tanaka Corpus `examples.utf` examples

## Properties

### furigana?

> `optional` **furigana**: `string`

Defined in: [types.ts:414](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L414)

The Japanese phrase, with furigana attached

***

### glossNumber?

> `optional` **glossNumber**: [`GlossSpecificNumber`](GlossSpecificNumber.md)

Defined in: [types.ts:418](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L418)

The word-gloss pair

***

### id

> `readonly` **id**: `` `${number}_${number}` ``

Defined in: [types.ts:398](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L398)

The ID of the example

***

### parts

> `readonly` **parts**: [`ExamplePart`](ExamplePart.md)[]

Defined in: [types.ts:410](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L410)

The `B` section, split into parts

***

### phrase

> `readonly` **phrase**: `string`

Defined in: [types.ts:402](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L402)

The Japanese phrase (found in the `A` section, **before** the tab)

***

### translation

> `readonly` **translation**: `string`

Defined in: [types.ts:406](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L406)

The English translation of the phrase (found in the `A` section, **after** the tab)
