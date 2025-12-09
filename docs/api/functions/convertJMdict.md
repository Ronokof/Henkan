[**henkan**](../README.md)

***

[henkan](../README.md) / convertJMdict

# Function: convertJMdict()

> **convertJMdict**(`xmlString`, `examples?`): [`DictWord`](../interfaces/DictWord.md)[]

Defined in: [utils.ts:122](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/utils.ts#L122)

Converts a JMdict `JMdict_e` file into an array of [DictWord](../interfaces/DictWord.md) objects.

## Parameters

### xmlString

`string`

The raw `JMdict_e` file contents

### examples?

[`TanakaExample`](../interfaces/TanakaExample.md)[]

An array of converted `Tanaka Corpus` examples

## Returns

[`DictWord`](../interfaces/DictWord.md)[]

An array of converted [DictWord](../interfaces/DictWord.md) objects
