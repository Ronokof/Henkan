[**henkan**](../README.md)

***

[henkan](../README.md) / Radical

# Interface: Radical

Defined in: [types.ts:771](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L771)

Kanji radical/component information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"radical"`\>

## Properties

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

### externalInfo?

> `optional` **externalInfo**: `true`

Defined in: [types.ts:807](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L807)

Whether or not this radical/component object contains information extracted from [sources](#sources)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:589](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L589)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:799](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L799)

Kanji that include the radical/component

***

### meanings

> **meanings**: `string`[]

Defined in: [types.ts:783](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L783)

The radical/component meanings

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:795](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L795)

The radical/component mnemonic

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

### radical

> `readonly` **radical**: `string`

Defined in: [types.ts:775](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L775)

The radical/component character

***

### reading

> **reading**: `string`

Defined in: [types.ts:779](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L779)

The radical/component reading (in kana)

***

### sources?

> `optional` **sources**: `string`[]

Defined in: [types.ts:803](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L803)

The sources from which data for this radical/component has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:787](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L787)

The stroke count of the radical/component

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:791](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L791)

The radical/component SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:601](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L601)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
