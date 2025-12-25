[**henkan**](../README.md)

***

[henkan](../README.md) / UsefulRegExps

# Interface: UsefulRegExps

Defined in: [types.ts:962](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L962)

Some useful regular expressions

## Properties

### hiragana

> `readonly` **hiragana**: `RegExp`

Defined in: [types.ts:966](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L966)

Matches any *hiragana* character(s)

***

### kanji

> `readonly` **kanji**: `RegExp`

Defined in: [types.ts:974](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L974)

Matches any *kanji* character(s)

***

### katakana

> `readonly` **katakana**: `RegExp`

Defined in: [types.ts:970](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L970)

Matches any *katakana* character(s)

***

### regExChars

> `readonly` **regExChars**: `RegExp`

Defined in: [types.ts:978](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L978)

Matches any character that is part of the regex syntax

***

### tanakaID

> `readonly` **tanakaID**: `RegExp`

Defined in: [types.ts:982](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L982)

Matches the `#ID=` part in a Tanaka Corpus `examples.utf` file

***

### tanakaPart

> `readonly` **tanakaPart**: `RegExp`

Defined in: [types.ts:986](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L986)

Matches and splits a part found in the `B` section of a Tanaka Corpus `examples.utf` file

***

### tanakaReferenceID

> `readonly` **tanakaReferenceID**: `RegExp`

Defined in: [types.ts:990](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L990)

Matches the reference ID element of a Tanaka example part
