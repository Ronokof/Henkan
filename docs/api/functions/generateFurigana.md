[**henkan**](../README.md)

***

[henkan](../README.md) / generateFurigana

# Function: generateFurigana()

> **generateFurigana**(`text`, `bindedFunction`): `Promise`\<`string`\>

Defined in: [utils.ts:180](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L180)

Generates furigana for Japanese text.

This a workaround function for some cases in which text contains `・` and `Kuroshiro` fails to parse it.

## Parameters

### text

`string`

The text

### bindedFunction

(`text`, `options?`) => `Promise`\<`string`\>

The `Kuroshiro` convert function

## Returns

`Promise`\<`string`\>

The `<ruby>`-formatted furigana text
