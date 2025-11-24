[**henkan**](../README.md)

***

[henkan](../README.md) / UsefulRegExps

# Interface: UsefulRegExps

Defined in: [types.ts:759](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L759)

Some useful regular expressions

## Properties

### hiragana

> `readonly` **hiragana**: `RegExp`

Defined in: [types.ts:763](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L763)

Matches any *hiragana* character(s)

***

### kanji

> `readonly` **kanji**: `RegExp`

Defined in: [types.ts:771](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L771)

Matches any *kanji* character(s)

***

### katakana

> `readonly` **katakana**: `RegExp`

Defined in: [types.ts:767](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L767)

Matches any *katakana* character(s)

***

### regExChars

> `readonly` **regExChars**: `RegExp`

Defined in: [types.ts:775](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L775)

Matches any character that is part of the regex syntax

***

### tanakaID

> `readonly` **tanakaID**: `RegExp`

Defined in: [types.ts:779](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L779)

Matches the `#ID=` part in a Tanaka Corpus `examples.utf` file

***

### tanakaPart

> `readonly` **tanakaPart**: `RegExp`

Defined in: [types.ts:783](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L783)

Matches and splits a part found in the `B` section of a Tanaka Corpus `examples.utf` file

***

### tanakaReferenceID

> `readonly` **tanakaReferenceID**: `RegExp`

Defined in: [types.ts:787](https://github.com/Ronokof/Henkan/blob/ac9b24079c48cb4b4a67f536f7c7bb8478ab2963/src/types.ts#L787)

Matches the reference ID element of a Tanaka example part
