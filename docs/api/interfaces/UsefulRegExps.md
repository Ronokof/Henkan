[**henkan**](../README.md)

***

[henkan](../README.md) / UsefulRegExps

# Interface: UsefulRegExps

Defined in: [types.ts:701](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L701)

Some useful regular expressions

## Properties

### hiragana

> `readonly` **hiragana**: `RegExp`

Defined in: [types.ts:705](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L705)

Matches any *hiragana* character(s)

***

### kanji

> `readonly` **kanji**: `RegExp`

Defined in: [types.ts:713](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L713)

Matches any *kanji* character(s)

***

### katakana

> `readonly` **katakana**: `RegExp`

Defined in: [types.ts:709](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L709)

Matches any *katakana* character(s)

***

### regExChars

> `readonly` **regExChars**: `RegExp`

Defined in: [types.ts:723](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L723)

Matches any character that is part of the regex syntax

***

### scriptSplit

> `readonly` **scriptSplit**: `RegExp`

Defined in: [types.ts:719](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L719)

Matches and splits Japanese expressions into different scripts

Used when creating a SSML

***

### tanakaID

> `readonly` **tanakaID**: `RegExp`

Defined in: [types.ts:727](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L727)

Matches the `#ID=` part in a Tanaka Corpus `examples.utf` file

***

### tanakaPart

> `readonly` **tanakaPart**: `RegExp`

Defined in: [types.ts:731](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L731)

Matches and splits a part found in the `B` section of a Tanaka Corpus `examples.utf` file

***

### tanakaReferenceID

> `readonly` **tanakaReferenceID**: `RegExp`

Defined in: [types.ts:735](https://github.com/Ronokof/Henkan/blob/cdcdfbcc72ca03339cd98398efd7d5e82826d66f/src/types.ts#L735)

Matches the reference ID element of a Tanaka example part
