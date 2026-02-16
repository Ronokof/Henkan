[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanji

# Interface: DictKanji

Defined in: [types.ts:357](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L357)

KANJIDIC2 entry (kanji)

Equivalent to the `character` KANJIDIC2 element *(excluding some subelements)*

## Properties

### isKokuji?

> `optional` **isKokuji**: `true`

Defined in: [types.ts:373](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L373)

Whether or not the kanji is kokuji

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:361](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L361)

The kanji character

***

### misc?

> `optional` **misc**: [`DictKanjiMisc`](DictKanjiMisc.md)

Defined in: [types.ts:365](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L365)

The miscellaneous information about the kanji

***

### readingMeaning?

> `optional` **readingMeaning**: [`DictKanjiReadingMeaning`](DictKanjiReadingMeaning.md)[]

Defined in: [types.ts:369](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L369)

The "readings-meanings" groups and nanori readings of the kanji
