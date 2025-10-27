[**henkan**](../README.md)

***

[henkan](../README.md) / Kanji

# Interface: Kanji

Defined in: [types.ts:458](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L458)

Kanji information

Converted from [DictKanji](DictKanji.md) and extra info added

## Extends

- [`ResultEntry`](ResultEntry.md)\<`"kanji"`\>

## Properties

### components?

> `optional` **components**: [`KanjiComponent`](KanjiComponent.md)[]

Defined in: [types.ts:490](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L490)

The kanji radicals/components

***

### deckPath?

> `optional` **deckPath**: `string`

Defined in: [types.ts:376](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L376)

The full path of the Anki deck

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`deckPath`](ResultEntry.md#deckpath)

***

### doNotCreateNote?

> `optional` **doNotCreateNote**: `true`

Defined in: [types.ts:384](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L384)

Whether or not this entry should be converted into an Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`doNotCreateNote`](ResultEntry.md#donotcreatenote)

***

### frequency?

> `optional` **frequency**: `string`

Defined in: [types.ts:506](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L506)

#### See

[DictKanjiMisc.frequency](DictKanjiMisc.md#frequency)

***

### fromJpdb?

> `optional` **fromJpdb**: `true`

Defined in: [types.ts:514](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L514)

Whether or not this kanji object contains information **only** from `jpdb.io`

***

### grade?

> `optional` **grade**: `string`

Defined in: [types.ts:502](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L502)

#### See

[DictKanjiMisc.grade](DictKanjiMisc.md#grade)

***

### id?

> `readonly` `optional` **id**: `string`

Defined in: [types.ts:368](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L368)

ID used for the Anki note ID

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`id`](ResultEntry.md#id)

***

### kanji

> `readonly` **kanji**: `string`

Defined in: [types.ts:462](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L462)

#### See

[DictKanji.kanji](DictKanji.md#kanji)

***

### kunyomi?

> `optional` **kunyomi**: `string`[]

Defined in: [types.ts:478](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L478)

The kanji kunyomi readings

***

### meanings?

> `optional` **meanings**: `string`[]

Defined in: [types.ts:470](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L470)

#### See

[DictKanjiReadingMeaningGroup.meanings](DictKanjiReadingMeaningGroup.md#meanings)

***

### mnemonic?

> `optional` **mnemonic**: `string`

Defined in: [types.ts:494](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L494)

The kanji mnemonic

***

### nanori?

> `optional` **nanori**: `string`[]

Defined in: [types.ts:482](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L482)

#### See

[DictKanjiReadingMeaning.nanori](DictKanjiReadingMeaning.md#nanori)

***

### noteID?

> `readonly` `optional` **noteID**: `` `kanji_${string}` ``

Defined in: [types.ts:364](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L364)

ID used for the resulting Anki note

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteID`](ResultEntry.md#noteid)

***

### noteTypeName?

> `optional` **noteTypeName**: `string`

Defined in: [types.ts:372](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L372)

Anki note type name

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`noteTypeName`](ResultEntry.md#notetypename)

***

### onyomi?

> `optional` **onyomi**: `string`[]

Defined in: [types.ts:474](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L474)

The kanji onyomi readings

***

### source?

> `optional` **source**: `string`

Defined in: [types.ts:510](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L510)

The source (besides KANJIDIC) from which data for this kanji has been extracted

***

### strokes?

> `optional` **strokes**: `string`

Defined in: [types.ts:466](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L466)

#### See

[DictKanjiMisc.strokeNumber](DictKanjiMisc.md#strokenumber)

***

### svg?

> `optional` **svg**: `string`

Defined in: [types.ts:486](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L486)

The kanji SVG filename

***

### tags?

> `optional` **tags**: `string`[]

Defined in: [types.ts:380](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L380)

Tags generated based on the entry's information

#### Inherited from

[`ResultEntry`](ResultEntry.md).[`tags`](ResultEntry.md#tags)

***

### words?

> `optional` **words**: [`Word`](Word.md)[]

Defined in: [types.ts:498](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L498)

Words that use the kanji
