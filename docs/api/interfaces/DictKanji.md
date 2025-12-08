[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanji

# Interface: DictKanji

Defined in: [types.ts:249](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L249)

KANJIDIC2 entry (kanji)

Equivalent to the `character` KANJIDIC2 element *(excluding some subelements)*

## Properties

### isKokuji?

> `optional` **isKokuji**: `true`

Defined in: [types.ts:265](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L265)

Whether or not the kanji is kokuji

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:253](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L253)

The kanji character

***

### misc?

> `optional` **misc**: [`DictKanjiMisc`](DictKanjiMisc.md)

Defined in: [types.ts:257](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L257)

The miscellaneous information about the kanji

***

### readingMeaning?

> `optional` **readingMeaning**: [`DictKanjiReadingMeaning`](DictKanjiReadingMeaning.md)[]

Defined in: [types.ts:261](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L261)

The "readings-meanings" groups and nanori readings of the kanji
