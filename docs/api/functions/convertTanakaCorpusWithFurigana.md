[**henkan**](../README.md)

***

[henkan](../README.md) / convertTanakaCorpusWithFurigana

# Function: convertTanakaCorpusWithFurigana()

> **convertTanakaCorpusWithFurigana**(`tanakaString`): `Promise`\<[`TanakaExample`](../interfaces/TanakaExample.md)[]\>

Defined in: [utils.ts:543](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L543)

Converts a Tanaka Corpus `examples.utf` file into an array of [TanakaExample](../interfaces/TanakaExample.md) objects (with furigana).

## Parameters

### tanakaString

`string`

The raw contents of a `examples.utf` file

## Returns

`Promise`\<[`TanakaExample`](../interfaces/TanakaExample.md)[]\>

A promise resolving with an array of converted [TanakaExample](../interfaces/TanakaExample.md) objects (with furigana)
