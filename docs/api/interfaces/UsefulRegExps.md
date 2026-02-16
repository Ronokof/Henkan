[**henkan**](../README.md)

***

[henkan](../README.md) / UsefulRegExps

# Interface: UsefulRegExps

Defined in: [types.ts:1125](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1125)

Some useful regular expressions

## Properties

### hiragana

> `readonly` **hiragana**: `RegExp`

Defined in: [types.ts:1129](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1129)

Matches any *hiragana* character(s)

***

### kanji

> `readonly` **kanji**: `RegExp`

Defined in: [types.ts:1137](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1137)

Matches any *kanji* character(s)

***

### katakana

> `readonly` **katakana**: `RegExp`

Defined in: [types.ts:1133](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1133)

Matches any *katakana* character(s)

***

### regExChars

> `readonly` **regExChars**: `RegExp`

Defined in: [types.ts:1141](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1141)

Matches any character that is part of the regex syntax

***

### tanakaID

> `readonly` **tanakaID**: `RegExp`

Defined in: [types.ts:1145](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1145)

Matches the `#ID=` part in a Tanaka Corpus `examples.utf` file

***

### tanakaPart

> `readonly` **tanakaPart**: `RegExp`

Defined in: [types.ts:1149](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1149)

Matches and splits a part found in the `B` section of a Tanaka Corpus `examples.utf` file

***

### tanakaReferenceID

> `readonly` **tanakaReferenceID**: `RegExp`

Defined in: [types.ts:1153](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L1153)

Matches the reference ID element of a Tanaka example part
