[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanji

# Interface: DictKanji

Defined in: [types.ts:290](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L290)

KANJIDIC2 entry (kanji)

Equivalent to the `character` KANJIDIC2 element *(excluding some subelements)*

## Properties

### isKokuji?

> `optional` **isKokuji**: `true`

Defined in: [types.ts:306](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L306)

Whether or not the kanji is kokuji

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:294](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L294)

The kanji character

***

### misc?

> `optional` **misc**: [`DictKanjiMisc`](DictKanjiMisc.md)

Defined in: [types.ts:298](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L298)

The miscellaneous information about the kanji

***

### readingMeaning?

> `optional` **readingMeaning**: [`DictKanjiReadingMeaning`](DictKanjiReadingMeaning.md)[]

Defined in: [types.ts:302](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L302)

The "readings-meanings" groups and nanori readings of the kanji
