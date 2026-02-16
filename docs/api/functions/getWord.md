[**henkan**](../README.md)

***

[henkan](../README.md) / getWord

# Function: getWord()

> **getWord**(`searchedWord`, `dict?`, `kanjiDic?`, `examples?`, `definitions?`, `noteTypeName?`, `deckPath?`): [`Word`](../interfaces/Word.md) \| `undefined`

Defined in: [utils.ts:2287](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L2287)

Transforms a converted `JMdict` entry into a more readable format, by providing either its JMdict entry ID or the [DictWord](../interfaces/DictWord.md) object directly.

## Parameters

### searchedWord

The ID of the `JMdict` entry (requires [dict](#getword)) or a [DictWord](../interfaces/DictWord.md) object

`` `${number}` `` | [`DictWord`](../interfaces/DictWord.md)

### dict?

An array converted `JMdict` entries or a [WordIDEntryMap](../type-aliases/WordIDEntryMap.md) *(not needed if [searchedWord](#getword) is a [DictWord](../interfaces/DictWord.md) object)*

[`WordIDEntryMap`](../type-aliases/WordIDEntryMap.md) | readonly [`DictWord`](../interfaces/DictWord.md)[]

### kanjiDic?

An array of converted `KANJIDIC` entries or a [KanjiEntryMap](../type-aliases/KanjiEntryMap.md)

[`KanjiEntryMap`](../type-aliases/KanjiEntryMap.md) | readonly [`DictKanji`](../interfaces/DictKanji.md)[]

### examples?

An array of converted `Tanaka Corpus` examples or a [EntryExamplesMap](../type-aliases/EntryExamplesMap.md)

[`EntryExamplesMap`](../type-aliases/EntryExamplesMap.md) | readonly [`TanakaExample`](../interfaces/TanakaExample.md)[]

### definitions?

An array of `ja.wiktionary.org` word-definitions pairs or a [WordDefinitionsMap](../type-aliases/WordDefinitionsMap.md)

[`WordDefinitionsMap`](../type-aliases/WordDefinitionsMap.md) | readonly [`WordDefinitionPair`](../interfaces/WordDefinitionPair.md)[]

### noteTypeName?

`string`

The Anki note type name

### deckPath?

`string`

The full Anki deck path

## Returns

[`Word`](../interfaces/Word.md) \| `undefined`

The transformed [DictWord](../interfaces/DictWord.md) object or `undefined` if entry is not found
