[**henkan**](../README.md)

***

[henkan](../README.md) / getWord

# Function: getWord()

> **getWord**(`word`, `dict?`, `kanjiDic?`, `examples?`, `definitions?`, `noteTypeName?`, `deckPath?`): [`Word`](../interfaces/Word.md) \| `undefined`

Defined in: [utils.ts:1611](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L1611)

Transforms a converted `JMdict` entry into a more readable format, by providing either its JMdict entry ID or the [DictWord](../interfaces/DictWord.md) object directly.

## Parameters

### word

The ID of the `JMdict` entry or a [DictWord](../interfaces/DictWord.md) object

`` `${number}` `` | [`DictWord`](../interfaces/DictWord.md)

### dict?

readonly [`DictWord`](../interfaces/DictWord.md)[]

An array of converted `JMdict` entries (not needed if [word](#getword) is a [DictWord](../interfaces/DictWord.md) object)

### kanjiDic?

An array or an ID-kanji map of converted `KANJIDIC` entries

readonly [`DictKanji`](../interfaces/DictKanji.md)[] | `Map`\<`string`, readonly [`DictKanji`](../interfaces/DictKanji.md)[]\>

### examples?

An array of converted `Tanaka Corpus` examples

readonly [`TanakaExample`](../interfaces/TanakaExample.md)[] | `Map`\<`string`, readonly [`TanakaExample`](../interfaces/TanakaExample.md)[]\>

### definitions?

An array or ID-definitions map of `ja.wiktionary.org` word definitions

`Map`\<`string`, readonly [`Definition`](../interfaces/Definition.md)[]\> | readonly [`WordDefinitionPair`](../interfaces/WordDefinitionPair.md)[]

### noteTypeName?

`string`

The Anki note type name

### deckPath?

`string`

The full Anki deck path

## Returns

[`Word`](../interfaces/Word.md) \| `undefined`

The transformed [Word](../interfaces/Word.md) object or `undefined` if entry is not found
