[**henkan**](../README.md)

***

[henkan](../README.md) / Radical

# Interface: Radical

Defined in: [types.ts:550](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L550)

Kanji radical/component information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"radical"`\>

## Properties

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:380](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L380)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:388](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L388)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### fromJpdb?

> `optional` **fromJpdb**: `true`

Defined in: [types.ts:586](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L586)

Whether or not this radical/component object contains information **only** from `jpdb.io`

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:372](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L372)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:578](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L578)

Kanji that include the radical/component

***

### meanings

> **meanings**: `string`[]

Defined in: [types.ts:562](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L562)

The radical/component meanings

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:574](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L574)

The radical/component mnemonic

***

### noteID?

> `readonly` `optional` **noteID**: `` `radical_${string}` ``

Defined in: [types.ts:368](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L368)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:376](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L376)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### radical

> `readonly` **radical**: `string`

Defined in: [types.ts:554](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L554)

The radical/component character

***

### reading

> **reading**: `string`

Defined in: [types.ts:558](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L558)

The radical/component reading (in kana)

***

### sources?

> `optional` **sources**: `string`[]

Defined in: [types.ts:582](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L582)

The sources from which data for this radical/component has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:566](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L566)

The stroke count of the radical/component

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:570](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L570)

The radical/component SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:384](https://github.com/Ronokof/Henkan/blob/6262dd222273c37331a77569c74f9782658ccfdc/src/types.ts#L384)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
