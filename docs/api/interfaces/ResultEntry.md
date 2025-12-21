[**henkan**](../README.md)

***

[henkan](../README.md) / ResultEntry

# Interface: ResultEntry\<EntryType\>

Defined in: [types.ts:499](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L499)

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

Defined in: [types.ts:515](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L515)

The full path of the Anki deck

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:523](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L523)

Whether or not this entry should be converted into an Anki note

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:507](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L507)

ID used for the Anki note ID

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:503](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L503)

ID used for the resulting Anki note

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:511](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L511)

Anki note type name

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:519](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L519)

Tags generated based on the entry's information
