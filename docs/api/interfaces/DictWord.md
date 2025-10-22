[**henkan**](../README.md)

***

[henkan](../README.md) / DictWord

# Interface: DictWord

Defined in: [types.ts:125](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L125)

JMdict entry (word)

Equivalent to the `entry` JMdict element

## Properties

### id

> `readonly` **id**: `string`

Defined in: [types.ts:129](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L129)

The entry sequence number

***

### kanjiForms?

> `optional` **kanjiForms**: [`DictKanjiForm`](DictKanjiForm.md)[]

Defined in: [types.ts:133](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L133)

The word's kanji forms

***

### meanings

> **meanings**: [`DictMeaning`](DictMeaning.md)[]

Defined in: [types.ts:141](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L141)

The word's meanings/senses

***

### readings

> **readings**: [`DictReading`](DictReading.md)[]

Defined in: [types.ts:137](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L137)

The word's readings
