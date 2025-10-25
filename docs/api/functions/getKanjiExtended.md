[**henkan**](../README.md)

***

[henkan](../README.md) / getKanjiExtended

# Function: getKanjiExtended()

> **getKanjiExtended**(`kanjiChar`, `info`, `dict`, `useJpdbWords?`, `jmDict?`, `svgList?`, `noteTypeName?`, `deckPath?`): [`Kanji`](../interfaces/Kanji.md)

Defined in: [utils.ts:1223](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/utils.ts#L1223)

Same as [getKanji](getKanji.md), but with possible extra info.

## Parameters

### kanjiChar

`string`

The kanji character

### info

[`Kanji`](../interfaces/Kanji.md)

Additional info from `jpdb.io` for the kanji (mnemonic, components, words)

### dict

[`DictKanji`](../interfaces/DictKanji.md)[]

An array of converted `KANJIDIC` entries

### useJpdbWords?

`true`

Whether or not to use the `jpdb.io` provided words (if present) instead of other words from `JMdict`

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
