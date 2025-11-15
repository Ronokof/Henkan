[**henkan**](../README.md)

***

[henkan](../README.md) / Kana

# Interface: Kana

Defined in: [types.ts:656](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L656)

Kana information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kana"`\>

## Properties

### audio?

> `optional` **audio**: `string`

Defined in: [types.ts:668](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L668)

The filename of an audio file for the kana reading

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:388](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L388)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:396](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L396)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:380](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L380)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kana

> `readonly` **kana**: `string`

Defined in: [types.ts:660](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L660)

The kana character

***

### noteID?

> `readonly` `optional` **noteID**: `` `kana_${string}` ``

Defined in: [types.ts:376](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L376)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:384](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L384)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### reading

> **reading**: `string`

Defined in: [types.ts:664](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L664)

The romaji reading of the kana

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:672](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L672)

The kana SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:392](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L392)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
