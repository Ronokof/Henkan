[**henkan**](../README.md)

***

[henkan](../README.md) / convertTanakaCorpus

# Function: convertTanakaCorpus()

> **convertTanakaCorpus**(`tanakaString`, `generateFurigana?`): `Promise`\<[`TanakaExample`](../interfaces/TanakaExample.md)[]\>

Defined in: [utils.ts:499](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/utils.ts#L499)

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
