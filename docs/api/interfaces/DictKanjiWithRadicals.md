[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanjiWithRadicals

# Interface: DictKanjiWithRadicals

Defined in: [types.ts:281](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L281)

KRADFILE2 entry (kanji with its radicals/components)

## Properties

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:285](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L285)

The kanji character

***

### radicals

> **radicals**: (`string` \| [`DictKanji`](DictKanji.md))[]

Defined in: [types.ts:291](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L291)

The radicals/components that make up the kanji

Can be [DictKanji](DictKanji.md) objects if the component is a kanji found in KANJIDIC and/or [Kana.kana](Kana.md#kana) if the component is a katakana character that does not use (or have) its (or a) kanji variant.
