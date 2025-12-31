[**henkan**](../README.md)

***

[henkan](../README.md) / Word

# Interface: Word

Defined in: [types.ts:849](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L849)

Word information

Converted from [DictWord](DictWord.md)

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"word"`\>

## Properties

### common?

> `optional` **common**: `true`

Defined in: [types.ts:877](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L877)

#### See

[DictWord.isCommon](DictWord.md#iscommon)

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:607](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L607)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### definitions?

> `optional` **definitions**: [`Definition`](Definition.md)[]

Defined in: [types.ts:873](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L873)

Japanese definitions associated with the word

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:615](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L615)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:599](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L599)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:865](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L865)

A list of kanji used in the kanji forms

***

### kanjiForms?

> `optional` **kanjiForms**: [`KanjiForm`](KanjiForm.md)[]

Defined in: [types.ts:861](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L861)

The word kanji forms

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:595](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L595)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:603](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L603)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:869](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L869)

Phrases associated to the word

***

### readings

> **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:853](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L853)

The word readings (in kana)

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:611](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L611)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### translations

> **translations**: [`Translation`](Translation.md)[]

Defined in: [types.ts:857](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L857)

The word translations/senses

***

### usuallyInKana?

> `optional` **usuallyInKana**: `true`

Defined in: [types.ts:881](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L881)

#### See

[DictWord.usuallyInKana](DictWord.md#usuallyinkana)
