[**henkan**](../README.md)

***

[henkan](../README.md) / Radical

# Interface: Radical

Defined in: [types.ts:847](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L847)

Kanji radical/component information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"radical"`\>

## Properties

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:673](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L673)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:681](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L681)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### externalInfo?

> `optional` **externalInfo**: `true`

Defined in: [types.ts:883](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L883)

Whether or not this radical/component object contains information extracted from [sources](#sources)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:665](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L665)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:875](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L875)

Kanji that include the radical/component

***

### meanings

> **meanings**: `string`[]

Defined in: [types.ts:859](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L859)

The radical/component meanings

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:871](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L871)

The radical/component mnemonic

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:661](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L661)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:669](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L669)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### radical

> `readonly` **radical**: `string`

Defined in: [types.ts:851](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L851)

The radical/component character

***

### reading

> **reading**: `string`

Defined in: [types.ts:855](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L855)

The radical/component reading (in kana)

***

### sources?

> `optional` **sources**: `string`[]

Defined in: [types.ts:879](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L879)

The sources from which data for this radical/component has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:863](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L863)

The stroke count of the radical/component

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:867](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L867)

The radical/component SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:677](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L677)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
