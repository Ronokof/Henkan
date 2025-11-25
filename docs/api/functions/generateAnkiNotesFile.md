[**henkan**](../README.md)

***

[henkan](../README.md) / generateAnkiNotesFile

# Function: generateAnkiNotesFile()

> **generateAnkiNotesFile**(`list`): `string` \| `undefined`

Defined in: [utils.ts:1843](https://github.com/Ronokof/Henkan/blob/82b06891c0b6871b32e1fdecea84039755a137ea/src/utils.ts#L1843)

Generates an Anki notes file with each entry’s info organized into fields, either in HTML or plain text.

## Parameters

### list

[`Result`](../type-aliases/Result.md)[]

An array containing any type of transformed entries ([Word](../interfaces/Word.md), [Kanji](../interfaces/Kanji.md), [Radical](../interfaces/Radical.md), [Kana](../interfaces/Kana.md), [Grammar](../interfaces/Grammar.md))

## Returns

`string` \| `undefined`

The resulting Anki notes file's content or `undefined` if `list` is empty
