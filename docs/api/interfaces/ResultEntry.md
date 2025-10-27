[**henkan**](../README.md)

***

[henkan](../README.md) / ResultEntry

# Interface: ResultEntry\<EntryType\>

Defined in: [types.ts:360](https://github.com/Ronokof/Henkan/blob/52fe6d98746996eb6471b21af2a4100c9ce484cf/src/types.ts#L360)

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

Defined in: [types.ts:376](https://github.com/Ronokof/Henkan/blob/52fe6d98746996eb6471b21af2a4100c9ce484cf/src/types.ts#L376)

The full path of the Anki deck

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:384](https://github.com/Ronokof/Henkan/blob/52fe6d98746996eb6471b21af2a4100c9ce484cf/src/types.ts#L384)

Whether or not this entry should be converted into an Anki note

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:368](https://github.com/Ronokof/Henkan/blob/52fe6d98746996eb6471b21af2a4100c9ce484cf/src/types.ts#L368)

ID used for the Anki note ID

***

### noteID?

> `readonly` `optional` **noteID**: `` `${EntryType}_${string}` ``

Defined in: [types.ts:364](https://github.com/Ronokof/Henkan/blob/52fe6d98746996eb6471b21af2a4100c9ce484cf/src/types.ts#L364)

ID used for the resulting Anki note

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:372](https://github.com/Ronokof/Henkan/blob/52fe6d98746996eb6471b21af2a4100c9ce484cf/src/types.ts#L372)

Anki note type name

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:380](https://github.com/Ronokof/Henkan/blob/52fe6d98746996eb6471b21af2a4100c9ce484cf/src/types.ts#L380)

Tags generated based on the entry's information
