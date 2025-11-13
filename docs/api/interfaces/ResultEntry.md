[**henkan**](../README.md)

***

[henkan](../README.md) / ResultEntry

# Interface: ResultEntry\<EntryType\>

Defined in: [types.ts:372](https://github.com/Ronokof/Henkan/blob/80b2addd3ec0a404258a3690da0bc4a44cf30ccf/src/types.ts#L372)

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

Defined in: [types.ts:388](https://github.com/Ronokof/Henkan/blob/80b2addd3ec0a404258a3690da0bc4a44cf30ccf/src/types.ts#L388)

The full path of the Anki deck

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:396](https://github.com/Ronokof/Henkan/blob/80b2addd3ec0a404258a3690da0bc4a44cf30ccf/src/types.ts#L396)

Whether or not this entry should be converted into an Anki note

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:380](https://github.com/Ronokof/Henkan/blob/80b2addd3ec0a404258a3690da0bc4a44cf30ccf/src/types.ts#L380)

ID used for the Anki note ID

***

### noteID?

> `readonly` `optional` **noteID**: `` `${EntryType}_${string}` ``

Defined in: [types.ts:376](https://github.com/Ronokof/Henkan/blob/80b2addd3ec0a404258a3690da0bc4a44cf30ccf/src/types.ts#L376)

ID used for the resulting Anki note

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:384](https://github.com/Ronokof/Henkan/blob/80b2addd3ec0a404258a3690da0bc4a44cf30ccf/src/types.ts#L384)

Anki note type name

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:392](https://github.com/Ronokof/Henkan/blob/80b2addd3ec0a404258a3690da0bc4a44cf30ccf/src/types.ts#L392)

Tags generated based on the entry's information
