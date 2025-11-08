[**henkan**](../README.md)

***

[henkan](../README.md) / TanakaExample

# Interface: TanakaExample

Defined in: [types.ts:327](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L327)

Tanaka Corpus `examples.utf` examples

## Properties

### furigana?

> `optional` **furigana**: `string`

Defined in: [types.ts:343](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L343)

The Japanese phrase, with furigana attached

***

### parts

> **parts**: [`ExamplePart`](ExamplePart.md)[]

Defined in: [types.ts:339](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L339)

The `B` section, split into parts

***

### phrase

> `readonly` **phrase**: `string`

Defined in: [types.ts:331](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L331)

The Japanese phrase (found in the `A` section, **before** the tab)

***

### translation

> `readonly` **translation**: `string`

Defined in: [types.ts:335](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L335)

The English translation of the phrase (found in the `A` section, **after** the tab)
