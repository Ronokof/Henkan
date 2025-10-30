[**henkan**](../README.md)

***

[henkan](../README.md) / ResultEntry

# Interface: ResultEntry\<EntryType\>

Defined in: [types.ts:364](https://github.com/Ronokof/Henkan/blob/17544df04e711a7f1119a1cdd6fdf0d29ac91844/src/types.ts#L364)

Basic Anki note information

## Extended by

- [`Kanji`](Kanji.md)
- [`Radical`](Radical.md)
- [`Word`](Word.md)
- [`Kana`](Kana.md)
- [`Grammar`](Grammar.md)

## Type Parameters

### EntryType

`EntryType` *extends* `string`

## Properties

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:380](https://github.com/Ronokof/Henkan/blob/17544df04e711a7f1119a1cdd6fdf0d29ac91844/src/types.ts#L380)

The full path of the Anki deck

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:388](https://github.com/Ronokof/Henkan/blob/17544df04e711a7f1119a1cdd6fdf0d29ac91844/src/types.ts#L388)

Whether or not this entry should be converted into an Anki note

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:372](https://github.com/Ronokof/Henkan/blob/17544df04e711a7f1119a1cdd6fdf0d29ac91844/src/types.ts#L372)

ID used for the Anki note ID

***

### noteID?

> `readonly` `optional` **noteID**: `` `${EntryType}_${string}` ``

Defined in: [types.ts:368](https://github.com/Ronokof/Henkan/blob/17544df04e711a7f1119a1cdd6fdf0d29ac91844/src/types.ts#L368)

ID used for the resulting Anki note

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:376](https://github.com/Ronokof/Henkan/blob/17544df04e711a7f1119a1cdd6fdf0d29ac91844/src/types.ts#L376)

Anki note type name

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:384](https://github.com/Ronokof/Henkan/blob/17544df04e711a7f1119a1cdd6fdf0d29ac91844/src/types.ts#L384)

Tags generated based on the entry's information
