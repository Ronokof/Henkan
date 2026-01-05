[**henkan**](../README.md)

***

[henkan](../README.md) / Definition

# Interface: Definition

Defined in: [types.ts:531](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L531)

A word definition

## Properties

### definition

> **definition**: `string`

Defined in: [types.ts:535](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L535)

The definition

***

### furigana?

> `optional` **furigana**: `string`

Defined in: [types.ts:539](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L539)

The definition with furigana attached

***

### mayNotBeAccurate?

> `optional` **mayNotBeAccurate**: `1` \| `2`

Defined in: [types.ts:547](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L547)

Whether or not the definition is associated with other words

- `undefined` - accurate
- `1` - maybe inaccurate
- `2` - most likely inaccurate
