[**henkan**](../README.md)

***

[henkan](../README.md) / Grammar

# Interface: Grammar

Defined in: types.ts:634

Grammar point information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"grammar"`\>

## Properties

### audio?

> `optional` **audio**: `string`

Defined in: types.ts:666

The filename of an audio file for the grammar point

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: types.ts:366

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: types.ts:358

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### jlpt?

> `optional` **jlpt**: [`JLPT`](../type-aliases/JLPT.md)

Defined in: types.ts:658

The \[post-2010 JLPT\](https://en.wikipedia.org/wiki/Japanese-Language\_Proficiency\_Test#Test\_format) level

***

### meaning

> **meaning**: [`GrammarMeaning`](GrammarMeaning.md)

Defined in: types.ts:642

The English meaning/translation of the grammar point

***

### noteID?

> `readonly` `optional` **noteID**: `` `grammar_${string}` ``

Defined in: types.ts:354

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: types.ts:362

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: types.ts:654

Example phrase using the grammar point

***

### point

> `readonly` **point**: `string`

Defined in: types.ts:638

The most common form in which the grammar point written in

***

### readings?

> `optional` **readings**: [`Reading`](Reading.md)[]

Defined in: types.ts:646

The readings of the grammar point

***

### source?

> `optional` **source**: `string`

Defined in: types.ts:662

The source from which data for this grammar point has been extracted

***

### tags?

> `optional` **tags**: `string`[]

Defined in: types.ts:370

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### usages?

> `optional` **usages**: `string`[]

Defined in: types.ts:650

Ways in which the grammar point is used in Japanese
