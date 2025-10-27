[**henkan**](../README.md)

***

[henkan](../README.md) / getWord

# Function: getWord()

> **getWord**(`dict?`, `id?`, `kanjiDic?`, `examples?`, `dictWord?`, `noteTypeName?`, `deckPath?`): [`Word`](../interfaces/Word.md)

Defined in: [utils.ts:756](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/utils.ts#L756)

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
