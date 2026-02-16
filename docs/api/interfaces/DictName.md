[**henkan**](../README.md)

***

[henkan](../README.md) / DictName

# Interface: DictName

Defined in: [types.ts:245](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L245)

JMnedict entry (name)

Equivalent to the `entry` JMnedict element

## Properties

### hasPhrases?

> `optional` **hasPhrases**: `true`

Defined in: [types.ts:271](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L271)

Whether or not the entry has at least one Tanaka Corpus phrase associated with it

**May not always be accurate**

***

### id

> `readonly` **id**: `` `${number}` ``

Defined in: [types.ts:249](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L249)

The entry sequence number

***

### isCommon?

> `optional` **isCommon**: `true`

Defined in: [types.ts:265](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L265)

Whether or not the entry has a priority tag (`k_pri` or `r_pri`)

***

### kanjiForms?

> `optional` **kanjiForms**: [`DictKanjiForm`](DictKanjiForm.md)[]

Defined in: [types.ts:261](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L261)

The name's kanji forms

***

### meanings

> **meanings**: [`NeDictMeaning`](NeDictMeaning.md)[]

Defined in: [types.ts:257](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L257)

The name's meanings/senses

***

### nameReadings

> **nameReadings**: [`DictReading`](DictReading.md)[]

Defined in: [types.ts:253](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L253)

The name's readings
