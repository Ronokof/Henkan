[**henkan**](../README.md)

***

[henkan](../README.md) / Radical

# Interface: Radical

Defined in: [types.ts:781](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L781)

Kanji radical/component information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"radical"`\>

## Properties

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

### externalInfo?

> `optional` **externalInfo**: `true`

Defined in: [types.ts:817](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L817)

Whether or not this radical/component object contains information extracted from [sources](#sources)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:599](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L599)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:809](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L809)

Kanji that include the radical/component

***

### meanings

> **meanings**: `string`[]

Defined in: [types.ts:793](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L793)

The radical/component meanings

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:805](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L805)

The radical/component mnemonic

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

### radical

> `readonly` **radical**: `string`

Defined in: [types.ts:785](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L785)

The radical/component character

***

### reading

> **reading**: `string`

Defined in: [types.ts:789](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L789)

The radical/component reading (in kana)

***

### sources?

> `optional` **sources**: `string`[]

Defined in: [types.ts:813](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L813)

The sources from which data for this radical/component has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:797](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L797)

The stroke count of the radical/component

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:801](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L801)

The radical/component SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:611](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L611)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
