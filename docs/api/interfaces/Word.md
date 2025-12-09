[**henkan**](../README.md)

***

[henkan](../README.md) / Word

# Interface: Word

Defined in: [types.ts:685](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L685)

Word information

Converted from [DictWord](DictWord.md)

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"word"`\>

## Properties

### common?

> `optional` **common**: `true`

Defined in: [types.ts:713](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L713)

#### See

[DictWord.isCommon](DictWord.md#iscommon)

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:447](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L447)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### definitions?

> `optional` **definitions**: [`Definition`](Definition.md)[]

Defined in: [types.ts:709](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L709)

Japanese definitions associated with the word

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:455](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L455)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:439](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L439)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:701](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L701)

A list of kanji used in the kanji forms

***

### kanjiForms?

> `optional` **kanjiForms**: [`KanjiForm`](KanjiForm.md)[]

Defined in: [types.ts:697](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L697)

The word kanji forms

***

### noteID?

> `readonly` `optional` **noteID**: `` `word_${string}` ``

Defined in: [types.ts:435](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L435)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:443](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L443)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:705](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L705)

Phrases associated to the word

***

### readings

> **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:689](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L689)

The word readings (in kana)

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:451](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L451)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### translations

> **translations**: [`Translation`](Translation.md)[]

Defined in: [types.ts:693](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L693)

The word translations/senses

***

### usuallyInKana?

> `optional` **usuallyInKana**: `true`

Defined in: [types.ts:717](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L717)

#### See

[DictWord.usuallyInKana](DictWord.md#usuallyinkana)
