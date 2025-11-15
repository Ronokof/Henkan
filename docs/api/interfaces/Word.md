[**henkan**](../README.md)

***

[henkan](../README.md) / Word

# Interface: Word

Defined in: [types.ts:624](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L624)

Word information

Converted from [DictWord](DictWord.md)

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"word"`\>

## Properties

### common?

> `optional` **common**: `true`

Defined in: [types.ts:648](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L648)

#### See

[DictWord.isCommon](DictWord.md#iscommon)

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:390](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L390)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:398](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L398)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:382](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L382)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:640](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L640)

A list of kanji used in the kanji forms

***

### kanjiForms?

> `optional` **kanjiForms**: [`KanjiForm`](KanjiForm.md)[]

Defined in: [types.ts:636](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L636)

The word kanji forms

***

### noteID?

> `readonly` `optional` **noteID**: `` `word_${string}` ``

Defined in: [types.ts:378](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L378)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:386](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L386)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:644](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L644)

Phrases associated to the word

***

### readings

> **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:628](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L628)

The word readings (in kana)

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:394](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L394)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### translations

> **translations**: [`Translation`](Translation.md)[]

Defined in: [types.ts:632](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L632)

The word translations/senses

***

### usuallyInKana?

> `optional` **usuallyInKana**: `true`

Defined in: [types.ts:652](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L652)

#### See

[DictWord.usuallyInKana](DictWord.md#usuallyinkana)
