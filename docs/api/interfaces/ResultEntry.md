[**henkan**](../README.md)

***

[henkan](../README.md) / ResultEntry

# Interface: ResultEntry\<EntryType\>

Defined in: [types.ts:526](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L526)

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

Defined in: [types.ts:542](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L542)

The full path of the Anki deck

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:550](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L550)

Whether or not this entry should be converted into an Anki note

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:534](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L534)

ID used for the Anki note ID

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:530](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L530)

ID used for the resulting Anki note

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:538](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L538)

Anki note type name

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:546](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L546)

Tags generated based on the entry's information
