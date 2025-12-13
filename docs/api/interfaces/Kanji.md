[**henkan**](../README.md)

***

[henkan](../README.md) / Kanji

# Interface: Kanji

Defined in: [types.ts:619](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L619)

Kanji information

Converted from [DictKanji](DictKanji.md) and extra info added

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kanji"`\>

## Properties

### components?

> `optional` **components**: [`KanjiComponent`](KanjiComponent.md)[]

Defined in: [types.ts:651](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L651)

The kanji radicals/components

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:515](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L515)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:523](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L523)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### frequency?

> `optional` **frequency**: `string`

Defined in: [types.ts:667](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L667)

#### See

[DictKanjiMisc.frequency](DictKanjiMisc.md#frequency)

***

### fromJpdb?

> `optional` **fromJpdb**: `true`

Defined in: [types.ts:683](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L683)

Whether or not this kanji object contains information **only** from `jpdb.io`

***

### grade?

> `optional` **grade**: `string`

Defined in: [types.ts:663](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L663)

#### See

[DictKanjiMisc.grade](DictKanjiMisc.md#grade)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:507](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L507)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### jlpt?

> `optional` **jlpt**: [`JLPT`](../type-aliases/JLPT.md)

Defined in: [types.ts:671](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L671)

#### See

[DictKanjiMisc.jlpt](DictKanjiMisc.md#jlpt)

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:623](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L623)

#### See

[DictKanji.kanji](DictKanji.md#kanji)

***

### kokuji?

> `optional` **kokuji**: `true`

Defined in: [types.ts:675](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L675)

Whether or not the kanji is kokuji

***

### kunyomi?

> `optional` **kunyomi**: `string`[]

Defined in: [types.ts:639](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L639)

The kanji kunyomi readings

***

### meanings?

> `optional` **meanings**: `string`[]

Defined in: [types.ts:631](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L631)

#### See

[DictKanjiReadingMeaningGroup.meanings](DictKanjiReadingMeaningGroup.md#meanings)

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:655](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L655)

The kanji mnemonic

***

### nanori?

> `optional` **nanori**: `string`[]

Defined in: [types.ts:643](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L643)

#### See

[DictKanjiReadingMeaning.nanori](DictKanjiReadingMeaning.md#nanori)

***

### noteID?

> `readonly` `optional` **noteID**: `` `kanji_${string}` ``

Defined in: [types.ts:503](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L503)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:511](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L511)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### onyomi?

> `optional` **onyomi**: `string`[]

Defined in: [types.ts:635](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L635)

The kanji onyomi readings

***

### source?

> `optional` **source**: `string`

Defined in: [types.ts:679](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L679)

The source (besides KANJIDIC) from which data for this kanji has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:627](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L627)

#### See

[DictKanjiMisc.strokeNumber](DictKanjiMisc.md#strokenumber)

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:647](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L647)

The kanji SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:519](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L519)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### words?

> `optional` **words**: [`Word`](Word.md)[]

Defined in: [types.ts:659](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L659)

Words that use the kanji
