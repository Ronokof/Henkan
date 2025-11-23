[**henkan**](../README.md)

***

[henkan](../README.md) / TanakaExample

# Interface: TanakaExample

Defined in: [types.ts:347](https://github.com/Ronokof/Henkan/blob/5a5b65a6c9451f9ba9d8831d08b4643388bb91e5/src/types.ts#L347)

Tanaka Corpus `examples.utf` examples

## Properties

### furigana?

> `readonly` `optional` **furigana**: `string`

Defined in: [types.ts:367](https://github.com/Ronokof/Henkan/blob/5a5b65a6c9451f9ba9d8831d08b4643388bb91e5/src/types.ts#L367)

The Japanese phrase, with furigana attached

***

### glossNumber?

> `optional` **glossNumber**: [`GlossSpecificNumber`](GlossSpecificNumber.md)

Defined in: [types.ts:371](https://github.com/Ronokof/Henkan/blob/5a5b65a6c9451f9ba9d8831d08b4643388bb91e5/src/types.ts#L371)

The word-gloss pair

***

### id

> `readonly` **id**: `` `${number}_${number}` ``

Defined in: [types.ts:351](https://github.com/Ronokof/Henkan/blob/5a5b65a6c9451f9ba9d8831d08b4643388bb91e5/src/types.ts#L351)

The ID of the example

***

### parts

> `readonly` **parts**: [`ExamplePart`](ExamplePart.md)[]

Defined in: [types.ts:363](https://github.com/Ronokof/Henkan/blob/5a5b65a6c9451f9ba9d8831d08b4643388bb91e5/src/types.ts#L363)

The `B` section, split into parts

***

### phrase

> `readonly` **phrase**: `string`

Defined in: [types.ts:355](https://github.com/Ronokof/Henkan/blob/5a5b65a6c9451f9ba9d8831d08b4643388bb91e5/src/types.ts#L355)

The Japanese phrase (found in the `A` section, **before** the tab)

***

### translation

> `readonly` **translation**: `string`

Defined in: [types.ts:359](https://github.com/Ronokof/Henkan/blob/5a5b65a6c9451f9ba9d8831d08b4643388bb91e5/src/types.ts#L359)

The English translation of the phrase (found in the `A` section, **after** the tab)
