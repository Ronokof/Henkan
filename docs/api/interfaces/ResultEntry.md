[**henkan**](../README.md)

***

[henkan](../README.md) / ResultEntry

# Interface: ResultEntry\<EntryType\>

Defined in: [types.ts:374](https://github.com/Ronokof/Henkan/blob/f7f3077e07929c5efbbc7859ef689590749aff14/src/types.ts#L374)

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

Defined in: [types.ts:390](https://github.com/Ronokof/Henkan/blob/f7f3077e07929c5efbbc7859ef689590749aff14/src/types.ts#L390)

The full path of the Anki deck

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:398](https://github.com/Ronokof/Henkan/blob/f7f3077e07929c5efbbc7859ef689590749aff14/src/types.ts#L398)

Whether or not this entry should be converted into an Anki note

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:382](https://github.com/Ronokof/Henkan/blob/f7f3077e07929c5efbbc7859ef689590749aff14/src/types.ts#L382)

ID used for the Anki note ID

***

### noteID?

> `readonly` `optional` **noteID**: `` `${EntryType}_${string}` ``

Defined in: [types.ts:378](https://github.com/Ronokof/Henkan/blob/f7f3077e07929c5efbbc7859ef689590749aff14/src/types.ts#L378)

ID used for the resulting Anki note

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:386](https://github.com/Ronokof/Henkan/blob/f7f3077e07929c5efbbc7859ef689590749aff14/src/types.ts#L386)

Anki note type name

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:394](https://github.com/Ronokof/Henkan/blob/f7f3077e07929c5efbbc7859ef689590749aff14/src/types.ts#L394)

Tags generated based on the entry's information
