[**henkan**](../README.md)

***

[henkan](../README.md) / getWordDefinitions

# Function: getWordDefinitions()

> **getWordDefinitions**(`entryList`, `jmDict`, `generateFurigana?`): `Promise`\<[`WordDefinitionPair`](../interfaces/WordDefinitionPair.md)[]\>

Defined in: [utils.ts:911](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L911)

Pairs Japanese definitions with JMdict word entries

## Parameters

### entryList

`any`[]

An array containing `ja.wiktionary.org` Japanese entries (converted using [convertJawiktionary](convertJawiktionary.md))

### jmDict

[`DictWord`](../interfaces/DictWord.md)[]

An array of converted `JMdict` entries

### generateFurigana?

`true`

Whether or not to generate furigana for the definitions

## Returns

`Promise`\<[`WordDefinitionPair`](../interfaces/WordDefinitionPair.md)[]\>

A promise resolving with an array of [WordDefinitionPair](../interfaces/WordDefinitionPair.md) objects
