[**henkan**](../README.md)

***

[henkan](../README.md) / Kanji

# Interface: Kanji

Defined in: [types.ts:512](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L512)

Kanji information

Converted from [DictKanji](DictKanji.md) and extra info added

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kanji"`\>

## Properties

### components?

> `optional` **components**: [`KanjiComponent`](KanjiComponent.md)[]

Defined in: [types.ts:544](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L544)

The kanji radicals/components

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:408](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L408)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:416](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L416)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### frequency?

> `optional` **frequency**: `string`

Defined in: [types.ts:560](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L560)

#### See

[DictKanjiMisc.frequency](DictKanjiMisc.md#frequency)

***

### fromJpdb?

> `optional` **fromJpdb**: `true`

Defined in: [types.ts:572](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L572)

Whether or not this kanji object contains information **only** from `jpdb.io`

***

### grade?

> `optional` **grade**: `string`

Defined in: [types.ts:556](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L556)

#### See

[DictKanjiMisc.grade](DictKanjiMisc.md#grade)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:400](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L400)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:516](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L516)

#### See

[DictKanji.kanji](DictKanji.md#kanji)

***

### kokuji?

> `optional` **kokuji**: `true`

Defined in: [types.ts:564](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L564)

Whether or not the kanji is kokuji

***

### kunyomi?

> `optional` **kunyomi**: `string`[]

Defined in: [types.ts:532](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L532)

The kanji kunyomi readings

***

### meanings?

> `optional` **meanings**: `string`[]

Defined in: [types.ts:524](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L524)

#### See

[DictKanjiReadingMeaningGroup.meanings](DictKanjiReadingMeaningGroup.md#meanings)

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:548](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L548)

The kanji mnemonic

***

### nanori?

> `optional` **nanori**: `string`[]

Defined in: [types.ts:536](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L536)

#### See

[DictKanjiReadingMeaning.nanori](DictKanjiReadingMeaning.md#nanori)

***

### noteID?

> `readonly` `optional` **noteID**: `` `kanji_${string}` ``

Defined in: [types.ts:396](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L396)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:404](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L404)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### onyomi?

> `optional` **onyomi**: `string`[]

Defined in: [types.ts:528](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L528)

The kanji onyomi readings

***

### source?

> `optional` **source**: `string`

Defined in: [types.ts:568](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L568)

The source (besides KANJIDIC) from which data for this kanji has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:520](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L520)

#### See

[DictKanjiMisc.strokeNumber](DictKanjiMisc.md#strokenumber)

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:540](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L540)

The kanji SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:412](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L412)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### words?

> `optional` **words**: [`Word`](Word.md)[]

Defined in: [types.ts:552](https://github.com/Ronokof/Henkan/blob/4452f7914507d8cee23233e7ae299d42b0bd957e/src/types.ts#L552)

Words that use the kanji
