[**henkan**](../README.md)

***

[henkan](../README.md) / getWordDefinitions

# Function: getWordDefinitions()

> **getWordDefinitions**(`entries`, `jmDict`, `kanjiDic`, `generateFurigana?`): `Promise`\<[`WordDefinitionPair`](../interfaces/WordDefinitionPair.md)[]\>

Defined in: [utils.ts:859](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/utils.ts#L859)

Pairs Japanese definitions with JMdict word entries

## Parameters

### entries

`any`[]

An array containing `ja.wiktionary.org` Japanese entries (converted using [convertJawiktionary](convertJawiktionary.md))

### jmDict

[`DictWord`](../interfaces/DictWord.md)[]

An array of converted `JMdict` entries

### kanjiDic

[`DictKanji`](../interfaces/DictKanji.md)[]

An array of converted `KANJIDIC` entries

### generateFurigana?

`true`

Whether or not to generate furigana for the definitions

## Returns

`Promise`\<[`WordDefinitionPair`](../interfaces/WordDefinitionPair.md)[]\>

A promise resolving with an array of [WordDefinitionPair](../interfaces/WordDefinitionPair.md) objects
