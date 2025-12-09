[**henkan**](../README.md)

***

[henkan](../README.md) / Kanji

# Interface: Kanji

Defined in: [types.ts:551](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L551)

Kanji information

Converted from [DictKanji](DictKanji.md) and extra info added

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kanji"`\>

## Properties

### components?

> `optional` **components**: [`KanjiComponent`](KanjiComponent.md)[]

Defined in: [types.ts:583](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L583)

The kanji radicals/components

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:447](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L447)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:455](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L455)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### frequency?

> `optional` **frequency**: `string`

Defined in: [types.ts:599](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L599)

#### See

[DictKanjiMisc.frequency](DictKanjiMisc.md#frequency)

***

### fromJpdb?

> `optional` **fromJpdb**: `true`

Defined in: [types.ts:611](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L611)

Whether or not this kanji object contains information **only** from `jpdb.io`

***

### grade?

> `optional` **grade**: `string`

Defined in: [types.ts:595](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L595)

#### See

[DictKanjiMisc.grade](DictKanjiMisc.md#grade)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:439](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L439)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:555](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L555)

#### See

[DictKanji.kanji](DictKanji.md#kanji)

***

### kokuji?

> `optional` **kokuji**: `true`

Defined in: [types.ts:603](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L603)

Whether or not the kanji is kokuji

***

### kunyomi?

> `optional` **kunyomi**: `string`[]

Defined in: [types.ts:571](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L571)

The kanji kunyomi readings

***

### meanings?

> `optional` **meanings**: `string`[]

Defined in: [types.ts:563](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L563)

#### See

[DictKanjiReadingMeaningGroup.meanings](DictKanjiReadingMeaningGroup.md#meanings)

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:587](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L587)

The kanji mnemonic

***

### nanori?

> `optional` **nanori**: `string`[]

Defined in: [types.ts:575](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L575)

#### See

[DictKanjiReadingMeaning.nanori](DictKanjiReadingMeaning.md#nanori)

***

### noteID?

> `readonly` `optional` **noteID**: `` `kanji_${string}` ``

Defined in: [types.ts:435](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L435)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:443](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L443)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### onyomi?

> `optional` **onyomi**: `string`[]

Defined in: [types.ts:567](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L567)

The kanji onyomi readings

***

### source?

> `optional` **source**: `string`

Defined in: [types.ts:607](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L607)

The source (besides KANJIDIC) from which data for this kanji has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:559](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L559)

#### See

[DictKanjiMisc.strokeNumber](DictKanjiMisc.md#strokenumber)

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:579](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L579)

The kanji SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:451](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L451)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### words?

> `optional` **words**: [`Word`](Word.md)[]

Defined in: [types.ts:591](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L591)

Words that use the kanji
