[**henkan**](../README.md)

***

[henkan](../README.md) / getWordDefinitionsWithFurigana

# Function: getWordDefinitionsWithFurigana()

> **getWordDefinitionsWithFurigana**(`entryList`, `jmDict`): `Promise`\<[`WordDefinitionPair`](../interfaces/WordDefinitionPair.md)[]\>

Defined in: [utils.ts:1647](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L1647)

Pairs Japanese definitions with JMdict word entries (with furigana)

## Parameters

### entryList

readonly [`JaWiktionaryEntry`](../interfaces/JaWiktionaryEntry.md)[]

An array containing `ja.wiktionary.org` Japanese entries (converted using [convertJawiktionarySync](convertJawiktionarySync.md) or [convertJawiktionaryAsync](convertJawiktionaryAsync.md))

### jmDict

readonly [`DictWord`](../interfaces/DictWord.md)[]

An array of converted `JMdict` entries

## Returns

`Promise`\<[`WordDefinitionPair`](../interfaces/WordDefinitionPair.md)[]\>

A promise resolving with an array of [WordDefinitionPair](../interfaces/WordDefinitionPair.md) objects (with furigana)
