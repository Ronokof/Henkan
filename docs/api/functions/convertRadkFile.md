[**henkan**](../README.md)

***

[henkan](../README.md) / convertRadkFile

# Function: convertRadkFile()

> **convertRadkFile**(`radkBuffer`, `kanjiDic`): [`DictRadical`](../interfaces/DictRadical.md)[]

Defined in: [utils.ts:760](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/utils.ts#L760)

Converts a `radkfile` file into an array of [DictRadical](../interfaces/DictRadical.md) objects.

## Parameters

### radkBuffer

`Buffer`\<`ArrayBuffer`\>

A raw `radkfile` buffer

### kanjiDic

[`DictKanji`](../interfaces/DictKanji.md)[]

An array of converted `KANJIDIC` entries

## Returns

[`DictRadical`](../interfaces/DictRadical.md)[]

An array of converted [DictRadical](../interfaces/DictRadical.md) objects
