[**henkan**](../README.md)

***

[henkan](../README.md) / UsefulRegExps

# Interface: UsefulRegExps

Defined in: [types.ts:1027](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1027)

Some useful regular expressions

## Properties

### hiragana

> `readonly` **hiragana**: `RegExp`

Defined in: [types.ts:1031](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1031)

Matches any *hiragana* character(s)

***

### kanji

> `readonly` **kanji**: `RegExp`

Defined in: [types.ts:1039](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1039)

Matches any *kanji* character(s)

***

### katakana

> `readonly` **katakana**: `RegExp`

Defined in: [types.ts:1035](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1035)

Matches any *katakana* character(s)

***

### regExChars

> `readonly` **regExChars**: `RegExp`

Defined in: [types.ts:1043](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1043)

Matches any character that is part of the regex syntax

***

### tanakaID

> `readonly` **tanakaID**: `RegExp`

Defined in: [types.ts:1047](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1047)

Matches the `#ID=` part in a Tanaka Corpus `examples.utf` file

***

### tanakaPart

> `readonly` **tanakaPart**: `RegExp`

Defined in: [types.ts:1051](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1051)

Matches and splits a part found in the `B` section of a Tanaka Corpus `examples.utf` file

***

### tanakaReferenceID

> `readonly` **tanakaReferenceID**: `RegExp`

Defined in: [types.ts:1055](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1055)

Matches the reference ID element of a Tanaka example part
