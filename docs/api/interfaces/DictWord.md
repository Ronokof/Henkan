[**henkan**](../README.md)

***

[henkan](../README.md) / DictWord

# Interface: DictWord

Defined in: [types.ts:191](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L191)

JMdict entry (word)

Equivalent to the `entry` JMdict element + miscellaneous info

## Properties

### hasPhrases?

> `optional` **hasPhrases**: `true`

Defined in: [types.ts:223](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L223)

Whether or not the entry has at least one Tanaka Corpus phrase associated with it

**May not always be accurate**

***

### id

> `readonly` **id**: `` `${number}` ``

Defined in: [types.ts:195](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L195)

The entry sequence number

***

### isCommon?

> `optional` **isCommon**: `true`

Defined in: [types.ts:211](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L211)

Whether or not the entry has a priority tag (`k_pri` or `r_pri`)

***

### kanjiForms?

> `optional` **kanjiForms**: [`DictKanjiForm`](DictKanjiForm.md)[]

Defined in: [types.ts:207](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L207)

The word's kanji forms

***

### meanings

> **meanings**: [`DictMeaning`](DictMeaning.md)[]

Defined in: [types.ts:203](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L203)

The word's meanings/senses

***

### readings

> **readings**: [`DictReading`](DictReading.md)[]

Defined in: [types.ts:199](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L199)

The word's readings

***

### usuallyInKana?

> `optional` **usuallyInKana**: `true`

Defined in: [types.ts:217](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L217)

Whether or not the word is typically written in kana alone

Set to `true` only if the word is usually written in kana for all word senses.
