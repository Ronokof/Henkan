[**henkan**](../README.md)

***

[henkan](../README.md) / getWordDefinitions

# Function: getWordDefinitions()

> **getWordDefinitions**(`wiktionaryEntries`, `jmDict`): [`WordDefinitionPair`](../interfaces/WordDefinitionPair.md)[]

Defined in: [utils.ts:1114](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L1114)

Pairs Japanese definitions with JMdict word entries

## Parameters

### wiktionaryEntries

readonly [`JaWiktionaryEntry`](../interfaces/JaWiktionaryEntry.md)[]

An array containing `ja.wiktionary.org` Japanese entries (converted using [convertJawiktionarySync](convertJawiktionarySync.md) or [convertJawiktionaryAsync](convertJawiktionaryAsync.md))

### jmDict

readonly [`DictWord`](../interfaces/DictWord.md)[]

An array of converted `JMdict` entries

## Returns

[`WordDefinitionPair`](../interfaces/WordDefinitionPair.md)[]

An array of [WordDefinitionPair](../interfaces/WordDefinitionPair.md) objects
