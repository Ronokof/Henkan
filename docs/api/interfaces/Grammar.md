[**henkan**](../README.md)

***

[henkan](../README.md) / Grammar

# Interface: Grammar

Defined in: [types.ts:694](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L694)

Grammar point information

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"grammar"`\>

## Properties

### audio?

> `optional` **audio**: `string`

Defined in: [types.ts:726](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L726)

The filename of an audio file for the grammar point

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:390](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L390)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:398](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L398)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:382](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L382)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### jlpt?

> `optional` **jlpt**: [`JLPT`](../type-aliases/JLPT.md)

Defined in: [types.ts:718](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L718)

The \[post-2010 JLPT\](https://en.wikipedia.org/wiki/Japanese-Language\_Proficiency\_Test#Test\_format) level

***

### meaning

> **meaning**: [`GrammarMeaning`](GrammarMeaning.md)

Defined in: [types.ts:702](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L702)

The English meaning/translation of the grammar point

***

### noteID?

> `readonly` `optional` **noteID**: `` `grammar_${string}` ``

Defined in: [types.ts:378](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L378)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:386](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L386)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:714](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L714)

Example phrase using the grammar point

***

### point

> `readonly` **point**: `string`

Defined in: [types.ts:698](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L698)

The most common form in which the grammar point written in

***

### readings?

> `optional` **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:706](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L706)

The readings of the grammar point

***

### source?

> `optional` **source**: `string`

Defined in: [types.ts:722](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L722)

The source from which data for this grammar point has been extracted

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:394](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L394)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### usages?

> `optional` **usages**: `string`[]

Defined in: [types.ts:710](https://github.com/Ronokof/Henkan/blob/17cbd9518a408e69828b76e5f6f939abe525b24c/src/types.ts#L710)

Ways in which the grammar point is used in Japanese
