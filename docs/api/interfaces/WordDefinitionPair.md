[**henkan**](../README.md)

***

[henkan](../README.md) / WordDefinitionPair

# Interface: WordDefinitionPair

Defined in: [types.ts:551](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L551)

A word paired with its definitions

## Properties

### definitions

> **definitions**: [`Definition`](Definition.md)[]

Defined in: [types.ts:559](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L559)

The word definitions

***

### wordForms?

> `optional` **wordForms**: `Set`\<`string`\>

Defined in: [types.ts:565](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L565)

The word's readings and/or kanji forms used when searching definitions.

**Used for final checks in case of inaccurate definitions; always deleted afterwards**

***

### wordID

> **wordID**: `` `${number}` ``

Defined in: [types.ts:555](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L555)

The word's JMdict entry ID
