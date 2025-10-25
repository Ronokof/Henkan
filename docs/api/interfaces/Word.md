[**henkan**](../README.md)

***

[henkan](../README.md) / Word

# Interface: Word

Defined in: [types.ts:574](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L574)

Word information

Converted from [DictWord](DictWord.md)

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"word"`\>

## Properties

### common?

> `optional` **common**: `true`

Defined in: [types.ts:600](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L600)

Whether or not the word is common

A word is considered *common* if the [DictWord.readings](DictWord.md#readings) and/or the [DictWord.kanjiForms](DictWord.md#kanjiforms) array(s) include(s) at least one element with the [DictReading.commonness](DictReading.md#commonness) or [DictKanjiForm.commonness](DictKanjiForm.md#commonness) property defined.

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:366](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L366)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:374](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L374)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:358](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L358)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:590](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L590)

A list of kanji used in the kanji forms

***

### kanjiForms?

> `optional` **kanjiForms**: [`KanjiForm`](KanjiForm.md)[]

Defined in: [types.ts:586](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L586)

The word kanji forms

***

### noteID?

> `readonly` `optional` **noteID**: `` `word_${string}` ``

Defined in: [types.ts:354](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L354)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:362](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L362)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:594](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L594)

Phrases associated to the word

***

### readings

> **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:578](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L578)

The word readings (in kana)

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:370](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L370)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### translations?

> `optional` **translations**: [`Translation`](Translation.md)[]

Defined in: [types.ts:582](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L582)

The word translations/senses

***

### usuallyInKana?

> `optional` **usuallyInKana**: `true`

Defined in: [types.ts:606](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L606)

Whether or not the word is typically written in kana alone

Set to `true` only if the word is usually written in kana for all word senses.
