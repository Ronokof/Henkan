[**henkan**](../README.md)

***

[henkan](../README.md) / Definition

# Interface: Definition

Defined in: [types.ts:593](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L593)

A word definition

## Properties

### definition

> **definition**: `string`

Defined in: [types.ts:597](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L597)

The definition

***

### furigana?

> `optional` **furigana**: `string`

Defined in: [types.ts:601](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L601)

The definition with furigana attached

***

### mayNotBeAccurate?

> `optional` **mayNotBeAccurate**: `1` \| `2`

Defined in: [types.ts:609](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L609)

Whether or not the definition is associated with other words

- `undefined` - accurate
- `1` - maybe inaccurate
- `2` - most likely inaccurate
