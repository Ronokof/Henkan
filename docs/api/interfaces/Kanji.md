[**henkan**](../README.md)

***

[henkan](../README.md) / Kanji

# Interface: Kanji

Defined in: [types.ts:494](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L494)

Kanji information

Converted from [DictKanji](DictKanji.md) and extra info added

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kanji"`\>

## Properties

### components?

> `optional` **components**: [`KanjiComponent`](KanjiComponent.md)[]

Defined in: [types.ts:526](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L526)

The kanji radicals/components

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:390](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L390)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:398](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L398)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### frequency?

> `optional` **frequency**: `string`

Defined in: [types.ts:542](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L542)

#### See

[DictKanjiMisc.frequency](DictKanjiMisc.md#frequency)

***

### fromJpdb?

> `optional` **fromJpdb**: `true`

Defined in: [types.ts:554](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L554)

Whether or not this kanji object contains information **only** from `jpdb.io`

***

### grade?

> `optional` **grade**: `string`

Defined in: [types.ts:538](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L538)

#### See

[DictKanjiMisc.grade](DictKanjiMisc.md#grade)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:382](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L382)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:498](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L498)

#### See

[DictKanji.kanji](DictKanji.md#kanji)

***

### kokuji?

> `optional` **kokuji**: `true`

Defined in: [types.ts:546](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L546)

Whether or not the kanji is kokuji

***

### kunyomi?

> `optional` **kunyomi**: `string`[]

Defined in: [types.ts:514](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L514)

The kanji kunyomi readings

***

### meanings?

> `optional` **meanings**: `string`[]

Defined in: [types.ts:506](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L506)

#### See

[DictKanjiReadingMeaningGroup.meanings](DictKanjiReadingMeaningGroup.md#meanings)

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:530](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L530)

The kanji mnemonic

***

### nanori?

> `optional` **nanori**: `string`[]

Defined in: [types.ts:518](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L518)

#### See

[DictKanjiReadingMeaning.nanori](DictKanjiReadingMeaning.md#nanori)

***

### noteID?

> `readonly` `optional` **noteID**: `` `kanji_${string}` ``

Defined in: [types.ts:378](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L378)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:386](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L386)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### onyomi?

> `optional` **onyomi**: `string`[]

Defined in: [types.ts:510](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L510)

The kanji onyomi readings

***

### source?

> `optional` **source**: `string`

Defined in: [types.ts:550](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L550)

The source (besides KANJIDIC) from which data for this kanji has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:502](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L502)

#### See

[DictKanjiMisc.strokeNumber](DictKanjiMisc.md#strokenumber)

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:522](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L522)

The kanji SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:394](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L394)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### words?

> `optional` **words**: [`Word`](Word.md)[]

Defined in: [types.ts:534](https://github.com/Ronokof/Henkan/blob/0df8f48bdb064749f6fed89de2c2e202bfe11258/src/types.ts#L534)

Words that use the kanji
