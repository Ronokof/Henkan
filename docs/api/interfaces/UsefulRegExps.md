[**henkan**](../README.md)

***

[henkan](../README.md) / UsefulRegExps

# Interface: UsefulRegExps

Defined in: [types.ts:687](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L687)

Some useful regular expressions

## Properties

### hiragana

> `readonly` **hiragana**: `RegExp`

Defined in: [types.ts:691](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L691)

Matches any *hiragana* character(s)

***

### kanji

> `readonly` **kanji**: `RegExp`

Defined in: [types.ts:699](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L699)

Matches any *kanji* character(s)

***

### katakana

> `readonly` **katakana**: `RegExp`

Defined in: [types.ts:695](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L695)

Matches any *katakana* character(s)

***

### regExChars

> `readonly` **regExChars**: `RegExp`

Defined in: [types.ts:709](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L709)

Matches any character that is part of the regex syntax

***

### scriptSplit

> `readonly` **scriptSplit**: `RegExp`

Defined in: [types.ts:705](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L705)

Matches and splits Japanese expressions into different scripts

Used when creating a SSML

***

### tanakaID

> `readonly` **tanakaID**: `RegExp`

Defined in: [types.ts:713](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L713)

Matches the `#ID=` part in a Tanaka Corpus `examples.utf` file

***

### tanakaPart

> `readonly` **tanakaPart**: `RegExp`

Defined in: [types.ts:717](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L717)

Matches and splits a part found in the `B` section of a Tanaka Corpus `examples.utf` file

***

### tanakaReferenceID

> `readonly` **tanakaReferenceID**: `RegExp`

Defined in: [types.ts:721](https://github.com/Ronokof/Henkan/blob/2ebb5bac1977f3a31819e77efebc48d02b0a7059/src/types.ts#L721)

Matches the reference ID element of a Tanaka example part
