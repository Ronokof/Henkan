[**henkan**](../README.md)

***

[henkan](../README.md) / ResultEntry

# Interface: ResultEntry\<EntryType\>

Defined in: types.ts:350

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

Defined in: types.ts:366

The full path of the Anki deck

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: types.ts:358

ID used for the Anki note ID

***

### noteID?

> `readonly` `optional` **noteID**: `` `${EntryType}_${string}` ``

Defined in: types.ts:354

ID used for the resulting Anki note

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: types.ts:362

Anki note type name

***

### tags?

> `optional` **tags**: `string`[]

Defined in: types.ts:370

Tags generated based on the entry's information
