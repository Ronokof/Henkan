[**henkan**](../README.md)

***

[henkan](../README.md) / Kanji

# Interface: Kanji

Defined in: [types.ts:646](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L646)

Kanji information

Converted from [DictKanji](DictKanji.md) and extra info added

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kanji"`\>

## Properties

### components?

> `optional` **components**: [`KanjiComponent`](KanjiComponent.md)[]

Defined in: [types.ts:678](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L678)

The kanji radicals/components

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:542](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L542)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:550](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L550)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### externalInfo?

> `optional` **externalInfo**: `true`

Defined in: [types.ts:710](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L710)

Whether or not this kanji object contains information extracted from [source](#source)

***

### frequency?

> `optional` **frequency**: `string`

Defined in: [types.ts:694](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L694)

#### See

[DictKanjiMisc.frequency](DictKanjiMisc.md#frequency)

***

### grade?

> `optional` **grade**: `string`

Defined in: [types.ts:690](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L690)

#### See

[DictKanjiMisc.grade](DictKanjiMisc.md#grade)

***

### id?

> `optional` **id**: `` `${number}` ``

Defined in: [types.ts:534](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L534)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### jlpt?

> `optional` **jlpt**: [`JLPT`](../type-aliases/JLPT.md)

Defined in: [types.ts:698](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L698)

#### See

[DictKanjiMisc.jlpt](DictKanjiMisc.md#jlpt)

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:650](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L650)

#### See

[DictKanji.kanji](DictKanji.md#kanji)

***

### kokuji?

> `optional` **kokuji**: `true`

Defined in: [types.ts:702](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L702)

Whether or not the kanji is a kokuji

***

### kunyomi?

> `optional` **kunyomi**: `string`[]

Defined in: [types.ts:666](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L666)

The kanji kunyomi readings

***

### meanings?

> `optional` **meanings**: `string`[]

Defined in: [types.ts:658](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L658)

#### See

[DictKanjiReadingMeaningGroup.meanings](DictKanjiReadingMeaningGroup.md#meanings)

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:682](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L682)

The kanji mnemonic

***

### nanori?

> `optional` **nanori**: `string`[]

Defined in: [types.ts:670](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L670)

#### See

[DictKanjiReadingMeaning.nanori](DictKanjiReadingMeaning.md#nanori)

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

### onyomi?

> `optional` **onyomi**: `string`[]

Defined in: [types.ts:662](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L662)

The kanji onyomi readings

***

### source?

> `optional` **source**: `string`

Defined in: [types.ts:706](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L706)

The source (besides KANJIDIC) from which data for this kanji has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:654](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L654)

#### See

[DictKanjiMisc.strokeNumber](DictKanjiMisc.md#strokenumber)

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:674](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L674)

The kanji SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:546](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L546)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### words?

> `optional` **words**: [`Word`](Word.md)[]

Defined in: [types.ts:686](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L686)

Words that use the kanji
