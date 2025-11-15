[**henkan**](../README.md)

***

[henkan](../README.md) / convertRadkFile

# Function: convertRadkFile()

> **convertRadkFile**(`radkBuffer`, `kanjiDic`): [`DictRadical`](../interfaces/DictRadical.md)[]

Defined in: [utils.ts:627](https://github.com/Ronokof/Henkan/blob/f7f3077e07929c5efbbc7859ef689590749aff14/src/utils.ts#L627)

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
