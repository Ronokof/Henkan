[**henkan**](../README.md)

***

[henkan](../README.md) / JaWiktionaryEntry

# Interface: JaWiktionaryEntry

Defined in: [types.ts:509](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L509)

Useful information from a `ja.wiktionary.org` entry

## Properties

### forms?

> `optional` **forms**: `string`[]

Defined in: [types.ts:525](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L525)

Other forms (as kanji form or kana) of the word

***

### pos\_title

> **pos\_title**: [`POS`](../type-aliases/POS.md)

Defined in: [types.ts:517](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L517)

The part of speech (in Japanese)

***

### senses?

> `optional` **senses**: `JaWiktionaryEntrySense`[]

Defined in: [types.ts:521](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L521)

The word senses

***

### word

> **word**: `string`

Defined in: [types.ts:513](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L513)

The "title" (word) of the page
