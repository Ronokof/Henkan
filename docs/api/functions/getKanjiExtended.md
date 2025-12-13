[**henkan**](../README.md)

***

[henkan](../README.md) / getKanjiExtended

# Function: getKanjiExtended()

> **getKanjiExtended**(`info`, `dict`, `kanjiChar?`, `dictKanji?`, `useWords?`, `jmDict?`, `svgList?`, `noteTypeName?`, `deckPath?`): [`Kanji`](../interfaces/Kanji.md)

Defined in: [utils.ts:2326](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L2326)

Same as [getKanji](getKanji.md), but with possible extra info.

## Parameters

### info

[`Kanji`](../interfaces/Kanji.md)

Additional info for the kanji (mnemonic, components, words)

### dict

[`DictKanji`](../interfaces/DictKanji.md)[]

An array of converted `KANJIDIC` entries

### kanjiChar?

`string`

The kanji character

### dictKanji?

[`DictKanji`](../interfaces/DictKanji.md)

A [DictKanji](../interfaces/DictKanji.md) object

### useWords?

`true`

Whether or not to use the words provided in the `info` object (if present) instead of other words from `JMdict`

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
