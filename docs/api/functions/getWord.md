[**henkan**](../README.md)

***

[henkan](../README.md) / getWord

# Function: getWord()

> **getWord**(`dict?`, `id?`, `kanjiDic?`, `examples?`, `definitions?`, `dictWord?`, `noteTypeName?`, `deckPath?`): [`Word`](../interfaces/Word.md)

Defined in: [utils.ts:1659](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L1659)

Transforms a converted `JMdict` entry into a more readable format, by providing either its [id](#getword) or the [dictWord](#getword) object directly.

## Parameters

### dict?

[`DictWord`](../interfaces/DictWord.md)[]

An array of converted `JMdict` entries

### id?

`string`

The ID of the `JMdict` entry

### kanjiDic?

[`DictKanji`](../interfaces/DictKanji.md)[]

An array of converted `KANJIDIC` entries

### examples?

[`TanakaExample`](../interfaces/TanakaExample.md)[]

An array of converted `Tanaka Corpus` examples

### definitions?

[`WordDefinitionPair`](../interfaces/WordDefinitionPair.md)[]

An array of `ja.wiktionary.org` word definitions

### dictWord?

[`DictWord`](../interfaces/DictWord.md)

The converted `JMdict` entry

### noteTypeName?

`string`

The Anki note type name

### deckPath?

`string`

The full Anki deck path

## Returns

[`Word`](../interfaces/Word.md)

The transformed [Word](../interfaces/Word.md) object
