[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanjiWithRadicals

# Interface: DictKanjiWithRadicals

Defined in: [types.ts:347](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L347)

KRADFILE2 entry (kanji with its radicals/components)

## Properties

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:351](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L351)

The kanji character

***

### radicals

> **radicals**: [`DictKanji`](DictKanji.md)[]

Defined in: [types.ts:357](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L357)

The radicals/components that make up the kanji

Can be [DictKanji](DictKanji.md) objects with either an actual kanji or a katakana character (which takes the place of the missing kanji)
