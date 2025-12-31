[**henkan**](../README.md)

***

[henkan](../README.md) / Definition

# Interface: Definition

Defined in: [types.ts:533](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L533)

A word definition

## Properties

### definition

> **definition**: `string`

Defined in: [types.ts:537](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L537)

The definition

***

### furigana?

> `optional` **furigana**: `string`

Defined in: [types.ts:541](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L541)

The definition with furigana attached

***

### mayNotBeAccurate?

> `optional` **mayNotBeAccurate**: `1` \| `2`

Defined in: [types.ts:549](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L549)

Whether or not the definition is associated with other words

- `undefined` - accurate
- `1` - maybe inaccurate
- `2` - most likely inaccurate
