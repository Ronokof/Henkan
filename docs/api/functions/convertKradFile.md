[**henkan**](../README.md)

***

[henkan](../README.md) / convertKradFile

# Function: convertKradFile()

> **convertKradFile**(`kradBuffer`, `kanjiDic`, `katakanaList`): [`DictKanjiWithRadicals`](../interfaces/DictKanjiWithRadicals.md)[]

Defined in: [utils.ts:780](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/utils.ts#L780)

Converts a `kradfile` file into an array of [DictKanjiWithRadicals](../interfaces/DictKanjiWithRadicals.md) objects.

## Parameters

### kradBuffer

`Buffer`\<`ArrayBuffer`\>

A raw `kradfile` buffer

### kanjiDic

[`DictKanji`](../interfaces/DictKanji.md)[]

An array of converted `KANJIDIC` entries

### katakanaList

[`Kana`](../interfaces/Kana.md)[]

An array of katakana [Kana](../interfaces/Kana.md) objects

## Returns

[`DictKanjiWithRadicals`](../interfaces/DictKanjiWithRadicals.md)[]

An array of converted [DictKanjiWithRadicals](../interfaces/DictKanjiWithRadicals.md) objects
