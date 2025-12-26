[**henkan**](../README.md)

***

[henkan](../README.md) / Kana

# Interface: Kana

Defined in: [types.ts:877](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L877)

Kana information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kana"`\>

## Properties

### audio?

> `optional` **audio**: `string`

Defined in: [types.ts:889](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L889)

The filename of an audio file for the kana reading

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:597](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L597)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:605](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L605)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:589](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L589)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kana

> `readonly` **kana**: `string`

Defined in: [types.ts:881](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L881)

The kana character

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:585](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L585)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:593](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L593)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### reading

> **reading**: `string`

Defined in: [types.ts:885](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L885)

The romaji reading of the kana

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:893](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L893)

The kana SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:601](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L601)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
