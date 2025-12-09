[**henkan**](../README.md)

***

[henkan](../README.md) / ExamplePart

# Interface: ExamplePart

Defined in: [types.ts:305](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L305)

A word/part from the `B` section of a Tanaka Corpus `examples.utf` entry

## Properties

### baseForm

> **baseForm**: `string`

Defined in: [types.ts:309](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L309)

The common form in which the word is found in JMdict

***

### edited?

> `optional` **edited**: `true`

Defined in: [types.ts:333](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L333)

Whether or not the word is part of an entry that has been edited and adapted

[https://www.edrdg.org/wiki/Tanaka\_Corpus.html#Subset](https://www.edrdg.org/wiki/Tanaka_Corpus.html#Subset)

[https://www.edrdg.org/wiki/Tanaka\_Corpus.html#Initial\_Modifications\_to\_the\_Corpus](https://www.edrdg.org/wiki/Tanaka_Corpus.html#Initial_Modifications_to_the_Corpus)

***

### glossNumber?

> `optional` **glossNumber**: `number`

Defined in: [types.ts:317](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L317)

The JMdict sense number corresponding to the word’s usage in the phrase

***

### inflectedForm?

> `optional` **inflectedForm**: `string`

Defined in: [types.ts:321](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L321)

The actual form in which the word is used in the phrase

***

### reading?

> `optional` **reading**: `string`

Defined in: [types.ts:313](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L313)

The reading (in kana) of the word

***

### referenceID?

> `optional` **referenceID**: `string`

Defined in: [types.ts:325](https://github.com/Ronokof/Henkan/blob/ce374b7e2b0828c4af4955d9fe995f8c548c2fd2/src/types.ts#L325)

A sequence number that references a JMdict entry associated with the word
