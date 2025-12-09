[**henkan**](../README.md)

***

[henkan](../README.md) / Kana

# Interface: Kana

Defined in: [types.ts:723](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L723)

Kana information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kana"`\>

## Properties

### audio?

> `optional` **audio**: `string`

Defined in: [types.ts:735](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L735)

The filename of an audio file for the kana reading

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:447](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L447)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:455](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L455)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:439](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L439)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kana

> `readonly` **kana**: `string`

Defined in: [types.ts:727](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L727)

The kana character

***

### noteID?

> `readonly` `optional` **noteID**: `` `kana_${string}` ``

Defined in: [types.ts:435](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L435)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:443](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L443)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### reading

> **reading**: `string`

Defined in: [types.ts:731](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L731)

The romaji reading of the kana

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:739](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L739)

The kana SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:451](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L451)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
