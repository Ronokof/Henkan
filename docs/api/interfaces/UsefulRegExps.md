[**henkan**](../README.md)

***

[henkan](../README.md) / UsefulRegExps

# Interface: UsefulRegExps

Defined in: [types.ts:1017](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1017)

Some useful regular expressions

## Properties

### hiragana

> `readonly` **hiragana**: `RegExp`

Defined in: [types.ts:1021](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1021)

Matches any *hiragana* character(s)

***

### kanji

> `readonly` **kanji**: `RegExp`

Defined in: [types.ts:1029](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1029)

Matches any *kanji* character(s)

***

### katakana

> `readonly` **katakana**: `RegExp`

Defined in: [types.ts:1025](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1025)

Matches any *katakana* character(s)

***

### regExChars

> `readonly` **regExChars**: `RegExp`

Defined in: [types.ts:1033](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1033)

Matches any character that is part of the regex syntax

***

### tanakaID

> `readonly` **tanakaID**: `RegExp`

Defined in: [types.ts:1037](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1037)

Matches the `#ID=` part in a Tanaka Corpus `examples.utf` file

***

### tanakaPart

> `readonly` **tanakaPart**: `RegExp`

Defined in: [types.ts:1041](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1041)

Matches and splits a part found in the `B` section of a Tanaka Corpus `examples.utf` file

***

### tanakaReferenceID

> `readonly` **tanakaReferenceID**: `RegExp`

Defined in: [types.ts:1045](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1045)

Matches the reference ID element of a Tanaka example part
