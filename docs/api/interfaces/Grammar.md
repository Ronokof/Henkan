[**henkan**](../README.md)

***

[henkan](../README.md) / Grammar

# Interface: Grammar

Defined in: [types.ts:1021](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1021)

Grammar point information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"grammar"`\>

## Properties

### audio?

> `optional` **audio?**: `string`

Defined in: [types.ts:1053](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1053)

The filename of an audio file for the grammar point

***

### deckPath?

> `optional` **deckPath?**: `string`

Defined in: [types.ts:673](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L673)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote?**: `true`

Defined in: [types.ts:681](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L681)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `optional` **id?**: `` `${number}` ``

Defined in: [types.ts:665](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L665)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### jlpt?

> `optional` **jlpt?**: `` `N${number}` ``

Defined in: [types.ts:1045](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1045)

The [post-2010 JLPT](https://en.wikipedia.org/wiki/Japanese-Language_Proficiency_Test#Test_format) level

***

### meaning

> **meaning**: [`GrammarMeaning`](GrammarMeaning.md)

Defined in: [types.ts:1029](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1029)

The English meaning/translation of the grammar point

***

### noteID?

> `optional` **noteID?**: `string`

Defined in: [types.ts:661](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L661)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName?**: `string`

Defined in: [types.ts:669](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L669)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases?**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:1041](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1041)

Example phrase using the grammar point

***

### point

> `readonly` **point**: `string`

Defined in: [types.ts:1025](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1025)

The most common form in which the grammar point written in

***

### readings?

> `optional` **readings?**: [`Reading`](Reading.md)[]

Defined in: [types.ts:1033](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1033)

The readings of the grammar point

***

### source?

> `optional` **source?**: `string`

Defined in: [types.ts:1049](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1049)

The source from which data for this grammar point has been extracted

***

### tags?

> `optional` **tags?**: `string`[]

Defined in: [types.ts:677](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L677)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### usages?

> `optional` **usages?**: `string`[]

Defined in: [types.ts:1037](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1037)

Ways in which the grammar point is used in Japanese
