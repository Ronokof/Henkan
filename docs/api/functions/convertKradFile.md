[**henkan**](../README.md)

***

[henkan](../README.md) / convertKradFile

# Function: convertKradFile()

> **convertKradFile**(`kradBuffer`, `kanjiDic`, `katakanaList`): [`DictKanjiWithRadicals`](../interfaces/DictKanjiWithRadicals.md)[]

Defined in: [utils.ts:672](https://github.com/Ronokof/Henkan/blob/d6fc3941570042889245ed58f548d9841ac9c78a/src/utils.ts#L672)

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
