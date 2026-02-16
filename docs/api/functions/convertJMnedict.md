[**henkan**](../README.md)

***

[henkan](../README.md) / convertJMnedict

# Function: convertJMnedict()

> **convertJMnedict**(`xmlString`, `examples?`): [`DictName`](../interfaces/DictName.md)[]

Defined in: [utils.ts:473](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L473)

Converts a JMnedict `JMnedict.xml` file into an array of [DictWord](../interfaces/DictWord.md) objects.

## Parameters

### xmlString

`string`

The raw `JMnedict.xml` file contents

### examples?

readonly [`TanakaExample`](../interfaces/TanakaExample.md)[]

An array of converted `Tanaka Corpus` examples

## Returns

[`DictName`](../interfaces/DictName.md)[]

An array of converted [DictWord](../interfaces/DictWord.md) objects
