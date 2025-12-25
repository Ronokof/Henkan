[**henkan**](../README.md)

***

[henkan](../README.md) / Radical

# Interface: Radical

Defined in: [types.ts:716](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L716)

Kanji radical/component information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"radical"`\>

## Properties

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:542](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L542)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:550](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L550)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### externalInfo?

> `optional` **externalInfo**: `true`

Defined in: [types.ts:752](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L752)

Whether or not this radical/component object contains information extracted from [sources](#sources)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:534](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L534)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:744](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L744)

Kanji that include the radical/component

***

### meanings

> **meanings**: `string`[]

Defined in: [types.ts:728](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L728)

The radical/component meanings

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:740](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L740)

The radical/component mnemonic

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:530](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L530)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:538](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L538)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### radical

> `readonly` **radical**: `string`

Defined in: [types.ts:720](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L720)

The radical/component character

***

### reading

> **reading**: `string`

Defined in: [types.ts:724](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L724)

The radical/component reading (in kana)

***

### sources?

> `optional` **sources**: `string`[]

Defined in: [types.ts:748](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L748)

The sources from which data for this radical/component has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:732](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L732)

The stroke count of the radical/component

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:736](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L736)

The radical/component SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:546](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L546)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
