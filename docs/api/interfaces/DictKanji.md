[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanji

# Interface: DictKanji

Defined in: [types.ts:237](https://github.com/Ronokof/Henkan/blob/01286919f67c03d612f8888caf771598291b536e/src/types.ts#L237)

KANJIDIC2 entry (kanji)

Equivalent to the `character` KANJIDIC2 element *(excluding some subelements)*

## Properties

### isKokuji?

> `optional` **isKokuji**: `true`

Defined in: [types.ts:253](https://github.com/Ronokof/Henkan/blob/01286919f67c03d612f8888caf771598291b536e/src/types.ts#L253)

Whether or not the kanji is kokuji

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:241](https://github.com/Ronokof/Henkan/blob/01286919f67c03d612f8888caf771598291b536e/src/types.ts#L241)

The kanji character

***

### misc?

> `optional` **misc**: [`DictKanjiMisc`](DictKanjiMisc.md)

Defined in: [types.ts:245](https://github.com/Ronokof/Henkan/blob/01286919f67c03d612f8888caf771598291b536e/src/types.ts#L245)

The miscellaneous information about the kanji

***

### readingMeaning

> **readingMeaning**: [`DictKanjiReadingMeaning`](DictKanjiReadingMeaning.md)[]

Defined in: [types.ts:249](https://github.com/Ronokof/Henkan/blob/01286919f67c03d612f8888caf771598291b536e/src/types.ts#L249)

The "readings-meanings" groups and nanori readings of the kanji
