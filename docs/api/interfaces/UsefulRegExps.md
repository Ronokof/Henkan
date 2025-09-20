[**henkan**](../README.md)

***

[henkan](../README.md) / UsefulRegExps

# Interface: UsefulRegExps

Defined in: types.ts:677

Some useful regular expressions

## Properties

### hiragana

> `readonly` **hiragana**: `RegExp`

Defined in: types.ts:681

Matches any *hiragana* character(s)

***

### kanji

> `readonly` **kanji**: `RegExp`

Defined in: types.ts:689

Matches any *kanji* character(s)

***

### katakana

> `readonly` **katakana**: `RegExp`

Defined in: types.ts:685

Matches any *katakana* character(s)

***

### regExChars

> `readonly` **regExChars**: `RegExp`

Defined in: types.ts:699

Matches any character that is part of the regex syntax

***

### scriptSplit

> `readonly` **scriptSplit**: `RegExp`

Defined in: types.ts:695

Matches and splits Japanese expressions into different scripts

Used when creating a SSML

***

### tanakaID

> `readonly` **tanakaID**: `RegExp`

Defined in: types.ts:703

Matches the `#ID=` part in a Tanaka Corpus `examples.utf` file

***

### tanakaPart

> `readonly` **tanakaPart**: `RegExp`

Defined in: types.ts:707

Matches and splits a part found in the `B` section of a Tanaka Corpus `examples.utf` file

***

### tanakaReferenceID

> `readonly` **tanakaReferenceID**: `RegExp`

Defined in: types.ts:711

Matches the reference ID element of a Tanaka example part
