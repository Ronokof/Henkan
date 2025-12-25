[**henkan**](../README.md)

***

[henkan](../README.md) / TanakaExample

# Interface: TanakaExample

Defined in: [types.ts:415](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L415)

Tanaka Corpus `examples.utf` examples

## Properties

### furigana?

> `optional` **furigana**: `string`

Defined in: [types.ts:435](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L435)

The Japanese phrase, with furigana attached

***

### glossNumber?

> `optional` **glossNumber**: [`GlossSpecificNumber`](GlossSpecificNumber.md)

Defined in: [types.ts:439](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L439)

The word-gloss pair

***

### id

> `readonly` **id**: `` `${number}_${number}` ``

Defined in: [types.ts:419](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L419)

The ID of the example

***

### parts

> `readonly` **parts**: [`ExamplePart`](ExamplePart.md)[]

Defined in: [types.ts:431](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L431)

The `B` section, split into parts

***

### phrase

> `readonly` **phrase**: `string`

Defined in: [types.ts:423](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L423)

The Japanese phrase (found in the `A` section, **before** the tab)

***

### translation

> `readonly` **translation**: `string`

Defined in: [types.ts:427](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L427)

The English translation of the phrase (found in the `A` section, **after** the tab)
