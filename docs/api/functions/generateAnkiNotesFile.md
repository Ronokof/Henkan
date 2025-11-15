[**henkan**](../README.md)

***

[henkan](../README.md) / generateAnkiNotesFile

# Function: generateAnkiNotesFile()

> **generateAnkiNotesFile**(`list`): `string` \| `undefined`

Defined in: [utils.ts:1966](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/utils.ts#L1966)

Generates an Anki notes file with each entry’s info organized into fields, either in HTML or plain text.

## Parameters

### list

[`Result`](../type-aliases/Result.md)[]

An array containing any type of transformed entries ([Word](../interfaces/Word.md), [Kanji](../interfaces/Kanji.md), [Radical](../interfaces/Radical.md), [Kana](../interfaces/Kana.md), [Grammar](../interfaces/Grammar.md))

## Returns

`string` \| `undefined`

The resulting Anki notes file's content or `undefined` if `list` is empty
