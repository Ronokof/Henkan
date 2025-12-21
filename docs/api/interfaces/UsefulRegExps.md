[**henkan**](../README.md)

***

[henkan](../README.md) / UsefulRegExps

# Interface: UsefulRegExps

Defined in: [types.ts:935](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L935)

Some useful regular expressions

## Properties

### hiragana

> `readonly` **hiragana**: `RegExp`

Defined in: [types.ts:939](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L939)

Matches any *hiragana* character(s)

***

### kanji

> `readonly` **kanji**: `RegExp`

Defined in: [types.ts:947](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L947)

Matches any *kanji* character(s)

***

### katakana

> `readonly` **katakana**: `RegExp`

Defined in: [types.ts:943](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L943)

Matches any *katakana* character(s)

***

### regExChars

> `readonly` **regExChars**: `RegExp`

Defined in: [types.ts:951](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L951)

Matches any character that is part of the regex syntax

***

### tanakaID

> `readonly` **tanakaID**: `RegExp`

Defined in: [types.ts:955](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L955)

Matches the `#ID=` part in a Tanaka Corpus `examples.utf` file

***

### tanakaPart

> `readonly` **tanakaPart**: `RegExp`

Defined in: [types.ts:959](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L959)

Matches and splits a part found in the `B` section of a Tanaka Corpus `examples.utf` file

***

### tanakaReferenceID

> `readonly` **tanakaReferenceID**: `RegExp`

Defined in: [types.ts:963](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L963)

Matches the reference ID element of a Tanaka example part
