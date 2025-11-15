[**henkan**](../README.md)

***

[henkan](../README.md) / Radical

# Interface: Radical

Defined in: [types.ts:560](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L560)

Kanji radical/component information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"radical"`\>

## Properties

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:390](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L390)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:398](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L398)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### fromJpdb?

> `optional` **fromJpdb**: `true`

Defined in: [types.ts:596](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L596)

Whether or not this radical/component object contains information **only** from `jpdb.io`

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:382](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L382)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:588](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L588)

Kanji that include the radical/component

***

### meanings

> **meanings**: `string`[]

Defined in: [types.ts:572](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L572)

The radical/component meanings

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:584](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L584)

The radical/component mnemonic

***

### noteID?

> `readonly` `optional` **noteID**: `` `radical_${string}` ``

Defined in: [types.ts:378](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L378)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:386](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L386)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### radical

> `readonly` **radical**: `string`

Defined in: [types.ts:564](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L564)

The radical/component character

***

### reading

> **reading**: `string`

Defined in: [types.ts:568](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L568)

The radical/component reading (in kana)

***

### sources?

> `optional` **sources**: `string`[]

Defined in: [types.ts:592](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L592)

The sources from which data for this radical/component has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:576](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L576)

The stroke count of the radical/component

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:580](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L580)

The radical/component SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:394](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L394)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
