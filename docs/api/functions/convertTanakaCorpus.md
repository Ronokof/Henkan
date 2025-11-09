[**henkan**](../README.md)

***

[henkan](../README.md) / convertTanakaCorpus

# Function: convertTanakaCorpus()

> **convertTanakaCorpus**(`tanakaString`, `generateFurigana?`): `Promise`\<[`TanakaExample`](../interfaces/TanakaExample.md)[]\>

Defined in: [utils.ts:482](https://github.com/Ronokof/Henkan/blob/f4500fde04f63f25dbe164e82d88b3a6be2b7ee1/src/utils.ts#L482)

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
