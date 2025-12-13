[**henkan**](../README.md)

***

[henkan](../README.md) / UsefulRegExps

# Interface: UsefulRegExps

Defined in: [types.ts:874](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L874)

Some useful regular expressions

## Properties

### hiragana

> `readonly` **hiragana**: `RegExp`

Defined in: [types.ts:878](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L878)

Matches any *hiragana* character(s)

***

### kanji

> `readonly` **kanji**: `RegExp`

Defined in: [types.ts:886](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L886)

Matches any *kanji* character(s)

***

### katakana

> `readonly` **katakana**: `RegExp`

Defined in: [types.ts:882](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L882)

Matches any *katakana* character(s)

***

### regExChars

> `readonly` **regExChars**: `RegExp`

Defined in: [types.ts:890](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L890)

Matches any character that is part of the regex syntax

***

### tanakaID

> `readonly` **tanakaID**: `RegExp`

Defined in: [types.ts:894](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L894)

Matches the `#ID=` part in a Tanaka Corpus `examples.utf` file

***

### tanakaPart

> `readonly` **tanakaPart**: `RegExp`

Defined in: [types.ts:898](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L898)

Matches and splits a part found in the `B` section of a Tanaka Corpus `examples.utf` file

***

### tanakaReferenceID

> `readonly` **tanakaReferenceID**: `RegExp`

Defined in: [types.ts:902](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L902)

Matches the reference ID element of a Tanaka example part
