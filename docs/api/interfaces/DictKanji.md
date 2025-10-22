[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanji

# Interface: DictKanji

Defined in: [types.ts:227](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L227)

KANJIDIC2 entry (kanji)

Equivalent to the `character` KANJIDIC2 element *(excluding some subelements)*

## Properties

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:231](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L231)

The kanji character

***

### misc?

> `optional` **misc**: [`DictKanjiMisc`](DictKanjiMisc.md)

Defined in: [types.ts:235](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L235)

The miscellaneous information about the kanji

***

### readingMeaning

> **readingMeaning**: [`DictKanjiReadingMeaning`](DictKanjiReadingMeaning.md)[]

Defined in: [types.ts:239](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L239)

The "readings-meanings" groups and nanori readings of the kanji
