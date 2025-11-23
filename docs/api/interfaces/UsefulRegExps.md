[**henkan**](../README.md)

***

[henkan](../README.md) / UsefulRegExps

# Interface: UsefulRegExps

Defined in: [types.ts:759](https://github.com/Ronokof/Henkan/blob/5a5b65a6c9451f9ba9d8831d08b4643388bb91e5/src/types.ts#L759)

Some useful regular expressions

## Properties

### hiragana

> `readonly` **hiragana**: `RegExp`

Defined in: [types.ts:763](https://github.com/Ronokof/Henkan/blob/5a5b65a6c9451f9ba9d8831d08b4643388bb91e5/src/types.ts#L763)

Matches any *hiragana* character(s)

***

### kanji

> `readonly` **kanji**: `RegExp`

Defined in: [types.ts:771](https://github.com/Ronokof/Henkan/blob/5a5b65a6c9451f9ba9d8831d08b4643388bb91e5/src/types.ts#L771)

Matches any *kanji* character(s)

***

### katakana

> `readonly` **katakana**: `RegExp`

Defined in: [types.ts:767](https://github.com/Ronokof/Henkan/blob/5a5b65a6c9451f9ba9d8831d08b4643388bb91e5/src/types.ts#L767)

Matches any *katakana* character(s)

***

### regExChars

> `readonly` **regExChars**: `RegExp`

Defined in: [types.ts:781](https://github.com/Ronokof/Henkan/blob/5a5b65a6c9451f9ba9d8831d08b4643388bb91e5/src/types.ts#L781)

Matches any character that is part of the regex syntax

***

### scriptSplit

> `readonly` **scriptSplit**: `RegExp`

Defined in: [types.ts:777](https://github.com/Ronokof/Henkan/blob/5a5b65a6c9451f9ba9d8831d08b4643388bb91e5/src/types.ts#L777)

Matches and splits Japanese expressions into different scripts

Used when creating a SSML

***

### tanakaID

> `readonly` **tanakaID**: `RegExp`

Defined in: [types.ts:785](https://github.com/Ronokof/Henkan/blob/5a5b65a6c9451f9ba9d8831d08b4643388bb91e5/src/types.ts#L785)

Matches the `#ID=` part in a Tanaka Corpus `examples.utf` file

***

### tanakaPart

> `readonly` **tanakaPart**: `RegExp`

Defined in: [types.ts:789](https://github.com/Ronokof/Henkan/blob/5a5b65a6c9451f9ba9d8831d08b4643388bb91e5/src/types.ts#L789)

Matches and splits a part found in the `B` section of a Tanaka Corpus `examples.utf` file

***

### tanakaReferenceID

> `readonly` **tanakaReferenceID**: `RegExp`

Defined in: [types.ts:793](https://github.com/Ronokof/Henkan/blob/5a5b65a6c9451f9ba9d8831d08b4643388bb91e5/src/types.ts#L793)

Matches the reference ID element of a Tanaka example part
