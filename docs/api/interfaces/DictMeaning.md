[**henkan**](../README.md)

***

[henkan](../README.md) / DictMeaning

# Interface: DictMeaning

Defined in: [types.ts:135](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L135)

Word meaning/sense information

Equivalent to the `sense` JMdict element

## Properties

### antonyms?

> `optional` **antonyms**: `string`[]

Defined in: [types.ts:161](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L161)

References to antonyms of the word *(when used with this meaning)*

***

### dialects?

> `optional` **dialects**: `string`[]

Defined in: [types.ts:183](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L183)

Regional dialects the meaning is restricted to

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_dial](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_dial)

***

### fields?

> `optional` **fields**: `string`[]

Defined in: [types.ts:167](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L167)

Field of application of the word *(when used with this meaning)*

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_fld](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_fld)

***

### info?

> `optional` **info**: `string`[]

Defined in: [types.ts:171](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L171)

Additional information about the meaning

***

### kanjiFormRestrictions?

> `optional` **kanjiFormRestrictions**: `string`[]

Defined in: [types.ts:153](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L153)

Kanji forms the meaning is restricted to

***

### misc?

> `optional` **misc**: `string`[]

Defined in: [types.ts:177](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L177)

Other relevant information about the meaning

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_misc](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_misc)

***

### partOfSpeech

> **partOfSpeech**: `string`[]

Defined in: [types.ts:141](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L141)

Part of speech information

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_pos](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_pos)

***

### readingRestrictions?

> `optional` **readingRestrictions**: `string`[]

Defined in: [types.ts:157](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L157)

Readings the meaning is restricted to

***

### references?

> `optional` **references**: `string`[]

Defined in: [types.ts:149](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L149)

Cross-references to other similar/related words *(when used with this meaning)*

***

### translations

> **translations**: [`DictTranslation`](../type-aliases/DictTranslation.md)[]

Defined in: [types.ts:145](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L145)

Word glosses
