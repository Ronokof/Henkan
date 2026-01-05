[**henkan**](../README.md)

***

[henkan](../README.md) / Grammar

# Interface: Grammar

Defined in: [types.ts:921](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L921)

Grammar point information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"grammar"`\>

## Properties

### audio?

> `optional` **audio**: `string`

Defined in: [types.ts:953](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L953)

The filename of an audio file for the grammar point

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:605](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L605)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:613](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L613)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:597](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L597)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### jlpt?

> `optional` **jlpt**: `` `N${number}` ``

Defined in: [types.ts:945](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L945)

The [post-2010 JLPT](https://en.wikipedia.org/wiki/Japanese-Language_Proficiency_Test#Test_format) level

***

### meaning

> **meaning**: [`GrammarMeaning`](GrammarMeaning.md)

Defined in: [types.ts:929](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L929)

The English meaning/translation of the grammar point

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:593](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L593)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:601](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L601)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:941](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L941)

Example phrase using the grammar point

***

### point

> `readonly` **point**: `string`

Defined in: [types.ts:925](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L925)

The most common form in which the grammar point written in

***

### readings?

> `optional` **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:933](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L933)

The readings of the grammar point

***

### source?

> `optional` **source**: `string`

Defined in: [types.ts:949](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L949)

The source from which data for this grammar point has been extracted

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:609](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L609)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### usages?

> `optional` **usages**: `string`[]

Defined in: [types.ts:937](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L937)

Ways in which the grammar point is used in Japanese
