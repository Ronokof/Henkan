[**henkan**](../README.md)

***

[henkan](../README.md) / TanakaExample

# Interface: TanakaExample

Defined in: [types.ts:331](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L331)

Tanaka Corpus `examples.utf` examples

## Properties

### furigana?

> `readonly` `optional` **furigana**: `string`

Defined in: [types.ts:351](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L351)

The Japanese phrase, with furigana attached

***

### id

> `readonly` **id**: `` `${number}_${number}` ``

Defined in: [types.ts:335](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L335)

The ID of the example

***

### parts

> `readonly` **parts**: [`ExamplePart`](ExamplePart.md)[]

Defined in: [types.ts:347](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L347)

The `B` section, split into parts

***

### phrase

> `readonly` **phrase**: `string`

Defined in: [types.ts:339](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L339)

The Japanese phrase (found in the `A` section, **before** the tab)

***

### translation

> `readonly` **translation**: `string`

Defined in: [types.ts:343](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L343)

The English translation of the phrase (found in the `A` section, **after** the tab)
