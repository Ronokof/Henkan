[**henkan**](../README.md)

***

[henkan](../README.md) / generateAnkiNote

# Function: generateAnkiNote()

> **generateAnkiNote**(`entry`): `string`[]

Defined in: [utils.ts:1538](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/utils.ts#L1538)

Generates an array where each field holds an entry’s info wrapped in HTML tags.

## Parameters

### entry

[`Result`](../type-aliases/Result.md)

Any type of mapped entry ([Word](../interfaces/Word.md), [Kanji](../interfaces/Kanji.md), [Radical](../interfaces/Radical.md), [Kana](../interfaces/Kana.md), [Grammar](../interfaces/Grammar.md))

## Returns

`string`[]

An array of fields, each corresponding to an Anki note type field
