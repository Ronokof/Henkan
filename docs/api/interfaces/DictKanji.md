[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanji

# Interface: DictKanji

Defined in: [types.ts:243](https://github.com/Ronokof/Henkan/blob/d46de5651d5954bd5a0060ef65e6de181f61566f/src/types.ts#L243)

KANJIDIC2 entry (kanji)

Equivalent to the `character` KANJIDIC2 element *(excluding some subelements)*

## Properties

### isKokuji?

> `optional` **isKokuji**: `true`

Defined in: [types.ts:259](https://github.com/Ronokof/Henkan/blob/d46de5651d5954bd5a0060ef65e6de181f61566f/src/types.ts#L259)

Whether or not the kanji is kokuji

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:247](https://github.com/Ronokof/Henkan/blob/d46de5651d5954bd5a0060ef65e6de181f61566f/src/types.ts#L247)

The kanji character

***

### misc?

> `optional` **misc**: [`DictKanjiMisc`](DictKanjiMisc.md)

Defined in: [types.ts:251](https://github.com/Ronokof/Henkan/blob/d46de5651d5954bd5a0060ef65e6de181f61566f/src/types.ts#L251)

The miscellaneous information about the kanji

***

### readingMeaning

> **readingMeaning**: [`DictKanjiReadingMeaning`](DictKanjiReadingMeaning.md)[]

Defined in: [types.ts:255](https://github.com/Ronokof/Henkan/blob/d46de5651d5954bd5a0060ef65e6de181f61566f/src/types.ts#L255)

The "readings-meanings" groups and nanori readings of the kanji
