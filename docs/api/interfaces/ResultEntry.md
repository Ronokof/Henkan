[**henkan**](../README.md)

***

[henkan](../README.md) / ResultEntry

# Interface: ResultEntry\<EntryType\>

Defined in: [types.ts:392](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L392)

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

Defined in: [types.ts:408](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L408)

The full path of the Anki deck

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:416](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L416)

Whether or not this entry should be converted into an Anki note

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:400](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L400)

ID used for the Anki note ID

***

### noteID?

> `readonly` `optional` **noteID**: `` `${EntryType}_${string}` ``

Defined in: [types.ts:396](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L396)

ID used for the resulting Anki note

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:404](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L404)

Anki note type name

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:412](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L412)

Tags generated based on the entry's information
