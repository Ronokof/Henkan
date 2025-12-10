[**henkan**](../README.md)

***

[henkan](../README.md) / DictWord

# Interface: DictWord

Defined in: [types.ts:131](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L131)

JMdict entry (word)

Equivalent to the `entry` JMdict element + miscellaneous info

## Properties

### hasPhrases?

> `optional` **hasPhrases**: `true`

Defined in: [types.ts:163](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L163)

Whether or not the entry has at least one Tanaka Corpus phrase associated with it

**May not always be accurate** (It may only be `true` incorrectly. If it is `undefined`, the report is 100% correct.)

***

### id

> `readonly` **id**: `string`

Defined in: [types.ts:135](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L135)

The entry sequence number

***

### isCommon?

> `optional` **isCommon**: `true`

Defined in: [types.ts:151](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L151)

Whether or not the entry has a priority tag (`k_pri` or `r_pri`)

***

### kanjiForms?

> `optional` **kanjiForms**: [`DictKanjiForm`](DictKanjiForm.md)[]

Defined in: [types.ts:139](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L139)

The word's kanji forms

***

### meanings

> **meanings**: [`DictMeaning`](DictMeaning.md)[]

Defined in: [types.ts:147](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L147)

The word's meanings/senses

***

### readings

> **readings**: [`DictReading`](DictReading.md)[]

Defined in: [types.ts:143](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L143)

The word's readings

***

### usuallyInKana?

> `optional` **usuallyInKana**: `true`

Defined in: [types.ts:157](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L157)

Whether or not the word is typically written in kana alone

Set to `true` only if the word is usually written in kana for all word senses.
