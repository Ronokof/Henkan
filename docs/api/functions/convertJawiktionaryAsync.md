[**henkan**](../README.md)

***

[henkan](../README.md) / convertJawiktionaryAsync

# Function: convertJawiktionaryAsync()

> **convertJawiktionaryAsync**(`stream`): `Promise`\<[`JaWiktionaryEntry`](../interfaces/JaWiktionaryEntry.md)[]\>

Defined in: [utils.ts:986](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L986)

Converts and filters a `ja.wiktionary.org` JSONL dump (async)

The dump file needs to be converted from a `jawiktionary-latest-pages-articles.xml.bz2` file from [https://dumps.wikimedia.org/jawiktionary/latest/](https://dumps.wikimedia.org/jawiktionary/latest/) using [wiktextract](https://github.com/tatuylonen/wiktextract).

## Parameters

### stream

`ReadStream`

A JSONL dump file stream

## Returns

`Promise`\<[`JaWiktionaryEntry`](../interfaces/JaWiktionaryEntry.md)[]\>

An array containing only the Japanese entries
