[**henkan**](../README.md)

***

[henkan](../README.md) / Word

# Interface: Word

Defined in: [types.ts:646](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L646)

Word information

Converted from [DictWord](DictWord.md)

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"word"`\>

## Properties

### common?

> `optional` **common**: `true`

Defined in: [types.ts:670](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L670)

#### See

[DictWord.isCommon](DictWord.md#iscommon)

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:408](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L408)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:416](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L416)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:400](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L400)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:662](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L662)

A list of kanji used in the kanji forms

***

### kanjiForms?

> `optional` **kanjiForms**: [`KanjiForm`](KanjiForm.md)[]

Defined in: [types.ts:658](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L658)

The word kanji forms

***

### noteID?

> `readonly` `optional` **noteID**: `` `word_${string}` ``

Defined in: [types.ts:396](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L396)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:404](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L404)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:666](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L666)

Phrases associated to the word

***

### readings

> **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:650](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L650)

The word readings (in kana)

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:412](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L412)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### translations

> **translations**: [`Translation`](Translation.md)[]

Defined in: [types.ts:654](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L654)

The word translations/senses

***

### usuallyInKana?

> `optional` **usuallyInKana**: `true`

Defined in: [types.ts:674](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L674)

#### See

[DictWord.usuallyInKana](DictWord.md#usuallyinkana)
