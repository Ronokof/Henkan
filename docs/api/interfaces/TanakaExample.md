[**henkan**](../README.md)

***

[henkan](../README.md) / TanakaExample

# Interface: TanakaExample

Defined in: [types.ts:353](https://github.com/Ronokof/Henkan/blob/01eea6ba990a37c11289111ee9cd2cf881caaa60/src/types.ts#L353)

Tanaka Corpus `examples.utf` examples

## Properties

### furigana?

> `readonly` `optional` **furigana**: `string`

Defined in: [types.ts:373](https://github.com/Ronokof/Henkan/blob/01eea6ba990a37c11289111ee9cd2cf881caaa60/src/types.ts#L373)

The Japanese phrase, with furigana attached

***

### glossNumber?

> `optional` **glossNumber**: [`GlossSpecificNumber`](GlossSpecificNumber.md)

Defined in: [types.ts:377](https://github.com/Ronokof/Henkan/blob/01eea6ba990a37c11289111ee9cd2cf881caaa60/src/types.ts#L377)

The word-gloss pair

***

### id

> `readonly` **id**: `` `${number}_${number}` ``

Defined in: [types.ts:357](https://github.com/Ronokof/Henkan/blob/01eea6ba990a37c11289111ee9cd2cf881caaa60/src/types.ts#L357)

The ID of the example

***

### parts

> `readonly` **parts**: [`ExamplePart`](ExamplePart.md)[]

Defined in: [types.ts:369](https://github.com/Ronokof/Henkan/blob/01eea6ba990a37c11289111ee9cd2cf881caaa60/src/types.ts#L369)

The `B` section, split into parts

***

### phrase

> `readonly` **phrase**: `string`

Defined in: [types.ts:361](https://github.com/Ronokof/Henkan/blob/01eea6ba990a37c11289111ee9cd2cf881caaa60/src/types.ts#L361)

The Japanese phrase (found in the `A` section, **before** the tab)

***

### translation

> `readonly` **translation**: `string`

Defined in: [types.ts:365](https://github.com/Ronokof/Henkan/blob/01eea6ba990a37c11289111ee9cd2cf881caaa60/src/types.ts#L365)

The English translation of the phrase (found in the `A` section, **after** the tab)
