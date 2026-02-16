[**henkan**](../README.md)

***

[henkan](../README.md) / JaWiktionaryEntry

# Interface: JaWiktionaryEntry

Defined in: [types.ts:571](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L571)

Useful information from a `ja.wiktionary.org` entry

## Properties

### forms?

> `optional` **forms**: `string`[]

Defined in: [types.ts:587](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L587)

Other forms (as kanji form or kana) of the word

***

### pos\_title

> **pos\_title**: [`POS`](../type-aliases/POS.md)

Defined in: [types.ts:579](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L579)

The part of speech (in Japanese)

***

### senses?

> `optional` **senses**: `JaWiktionaryEntrySense`[]

Defined in: [types.ts:583](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L583)

The word senses

***

### word

> **word**: `string`

Defined in: [types.ts:575](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L575)

The "title" (word) of the page
