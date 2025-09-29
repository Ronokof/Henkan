[**henkan**](../README.md)

***

[henkan](../README.md) / UsefulRegExps

# Interface: UsefulRegExps

Defined in: [types.ts:681](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L681)

Some useful regular expressions

## Properties

### hiragana

> `readonly` **hiragana**: `RegExp`

Defined in: [types.ts:685](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L685)

Matches any *hiragana* character(s)

***

### kanji

> `readonly` **kanji**: `RegExp`

Defined in: [types.ts:693](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L693)

Matches any *kanji* character(s)

***

### katakana

> `readonly` **katakana**: `RegExp`

Defined in: [types.ts:689](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L689)

Matches any *katakana* character(s)

***

### regExChars

> `readonly` **regExChars**: `RegExp`

Defined in: [types.ts:703](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L703)

Matches any character that is part of the regex syntax

***

### scriptSplit

> `readonly` **scriptSplit**: `RegExp`

Defined in: [types.ts:699](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L699)

Matches and splits Japanese expressions into different scripts

Used when creating a SSML

***

### tanakaID

> `readonly` **tanakaID**: `RegExp`

Defined in: [types.ts:707](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L707)

Matches the `#ID=` part in a Tanaka Corpus `examples.utf` file

***

### tanakaPart

> `readonly` **tanakaPart**: `RegExp`

Defined in: [types.ts:711](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L711)

Matches and splits a part found in the `B` section of a Tanaka Corpus `examples.utf` file

***

### tanakaReferenceID

> `readonly` **tanakaReferenceID**: `RegExp`

Defined in: [types.ts:715](https://github.com/Ronokof/Henkan/blob/98f666aefeafaf05969bb220cc1183df13aaacbd/src/types.ts#L715)

Matches the reference ID element of a Tanaka example part
