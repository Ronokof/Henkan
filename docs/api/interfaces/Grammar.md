[**henkan**](../README.md)

***

[henkan](../README.md) / Grammar

# Interface: Grammar

Defined in: [types.ts:658](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L658)

Grammar point information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"grammar"`\>

## Properties

### audio?

> `optional` **audio**: `string`

Defined in: [types.ts:690](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L690)

The filename of an audio file for the grammar point

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:376](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L376)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:384](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L384)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:368](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L368)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### jlpt?

> `optional` **jlpt**: [`JLPT`](../type-aliases/JLPT.md)

Defined in: [types.ts:682](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L682)

The \[post-2010 JLPT\](https://en.wikipedia.org/wiki/Japanese-Language\_Proficiency\_Test#Test\_format) level

***

### meaning

> **meaning**: [`GrammarMeaning`](GrammarMeaning.md)

Defined in: [types.ts:666](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L666)

The English meaning/translation of the grammar point

***

### noteID?

> `readonly` `optional` **noteID**: `` `grammar_${string}` ``

Defined in: [types.ts:364](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L364)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:372](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L372)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:678](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L678)

Example phrase using the grammar point

***

### point

> `readonly` **point**: `string`

Defined in: [types.ts:662](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L662)

The most common form in which the grammar point written in

***

### readings?

> `optional` **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:670](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L670)

The readings of the grammar point

***

### source?

> `optional` **source**: `string`

Defined in: [types.ts:686](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L686)

The source from which data for this grammar point has been extracted

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:380](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L380)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### usages?

> `optional` **usages**: `string`[]

Defined in: [types.ts:674](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L674)

Ways in which the grammar point is used in Japanese
