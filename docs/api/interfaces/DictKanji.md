[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanji

# Interface: DictKanji

Defined in: types.ts:227

KANJIDIC2 entry (kanji)

Equivalent to the `character` KANJIDIC2 element *(excluding some subelements)*

## Properties

### kanji

> `readonly` **kanji**: `string`

Defined in: types.ts:231

The kanji character

***

### misc?

> `optional` **misc**: [`DictKanjiMisc`](DictKanjiMisc.md)

Defined in: types.ts:235

The miscellaneous information about the kanji

***

### readingMeaning

> **readingMeaning**: [`DictKanjiReadingMeaning`](DictKanjiReadingMeaning.md)[]

Defined in: types.ts:239

The "readings-meanings" groups and nanori readings of the kanji
