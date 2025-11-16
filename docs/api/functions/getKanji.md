[**henkan**](../README.md)

***

[henkan](../README.md) / getKanji

# Function: getKanji()

> **getKanji**(`kanjiChar`, `dict`, `jmDict?`, `svgList?`, `noteTypeName?`, `deckPath?`): [`Kanji`](../interfaces/Kanji.md)

Defined in: [utils.ts:1162](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/utils.ts#L1162)

Transforms a converted `KANJIDIC` entry into a more readable format

## Parameters

### kanjiChar

`string`

The kanji character

### dict

[`DictKanji`](../interfaces/DictKanji.md)[]

An array of converted `KANJIDIC` entries

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
