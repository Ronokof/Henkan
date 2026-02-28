[**henkan**](../README.md)

***

[henkan](../README.md) / createEntryMaps

# Function: createEntryMaps()

> **createEntryMaps**(`jmDict?`, `jmNedict?`, `kanjiDic?`, `tanakaExamples?`, `wordDefinitionPairs?`, `svgList?`): [`EntryMaps`](../interfaces/EntryMaps.md)

Defined in: [utils.ts:956](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L956)

Maps entry properties (IDs and kanji) with other entries.

- [jmDict](#createentrymaps) => [WordIDEntryMap](../type-aliases/WordIDEntryMap.md), [KanjiWordsMap](../type-aliases/KanjiWordsMap.md)

- [jmNedict](#createentrymaps) => [NameIDEntryMap](../type-aliases/NameIDEntryMap.md)

- [kanjiDic](#createentrymaps) => [KanjiEntryMap](../type-aliases/KanjiEntryMap.md), [KanjiSVGMap](../type-aliases/KanjiSVGMap.md) (only if [svgList](#createentrymaps) is present)

- [tanakaExamples](#createentrymaps) => [EntryExamplesMap](../type-aliases/EntryExamplesMap.md) (requires [jmDict](#createentrymaps) or/and [jmNedict](#createentrymaps))

- [wordDefinitionPairs](#createentrymaps) => [WordDefinitionsMap](../type-aliases/WordDefinitionsMap.md)

## Parameters

### jmDict?

readonly [`DictWord`](../interfaces/DictWord.md)[]

An array of converted `JMdict` entries

### jmNedict?

readonly [`DictName`](../interfaces/DictName.md)[]

### kanjiDic?

readonly [`DictKanji`](../interfaces/DictKanji.md)[]

An array of converted `KANJIDIC` entries

### tanakaExamples?

readonly [`TanakaExample`](../interfaces/TanakaExample.md)[]

An array of converted `Tanaka Corpus` examples

### wordDefinitionPairs?

readonly [`WordDefinitionPair`](../interfaces/WordDefinitionPair.md)[]

An array of `ja.wiktionary.org` word-definitions pairs

### svgList?

readonly `string`[]

An array of SVG file names

## Returns

[`EntryMaps`](../interfaces/EntryMaps.md)

An object containing of any entry maps, their presence being dependent on the provided arguments.
