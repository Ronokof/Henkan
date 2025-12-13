[**henkan**](../README.md)

***

[henkan](../README.md) / Radical

# Interface: Radical

Defined in: [types.ts:689](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L689)

Kanji radical/component information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"radical"`\>

## Properties

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:515](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L515)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:523](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L523)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### fromJpdb?

> `optional` **fromJpdb**: `true`

Defined in: [types.ts:725](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L725)

Whether or not this radical/component object contains information **only** from `jpdb.io`

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:507](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L507)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:717](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L717)

Kanji that include the radical/component

***

### meanings

> **meanings**: `string`[]

Defined in: [types.ts:701](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L701)

The radical/component meanings

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:713](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L713)

The radical/component mnemonic

***

### noteID?

> `readonly` `optional` **noteID**: `` `radical_${string}` ``

Defined in: [types.ts:503](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L503)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:511](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L511)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### radical

> `readonly` **radical**: `string`

Defined in: [types.ts:693](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L693)

The radical/component character

***

### reading

> **reading**: `string`

Defined in: [types.ts:697](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L697)

The radical/component reading (in kana)

***

### sources?

> `optional` **sources**: `string`[]

Defined in: [types.ts:721](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L721)

The sources from which data for this radical/component has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:705](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L705)

The stroke count of the radical/component

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:709](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L709)

The radical/component SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:519](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L519)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
