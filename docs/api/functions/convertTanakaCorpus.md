[**henkan**](../README.md)

***

[henkan](../README.md) / convertTanakaCorpus

# Function: convertTanakaCorpus()

> **convertTanakaCorpus**(`tanakaString`, `generateFurigana?`): `Promise`\<[`TanakaExample`](../interfaces/TanakaExample.md)[]\>

Defined in: [utils.ts:482](https://github.com/Ronokof/Henkan/blob/023926521f50f475b03a207d5b9f30d7c4f14c62/src/utils.ts#L482)

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
