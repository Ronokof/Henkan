[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanji

# Interface: DictKanji

Defined in: [types.ts:307](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L307)

KANJIDIC2 entry (kanji)

Equivalent to the `character` KANJIDIC2 element *(excluding some subelements)*

## Properties

### isKokuji?

> `optional` **isKokuji**: `true`

Defined in: [types.ts:323](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L323)

Whether or not the kanji is kokuji

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:311](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L311)

The kanji character

***

### misc?

> `optional` **misc**: [`DictKanjiMisc`](DictKanjiMisc.md)

Defined in: [types.ts:315](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L315)

The miscellaneous information about the kanji

***

### readingMeaning?

> `optional` **readingMeaning**: [`DictKanjiReadingMeaning`](DictKanjiReadingMeaning.md)[]

Defined in: [types.ts:319](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L319)

The "readings-meanings" groups and nanori readings of the kanji
