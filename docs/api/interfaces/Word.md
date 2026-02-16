[**henkan**](../README.md)

***

[henkan](../README.md) / Word

# Interface: Word

Defined in: [types.ts:915](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L915)

Word information

Converted from [DictWord](DictWord.md)

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"word"`\>

## Properties

### common?

> `optional` **common**: `true`

Defined in: [types.ts:943](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L943)

#### See

[DictWord.isCommon](DictWord.md#iscommon)

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:673](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L673)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### definitions?

> `optional` **definitions**: [`Definition`](Definition.md)[]

Defined in: [types.ts:939](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L939)

Japanese definitions associated with the word

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:681](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L681)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:665](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L665)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:931](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L931)

A list of kanji used in the kanji forms

***

### kanjiForms?

> `optional` **kanjiForms**: [`KanjiForm`](KanjiForm.md)[]

Defined in: [types.ts:927](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L927)

The word kanji forms

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:661](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L661)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:669](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L669)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:935](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L935)

Phrases associated to the word

***

### readings

> **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:919](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L919)

The word readings (in kana)

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:677](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L677)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### translations

> **translations**: [`Translation`](Translation.md)[]

Defined in: [types.ts:923](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L923)

The word translations/senses

***

### usuallyInKana?

> `optional` **usuallyInKana**: `true`

Defined in: [types.ts:947](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L947)

#### See

[DictWord.usuallyInKana](DictWord.md#usuallyinkana)
