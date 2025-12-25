[**henkan**](../README.md)

***

[henkan](../README.md) / Grammar

# Interface: Grammar

Defined in: [types.ts:858](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L858)

Grammar point information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"grammar"`\>

## Properties

### audio?

> `optional` **audio**: `string`

Defined in: [types.ts:890](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L890)

The filename of an audio file for the grammar point

***

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

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:534](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L534)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### jlpt?

> `optional` **jlpt**: [`JLPT`](../type-aliases/JLPT.md)

Defined in: [types.ts:882](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L882)

The [post-2010 JLPT](https://en.wikipedia.org/wiki/Japanese-Language_Proficiency_Test#Test_format) level

***

### meaning

> **meaning**: [`GrammarMeaning`](GrammarMeaning.md)

Defined in: [types.ts:866](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L866)

The English meaning/translation of the grammar point

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

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:878](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L878)

Example phrase using the grammar point

***

### point

> `readonly` **point**: `string`

Defined in: [types.ts:862](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L862)

The most common form in which the grammar point written in

***

### readings?

> `optional` **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:870](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L870)

The readings of the grammar point

***

### source?

> `optional` **source**: `string`

Defined in: [types.ts:886](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L886)

The source from which data for this grammar point has been extracted

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:546](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L546)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### usages?

> `optional` **usages**: `string`[]

Defined in: [types.ts:874](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L874)

Ways in which the grammar point is used in Japanese
