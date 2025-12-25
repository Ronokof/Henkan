[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanjiWithRadicals

# Interface: DictKanjiWithRadicals

Defined in: [types.ts:349](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L349)

KRADFILE2 entry (kanji with its radicals/components)

## Properties

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:353](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L353)

The kanji character

***

### radicals

> **radicals**: [`DictKanji`](DictKanji.md)[]

Defined in: [types.ts:359](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L359)

The radicals/components that make up the kanji

Can be [DictKanji](DictKanji.md) objects with either an actual kanji or a katakana character (which takes the place of the missing kanji)
