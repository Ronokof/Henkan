[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanjiMisc

# Interface: DictKanjiMisc

Defined in: [types.ts:159](https://github.com/Ronokof/Henkan/blob/01286919f67c03d612f8888caf771598291b536e/src/types.ts#L159)

Miscellaneous information about the kanji

Equivalent to the `misc` KANJIDIC2 element *(excluding some subelements)*

## Properties

### frequency?

> `optional` **frequency**: `string`

Defined in: [types.ts:179](https://github.com/Ronokof/Henkan/blob/01286919f67c03d612f8888caf771598291b536e/src/types.ts#L179)

The frequency-of-use ranking

A number from `1` to `2500`

***

### grade?

> `optional` **grade**: `string`

Defined in: [types.ts:173](https://github.com/Ronokof/Henkan/blob/01286919f67c03d612f8888caf771598291b536e/src/types.ts#L173)

The kanji grade level

1-6 -> \[Kyōiku kanji\](https://en.wikipedia.org/wiki/Ky%C5%8Diku\_kanji)

7-8 -> \[Jōyō kanji\](https://en.wikipedia.org/wiki/J%C5%8Dy%C5%8D\_kanji) (excluding Kyōiku kanji)

9-10 -> \[Jinmeiyō kanji\](https://en.wikipedia.org/wiki/Jinmeiy%C5%8D\_kanji)

***

### jlpt?

> `optional` **jlpt**: `string`

Defined in: [types.ts:183](https://github.com/Ronokof/Henkan/blob/01286919f67c03d612f8888caf771598291b536e/src/types.ts#L183)

The \[pre-2010 JLPT\](https://en.wikipedia.org/wiki/Japanese-Language\_Proficiency\_Test#Previous\_format\_(1984%E2%80%932009)) level

***

### strokeNumber

> `readonly` **strokeNumber**: `string`

Defined in: [types.ts:163](https://github.com/Ronokof/Henkan/blob/01286919f67c03d612f8888caf771598291b536e/src/types.ts#L163)

The stroke count of the kanji, including the radical
