[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanji

# Interface: DictKanji

Defined in: [types.ts:237](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L237)

KANJIDIC2 entry (kanji)

Equivalent to the `character` KANJIDIC2 element *(excluding some subelements)*

## Properties

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:241](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L241)

The kanji character

***

### misc?

> `optional` **misc**: [`DictKanjiMisc`](DictKanjiMisc.md)

Defined in: [types.ts:245](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L245)

The miscellaneous information about the kanji

***

### readingMeaning

> **readingMeaning**: [`DictKanjiReadingMeaning`](DictKanjiReadingMeaning.md)[]

Defined in: [types.ts:249](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L249)

The "readings-meanings" groups and nanori readings of the kanji
