[**henkan**](../README.md)

***

[henkan](../README.md) / Kanji

# Interface: Kanji

Defined in: types.ts:444

Kanji information

Converted from [DictKanji](DictKanji.md) and extra info added

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kanji"`\>

## Properties

### components?

> `optional` **components**: [`KanjiComponent`](KanjiComponent.md)[]

Defined in: types.ts:476

The kanji radicals/components

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: types.ts:366

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### frequency?

> `optional` **frequency**: `string`

Defined in: types.ts:492

#### See

[DictKanjiMisc.frequency](DictKanjiMisc.md#frequency)

***

### fromJpdb?

> `optional` **fromJpdb**: `true`

Defined in: types.ts:500

Whether or not this kanji object contains information **only** from `jpdb.io`

***

### grade?

> `optional` **grade**: `string`

Defined in: types.ts:488

#### See

[DictKanjiMisc.grade](DictKanjiMisc.md#grade)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: types.ts:358

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji

> `readonly` **kanji**: `string`

Defined in: types.ts:448

#### See

[DictKanji.kanji](DictKanji.md#kanji)

***

### kunyomi?

> `optional` **kunyomi**: `string`[]

Defined in: types.ts:464

The kanji kunyomi readings

***

### meanings?

> `optional` **meanings**: `string`[]

Defined in: types.ts:456

#### See

[DictKanjiReadingMeaningGroup.meanings](DictKanjiReadingMeaningGroup.md#meanings)

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: types.ts:480

The kanji mnemonic

***

### nanori?

> `optional` **nanori**: `string`[]

Defined in: types.ts:468

#### See

[DictKanjiReadingMeaning.nanori](DictKanjiReadingMeaning.md#nanori)

***

### noteID?

> `readonly` `optional` **noteID**: `` `kanji_${string}` ``

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

### onyomi?

> `optional` **onyomi**: `string`[]

Defined in: types.ts:460

The kanji onyomi readings

***

### source?

> `optional` **source**: `string`

Defined in: types.ts:496

The source (besides KANJIDIC) from which data for this kanji has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: types.ts:452

#### See

[DictKanjiMisc.strokeNumber](DictKanjiMisc.md#strokenumber)

***

### svg?

> `optional` **svg**: `string`

Defined in: types.ts:472

The kanji SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: types.ts:370

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### words?

> `optional` **words**: [`Word`](Word.md)[]

Defined in: types.ts:484

Words that use the kanji
