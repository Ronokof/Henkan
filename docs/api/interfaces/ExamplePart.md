[**henkan**](../README.md)

***

[henkan](../README.md) / ExamplePart

# Interface: ExamplePart

Defined in: [types.ts:279](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L279)

A word/part from the `B` section of a Tanaka Corpus `examples.utf` entry

## Properties

### baseForm

> **baseForm**: `string`

Defined in: [types.ts:283](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L283)

The common form in which the word is found in JMdict

***

### edited?

> `optional` **edited**: `true`

Defined in: [types.ts:307](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L307)

Whether or not the word is part of an entry that has been edited and adapted

[https://www.edrdg.org/wiki/Tanaka\_Corpus.html#Subset](https://www.edrdg.org/wiki/Tanaka_Corpus.html#Subset)

[https://www.edrdg.org/wiki/Tanaka\_Corpus.html#Initial\_Modifications\_to\_the\_Corpus](https://www.edrdg.org/wiki/Tanaka_Corpus.html#Initial_Modifications_to_the_Corpus)

***

### glossNumber?

> `optional` **glossNumber**: `number`

Defined in: [types.ts:291](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L291)

The JMdict sense number corresponding to the word’s usage in the phrase

***

### inflectedForm?

> `optional` **inflectedForm**: `string`

Defined in: [types.ts:295](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L295)

The actual form in which the word is used in the phrase

***

### reading?

> `optional` **reading**: `string`

Defined in: [types.ts:287](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L287)

The reading (in kana) of the word

***

### referenceID?

> `optional` **referenceID**: `string`

Defined in: [types.ts:299](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L299)

A sequence number that references a JMdict entry associated with the word
