[**henkan**](../README.md)

***

[henkan](../README.md) / getKanji

# Function: getKanji()

> **getKanji**(`kanji`, `dict?`, `jmDict?`, `svgList?`, `noteTypeName?`, `deckPath?`): [`Kanji`](../interfaces/Kanji.md) \| `undefined`

Defined in: [utils.ts:1904](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L1904)

Transforms a converted `KANJIDIC` entry into a more readable format, by providing either the kanji (requires [dict](#getkanji)) or the [DictKanji](../interfaces/DictKanji.md) object directly.

## Parameters

### kanji

The kanji character or a [DictKanji](../interfaces/DictKanji.md) object

`string` | [`DictKanji`](../interfaces/DictKanji.md)

### dict?

An array or a kanji-entry map of converted `KANJIDIC` entries (not needed if [kanji](#getkanji) is a [DictKanji](../interfaces/DictKanji.md) object)

readonly [`DictKanji`](../interfaces/DictKanji.md)[] | `Map`\<`string`, [`DictKanji`](../interfaces/DictKanji.md)\>

### jmDict?

An array or a kanji-words map of converted `JMdict` entries

readonly [`DictWord`](../interfaces/DictWord.md)[] | `Map`\<`string`, readonly [`DictWord`](../interfaces/DictWord.md)[]\>

### svgList?

An array or a kanji-filename map of SVG file names

readonly `string`[] | `Map`\<`string`, `string`\>

### noteTypeName?

`string`

The Anki note type name

### deckPath?

`string`

The full Anki deck path

## Returns

[`Kanji`](../interfaces/Kanji.md) \| `undefined`

The transformed [DictKanji](../interfaces/DictKanji.md) object or `undefined` if entry is not found
