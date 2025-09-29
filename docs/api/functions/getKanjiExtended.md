[**henkan**](../README.md)

***

[henkan](../README.md) / getKanjiExtended

# Function: getKanjiExtended()

> **getKanjiExtended**(`kanjiChar`, `info`, `dict`, `useJpdbWords?`, `jmDict?`, `svgList?`, `noteTypeName?`, `deckPath?`): [`Kanji`](../interfaces/Kanji.md)

Defined in: [utils.ts:1204](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/utils.ts#L1204)

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
