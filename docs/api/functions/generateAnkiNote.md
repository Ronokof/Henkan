[**henkan**](../README.md)

***

[henkan](../README.md) / generateAnkiNote

# Function: generateAnkiNote()

> **generateAnkiNote**(`entry`): `string`[]

Defined in: [utils.ts:1668](https://github.com/Ronokof/Henkan/blob/d6fc3941570042889245ed58f548d9841ac9c78a/src/utils.ts#L1668)

Generates an array where each field holds an entry’s info wrapped in HTML tags.

## Parameters

### entry

[`Result`](../type-aliases/Result.md)

Any type of mapped entry ([Word](../interfaces/Word.md), [Kanji](../interfaces/Kanji.md), [Radical](../interfaces/Radical.md), [Kana](../interfaces/Kana.md), [Grammar](../interfaces/Grammar.md))

## Returns

`string`[]

An array of fields, each corresponding to an Anki note type field
