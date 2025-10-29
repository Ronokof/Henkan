[**henkan**](../README.md)

***

[henkan](../README.md) / Kanji

# Interface: Kanji

Defined in: [types.ts:476](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L476)

Kanji information

Converted from [DictKanji](DictKanji.md) and extra info added

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kanji"`\>

## Properties

### components?

> `optional` **components**: [`KanjiComponent`](KanjiComponent.md)[]

Defined in: [types.ts:508](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L508)

The kanji radicals/components

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:380](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L380)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:388](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L388)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### frequency?

> `optional` **frequency**: `string`

Defined in: [types.ts:524](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L524)

#### See

[DictKanjiMisc.frequency](DictKanjiMisc.md#frequency)

***

### fromJpdb?

> `optional` **fromJpdb**: `true`

Defined in: [types.ts:536](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L536)

Whether or not this kanji object contains information **only** from `jpdb.io`

***

### grade?

> `optional` **grade**: `string`

Defined in: [types.ts:520](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L520)

#### See

[DictKanjiMisc.grade](DictKanjiMisc.md#grade)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:372](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L372)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:480](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L480)

#### See

[DictKanji.kanji](DictKanji.md#kanji)

***

### kokuji?

> `optional` **kokuji**: `true`

Defined in: [types.ts:528](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L528)

Whether or not the kanji is kokuji

***

### kunyomi?

> `optional` **kunyomi**: `string`[]

Defined in: [types.ts:496](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L496)

The kanji kunyomi readings

***

### meanings?

> `optional` **meanings**: `string`[]

Defined in: [types.ts:488](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L488)

#### See

[DictKanjiReadingMeaningGroup.meanings](DictKanjiReadingMeaningGroup.md#meanings)

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:512](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L512)

The kanji mnemonic

***

### nanori?

> `optional` **nanori**: `string`[]

Defined in: [types.ts:500](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L500)

#### See

[DictKanjiReadingMeaning.nanori](DictKanjiReadingMeaning.md#nanori)

***

### noteID?

> `readonly` `optional` **noteID**: `` `kanji_${string}` ``

Defined in: [types.ts:368](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L368)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:376](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L376)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### onyomi?

> `optional` **onyomi**: `string`[]

Defined in: [types.ts:492](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L492)

The kanji onyomi readings

***

### source?

> `optional` **source**: `string`

Defined in: [types.ts:532](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L532)

The source (besides KANJIDIC) from which data for this kanji has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:484](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L484)

#### See

[DictKanjiMisc.strokeNumber](DictKanjiMisc.md#strokenumber)

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:504](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L504)

The kanji SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:384](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L384)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### words?

> `optional` **words**: [`Word`](Word.md)[]

Defined in: [types.ts:516](https://github.com/Ronokof/Henkan/blob/0242f1c5122d344151cda089e111ebb217d29eb9/src/types.ts#L516)

Words that use the kanji
