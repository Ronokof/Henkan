[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanjiWithRadicals

# Interface: DictKanjiWithRadicals

Defined in: [types.ts:283](https://github.com/Ronokof/Henkan/blob/82b06891c0b6871b32e1fdecea84039755a137ea/src/types.ts#L283)

KRADFILE2 entry (kanji with its radicals/components)

## Properties

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:287](https://github.com/Ronokof/Henkan/blob/82b06891c0b6871b32e1fdecea84039755a137ea/src/types.ts#L287)

The kanji character

***

### radicals

> **radicals**: (`string` \| [`DictKanji`](DictKanji.md))[]

Defined in: [types.ts:293](https://github.com/Ronokof/Henkan/blob/82b06891c0b6871b32e1fdecea84039755a137ea/src/types.ts#L293)

The radicals/components that make up the kanji

Can be [DictKanji](DictKanji.md) objects if the component is a kanji found in KANJIDIC and/or [Kana.kana](Kana.md#kana) if the component is a katakana character that does not use (or have) its (or a) kanji variant.
