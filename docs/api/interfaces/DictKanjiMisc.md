[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanjiMisc

# Interface: DictKanjiMisc

Defined in: [types.ts:171](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L171)

Miscellaneous information about the kanji

Equivalent to the `misc` KANJIDIC2 element *(excluding some subelements)*

## Properties

### frequency?

> `optional` **frequency**: `string`

Defined in: [types.ts:191](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L191)

The frequency-of-use ranking

A number from `1` to `2500`

***

### grade?

> `optional` **grade**: `string`

Defined in: [types.ts:185](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L185)

The kanji grade level

1-6 -> \[Kyōiku kanji\](https://en.wikipedia.org/wiki/Ky%C5%8Diku\_kanji)

7-8 -> \[Jōyō kanji\](https://en.wikipedia.org/wiki/J%C5%8Dy%C5%8D\_kanji) (excluding Kyōiku kanji)

9-10 -> \[Jinmeiyō kanji\](https://en.wikipedia.org/wiki/Jinmeiy%C5%8D\_kanji)

***

### jlpt?

> `optional` **jlpt**: `string`

Defined in: [types.ts:195](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L195)

The \[pre-2010 JLPT\](https://en.wikipedia.org/wiki/Japanese-Language\_Proficiency\_Test#Previous\_format\_(1984%E2%80%932009)) level

***

### strokeNumber

> `readonly` **strokeNumber**: `string`

Defined in: [types.ts:175](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L175)

The stroke count of the kanji, including the radical
