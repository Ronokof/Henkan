[**henkan**](../README.md)

***

[henkan](../README.md) / Radical

# Interface: Radical

Defined in: [types.ts:520](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L520)

Kanji radical/component information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"radical"`\>

## Properties

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:376](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L376)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:384](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L384)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### fromJpdb?

> `optional` **fromJpdb**: `true`

Defined in: [types.ts:556](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L556)

Whether or not this radical/component object contains information **only** from `jpdb.io`

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:368](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L368)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:548](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L548)

Kanji that include the radical/component

***

### meanings

> **meanings**: `string`[]

Defined in: [types.ts:532](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L532)

The radical/component meanings

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:544](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L544)

The radical/component mnemonic

***

### noteID?

> `readonly` `optional` **noteID**: `` `radical_${string}` ``

Defined in: [types.ts:364](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L364)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:372](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L372)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### radical

> `readonly` **radical**: `string`

Defined in: [types.ts:524](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L524)

The radical/component character

***

### reading

> **reading**: `string`

Defined in: [types.ts:528](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L528)

The radical/component reading (in kana)

***

### sources?

> `optional` **sources**: `string`[]

Defined in: [types.ts:552](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L552)

The sources from which data for this radical/component has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:536](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L536)

The stroke count of the radical/component

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:540](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L540)

The radical/component SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:380](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L380)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
