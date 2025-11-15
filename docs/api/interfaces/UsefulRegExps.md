[**henkan**](../README.md)

***

[henkan](../README.md) / UsefulRegExps

# Interface: UsefulRegExps

Defined in: [types.ts:737](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L737)

Some useful regular expressions

## Properties

### hiragana

> `readonly` **hiragana**: `RegExp`

Defined in: [types.ts:741](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L741)

Matches any *hiragana* character(s)

***

### kanji

> `readonly` **kanji**: `RegExp`

Defined in: [types.ts:749](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L749)

Matches any *kanji* character(s)

***

### katakana

> `readonly` **katakana**: `RegExp`

Defined in: [types.ts:745](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L745)

Matches any *katakana* character(s)

***

### regExChars

> `readonly` **regExChars**: `RegExp`

Defined in: [types.ts:759](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L759)

Matches any character that is part of the regex syntax

***

### scriptSplit

> `readonly` **scriptSplit**: `RegExp`

Defined in: [types.ts:755](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L755)

Matches and splits Japanese expressions into different scripts

Used when creating a SSML

***

### tanakaID

> `readonly` **tanakaID**: `RegExp`

Defined in: [types.ts:763](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L763)

Matches the `#ID=` part in a Tanaka Corpus `examples.utf` file

***

### tanakaPart

> `readonly` **tanakaPart**: `RegExp`

Defined in: [types.ts:767](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L767)

Matches and splits a part found in the `B` section of a Tanaka Corpus `examples.utf` file

***

### tanakaReferenceID

> `readonly` **tanakaReferenceID**: `RegExp`

Defined in: [types.ts:771](https://github.com/Ronokof/Henkan/blob/be14eff8947ae967718945fe57bd90c10ebced4a/src/types.ts#L771)

Matches the reference ID element of a Tanaka example part
