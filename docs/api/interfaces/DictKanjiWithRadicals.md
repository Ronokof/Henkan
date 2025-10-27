[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanjiWithRadicals

# Interface: DictKanjiWithRadicals

Defined in: [types.ts:273](https://github.com/Ronokof/Henkan/blob/52fe6d98746996eb6471b21af2a4100c9ce484cf/src/types.ts#L273)

KRADFILE2 entry (kanji with its radicals/components)

## Properties

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:277](https://github.com/Ronokof/Henkan/blob/52fe6d98746996eb6471b21af2a4100c9ce484cf/src/types.ts#L277)

The kanji character

***

### radicals

> **radicals**: (`string` \| [`DictKanji`](DictKanji.md))[]

Defined in: [types.ts:283](https://github.com/Ronokof/Henkan/blob/52fe6d98746996eb6471b21af2a4100c9ce484cf/src/types.ts#L283)

The radicals/components that make up the kanji

Can be [DictKanji](DictKanji.md) objects if the component is a kanji found in KANJIDIC and/or [Kana.kana](Kana.md#kana) if the component is a katakana character that does not use (or have) its (or a) kanji variant.
