[**henkan**](../README.md)

***

[henkan](../README.md) / Kanji

# Interface: Kanji

Defined in: [types.ts:701](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L701)

Kanji information

Converted from [DictKanji](DictKanji.md) and extra info added

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kanji"`\>

## Properties

### components?

> `optional` **components**: [`KanjiComponent`](KanjiComponent.md)[]

Defined in: [types.ts:733](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L733)

The kanji radicals/components

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:597](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L597)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:605](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L605)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### externalInfo?

> `optional` **externalInfo**: `true`

Defined in: [types.ts:765](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L765)

Whether or not this kanji object contains information extracted from [source](#source)

***

### frequency?

> `optional` **frequency**: `string`

Defined in: [types.ts:749](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L749)

#### See

[DictKanjiMisc.frequency](DictKanjiMisc.md#frequency)

***

### grade?

> `optional` **grade**: `string`

Defined in: [types.ts:745](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L745)

#### See

[DictKanjiMisc.grade](DictKanjiMisc.md#grade)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:589](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L589)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### jlpt?

> `optional` **jlpt**: [`JLPT`](../type-aliases/JLPT.md)

Defined in: [types.ts:753](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L753)

#### See

[DictKanjiMisc.jlpt](DictKanjiMisc.md#jlpt)

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:705](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L705)

#### See

[DictKanji.kanji](DictKanji.md#kanji)

***

### kokuji?

> `optional` **kokuji**: `true`

Defined in: [types.ts:757](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L757)

Whether or not the kanji is a kokuji

***

### kunyomi?

> `optional` **kunyomi**: `string`[]

Defined in: [types.ts:721](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L721)

The kanji kunyomi readings

***

### meanings?

> `optional` **meanings**: `string`[]

Defined in: [types.ts:713](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L713)

#### See

[DictKanjiReadingMeaningGroup.meanings](DictKanjiReadingMeaningGroup.md#meanings)

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:737](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L737)

The kanji mnemonic

***

### nanori?

> `optional` **nanori**: `string`[]

Defined in: [types.ts:725](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L725)

#### See

[DictKanjiReadingMeaning.nanori](DictKanjiReadingMeaning.md#nanori)

***

### noteID?

> `optional` **noteID**: `string`

Defined in: [types.ts:585](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L585)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:593](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L593)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### onyomi?

> `optional` **onyomi**: `string`[]

Defined in: [types.ts:717](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L717)

The kanji onyomi readings

***

### source?

> `optional` **source**: `string`

Defined in: [types.ts:761](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L761)

The source (besides KANJIDIC) from which data for this kanji has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:709](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L709)

#### See

[DictKanjiMisc.strokeNumber](DictKanjiMisc.md#strokenumber)

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:729](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L729)

The kanji SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:601](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L601)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### words?

> `optional` **words**: [`Word`](Word.md)[]

Defined in: [types.ts:741](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L741)

Words that use the kanji
