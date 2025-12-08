[**henkan**](../README.md)

***

[henkan](../README.md) / convertJawiktionary

# Function: convertJawiktionary()

> **convertJawiktionary**(`stream`): `Promise`\<`any`[]\>

Defined in: [utils.ts:777](https://github.com/Ronokof/Henkan/blob/01eea6ba990a37c11289111ee9cd2cf881caaa60/src/utils.ts#L777)

Converts and filters a `ja.wiktionary.org` JSONL dump

The dump file needs to be converted from a `jawiktionary-latest-pages-articles.xml.bz2` file from [https://dumps.wikimedia.org/jawiktionary/latest/](https://dumps.wikimedia.org/jawiktionary/latest/) using \[wiktextract\](https://github.com/tatuylonen/wiktextract).

## Parameters

### stream

`ReadStream`

The stream of a JSONL dump file

## Returns

`Promise`\<`any`[]\>

An array containing only Japanese entries
