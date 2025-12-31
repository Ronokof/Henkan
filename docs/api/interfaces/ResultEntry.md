[**henkan**](../README.md)

***

[henkan](../README.md) / ResultEntry

# Interface: ResultEntry\<E\>

Defined in: [types.ts:591](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L591)

Basic Anki note information

## Extended by

- [`Kanji`](Kanji.md)
- [`Radical`](Radical.md)
- [`Word`](Word.md)
- [`Kana`](Kana.md)
- [`Grammar`](Grammar.md)

## Type Parameters

### E

`E` *extends* [`EntryType`](../type-aliases/EntryType.md)

## Properties

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:607](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L607)

The full path of the Anki deck

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:615](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L615)

Whether or not this entry should be converted into an Anki note

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:599](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L599)

ID used for the Anki note ID

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:595](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L595)

ID used for the resulting Anki note

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:603](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L603)

Anki note type name

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:611](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L611)

Tags generated based on the entry's information
