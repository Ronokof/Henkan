[**henkan**](../README.md)

***

[henkan](../README.md) / Kana

# Interface: Kana

Defined in: [types.ts:652](https://github.com/Ronokof/Henkan/blob/4dfe59969f2c1e39e98e2e78ce7a889a52f6ddd1/src/types.ts#L652)

Kana information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kana"`\>

## Properties

### audio?

> `optional` **audio**: `string`

Defined in: [types.ts:664](https://github.com/Ronokof/Henkan/blob/4dfe59969f2c1e39e98e2e78ce7a889a52f6ddd1/src/types.ts#L664)

The filename of an audio file for the kana reading

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:380](https://github.com/Ronokof/Henkan/blob/4dfe59969f2c1e39e98e2e78ce7a889a52f6ddd1/src/types.ts#L380)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:388](https://github.com/Ronokof/Henkan/blob/4dfe59969f2c1e39e98e2e78ce7a889a52f6ddd1/src/types.ts#L388)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:372](https://github.com/Ronokof/Henkan/blob/4dfe59969f2c1e39e98e2e78ce7a889a52f6ddd1/src/types.ts#L372)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kana

> `readonly` **kana**: `string`

Defined in: [types.ts:656](https://github.com/Ronokof/Henkan/blob/4dfe59969f2c1e39e98e2e78ce7a889a52f6ddd1/src/types.ts#L656)

The kana character

***

### noteID?

> `readonly` `optional` **noteID**: `` `kana_${string}` ``

Defined in: [types.ts:368](https://github.com/Ronokof/Henkan/blob/4dfe59969f2c1e39e98e2e78ce7a889a52f6ddd1/src/types.ts#L368)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:376](https://github.com/Ronokof/Henkan/blob/4dfe59969f2c1e39e98e2e78ce7a889a52f6ddd1/src/types.ts#L376)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### reading

> **reading**: `string`

Defined in: [types.ts:660](https://github.com/Ronokof/Henkan/blob/4dfe59969f2c1e39e98e2e78ce7a889a52f6ddd1/src/types.ts#L660)

The romaji reading of the kana

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:668](https://github.com/Ronokof/Henkan/blob/4dfe59969f2c1e39e98e2e78ce7a889a52f6ddd1/src/types.ts#L668)

The kana SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:384](https://github.com/Ronokof/Henkan/blob/4dfe59969f2c1e39e98e2e78ce7a889a52f6ddd1/src/types.ts#L384)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
