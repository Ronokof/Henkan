[**henkan**](../README.md)

***

[henkan](../README.md) / ResultEntry

# Interface: ResultEntry\<EntryType\>

Defined in: [types.ts:430](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L430)

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

Defined in: [types.ts:446](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L446)

The full path of the Anki deck

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:454](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L454)

Whether or not this entry should be converted into an Anki note

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:438](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L438)

ID used for the Anki note ID

***

### noteID?

> `readonly` `optional` **noteID**: `` `${EntryType}_${string}` ``

Defined in: [types.ts:434](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L434)

ID used for the resulting Anki note

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:442](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L442)

Anki note type name

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:450](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L450)

Tags generated based on the entry's information
