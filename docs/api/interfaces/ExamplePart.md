[**henkan**](../README.md)

***

[henkan](../README.md) / ExamplePart

# Interface: ExamplePart

Defined in: [types.ts:365](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L365)

A word/part from the `B` section of a Tanaka Corpus `examples.utf` entry

## Properties

### baseForm

> **baseForm**: `string`

Defined in: [types.ts:369](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L369)

The common form in which the word is found in JMdict

***

### edited?

> `optional` **edited**: `true`

Defined in: [types.ts:393](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L393)

Whether or not the word is part of an entry that has been edited and adapted

[https://www.edrdg.org/wiki/Tanaka\_Corpus.html#Subset](https://www.edrdg.org/wiki/Tanaka_Corpus.html#Subset)

[https://www.edrdg.org/wiki/Tanaka\_Corpus.html#Initial\_Modifications\_to\_the\_Corpus](https://www.edrdg.org/wiki/Tanaka_Corpus.html#Initial_Modifications_to_the_Corpus)

***

### glossNumber?

> `optional` **glossNumber**: `number`

Defined in: [types.ts:377](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L377)

The JMdict sense number corresponding to the word’s usage in the phrase

***

### inflectedForm?

> `optional` **inflectedForm**: `string`

Defined in: [types.ts:381](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L381)

The actual form in which the word is used in the phrase

***

### reading?

> `optional` **reading**: `string`

Defined in: [types.ts:373](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L373)

The reading (in kana) of the word

***

### referenceID?

> `optional` **referenceID**: `` `${number}` ``

Defined in: [types.ts:385](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L385)

A sequence number that references a JMdict entry associated with the word
