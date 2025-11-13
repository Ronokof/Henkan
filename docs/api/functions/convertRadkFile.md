[**henkan**](../README.md)

***

[henkan](../README.md) / convertRadkFile

# Function: convertRadkFile()

> **convertRadkFile**(`radkBuffer`, `kanjiDic`): [`DictRadical`](../interfaces/DictRadical.md)[]

Defined in: [utils.ts:711](https://github.com/Ronokof/Henkan/blob/80b2addd3ec0a404258a3690da0bc4a44cf30ccf/src/utils.ts#L711)

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
