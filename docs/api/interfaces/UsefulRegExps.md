[**henkan**](../README.md)

***

[henkan](../README.md) / UsefulRegExps

# Interface: UsefulRegExps

Defined in: [types.ts:735](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L735)

Some useful regular expressions

## Properties

### hiragana

> `readonly` **hiragana**: `RegExp`

Defined in: [types.ts:739](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L739)

Matches any *hiragana* character(s)

***

### kanji

> `readonly` **kanji**: `RegExp`

Defined in: [types.ts:747](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L747)

Matches any *kanji* character(s)

***

### katakana

> `readonly` **katakana**: `RegExp`

Defined in: [types.ts:743](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L743)

Matches any *katakana* character(s)

***

### regExChars

> `readonly` **regExChars**: `RegExp`

Defined in: [types.ts:757](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L757)

Matches any character that is part of the regex syntax

***

### scriptSplit

> `readonly` **scriptSplit**: `RegExp`

Defined in: [types.ts:753](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L753)

Matches and splits Japanese expressions into different scripts

Used when creating a SSML

***

### tanakaID

> `readonly` **tanakaID**: `RegExp`

Defined in: [types.ts:761](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L761)

Matches the `#ID=` part in a Tanaka Corpus `examples.utf` file

***

### tanakaPart

> `readonly` **tanakaPart**: `RegExp`

Defined in: [types.ts:765](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L765)

Matches and splits a part found in the `B` section of a Tanaka Corpus `examples.utf` file

***

### tanakaReferenceID

> `readonly` **tanakaReferenceID**: `RegExp`

Defined in: [types.ts:769](https://github.com/Ronokof/Henkan/blob/807ee4ba5ecfc97c78f9eb033912901b416bfef7/src/types.ts#L769)

Matches the reference ID element of a Tanaka example part
