[**henkan**](../README.md)

***

[henkan](../README.md) / WordDefinitionPair

# Interface: WordDefinitionPair

Defined in: [types.ts:553](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L553)

A word paired with its definitions

## Properties

### definitions

> **definitions**: [`Definition`](Definition.md)[]

Defined in: [types.ts:561](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L561)

The word definitions

***

### wordForms?

> `optional` **wordForms**: `Set`\<`string`\>

Defined in: [types.ts:567](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L567)

The word's readings and/or kanji forms used when searching definitions.

**Used for final checks in case of inaccurate definitions; always deleted afterwards**

***

### wordID

> **wordID**: `` `${number}` ``

Defined in: [types.ts:557](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L557)

The word's JMdict entry ID
