[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanjiWithRadicals

# Interface: DictKanjiWithRadicals

Defined in: [types.ts:277](https://github.com/Ronokof/Henkan/blob/2d98b6e5634153020788b30661eddbf25999f1e0/src/types.ts#L277)

KRADFILE2 entry (kanji with its radicals/components)

## Properties

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:281](https://github.com/Ronokof/Henkan/blob/2d98b6e5634153020788b30661eddbf25999f1e0/src/types.ts#L281)

The kanji character

***

### radicals

> **radicals**: (`string` \| [`DictKanji`](DictKanji.md))[]

Defined in: [types.ts:287](https://github.com/Ronokof/Henkan/blob/2d98b6e5634153020788b30661eddbf25999f1e0/src/types.ts#L287)

The radicals/components that make up the kanji

Can be [DictKanji](DictKanji.md) objects if the component is a kanji found in KANJIDIC and/or [Kana.kana](Kana.md#kana) if the component is a katakana character that does not use (or have) its (or a) kanji variant.
