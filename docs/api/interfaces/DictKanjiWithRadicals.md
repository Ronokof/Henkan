[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanjiWithRadicals

# Interface: DictKanjiWithRadicals

Defined in: [types.ts:289](https://github.com/Ronokof/Henkan/blob/01eea6ba990a37c11289111ee9cd2cf881caaa60/src/types.ts#L289)

KRADFILE2 entry (kanji with its radicals/components)

## Properties

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:293](https://github.com/Ronokof/Henkan/blob/01eea6ba990a37c11289111ee9cd2cf881caaa60/src/types.ts#L293)

The kanji character

***

### radicals

> **radicals**: (`string` \| [`DictKanji`](DictKanji.md))[]

Defined in: [types.ts:299](https://github.com/Ronokof/Henkan/blob/01eea6ba990a37c11289111ee9cd2cf881caaa60/src/types.ts#L299)

The radicals/components that make up the kanji

Can be [DictKanji](DictKanji.md) objects if the component is a kanji found in KANJIDIC and/or [Kana.kana](Kana.md#kana) if the component is a katakana character that does not use (or have) its (or a) kanji variant.
