[**henkan**](../README.md)

***

[henkan](../README.md) / getKanjiExtended

# Function: getKanjiExtended()

> **getKanjiExtended**(`info`, `kanji`, `dict?`, `useWords?`, `jmDict?`, `svgList?`, `noteTypeName?`, `deckPath?`, `sourceURL?`): [`Kanji`](../interfaces/Kanji.md) \| `undefined`

Defined in: [utils.ts:2098](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L2098)

Same as [getKanji](getKanji.md), but with possible extra info.

## Parameters

### info

[`Kanji`](../interfaces/Kanji.md)

Additional info for the kanji (mnemonic, components, words)

### kanji

The kanji character or a [DictKanji](../interfaces/DictKanji.md) object

`string` | [`DictKanji`](../interfaces/DictKanji.md)

### dict?

An array or a kanji-entry map of converted KANJIDIC entries (not needed if [kanji](#getkanjiextended) is a [DictKanji](../interfaces/DictKanji.md) object)

readonly [`DictKanji`](../interfaces/DictKanji.md)[] | `Map`\<`string`, [`DictKanji`](../interfaces/DictKanji.md)\>

### useWords?

`true`

Whether or not to use the words provided in the `info` object (if present) instead of other words from `JMdict`

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

### sourceURL?

`string`

A link leading to the source of [info](#getkanjiextended)

## Returns

[`Kanji`](../interfaces/Kanji.md) \| `undefined`

The transformed [DictKanji](../interfaces/DictKanji.md) object
