[**henkan**](../README.md)

***

[henkan](../README.md) / Word

# Interface: Word

Defined in: [types.ts:839](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L839)

Word information

Converted from [DictWord](DictWord.md)

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"word"`\>

## Properties

### common?

> `optional` **common**: `true`

Defined in: [types.ts:867](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L867)

#### See

[DictWord.isCommon](DictWord.md#iscommon)

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:597](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L597)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### definitions?

> `optional` **definitions**: [`Definition`](Definition.md)[]

Defined in: [types.ts:863](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L863)

Japanese definitions associated with the word

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:605](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L605)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:589](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L589)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:855](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L855)

A list of kanji used in the kanji forms

***

### kanjiForms?

> `optional` **kanjiForms**: [`KanjiForm`](KanjiForm.md)[]

Defined in: [types.ts:851](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L851)

The word kanji forms

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:585](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L585)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:593](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L593)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:859](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L859)

Phrases associated to the word

***

### readings

> **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:843](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L843)

The word readings (in kana)

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:601](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L601)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### translations

> **translations**: [`Translation`](Translation.md)[]

Defined in: [types.ts:847](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L847)

The word translations/senses

***

### usuallyInKana?

> `optional` **usuallyInKana**: `true`

Defined in: [types.ts:871](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L871)

#### See

[DictWord.usuallyInKana](DictWord.md#usuallyinkana)
