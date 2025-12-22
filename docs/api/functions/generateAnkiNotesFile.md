[**henkan**](../README.md)

***

[henkan](../README.md) / generateAnkiNotesFile

# Function: generateAnkiNotesFile()

> **generateAnkiNotesFile**(`list`, `defaultNoteInfo?`): `string`

Defined in: [utils.ts:2688](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L2688)

Generates an Anki notes file with each entry’s info organized into fields, either in HTML or plain text.

## Parameters

### list

readonly [`Result`](../type-aliases/Result.md)[]

An array containing any type of transformed entries ([Word](../interfaces/Word.md), [Kanji](../interfaces/Kanji.md), [Radical](../interfaces/Radical.md), [Kana](../interfaces/Kana.md), [Grammar](../interfaces/Grammar.md))

### defaultNoteInfo?

[`DefaultNoteInfo`](../interfaces/DefaultNoteInfo.md)

An object with options regarding default values of some note information

## Returns

`string`

The resulting Anki notes file's content
