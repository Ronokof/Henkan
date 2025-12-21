[**henkan**](../README.md)

***

[henkan](../README.md) / getKanji

# Function: getKanji()

> **getKanji**(`kanji`, `dict?`, `jmDict?`, `svgList?`, `noteTypeName?`, `deckPath?`): [`Kanji`](../interfaces/Kanji.md) \| `undefined`

Defined in: [utils.ts:2019](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L2019)

Transforms a converted `KANJIDIC` entry into a more readable format

## Parameters

### kanji

The kanji character or a [DictKanji](../interfaces/DictKanji.md) object

`string` | [`DictKanji`](../interfaces/DictKanji.md)

### dict?

readonly [`DictKanji`](../interfaces/DictKanji.md)[]

An array of converted `KANJIDIC` entries

### jmDict?

An array or a kanji-words map of converted `JMdict` entries

readonly [`DictWord`](../interfaces/DictWord.md)[] | `Map`\<`string`, readonly [`DictWord`](../interfaces/DictWord.md)[]\>

### svgList?

readonly `string`[]

An array of SVG file names

### noteTypeName?

`string`

The Anki note type name

### deckPath?

`string`

The full Anki deck path

## Returns

[`Kanji`](../interfaces/Kanji.md) \| `undefined`

The transformed [Kanji](../interfaces/Kanji.md) object or `undefined` if entry is not found
