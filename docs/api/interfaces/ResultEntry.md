[**henkan**](../README.md)

***

[henkan](../README.md) / ResultEntry

# Interface: ResultEntry\<EntryType\>

Defined in: [types.ts:581](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L581)

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

Defined in: [types.ts:597](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L597)

The full path of the Anki deck

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:605](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L605)

Whether or not this entry should be converted into an Anki note

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:589](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L589)

ID used for the Anki note ID

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:585](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L585)

ID used for the resulting Anki note

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:593](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L593)

Anki note type name

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:601](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L601)

Tags generated based on the entry's information
