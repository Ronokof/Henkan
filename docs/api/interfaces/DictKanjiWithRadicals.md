[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanjiWithRadicals

# Interface: DictKanjiWithRadicals

Defined in: [types.ts:397](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L397)

KRADFILE2 entry (kanji with its radicals/components)

## Properties

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:401](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L401)

The kanji character

***

### radicals

> **radicals**: [`DictKanji`](DictKanji.md)[]

Defined in: [types.ts:407](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L407)

The radicals/components that make up the kanji

Can be [DictKanji](DictKanji.md) objects with either an actual kanji or a katakana character (which takes the place of the missing kanji)
