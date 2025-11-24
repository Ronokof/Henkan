[**henkan**](../README.md)

***

[henkan](../README.md) / Kana

# Interface: Kana

Defined in: [types.ts:680](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L680)

Kana information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kana"`\>

## Properties

### audio?

> `optional` **audio**: `string`

Defined in: [types.ts:692](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L692)

The filename of an audio file for the kana reading

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:408](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L408)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:416](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L416)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:400](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L400)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kana

> `readonly` **kana**: `string`

Defined in: [types.ts:684](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L684)

The kana character

***

### noteID?

> `readonly` `optional` **noteID**: `` `kana_${string}` ``

Defined in: [types.ts:396](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L396)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:404](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L404)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### reading

> **reading**: `string`

Defined in: [types.ts:688](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L688)

The romaji reading of the kana

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:696](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L696)

The kana SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:412](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L412)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
