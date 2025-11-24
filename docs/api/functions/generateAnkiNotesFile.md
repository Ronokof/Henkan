[**henkan**](../README.md)

***

[henkan](../README.md) / generateAnkiNotesFile

# Function: generateAnkiNotesFile()

> **generateAnkiNotesFile**(`list`): `string` \| `undefined`

Defined in: [utils.ts:1866](https://github.com/Ronokof/Henkan/blob/d46de5651d5954bd5a0060ef65e6de181f61566f/src/utils.ts#L1866)

Generates an Anki notes file with each entry’s info organized into fields, either in HTML or plain text.

## Parameters

### list

[`Result`](../type-aliases/Result.md)[]

An array containing any type of transformed entries ([Word](../interfaces/Word.md), [Kanji](../interfaces/Kanji.md), [Radical](../interfaces/Radical.md), [Kana](../interfaces/Kana.md), [Grammar](../interfaces/Grammar.md))

## Returns

`string` \| `undefined`

The resulting Anki notes file's content or `undefined` if `list` is empty
