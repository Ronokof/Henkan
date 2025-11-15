[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanjiMisc

# Interface: DictKanjiMisc

Defined in: [types.ts:163](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L163)

Miscellaneous information about the kanji

Equivalent to the `misc` KANJIDIC2 element *(excluding some subelements)*

## Properties

### frequency?

> `optional` **frequency**: `string`

Defined in: [types.ts:183](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L183)

The frequency-of-use ranking

A number from `1` to `2500`

***

### grade?

> `optional` **grade**: `string`

Defined in: [types.ts:177](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L177)

The kanji grade level

1-6 -> \[Kyōiku kanji\](https://en.wikipedia.org/wiki/Ky%C5%8Diku\_kanji)

7-8 -> \[Jōyō kanji\](https://en.wikipedia.org/wiki/J%C5%8Dy%C5%8D\_kanji) (excluding Kyōiku kanji)

9-10 -> \[Jinmeiyō kanji\](https://en.wikipedia.org/wiki/Jinmeiy%C5%8D\_kanji)

***

### jlpt?

> `optional` **jlpt**: `string`

Defined in: [types.ts:187](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L187)

The \[pre-2010 JLPT\](https://en.wikipedia.org/wiki/Japanese-Language\_Proficiency\_Test#Previous\_format\_(1984%E2%80%932009)) level

***

### strokeNumber

> `readonly` **strokeNumber**: `string`

Defined in: [types.ts:167](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L167)

The stroke count of the kanji, including the radical
