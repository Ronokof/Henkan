[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanji

# Interface: DictKanji

Defined in: [types.ts:241](https://github.com/Ronokof/Henkan/blob/80b2addd3ec0a404258a3690da0bc4a44cf30ccf/src/types.ts#L241)

KANJIDIC2 entry (kanji)

Equivalent to the `character` KANJIDIC2 element *(excluding some subelements)*

## Properties

### isKokuji?

> `optional` **isKokuji**: `true`

Defined in: [types.ts:257](https://github.com/Ronokof/Henkan/blob/80b2addd3ec0a404258a3690da0bc4a44cf30ccf/src/types.ts#L257)

Whether or not the kanji is kokuji

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:245](https://github.com/Ronokof/Henkan/blob/80b2addd3ec0a404258a3690da0bc4a44cf30ccf/src/types.ts#L245)

The kanji character

***

### misc?

> `optional` **misc**: [`DictKanjiMisc`](DictKanjiMisc.md)

Defined in: [types.ts:249](https://github.com/Ronokof/Henkan/blob/80b2addd3ec0a404258a3690da0bc4a44cf30ccf/src/types.ts#L249)

The miscellaneous information about the kanji

***

### readingMeaning

> **readingMeaning**: [`DictKanjiReadingMeaning`](DictKanjiReadingMeaning.md)[]

Defined in: [types.ts:253](https://github.com/Ronokof/Henkan/blob/80b2addd3ec0a404258a3690da0bc4a44cf30ccf/src/types.ts#L253)

The "readings-meanings" groups and nanori readings of the kanji
