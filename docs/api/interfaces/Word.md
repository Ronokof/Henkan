[**henkan**](../README.md)

***

[henkan](../README.md) / Word

# Interface: Word

Defined in: types.ts:566

Word information

Converted from [DictWord](DictWord.md)

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"word"`\>

## Properties

### common?

> `optional` **common**: `true`

Defined in: types.ts:592

Whether or not the word is common

A word is considered *common* if the [DictWord.readings](DictWord.md#readings) and/or the [DictWord.kanjiForms](DictWord.md#kanjiforms) array(s) include(s) at least one element with the [DictReading.commonness](DictReading.md#commonness) or [DictKanjiForm.commonness](DictKanjiForm.md#commonness) property defined.

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: types.ts:366

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: types.ts:358

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: types.ts:582

A list of kanji used in the kanji forms

***

### kanjiForms?

> `optional` **kanjiForms**: [`KanjiForm`](KanjiForm.md)[]

Defined in: types.ts:578

The word kanji forms

***

### noteID?

> `readonly` `optional` **noteID**: `` `word_${string}` ``

Defined in: types.ts:354

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: types.ts:362

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: types.ts:586

Phrases associated to the word

***

### readings

> **readings**: [`Reading`](Reading.md)[]

Defined in: types.ts:570

The word readings (in kana)

***

### tags?

> `optional` **tags**: `string`[]

Defined in: types.ts:370

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### translations?

> `optional` **translations**: [`Translation`](Translation.md)[]

Defined in: types.ts:574

The word translations/senses
