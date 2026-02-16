[**henkan**](../README.md)

***

[henkan](../README.md) / ResultEntry

# Interface: ResultEntry\<E\>

Defined in: [types.ts:657](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L657)

Basic Anki note information

## Extended by

- [`Kanji`](Kanji.md)
- [`Radical`](Radical.md)
- [`Word`](Word.md)
- [`Name`](Name.md)
- [`Kana`](Kana.md)
- [`Grammar`](Grammar.md)

## Type Parameters

### E

`E` *extends* [`EntryType`](../type-aliases/EntryType.md)

## Properties

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:673](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L673)

The full path of the Anki deck

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:681](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L681)

Whether or not this entry should be converted into an Anki note

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:665](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L665)

ID used for the Anki note ID

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:661](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L661)

ID used for the resulting Anki note

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:669](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L669)

Anki note type name

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:677](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L677)

Tags generated based on the entry's information
