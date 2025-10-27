[**henkan**](../README.md)

***

[henkan](../README.md) / Word

# Interface: Word

Defined in: [types.ts:584](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L584)

Word information

Converted from [DictWord](DictWord.md)

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"word"`\>

## Properties

### common?

> `optional` **common**: `true`

Defined in: [types.ts:610](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L610)

Whether or not the word is common

A word is considered *common* if the [DictWord.readings](DictWord.md#readings) and/or the [DictWord.kanjiForms](DictWord.md#kanjiforms) array(s) include(s) at least one element with the [DictReading.commonness](DictReading.md#commonness) or [DictKanjiForm.commonness](DictKanjiForm.md#commonness) property defined.

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

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:600](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L600)

A list of kanji used in the kanji forms

***

### kanjiForms?

> `optional` **kanjiForms**: [`KanjiForm`](KanjiForm.md)[]

Defined in: [types.ts:596](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L596)

The word kanji forms

***

### noteID?

> `readonly` `optional` **noteID**: `` `word_${string}` ``

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

Defined in: [types.ts:604](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L604)

Phrases associated to the word

***

### readings

> **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:588](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L588)

The word readings (in kana)

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:380](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L380)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### translations?

> `optional` **translations**: [`Translation`](Translation.md)[]

Defined in: [types.ts:592](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L592)

The word translations/senses

***

### usuallyInKana?

> `optional` **usuallyInKana**: `true`

Defined in: [types.ts:616](https://github.com/Ronokof/Henkan/blob/207e0013c3766c7ef3adabde09be5f84497f2607/src/types.ts#L616)

Whether or not the word is typically written in kana alone

Set to `true` only if the word is usually written in kana for all word senses.
