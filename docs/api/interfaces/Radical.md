[**henkan**](../README.md)

***

[henkan](../README.md) / Radical

# Interface: Radical

Defined in: [types.ts:621](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L621)

Kanji radical/component information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"radical"`\>

## Properties

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:447](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L447)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:455](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L455)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### fromJpdb?

> `optional` **fromJpdb**: `true`

Defined in: [types.ts:657](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L657)

Whether or not this radical/component object contains information **only** from `jpdb.io`

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:439](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L439)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:649](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L649)

Kanji that include the radical/component

***

### meanings

> **meanings**: `string`[]

Defined in: [types.ts:633](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L633)

The radical/component meanings

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:645](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L645)

The radical/component mnemonic

***

### noteID?

> `readonly` `optional` **noteID**: `` `radical_${string}` ``

Defined in: [types.ts:435](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L435)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:443](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L443)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### radical

> `readonly` **radical**: `string`

Defined in: [types.ts:625](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L625)

The radical/component character

***

### reading

> **reading**: `string`

Defined in: [types.ts:629](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L629)

The radical/component reading (in kana)

***

### sources?

> `optional` **sources**: `string`[]

Defined in: [types.ts:653](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L653)

The sources from which data for this radical/component has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:637](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L637)

The stroke count of the radical/component

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:641](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L641)

The radical/component SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:451](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L451)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
