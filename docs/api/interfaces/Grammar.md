[**henkan**](../README.md)

***

[henkan](../README.md) / Grammar

# Interface: Grammar

Defined in: [types.ts:919](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L919)

Grammar point information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"grammar"`\>

## Properties

### audio?

> `optional` **audio**: `string`

Defined in: [types.ts:951](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L951)

The filename of an audio file for the grammar point

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:603](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L603)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:611](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L611)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:595](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L595)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### jlpt?

> `optional` **jlpt**: [`JLPT`](../type-aliases/JLPT.md)

Defined in: [types.ts:943](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L943)

The [post-2010 JLPT](https://en.wikipedia.org/wiki/Japanese-Language_Proficiency_Test#Test_format) level

***

### meaning

> **meaning**: [`GrammarMeaning`](GrammarMeaning.md)

Defined in: [types.ts:927](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L927)

The English meaning/translation of the grammar point

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:591](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L591)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:599](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L599)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:939](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L939)

Example phrase using the grammar point

***

### point

> `readonly` **point**: `string`

Defined in: [types.ts:923](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L923)

The most common form in which the grammar point written in

***

### readings?

> `optional` **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:931](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L931)

The readings of the grammar point

***

### source?

> `optional` **source**: `string`

Defined in: [types.ts:947](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L947)

The source from which data for this grammar point has been extracted

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:607](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L607)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### usages?

> `optional` **usages**: `string`[]

Defined in: [types.ts:935](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L935)

Ways in which the grammar point is used in Japanese
