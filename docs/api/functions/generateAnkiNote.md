[**henkan**](../README.md)

***

[henkan](../README.md) / generateAnkiNote

# Function: generateAnkiNote()

> **generateAnkiNote**(`entry`, `customData?`, `additionalTags?`): `string`[]

Defined in: [utils.ts:3151](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L3151)

Generates an array where each field holds an entry’s info wrapped in HTML tags.

## Parameters

### entry

[`Result`](../type-aliases/Result.md)

Any type of mapped entry ([Word](../interfaces/Word.md), [Name](../interfaces/Name.md), [Kanji](../interfaces/Kanji.md), [Radical](../interfaces/Radical.md), [Kana](../interfaces/Kana.md), [Grammar](../interfaces/Grammar.md))

### customData?

`string`

An additional string that will be added on the first field of any note type, as a `data-custom` attribute inside an invisible `div`

### additionalTags?

`string`[]

Additional tags that will be added alongside the existing entry tags

## Returns

`string`[]

An array of fields, each corresponding to an Anki note type field
