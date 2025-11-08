[**henkan**](../README.md)

***

[henkan](../README.md) / convertKradFile

# Function: convertKradFile()

> **convertKradFile**(`kradBuffer`, `kanjiDic`, `katakanaList`): [`DictKanjiWithRadicals`](../interfaces/DictKanjiWithRadicals.md)[]

Defined in: [utils.ts:662](https://github.com/Ronokof/Henkan/blob/816cb7d78982f239ab9f2aa79affb0568f5754f9/src/utils.ts#L662)

Converts a `kradfile2` file into an array of [DictKanjiWithRadicals](../interfaces/DictKanjiWithRadicals.md) objects.

## Parameters

### kradBuffer

`NonSharedBuffer`

A raw `kradfile2` buffer

### kanjiDic

[`DictKanji`](../interfaces/DictKanji.md)[]

An array of converted `KANJIDIC` entries

### katakanaList

[`Kana`](../interfaces/Kana.md)[]

An array of katakana [Kana](../interfaces/Kana.md) objects

## Returns

[`DictKanjiWithRadicals`](../interfaces/DictKanjiWithRadicals.md)[]

An array of converted [DictKanjiWithRadicals](../interfaces/DictKanjiWithRadicals.md) objects
