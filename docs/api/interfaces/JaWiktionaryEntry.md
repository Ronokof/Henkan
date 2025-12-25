[**henkan**](../README.md)

***

[henkan](../README.md) / JaWiktionaryEntry

# Interface: JaWiktionaryEntry

Defined in: [types.ts:456](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L456)

Useful information from a `ja.wiktionary.org` entry

## Properties

### forms?

> `optional` **forms**: `string`[]

Defined in: [types.ts:472](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L472)

Other forms (as kanji form or kana) of the word

***

### pos\_title?

> `optional` **pos\_title**: [`POS`](../type-aliases/POS.md)

Defined in: [types.ts:464](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L464)

The part of speech (in Japanese)

***

### senses

> **senses**: `JaWiktionaryEntrySense`[]

Defined in: [types.ts:468](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L468)

The word senses

***

### word

> **word**: `string`

Defined in: [types.ts:460](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L460)

The "title" (word) of the page
