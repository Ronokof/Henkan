[**henkan**](../README.md)

***

[henkan](../README.md) / Kanji

# Interface: Kanji

Defined in: [types.ts:777](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L777)

Kanji information

Converted from [DictKanji](DictKanji.md) and extra info added

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kanji"`\>

## Properties

### components?

> `optional` **components**: [`KanjiComponent`](KanjiComponent.md)[]

Defined in: [types.ts:809](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L809)

The kanji radicals/components

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:673](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L673)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:681](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L681)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### externalInfo?

> `optional` **externalInfo**: `true`

Defined in: [types.ts:841](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L841)

Whether or not this kanji object contains information extracted from [source](#source)

***

### frequency?

> `optional` **frequency**: `string`

Defined in: [types.ts:825](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L825)

#### See

[DictKanjiMisc.frequency](DictKanjiMisc.md#frequency)

***

### grade?

> `optional` **grade**: `string`

Defined in: [types.ts:821](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L821)

#### See

[DictKanjiMisc.grade](DictKanjiMisc.md#grade)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:665](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L665)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### jlpt?

> `optional` **jlpt**: `` `N${number}` ``

Defined in: [types.ts:829](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L829)

#### See

[DictKanjiMisc.jlpt](DictKanjiMisc.md#jlpt)

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:781](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L781)

#### See

[DictKanji.kanji](DictKanji.md#kanji)

***

### kokuji?

> `optional` **kokuji**: `true`

Defined in: [types.ts:833](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L833)

Whether or not the kanji is a kokuji

***

### kunyomi?

> `optional` **kunyomi**: `string`[]

Defined in: [types.ts:797](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L797)

The kanji kunyomi readings

***

### meanings?

> `optional` **meanings**: `string`[]

Defined in: [types.ts:789](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L789)

#### See

[DictKanjiReadingMeaningGroup.meanings](DictKanjiReadingMeaningGroup.md#meanings)

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:813](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L813)

The kanji mnemonic

***

### nanori?

> `optional` **nanori**: `string`[]

Defined in: [types.ts:801](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L801)

#### See

[DictKanjiReadingMeaning.nanori](DictKanjiReadingMeaning.md#nanori)

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

### onyomi?

> `optional` **onyomi**: `string`[]

Defined in: [types.ts:793](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L793)

The kanji onyomi readings

***

### source?

> `optional` **source**: `string`

Defined in: [types.ts:837](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L837)

The source (besides KANJIDIC) from which data for this kanji has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:785](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L785)

#### See

[DictKanjiMisc.strokeNumber](DictKanjiMisc.md#strokenumber)

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:805](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L805)

The kanji SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:677](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L677)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### words?

> `optional` **words**: [`Word`](Word.md)[]

Defined in: [types.ts:817](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L817)

Words that use the kanji
