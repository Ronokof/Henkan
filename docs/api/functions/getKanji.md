[**henkan**](../README.md)

***

[henkan](../README.md) / getKanji

# Function: getKanji()

> **getKanji**(`dict`, `kanjiChar?`, `dictKanji?`, `jmDict?`, `svgList?`, `noteTypeName?`, `deckPath?`): [`Kanji`](../interfaces/Kanji.md)

Defined in: [utils.ts:1667](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/utils.ts#L1667)

Transforms a converted `KANJIDIC` entry into a more readable format

## Parameters

### dict

[`DictKanji`](../interfaces/DictKanji.md)[]

An array of converted `KANJIDIC` entries

### kanjiChar?

`string`

The kanji character

### dictKanji?

[`DictKanji`](../interfaces/DictKanji.md)

A [DictKanji](../interfaces/DictKanji.md) object

### jmDict?

[`DictWord`](../interfaces/DictWord.md)[]

An array of converted `JMdict` entries

### svgList?

`string`[]

An array of SVG file names

### noteTypeName?

`string`

The Anki note type name

### deckPath?

`string`

The full Anki deck path

## Returns

[`Kanji`](../interfaces/Kanji.md)

The transformed [Kanji](../interfaces/Kanji.md) object
