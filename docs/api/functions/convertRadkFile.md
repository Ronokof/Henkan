[**henkan**](../README.md)

***

[henkan](../README.md) / convertRadkFile

# Function: convertRadkFile()

> **convertRadkFile**(`radkBuffer`, `kanjiDic`): [`DictRadical`](../interfaces/DictRadical.md)[]

Defined in: [utils.ts:611](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/utils.ts#L611)

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
