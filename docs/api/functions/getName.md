[**henkan**](../README.md)

***

[henkan](../README.md) / getName

# Function: getName()

> **getName**(`searchedName`, `dict?`, `kanjiDic?`, `examples?`, `noteTypeName?`, `deckPath?`): [`Name`](../interfaces/Name.md) \| `undefined`

Defined in: [utils.ts:2756](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L2756)

Transforms a converted `JMnedict` entry into a more readable format, by providing either its JMnedict entry ID or the [DictName](../interfaces/DictName.md) object directly.

## Parameters

### searchedName

`` `${number}` `` \| [`DictName`](../interfaces/DictName.md)

The ID of the `JMnedict` entry (requires [dict](#getname)) or a [DictName](../interfaces/DictName.md) object

### dict?

[`NameIDEntryMap`](../type-aliases/NameIDEntryMap.md) \| readonly [`DictName`](../interfaces/DictName.md)[]

An array converted `JMnedict` entries or a [NameIDEntryMap](../type-aliases/NameIDEntryMap.md) *(not needed if [searchedName](#getname) is a [DictName](../interfaces/DictName.md) object)*

### kanjiDic?

[`KanjiEntryMap`](../type-aliases/KanjiEntryMap.md) \| readonly [`DictKanji`](../interfaces/DictKanji.md)[]

An array of converted `KANJIDIC` entries or a [KanjiEntryMap](../type-aliases/KanjiEntryMap.md)

### examples?

[`EntryExamplesMap`](../type-aliases/EntryExamplesMap.md) \| readonly [`TanakaExample`](../interfaces/TanakaExample.md)[]

An array of converted `Tanaka Corpus` examples or a [EntryExamplesMap](../type-aliases/EntryExamplesMap.md)

### noteTypeName?

`string`

The Anki note type name

### deckPath?

`string`

The full Anki deck path

## Returns

[`Name`](../interfaces/Name.md) \| `undefined`

The transformed [DictName](../interfaces/DictName.md) object or `undefined` if entry is not found
