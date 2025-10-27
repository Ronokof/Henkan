[**henkan**](../README.md)

***

[henkan](../README.md) / convertJMdict

# Function: convertJMdict()

> **convertJMdict**(`xmlString`, `examples?`): [`DictWord`](../interfaces/DictWord.md)[]

Defined in: [utils.ts:122](https://github.com/Ronokof/Henkan/blob/52fe6d98746996eb6471b21af2a4100c9ce484cf/src/utils.ts#L122)

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
