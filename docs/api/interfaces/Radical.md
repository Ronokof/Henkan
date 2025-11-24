[**henkan**](../README.md)

***

[henkan](../README.md) / Radical

# Interface: Radical

Defined in: [types.ts:578](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L578)

Kanji radical/component information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"radical"`\>

## Properties

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

### fromJpdb?

> `optional` **fromJpdb**: `true`

Defined in: [types.ts:614](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L614)

Whether or not this radical/component object contains information **only** from `jpdb.io`

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:400](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L400)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:606](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L606)

Kanji that include the radical/component

***

### meanings

> **meanings**: `string`[]

Defined in: [types.ts:590](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L590)

The radical/component meanings

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:602](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L602)

The radical/component mnemonic

***

### noteID?

> `readonly` `optional` **noteID**: `` `radical_${string}` ``

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

### radical

> `readonly` **radical**: `string`

Defined in: [types.ts:582](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L582)

The radical/component character

***

### reading

> **reading**: `string`

Defined in: [types.ts:586](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L586)

The radical/component reading (in kana)

***

### sources?

> `optional` **sources**: `string`[]

Defined in: [types.ts:610](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L610)

The sources from which data for this radical/component has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:594](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L594)

The stroke count of the radical/component

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:598](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L598)

The radical/component SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:412](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L412)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
