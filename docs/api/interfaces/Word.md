[**henkan**](../README.md)

***

[henkan](../README.md) / Word

# Interface: Word

Defined in: [types.ts:622](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L622)

Word information

Converted from [DictWord](DictWord.md)

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"word"`\>

## Properties

### common?

> `optional` **common**: `true`

Defined in: [types.ts:646](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L646)

#### See

[DictWord.isCommon](DictWord.md#iscommon)

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:388](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L388)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:396](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L396)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:380](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L380)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji?

> `optional` **kanji**: [`Kanji`](Kanji.md)[]

Defined in: [types.ts:638](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L638)

A list of kanji used in the kanji forms

***

### kanjiForms?

> `optional` **kanjiForms**: [`KanjiForm`](KanjiForm.md)[]

Defined in: [types.ts:634](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L634)

The word kanji forms

***

### noteID?

> `readonly` `optional` **noteID**: `` `word_${string}` ``

Defined in: [types.ts:376](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L376)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:384](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L384)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### phrases?

> `optional` **phrases**: [`Phrase`](Phrase.md)[]

Defined in: [types.ts:642](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L642)

Phrases associated to the word

***

### readings

> **readings**: [`Reading`](Reading.md)[]

Defined in: [types.ts:626](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L626)

The word readings (in kana)

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:392](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L392)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### translations?

> `optional` **translations**: [`Translation`](Translation.md)[]

Defined in: [types.ts:630](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L630)

The word translations/senses

***

### usuallyInKana?

> `optional` **usuallyInKana**: `true`

Defined in: [types.ts:650](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L650)

#### See

[DictWord.usuallyInKana](DictWord.md#usuallyinkana)
