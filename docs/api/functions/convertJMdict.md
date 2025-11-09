[**henkan**](../README.md)

***

[henkan](../README.md) / convertJMdict

# Function: convertJMdict()

> **convertJMdict**(`xmlString`, `examples?`): [`DictWord`](../interfaces/DictWord.md)[]

Defined in: [utils.ts:123](https://github.com/Ronokof/Henkan/blob/f4500fde04f63f25dbe164e82d88b3a6be2b7ee1/src/utils.ts#L123)

Converts a JMdict `JMdict_e.xml`/`JMdict_e` file into an array of [DictWord](../interfaces/DictWord.md) objects.

## Parameters

### xmlString

`string`

The raw `JMdict_e.xml`/`JMdict_e` file contents

### examples?

[`TanakaExample`](../interfaces/TanakaExample.md)[]

An array of converted `Tanaka Corpus` examples

## Returns

[`DictWord`](../interfaces/DictWord.md)[]

An array of converted [DictWord](../interfaces/DictWord.md) objects
