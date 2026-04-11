[**henkan**](../README.md)

***

[henkan](../README.md) / getKanji

# Function: getKanji()

> **getKanji**(`searchedKanji`, `dict?`, `jmDict?`, `svgList?`, `noteTypeName?`, `deckPath?`): [`Kanji`](../interfaces/Kanji.md) \| `undefined`

Defined in: [utils.ts:1992](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L1992)

Transforms a converted `KANJIDIC` entry into a more readable format, by providing either the kanji or the [DictKanji](../interfaces/DictKanji.md) object directly.

## Parameters

### searchedKanji

`string` \| [`DictKanji`](../interfaces/DictKanji.md)

The kanji character (requires [dict](#getkanji)) or a [DictKanji](../interfaces/DictKanji.md) object

### dict?

[`KanjiEntryMap`](../type-aliases/KanjiEntryMap.md) \| readonly [`DictKanji`](../interfaces/DictKanji.md)[]

An array of converted `KANJIDIC` entries or a [KanjiEntryMap](../type-aliases/KanjiEntryMap.md) (not needed if [searchedKanji](#getkanji) is a [DictKanji](../interfaces/DictKanji.md) object)

### jmDict?

[`KanjiWordsMap`](../type-aliases/KanjiWordsMap.md) \| readonly [`DictWord`](../interfaces/DictWord.md)[]

An array of converted `JMdict` entries or a [KanjiWordsMap](../type-aliases/KanjiWordsMap.md)

### svgList?

[`KanjiSVGMap`](../type-aliases/KanjiSVGMap.md) \| readonly `string`[]

An array of SVG file names or a [KanjiSVGMap](../type-aliases/KanjiSVGMap.md)

### noteTypeName?

`string`

The Anki note type name

### deckPath?

`string`

The full Anki deck path

## Returns

[`Kanji`](../interfaces/Kanji.md) \| `undefined`

The transformed [DictKanji](../interfaces/DictKanji.md) object or `undefined` if entry is not found
