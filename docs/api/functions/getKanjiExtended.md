[**henkan**](../README.md)

***

[henkan](../README.md) / getKanjiExtended

# Function: getKanjiExtended()

> **getKanjiExtended**(`info`, `kanji`, `dict?`, `useWords?`, `jmDict?`, `svgList?`, `noteTypeName?`, `deckPath?`, `sourceURL?`): [`Kanji`](../interfaces/Kanji.md) \| `undefined`

Defined in: [utils.ts:2186](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L2186)

Same as [getKanji](getKanji.md), but with possible extra info.

## Parameters

### info

[`Kanji`](../interfaces/Kanji.md)

Additional info for the kanji (mnemonic, components, words)

### kanji

The kanji character or a [DictKanji](../interfaces/DictKanji.md) object

`string` | [`DictKanji`](../interfaces/DictKanji.md)

### dict?

An array of converted KANJIDIC entries or a [KanjiEntryMap](../type-aliases/KanjiEntryMap.md) *(not needed if [kanji](#getkanjiextended) is a [DictKanji](../interfaces/DictKanji.md) object)*

[`KanjiEntryMap`](../type-aliases/KanjiEntryMap.md) | readonly [`DictKanji`](../interfaces/DictKanji.md)[]

### useWords?

`true`

Whether or not to use the words provided in the `info` object (if present) instead of other words from `JMdict`

### jmDict?

An array of converted `JMdict` entries or a [KanjiWordsMap](../type-aliases/KanjiWordsMap.md)

[`KanjiWordsMap`](../type-aliases/KanjiWordsMap.md) | readonly [`DictWord`](../interfaces/DictWord.md)[]

### svgList?

An array of SVG file names or a [KanjiSVGMap](../type-aliases/KanjiSVGMap.md)

[`KanjiSVGMap`](../type-aliases/KanjiSVGMap.md) | readonly `string`[]

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
