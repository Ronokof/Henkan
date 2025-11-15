[**henkan**](../README.md)

***

[henkan](../README.md) / convertJMdict

# Function: convertJMdict()

> **convertJMdict**(`xmlString`, `examples?`): [`DictWord`](../interfaces/DictWord.md)[]

Defined in: [utils.ts:123](https://github.com/Ronokof/Henkan/blob/80c90c83eed8648ae8f9dd394a3a2d82804ca248/src/utils.ts#L123)

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
