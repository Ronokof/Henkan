[**henkan**](../README.md)

***

[henkan](../README.md) / convertKradFile

# Function: convertKradFile()

> **convertKradFile**(`kradBuffer`, `kanjiDic`, `katakanaList`): [`DictKanjiWithRadicals`](../interfaces/DictKanjiWithRadicals.md)[]

Defined in: [utils.ts:668](https://github.com/Ronokof/Henkan/blob/01286919f67c03d612f8888caf771598291b536e/src/utils.ts#L668)

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
