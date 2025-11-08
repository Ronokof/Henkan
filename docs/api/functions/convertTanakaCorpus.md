[**henkan**](../README.md)

***

[henkan](../README.md) / convertTanakaCorpus

# Function: convertTanakaCorpus()

> **convertTanakaCorpus**(`tanakaString`, `generateFurigana?`): `Promise`\<[`TanakaExample`](../interfaces/TanakaExample.md)[]\>

Defined in: [utils.ts:476](https://github.com/Ronokof/Henkan/blob/816cb7d78982f239ab9f2aa79affb0568f5754f9/src/utils.ts#L476)

Converts a Tanaka Corpus `examples.utf` file into an array of [TanakaExample](../interfaces/TanakaExample.md) objects.

## Parameters

### tanakaString

`string`

The raw contents of a `examples.utf` file

### generateFurigana?

`true`

Whether or not to generate furigana for the phrase

## Returns

`Promise`\<[`TanakaExample`](../interfaces/TanakaExample.md)[]\>

A promise resolving with an array of converted [TanakaExample](../interfaces/TanakaExample.md) objects
