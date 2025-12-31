[**henkan**](../README.md)

***

[henkan](../README.md) / Kana

# Interface: Kana

Defined in: [types.ts:887](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L887)

Kana information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kana"`\>

## Properties

### audio?

> `optional` **audio**: `string`

Defined in: [types.ts:899](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L899)

The filename of an audio file for the kana reading

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:607](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L607)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:615](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L615)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:599](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L599)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kana

> `readonly` **kana**: `string`

Defined in: [types.ts:891](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L891)

The kana character

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:595](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L595)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:603](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L603)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### reading

> **reading**: `string`

Defined in: [types.ts:895](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L895)

The romaji reading of the kana

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:903](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L903)

The kana SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:611](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L611)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
