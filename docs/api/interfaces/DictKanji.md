[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanji

# Interface: DictKanji

Defined in: [types.ts:309](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L309)

KANJIDIC2 entry (kanji)

Equivalent to the `character` KANJIDIC2 element *(excluding some subelements)*

## Properties

### isKokuji?

> `optional` **isKokuji**: `true`

Defined in: [types.ts:325](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L325)

Whether or not the kanji is kokuji

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:313](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L313)

The kanji character

***

### misc?

> `optional` **misc**: [`DictKanjiMisc`](DictKanjiMisc.md)

Defined in: [types.ts:317](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L317)

The miscellaneous information about the kanji

***

### readingMeaning?

> `optional` **readingMeaning**: [`DictKanjiReadingMeaning`](DictKanjiReadingMeaning.md)[]

Defined in: [types.ts:321](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L321)

The "readings-meanings" groups and nanori readings of the kanji
