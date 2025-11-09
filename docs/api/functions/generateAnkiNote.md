[**henkan**](../README.md)

***

[henkan](../README.md) / generateAnkiNote

# Function: generateAnkiNote()

> **generateAnkiNote**(`entry`): `string`[]

Defined in: [utils.ts:1647](https://github.com/Ronokof/Henkan/blob/a0628d36c81810a27b826ff1126891d82f33661f/src/utils.ts#L1647)

Generates an array where each field holds an entry’s info wrapped in HTML tags.

## Parameters

### entry

[`Result`](../type-aliases/Result.md)

Any type of mapped entry ([Word](../interfaces/Word.md), [Kanji](../interfaces/Kanji.md), [Radical](../interfaces/Radical.md), [Kana](../interfaces/Kana.md), [Grammar](../interfaces/Grammar.md))

## Returns

`string`[]

An array of fields, each corresponding to an Anki note type field
