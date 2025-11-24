[**henkan**](../README.md)

***

[henkan](../README.md) / DictWord

# Interface: DictWord

Defined in: [types.ts:125](https://github.com/Ronokof/Henkan/blob/509701feced30c3685817fc5852353b86cc93a16/src/types.ts#L125)

JMdict entry (word)

Equivalent to the `entry` JMdict element + miscellaneous info

## Properties

### hasPhrases?

> `optional` **hasPhrases**: `true`

Defined in: [types.ts:157](https://github.com/Ronokof/Henkan/blob/509701feced30c3685817fc5852353b86cc93a16/src/types.ts#L157)

Whether or not the entry has at least one Tanaka Corpus phrase associated with it

**May not always be accurate** (It may only be `true` incorrectly. If it is `undefined`, the report is 100% correct.)

***

### id

> `readonly` **id**: `string`

Defined in: [types.ts:129](https://github.com/Ronokof/Henkan/blob/509701feced30c3685817fc5852353b86cc93a16/src/types.ts#L129)

The entry sequence number

***

### isCommon?

> `optional` **isCommon**: `true`

Defined in: [types.ts:145](https://github.com/Ronokof/Henkan/blob/509701feced30c3685817fc5852353b86cc93a16/src/types.ts#L145)

Whether or not the entry has a priority tag (`k_pri` or `r_pri`)

***

### kanjiForms?

> `optional` **kanjiForms**: [`DictKanjiForm`](DictKanjiForm.md)[]

Defined in: [types.ts:133](https://github.com/Ronokof/Henkan/blob/509701feced30c3685817fc5852353b86cc93a16/src/types.ts#L133)

The word's kanji forms

***

### meanings

> **meanings**: [`DictMeaning`](DictMeaning.md)[]

Defined in: [types.ts:141](https://github.com/Ronokof/Henkan/blob/509701feced30c3685817fc5852353b86cc93a16/src/types.ts#L141)

The word's meanings/senses

***

### readings

> **readings**: [`DictReading`](DictReading.md)[]

Defined in: [types.ts:137](https://github.com/Ronokof/Henkan/blob/509701feced30c3685817fc5852353b86cc93a16/src/types.ts#L137)

The word's readings

***

### usuallyInKana?

> `optional` **usuallyInKana**: `true`

Defined in: [types.ts:151](https://github.com/Ronokof/Henkan/blob/509701feced30c3685817fc5852353b86cc93a16/src/types.ts#L151)

Whether or not the word is typically written in kana alone

Set to `true` only if the word is usually written in kana for all word senses.
