[**henkan**](../README.md)

***

[henkan](../README.md) / Word

# Interface: Word

Defined in: [types.ts:757](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L757)

Word information

Converted from [DictWord](DictWord.md)

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"word"`\>

## Properties

### common?

> `optional` **common**: `true`

Defined in: [types.ts:785](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L785)

#### See

[DictWord.isCommon](DictWord.md#iscommon)

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:515](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L515)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### definitions?

> `optional` **definitions**: [`Definition`](Definition.md)[]

Defined in: [types.ts:781](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L781)

Japanese definitions associated with the word

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:523](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L523)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:507](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L507)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:773](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L773)

A list of kanji used in the kanji forms

***

### kanjiForms?

> `optional` **kanjiForms**: [`KanjiForm`](KanjiForm.md)[]

Defined in: [types.ts:769](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L769)

The word kanji forms

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:503](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L503)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:511](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L511)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:777](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L777)

Phrases associated to the word

***

### readings

> **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:761](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L761)

The word readings (in kana)

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:519](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L519)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### translations

> **translations**: [`Translation`](Translation.md)[]

Defined in: [types.ts:765](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L765)

The word translations/senses

***

### usuallyInKana?

> `optional` **usuallyInKana**: `true`

Defined in: [types.ts:789](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L789)

#### See

[DictWord.usuallyInKana](DictWord.md#usuallyinkana)
