[**henkan**](../README.md)

***

[henkan](../README.md) / TanakaExample

# Interface: TanakaExample

Defined in: [types.ts:413](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L413)

Tanaka Corpus `examples.utf` examples

## Properties

### furigana?

> `optional` **furigana**: `string`

Defined in: [types.ts:433](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L433)

The Japanese phrase, with furigana attached

***

### glossNumber?

> `optional` **glossNumber**: [`GlossSpecificNumber`](GlossSpecificNumber.md)

Defined in: [types.ts:437](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L437)

The word-gloss pair

***

### id

> `readonly` **id**: `` `${number}_${number}` ``

Defined in: [types.ts:417](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L417)

The ID of the example

***

### parts

> `readonly` **parts**: [`ExamplePart`](ExamplePart.md)[]

Defined in: [types.ts:429](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L429)

The `B` section, split into parts

***

### phrase

> `readonly` **phrase**: `string`

Defined in: [types.ts:421](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L421)

The Japanese phrase (found in the `A` section, **before** the tab)

***

### translation

> `readonly` **translation**: `string`

Defined in: [types.ts:425](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L425)

The English translation of the phrase (found in the `A` section, **after** the tab)
