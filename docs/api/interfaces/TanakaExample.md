[**henkan**](../README.md)

***

[henkan](../README.md) / TanakaExample

# Interface: TanakaExample

Defined in: [types.ts:463](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L463)

Tanaka Corpus `examples.utf` examples

## Properties

### furigana?

> `optional` **furigana**: `string`

Defined in: [types.ts:483](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L483)

The Japanese phrase, with furigana attached

***

### glossNumber?

> `optional` **glossNumber**: [`GlossSpecificNumber`](GlossSpecificNumber.md)

Defined in: [types.ts:487](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L487)

The word-gloss pair

***

### id

> `readonly` **id**: `` `${number}_${number}` ``

Defined in: [types.ts:467](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L467)

The ID of the example

***

### parts

> `readonly` **parts**: [`ExamplePart`](ExamplePart.md)[]

Defined in: [types.ts:479](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L479)

The `B` section, split into parts

***

### phrase

> `readonly` **phrase**: `string`

Defined in: [types.ts:471](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L471)

The Japanese phrase (found in the `A` section, **before** the tab)

***

### translation

> `readonly` **translation**: `string`

Defined in: [types.ts:475](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L475)

The English translation of the phrase (found in the `A` section, **after** the tab)
