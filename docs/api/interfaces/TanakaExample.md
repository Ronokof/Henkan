[**henkan**](../README.md)

***

[henkan](../README.md) / TanakaExample

# Interface: TanakaExample

Defined in: [types.ts:313](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L313)

Tanaka Corpus `examples.utf` examples

## Properties

### furigana?

> `optional` **furigana**: `string`

Defined in: [types.ts:329](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L329)

The Japanese phrase, with furigana attached

***

### parts

> **parts**: [`ExamplePart`](ExamplePart.md)[]

Defined in: [types.ts:325](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L325)

The `B` section, split into parts

***

### phrase

> **phrase**: `string`

Defined in: [types.ts:317](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L317)

The Japanese phrase (found in the `A` section, **before** the tab)

***

### translation

> **translation**: `string`

Defined in: [types.ts:321](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L321)

The English translation of the phrase (found in the `A` section, **after** the tab)
