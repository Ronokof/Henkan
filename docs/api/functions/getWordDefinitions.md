[**henkan**](../README.md)

***

[henkan](../README.md) / getWordDefinitions

# Function: getWordDefinitions()

> **getWordDefinitions**(`entryList`, `jmDict`): [`WordDefinitionPair`](../interfaces/WordDefinitionPair.md)[]

Defined in: [utils.ts:1047](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L1047)

Pairs Japanese definitions with JMdict word entries

## Parameters

### entryList

readonly [`JaWiktionaryEntry`](../interfaces/JaWiktionaryEntry.md)[]

An array containing `ja.wiktionary.org` Japanese entries (converted using [convertJawiktionarySync](convertJawiktionarySync.md) or [convertJawiktionaryAsync](convertJawiktionaryAsync.md))

### jmDict

readonly [`DictWord`](../interfaces/DictWord.md)[]

An array of converted `JMdict` entries

## Returns

[`WordDefinitionPair`](../interfaces/WordDefinitionPair.md)[]

A promise resolving with an array of [WordDefinitionPair](../interfaces/WordDefinitionPair.md) objects
