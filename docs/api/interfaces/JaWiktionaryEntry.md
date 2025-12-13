[**henkan**](../README.md)

***

[henkan](../README.md) / JaWiktionaryEntry

# Interface: JaWiktionaryEntry

Defined in: [types.ts:424](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L424)

Useful information from a `ja.wiktionary.org` entry

## Properties

### forms?

> `optional` **forms**: `object`[]

Defined in: [types.ts:445](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L445)

Other forms (as kanji form or kana) of the word

#### form

> **form**: `string`

***

### pos\_title?

> `optional` **pos\_title**: [`POS`](../type-aliases/POS.md)

Defined in: [types.ts:432](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L432)

The part of speech (in Japanese)

***

### senses?

> `optional` **senses**: `object`[]

Defined in: [types.ts:436](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L436)

The word senses

#### form\_of?

> `optional` **form\_of**: `object`[]

#### glosses?

> `optional` **glosses**: `string`[]

***

### word

> **word**: `string`

Defined in: [types.ts:428](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L428)

The "title" (word) of the page
