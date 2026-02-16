[**henkan**](../README.md)

***

[henkan](../README.md) / WordDefinitionPair

# Interface: WordDefinitionPair

Defined in: [types.ts:615](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L615)

A word paired with its definitions

## Properties

### definitions

> **definitions**: [`Definition`](Definition.md)[]

Defined in: [types.ts:623](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L623)

The word definitions

***

### wordForms?

> `optional` **wordForms**: `Set`\<`string`\>

Defined in: [types.ts:629](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L629)

The word's readings and/or kanji forms used when searching definitions.

**Used for final checks in case of inaccurate definitions; always deleted afterwards**

***

### wordID

> **wordID**: `` `${number}` ``

Defined in: [types.ts:619](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L619)

The word's JMdict entry ID
