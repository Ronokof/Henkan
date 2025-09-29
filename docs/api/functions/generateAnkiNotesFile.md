[**henkan**](../README.md)

***

[henkan](../README.md) / generateAnkiNotesFile

# Function: generateAnkiNotesFile()

> **generateAnkiNotesFile**(`list`): `undefined` \| `string`

Defined in: [utils.ts:1762](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/utils.ts#L1762)

Generates an Anki notes file with each entry’s info organized into fields, either in HTML or plain text.

## Parameters

### list

[`Result`](../type-aliases/Result.md)[]

An array containing any type of transformed entries ([Word](../interfaces/Word.md), [Kanji](../interfaces/Kanji.md), [Radical](../interfaces/Radical.md), [Kana](../interfaces/Kana.md), [Grammar](../interfaces/Grammar.md))

## Returns

`undefined` \| `string`

The resulting Anki notes file's content or `undefined` if `list` is empty
