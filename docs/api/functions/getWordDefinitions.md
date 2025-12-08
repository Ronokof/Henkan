[**henkan**](../README.md)

***

[henkan](../README.md) / getWordDefinitions

# Function: getWordDefinitions()

> **getWordDefinitions**(`entries`, `jmDict`, `kanjiDic`, `generateFurigana?`): `Promise`\<[`WordDefinitionPair`](../interfaces/WordDefinitionPair.md)[]\>

Defined in: [utils.ts:859](https://github.com/Ronokof/Henkan/blob/01eea6ba990a37c11289111ee9cd2cf881caaa60/src/utils.ts#L859)

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
