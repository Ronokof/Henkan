[**henkan**](../README.md)

***

[henkan](../README.md) / getKanjiExtended

# Function: getKanjiExtended()

> **getKanjiExtended**(`info`, `kanji`, `dict?`, `useWords?`, `jmDict?`, `svgList?`, `noteTypeName?`, `deckPath?`, `sourceURL?`): [`Kanji`](../interfaces/Kanji.md) \| `undefined`

Defined in: [utils.ts:2221](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L2221)

Same as [getKanji](getKanji.md), but with possible extra info.

## Parameters

### info

[`Kanji`](../interfaces/Kanji.md)

Additional info for the kanji (mnemonic, components, words)

### kanji

The kanji character or a [DictKanji](../interfaces/DictKanji.md) object

`string` | [`DictKanji`](../interfaces/DictKanji.md)

### dict?

readonly [`DictKanji`](../interfaces/DictKanji.md)[]

An array of converted `KANJIDIC` entries

### useWords?

`true`

Whether or not to use the words provided in the `info` object (if present) instead of other words from `JMdict`

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

### sourceURL?

`string`

A link leading to the source of [info](#getkanjiextended)

## Returns

[`Kanji`](../interfaces/Kanji.md) \| `undefined`

The transformed [Kanji](../interfaces/Kanji.md) object
