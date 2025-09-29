[**henkan**](../README.md)

***

[henkan](../README.md) / Kana

# Interface: Kana

Defined in: [types.ts:602](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L602)

Kana information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kana"`\>

## Properties

### audio?

> `optional` **audio**: `string`

Defined in: [types.ts:614](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L614)

The filename of an audio file for the kana reading

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:366](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L366)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:358](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L358)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kana

> `readonly` **kana**: `string`

Defined in: [types.ts:606](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L606)

The kana character

***

### noteID?

> `readonly` `optional` **noteID**: `` `kana_${string}` ``

Defined in: [types.ts:354](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L354)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:362](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L362)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### reading

> **reading**: `string`

Defined in: [types.ts:610](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L610)

The romaji reading of the kana

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:618](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L618)

The kana SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:370](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L370)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
