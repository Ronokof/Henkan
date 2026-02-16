[**henkan**](../README.md)

***

[henkan](../README.md) / generateAnkiNotesFile

# Function: generateAnkiNotesFile()

> **generateAnkiNotesFile**(`list`, `defaultNoteInfo?`, `customData?`, `additionalTags?`): `string`

Defined in: [utils.ts:3727](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L3727)

Generates an Anki notes file with each entry’s info organized into fields, either in HTML or plain text.

## Parameters

### list

readonly [`Result`](../type-aliases/Result.md)[]

An array containing any type of transformed entries ([Word](../interfaces/Word.md), [Kanji](../interfaces/Kanji.md), [Radical](../interfaces/Radical.md), [Kana](../interfaces/Kana.md), [Grammar](../interfaces/Grammar.md))

### defaultNoteInfo?

[`DefaultNoteInfo`](../interfaces/DefaultNoteInfo.md)

An object with options regarding default values of some note information

### customData?

`string`

An additional string that will be added on the first field of any note type, as a `data-custom` attribute inside an invisible `div`

### additionalTags?

`string`[]

Additional tags that will be added alongside the existing entry tags

## Returns

`string`

The resulting Anki notes file's content
