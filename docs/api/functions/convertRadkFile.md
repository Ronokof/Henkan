[**henkan**](../README.md)

***

[henkan](../README.md) / convertRadkFile

# Function: convertRadkFile()

> **convertRadkFile**(`radkBuffer`, `kanjiDic`): [`DictRadical`](../interfaces/DictRadical.md)[]

Defined in: [utils.ts:625](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/utils.ts#L625)

Converts a `radkfile2` file (EUC-JP encoded) into an array of [DictRadical](../interfaces/DictRadical.md) objects.

## Parameters

### radkBuffer

`Buffer`\<`ArrayBuffer`\>

A `radkfile2` buffer

### kanjiDic

[`DictKanji`](../interfaces/DictKanji.md)[]

An array of converted `KANJIDIC` entries

## Returns

[`DictRadical`](../interfaces/DictRadical.md)[]

An array of converted [DictRadical](../interfaces/DictRadical.md) objects
