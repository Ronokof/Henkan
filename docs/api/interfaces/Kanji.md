[**henkan**](../README.md)

***

[henkan](../README.md) / Kanji

# Interface: Kanji

Defined in: [types.ts:707](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L707)

Kanji information

Converted from [DictKanji](DictKanji.md) and extra info added

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kanji"`\>

## Properties

### components?

> `optional` **components**: [`KanjiComponent`](KanjiComponent.md)[]

Defined in: [types.ts:739](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L739)

The kanji radicals/components

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:603](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L603)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:611](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L611)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### externalInfo?

> `optional` **externalInfo**: `true`

Defined in: [types.ts:771](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L771)

Whether or not this kanji object contains information extracted from [source](#source)

***

### frequency?

> `optional` **frequency**: `string`

Defined in: [types.ts:755](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L755)

#### See

[DictKanjiMisc.frequency](DictKanjiMisc.md#frequency)

***

### grade?

> `optional` **grade**: `string`

Defined in: [types.ts:751](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L751)

#### See

[DictKanjiMisc.grade](DictKanjiMisc.md#grade)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:595](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L595)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### jlpt?

> `optional` **jlpt**: [`JLPT`](../type-aliases/JLPT.md)

Defined in: [types.ts:759](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L759)

#### See

[DictKanjiMisc.jlpt](DictKanjiMisc.md#jlpt)

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:711](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L711)

#### See

[DictKanji.kanji](DictKanji.md#kanji)

***

### kokuji?

> `optional` **kokuji**: `true`

Defined in: [types.ts:763](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L763)

Whether or not the kanji is a kokuji

***

### kunyomi?

> `optional` **kunyomi**: `string`[]

Defined in: [types.ts:727](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L727)

The kanji kunyomi readings

***

### meanings?

> `optional` **meanings**: `string`[]

Defined in: [types.ts:719](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L719)

#### See

[DictKanjiReadingMeaningGroup.meanings](DictKanjiReadingMeaningGroup.md#meanings)

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:743](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L743)

The kanji mnemonic

***

### nanori?

> `optional` **nanori**: `string`[]

Defined in: [types.ts:731](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L731)

#### See

[DictKanjiReadingMeaning.nanori](DictKanjiReadingMeaning.md#nanori)

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:591](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L591)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:599](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L599)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### onyomi?

> `optional` **onyomi**: `string`[]

Defined in: [types.ts:723](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L723)

The kanji onyomi readings

***

### source?

> `optional` **source**: `string`

Defined in: [types.ts:767](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L767)

The source (besides KANJIDIC) from which data for this kanji has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:715](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L715)

#### See

[DictKanjiMisc.strokeNumber](DictKanjiMisc.md#strokenumber)

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:735](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L735)

The kanji SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:607](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L607)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### words?

> `optional` **words**: [`Word`](Word.md)[]

Defined in: [types.ts:747](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L747)

Words that use the kanji
