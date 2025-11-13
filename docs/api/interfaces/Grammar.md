[**henkan**](../README.md)

***

[henkan](../README.md) / Grammar

# Interface: Grammar

Defined in: [types.ts:692](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L692)

Grammar point information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"grammar"`\>

## Properties

### audio?

> `optional` **audio**: `string`

Defined in: [types.ts:724](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L724)

The filename of an audio file for the grammar point

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:388](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L388)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:396](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L396)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:380](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L380)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### jlpt?

> `optional` **jlpt**: [`JLPT`](../type-aliases/JLPT.md)

Defined in: [types.ts:716](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L716)

The \[post-2010 JLPT\](https://en.wikipedia.org/wiki/Japanese-Language\_Proficiency\_Test#Test\_format) level

***

### meaning

> **meaning**: [`GrammarMeaning`](GrammarMeaning.md)

Defined in: [types.ts:700](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L700)

The English meaning/translation of the grammar point

***

### noteID?

> `readonly` `optional` **noteID**: `` `grammar_${string}` ``

Defined in: [types.ts:376](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L376)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:384](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L384)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:712](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L712)

Example phrase using the grammar point

***

### point

> `readonly` **point**: `string`

Defined in: [types.ts:696](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L696)

The most common form in which the grammar point written in

***

### readings?

> `optional` **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:704](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L704)

The readings of the grammar point

***

### source?

> `optional` **source**: `string`

Defined in: [types.ts:720](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L720)

The source from which data for this grammar point has been extracted

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:392](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L392)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### usages?

> `optional` **usages**: `string`[]

Defined in: [types.ts:708](https://github.com/Ronokof/Henkan/blob/66a536d406d853661da5c68af95123f6a590a767/src/types.ts#L708)

Ways in which the grammar point is used in Japanese
