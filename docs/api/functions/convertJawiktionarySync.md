[**henkan**](../README.md)

***

[henkan](../README.md) / convertJawiktionarySync

# Function: convertJawiktionarySync()

> **convertJawiktionarySync**(`buffer`): [`JaWiktionaryEntry`](../interfaces/JaWiktionaryEntry.md)[]

Defined in: [utils.ts:950](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L950)

Converts and filters a `ja.wiktionary.org` JSONL dump (sync)

The dump file needs to be converted from a `jawiktionary-latest-pages-articles.xml.bz2` file from [https://dumps.wikimedia.org/jawiktionary/latest/](https://dumps.wikimedia.org/jawiktionary/latest/) using [wiktextract](https://github.com/tatuylonen/wiktextract).

## Parameters

### buffer

`Buffer`

A JSONL dump file buffer

## Returns

[`JaWiktionaryEntry`](../interfaces/JaWiktionaryEntry.md)[]

An array containing only the Japanese entries
