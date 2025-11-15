[**henkan**](../README.md)

***

[henkan](../README.md) / Kana

# Interface: Kana

Defined in: [types.ts:658](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L658)

Kana information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kana"`\>

## Properties

### audio?

> `optional` **audio**: `string`

Defined in: [types.ts:670](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L670)

The filename of an audio file for the kana reading

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:390](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L390)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:398](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L398)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:382](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L382)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kana

> `readonly` **kana**: `string`

Defined in: [types.ts:662](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L662)

The kana character

***

### noteID?

> `readonly` `optional` **noteID**: `` `kana_${string}` ``

Defined in: [types.ts:378](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L378)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:386](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L386)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### reading

> **reading**: `string`

Defined in: [types.ts:666](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L666)

The romaji reading of the kana

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:674](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L674)

The kana SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:394](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L394)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
