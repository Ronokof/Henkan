[**henkan**](../README.md)

***

[henkan](../README.md) / Word

# Interface: Word

Defined in: [types.ts:784](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L784)

Word information

Converted from [DictWord](DictWord.md)

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"word"`\>

## Properties

### common?

> `optional` **common**: `true`

Defined in: [types.ts:812](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L812)

#### See

[DictWord.isCommon](DictWord.md#iscommon)

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:542](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L542)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### definitions?

> `optional` **definitions**: [`Definition`](Definition.md)[]

Defined in: [types.ts:808](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L808)

Japanese definitions associated with the word

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:550](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L550)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:534](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L534)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:800](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L800)

A list of kanji used in the kanji forms

***

### kanjiForms?

> `optional` **kanjiForms**: [`KanjiForm`](KanjiForm.md)[]

Defined in: [types.ts:796](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L796)

The word kanji forms

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:530](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L530)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:538](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L538)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:804](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L804)

Phrases associated to the word

***

### readings

> **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:788](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L788)

The word readings (in kana)

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:546](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L546)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### translations

> **translations**: [`Translation`](Translation.md)[]

Defined in: [types.ts:792](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L792)

The word translations/senses

***

### usuallyInKana?

> `optional` **usuallyInKana**: `true`

Defined in: [types.ts:816](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L816)

#### See

[DictWord.usuallyInKana](DictWord.md#usuallyinkana)
