[**henkan**](../README.md)

***

[henkan](../README.md) / UsefulRegExps

# Interface: UsefulRegExps

Defined in: [types.ts:802](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L802)

Some useful regular expressions

## Properties

### hiragana

> `readonly` **hiragana**: `RegExp`

Defined in: [types.ts:806](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L806)

Matches any *hiragana* character(s)

***

### kanji

> `readonly` **kanji**: `RegExp`

Defined in: [types.ts:814](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L814)

Matches any *kanji* character(s)

***

### katakana

> `readonly` **katakana**: `RegExp`

Defined in: [types.ts:810](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L810)

Matches any *katakana* character(s)

***

### regExChars

> `readonly` **regExChars**: `RegExp`

Defined in: [types.ts:818](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L818)

Matches any character that is part of the regex syntax

***

### tanakaID

> `readonly` **tanakaID**: `RegExp`

Defined in: [types.ts:822](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L822)

Matches the `#ID=` part in a Tanaka Corpus `examples.utf` file

***

### tanakaPart

> `readonly` **tanakaPart**: `RegExp`

Defined in: [types.ts:826](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L826)

Matches and splits a part found in the `B` section of a Tanaka Corpus `examples.utf` file

***

### tanakaReferenceID

> `readonly` **tanakaReferenceID**: `RegExp`

Defined in: [types.ts:830](https://github.com/Ronokof/Henkan/blob/e0f685c675998bfb93cbe454a3fe16d279853c5a/src/types.ts#L830)

Matches the reference ID element of a Tanaka example part
