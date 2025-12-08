[**henkan**](../README.md)

***

[henkan](../README.md) / Kanji

# Interface: Kanji

Defined in: [types.ts:550](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L550)

Kanji information

Converted from [DictKanji](DictKanji.md) and extra info added

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kanji"`\>

## Properties

### components?

> `optional` **components**: [`KanjiComponent`](KanjiComponent.md)[]

Defined in: [types.ts:582](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L582)

The kanji radicals/components

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:446](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L446)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:454](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L454)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### frequency?

> `optional` **frequency**: `string`

Defined in: [types.ts:598](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L598)

#### See

[DictKanjiMisc.frequency](DictKanjiMisc.md#frequency)

***

### fromJpdb?

> `optional` **fromJpdb**: `true`

Defined in: [types.ts:610](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L610)

Whether or not this kanji object contains information **only** from `jpdb.io`

***

### grade?

> `optional` **grade**: `string`

Defined in: [types.ts:594](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L594)

#### See

[DictKanjiMisc.grade](DictKanjiMisc.md#grade)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:438](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L438)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:554](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L554)

#### See

[DictKanji.kanji](DictKanji.md#kanji)

***

### kokuji?

> `optional` **kokuji**: `true`

Defined in: [types.ts:602](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L602)

Whether or not the kanji is kokuji

***

### kunyomi?

> `optional` **kunyomi**: `string`[]

Defined in: [types.ts:570](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L570)

The kanji kunyomi readings

***

### meanings?

> `optional` **meanings**: `string`[]

Defined in: [types.ts:562](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L562)

#### See

[DictKanjiReadingMeaningGroup.meanings](DictKanjiReadingMeaningGroup.md#meanings)

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:586](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L586)

The kanji mnemonic

***

### nanori?

> `optional` **nanori**: `string`[]

Defined in: [types.ts:574](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L574)

#### See

[DictKanjiReadingMeaning.nanori](DictKanjiReadingMeaning.md#nanori)

***

### noteID?

> `readonly` `optional` **noteID**: `` `kanji_${string}` ``

Defined in: [types.ts:434](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L434)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:442](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L442)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### onyomi?

> `optional` **onyomi**: `string`[]

Defined in: [types.ts:566](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L566)

The kanji onyomi readings

***

### source?

> `optional` **source**: `string`

Defined in: [types.ts:606](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L606)

The source (besides KANJIDIC) from which data for this kanji has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:558](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L558)

#### See

[DictKanjiMisc.strokeNumber](DictKanjiMisc.md#strokenumber)

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:578](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L578)

The kanji SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:450](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L450)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### words?

> `optional` **words**: [`Word`](Word.md)[]

Defined in: [types.ts:590](https://github.com/Ronokof/Henkan/blob/eb6cab9071cf58e880e98e4acb64a0e899f6eaec/src/types.ts#L590)

Words that use the kanji
