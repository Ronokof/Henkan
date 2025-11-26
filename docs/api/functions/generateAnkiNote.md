[**henkan**](../README.md)

***

[henkan](../README.md) / generateAnkiNote

# Function: generateAnkiNote()

> **generateAnkiNote**(`entry`): `string`[]

Defined in: [utils.ts:1581](https://github.com/Ronokof/Henkan/blob/e4037c84f60cd22638714fc015cb9ad541bcea68/src/utils.ts#L1581)

Generates an array where each field holds an entry’s info wrapped in HTML tags.

## Parameters

### entry

[`Result`](../type-aliases/Result.md)

Any type of mapped entry ([Word](../interfaces/Word.md), [Kanji](../interfaces/Kanji.md), [Radical](../interfaces/Radical.md), [Kana](../interfaces/Kana.md), [Grammar](../interfaces/Grammar.md))

## Returns

`string`[]

An array of fields, each corresponding to an Anki note type field
