[**henkan**](../README.md)

***

[henkan](../README.md) / DictWord

# Interface: DictWord

Defined in: [types.ts:189](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L189)

JMdict entry (word)

Equivalent to the `entry` JMdict element + miscellaneous info

## Properties

### hasPhrases?

> `optional` **hasPhrases**: `true`

Defined in: [types.ts:221](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L221)

Whether or not the entry has at least one Tanaka Corpus phrase associated with it

**May not always be accurate**

***

### id

> `readonly` **id**: `` `${number}` ``

Defined in: [types.ts:193](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L193)

The entry sequence number

***

### isCommon?

> `optional` **isCommon**: `true`

Defined in: [types.ts:209](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L209)

Whether or not the entry has a priority tag (`k_pri` or `r_pri`)

***

### kanjiForms?

> `optional` **kanjiForms**: [`DictKanjiForm`](DictKanjiForm.md)[]

Defined in: [types.ts:205](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L205)

The word's kanji forms

***

### meanings

> **meanings**: [`DictMeaning`](DictMeaning.md)[]

Defined in: [types.ts:201](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L201)

The word's meanings/senses

***

### readings

> **readings**: [`DictReading`](DictReading.md)[]

Defined in: [types.ts:197](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L197)

The word's readings

***

### usuallyInKana?

> `optional` **usuallyInKana**: `true`

Defined in: [types.ts:215](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L215)

Whether or not the word is typically written in kana alone

Set to `true` only if the word is usually written in kana for all word senses.
