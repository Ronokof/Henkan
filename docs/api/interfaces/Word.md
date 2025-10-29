[**henkan**](../README.md)

***

[henkan](../README.md) / Word

# Interface: Word

Defined in: [types.ts:606](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L606)

Word information

Converted from [DictWord](DictWord.md)

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"word"`\>

## Properties

### common?

> `optional` **common**: `true`

Defined in: [types.ts:632](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L632)

Whether or not the word is common

A word is considered *common* if the [DictWord.readings](DictWord.md#readings) and/or the [DictWord.kanjiForms](DictWord.md#kanjiforms) array(s) include(s) at least one element with the [DictReading.commonness](DictReading.md#commonness) or [DictKanjiForm.commonness](DictKanjiForm.md#commonness) property defined.

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:380](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L380)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:388](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L388)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:372](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L372)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:622](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L622)

A list of kanji used in the kanji forms

***

### kanjiForms?

> `optional` **kanjiForms**: [`KanjiForm`](KanjiForm.md)[]

Defined in: [types.ts:618](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L618)

The word kanji forms

***

### noteID?

> `readonly` `optional` **noteID**: `` `word_${string}` ``

Defined in: [types.ts:368](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L368)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:376](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L376)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:626](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L626)

Phrases associated to the word

***

### readings

> **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:610](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L610)

The word readings (in kana)

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:384](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L384)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### translations?

> `optional` **translations**: [`Translation`](Translation.md)[]

Defined in: [types.ts:614](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L614)

The word translations/senses

***

### usuallyInKana?

> `optional` **usuallyInKana**: `true`

Defined in: [types.ts:638](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L638)

Whether or not the word is typically written in kana alone

Set to `true` only if the word is usually written in kana for all word senses.
