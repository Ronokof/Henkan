[**henkan**](../README.md)

***

[henkan](../README.md) / ExamplePart

# Interface: ExamplePart

Defined in: [types.ts:299](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L299)

A word/part from the `B` section of a Tanaka Corpus `examples.utf` entry

## Properties

### baseForm

> **baseForm**: `string`

Defined in: [types.ts:303](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L303)

The common form in which the word is found in JMdict

***

### edited?

> `optional` **edited**: `true`

Defined in: [types.ts:327](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L327)

Whether or not the word is part of an entry that has been edited and adapted

[https://www.edrdg.org/wiki/Tanaka\_Corpus.html#Subset](https://www.edrdg.org/wiki/Tanaka_Corpus.html#Subset)

[https://www.edrdg.org/wiki/Tanaka\_Corpus.html#Initial\_Modifications\_to\_the\_Corpus](https://www.edrdg.org/wiki/Tanaka_Corpus.html#Initial_Modifications_to_the_Corpus)

***

### glossNumber?

> `optional` **glossNumber**: `number`

Defined in: [types.ts:311](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L311)

The JMdict sense number corresponding to the word’s usage in the phrase

***

### inflectedForm?

> `optional` **inflectedForm**: `string`

Defined in: [types.ts:315](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L315)

The actual form in which the word is used in the phrase

***

### reading?

> `optional` **reading**: `string`

Defined in: [types.ts:307](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L307)

The reading (in kana) of the word

***

### referenceID?

> `optional` **referenceID**: `string`

Defined in: [types.ts:319](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/types.ts#L319)

A sequence number that references a JMdict entry associated with the word
