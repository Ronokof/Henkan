[**henkan**](../README.md)

***

[henkan](../README.md) / DictWord

# Interface: DictWord

Defined in: [types.ts:125](https://github.com/Ronokof/Henkan/blob/f4500fde04f63f25dbe164e82d88b3a6be2b7ee1/src/types.ts#L125)

JMdict entry (word)

Equivalent to the `entry` JMdict element

## Properties

### hasPhrases?

> `optional` **hasPhrases**: `true`

Defined in: [types.ts:151](https://github.com/Ronokof/Henkan/blob/f4500fde04f63f25dbe164e82d88b3a6be2b7ee1/src/types.ts#L151)

Whether or not the entry has at least one Tanaka Corpus phrase associated with it

**May not always be accurate** (It may only be `true` incorrectly. If it is `undefined`, the report is 100% correct.)

***

### id

> `readonly` **id**: `string`

Defined in: [types.ts:129](https://github.com/Ronokof/Henkan/blob/f4500fde04f63f25dbe164e82d88b3a6be2b7ee1/src/types.ts#L129)

The entry sequence number

***

### isCommon?

> `optional` **isCommon**: `true`

Defined in: [types.ts:145](https://github.com/Ronokof/Henkan/blob/f4500fde04f63f25dbe164e82d88b3a6be2b7ee1/src/types.ts#L145)

Whether or not the entry has a priority tag (`k_pri` or `r_pri`)

***

### kanjiForms?

> `optional` **kanjiForms**: [`DictKanjiForm`](DictKanjiForm.md)[]

Defined in: [types.ts:133](https://github.com/Ronokof/Henkan/blob/f4500fde04f63f25dbe164e82d88b3a6be2b7ee1/src/types.ts#L133)

The word's kanji forms

***

### meanings

> **meanings**: [`DictMeaning`](DictMeaning.md)[]

Defined in: [types.ts:141](https://github.com/Ronokof/Henkan/blob/f4500fde04f63f25dbe164e82d88b3a6be2b7ee1/src/types.ts#L141)

The word's meanings/senses

***

### readings

> **readings**: [`DictReading`](DictReading.md)[]

Defined in: [types.ts:137](https://github.com/Ronokof/Henkan/blob/f4500fde04f63f25dbe164e82d88b3a6be2b7ee1/src/types.ts#L137)

The word's readings
