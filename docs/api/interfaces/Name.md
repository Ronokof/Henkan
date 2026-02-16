[**henkan**](../README.md)

***

[henkan](../README.md) / Name

# Interface: Name

Defined in: [types.ts:955](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L955)

Name information

Converted from [DictName](DictName.md)

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"name"`\>

## Properties

### common?

> `optional` **common**: `true`

Defined in: [types.ts:979](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L979)

#### See

[DictName.isCommon](DictName.md#iscommon)

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:673](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L673)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:681](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L681)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:665](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L665)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:971](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L971)

A list of kanji used in the kanji forms

***

### kanjiForms?

> `optional` **kanjiForms**: [`KanjiForm`](KanjiForm.md)[]

Defined in: [types.ts:967](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L967)

The name kanji forms

***

### nameReadings

> **nameReadings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:959](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L959)

The name readings (in kana)

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:661](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L661)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:669](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L669)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:975](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L975)

Phrases associated to the name

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:677](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L677)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### translations

> **translations**: [`Translation`](Translation.md)[]

Defined in: [types.ts:963](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L963)

The name translations
