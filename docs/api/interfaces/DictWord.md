[**henkan**](../README.md)

***

[henkan](../README.md) / DictWord

# Interface: DictWord

Defined in: [types.ts:172](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L172)

JMdict entry (word)

Equivalent to the `entry` JMdict element + miscellaneous info

## Properties

### hasPhrases?

> `optional` **hasPhrases**: `true`

Defined in: [types.ts:204](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L204)

Whether or not the entry has at least one Tanaka Corpus phrase associated with it

**May not always be accurate** (It may only be `true` incorrectly. If it is `undefined`, the report is 100% correct.)

***

### id

> `readonly` **id**: `` `${number}` ``

Defined in: [types.ts:176](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L176)

The entry sequence number

***

### isCommon?

> `optional` **isCommon**: `true`

Defined in: [types.ts:192](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L192)

Whether or not the entry has a priority tag (`k_pri` or `r_pri`)

***

### kanjiForms?

> `optional` **kanjiForms**: [`DictKanjiForm`](DictKanjiForm.md)[]

Defined in: [types.ts:180](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L180)

The word's kanji forms

***

### meanings

> **meanings**: [`DictMeaning`](DictMeaning.md)[]

Defined in: [types.ts:188](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L188)

The word's meanings/senses

***

### readings

> **readings**: [`DictReading`](DictReading.md)[]

Defined in: [types.ts:184](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L184)

The word's readings

***

### usuallyInKana?

> `optional` **usuallyInKana**: `true`

Defined in: [types.ts:198](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L198)

Whether or not the word is typically written in kana alone

Set to `true` only if the word is usually written in kana for all word senses.
