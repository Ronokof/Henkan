[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanjiMisc

# Interface: DictKanjiMisc

Defined in: [types.ts:279](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L279)

Miscellaneous information about the kanji

Equivalent to the `misc` KANJIDIC2 element *(excluding some subelements)*

## Properties

### frequency?

> `optional` **frequency**: `string`

Defined in: [types.ts:299](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L299)

The frequency-of-use ranking

A number from `1` to `2500`

***

### grade?

> `optional` **grade**: `string`

Defined in: [types.ts:293](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L293)

The kanji grade level

1-6 -> [Kyōiku kanji](https://en.wikipedia.org/wiki/Ky%C5%8Diku_kanji)

7-8 -> [Jōyō kanji](https://en.wikipedia.org/wiki/J%C5%8Dy%C5%8D_kanji) (excluding Kyōiku kanji)

9-10 -> [Jinmeiyō kanji](https://en.wikipedia.org/wiki/Jinmeiy%C5%8D_kanji)

***

### jlpt?

> `optional` **jlpt**: `` `N${number}` ``

Defined in: [types.ts:303](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L303)

The [pre-2010 JLPT](https://en.wikipedia.org/wiki/Japanese-Language_Proficiency_Test#Previous_format_(1984%E2%80%932009)) level

***

### strokeNumber?

> `optional` **strokeNumber**: `string`

Defined in: [types.ts:283](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L283)

The stroke count of the kanji, including the radical
