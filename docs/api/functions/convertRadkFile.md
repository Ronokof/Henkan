[**henkan**](../README.md)

***

[henkan](../README.md) / convertRadkFile

# Function: convertRadkFile()

> **convertRadkFile**(`radkBuffer`, `kanjiDic`): [`DictRadical`](../interfaces/DictRadical.md)[]

Defined in: [utils.ts:603](https://github.com/Ronokof/Henkan/blob/d6fc3941570042889245ed58f548d9841ac9c78a/src/utils.ts#L603)

Converts a `radkfile2` file into an array of [DictRadical](../interfaces/DictRadical.md) objects.

## Parameters

### radkBuffer

`NonSharedBuffer`

A raw `radkfile2` buffer

### kanjiDic

[`DictKanji`](../interfaces/DictKanji.md)[]

An array of converted `KANJIDIC` entries

## Returns

[`DictRadical`](../interfaces/DictRadical.md)[]

An array of converted [DictRadical](../interfaces/DictRadical.md) objects
