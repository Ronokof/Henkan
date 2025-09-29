[**henkan**](../README.md)

***

[henkan](../README.md) / Radical

# Interface: Radical

Defined in: [types.ts:506](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L506)

Kanji radical/component information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"radical"`\>

## Properties

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:366](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L366)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### fromJpdb?

> `optional` **fromJpdb**: `true`

Defined in: [types.ts:542](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L542)

Whether or not this radical/component object contains information **only** from `jpdb.io`

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:358](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L358)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:534](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L534)

Kanji that include the radical/component

***

### meanings

> **meanings**: `string`[]

Defined in: [types.ts:518](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L518)

The radical/component meanings

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:530](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L530)

The radical/component mnemonic

***

### noteID?

> `readonly` `optional` **noteID**: `` `radical_${string}` ``

Defined in: [types.ts:354](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L354)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:362](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L362)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### radical

> `readonly` **radical**: `string`

Defined in: [types.ts:510](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L510)

The radical/component character

***

### reading

> **reading**: `string`

Defined in: [types.ts:514](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L514)

The radical/component reading (in kana)

***

### sources?

> `optional` **sources**: `string`[]

Defined in: [types.ts:538](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L538)

The sources from which data for this radical/component has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:522](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L522)

The stroke count of the radical/component

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:526](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L526)

The radical/component SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:370](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L370)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)
