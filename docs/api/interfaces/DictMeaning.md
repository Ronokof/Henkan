[**henkan**](../README.md)

***

[henkan](../README.md) / DictMeaning

# Interface: DictMeaning

Defined in: [types.ts:133](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L133)

Word meaning/sense information

Equivalent to the `sense` JMdict element

## Properties

### antonyms?

> `optional` **antonyms**: `string`[]

Defined in: [types.ts:159](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L159)

References to antonyms of the word *(when used with this meaning)*

***

### dialects?

> `optional` **dialects**: `string`[]

Defined in: [types.ts:181](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L181)

Regional dialects the meaning is restricted to

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_dial](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_dial)

***

### fields?

> `optional` **fields**: `string`[]

Defined in: [types.ts:165](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L165)

Field of application of the word *(when used with this meaning)*

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_fld](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_fld)

***

### info?

> `optional` **info**: `string`[]

Defined in: [types.ts:169](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L169)

Additional information about the meaning

***

### kanjiFormRestrictions?

> `optional` **kanjiFormRestrictions**: `string`[]

Defined in: [types.ts:151](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L151)

Kanji forms the meaning is restricted to

***

### misc?

> `optional` **misc**: `string`[]

Defined in: [types.ts:175](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L175)

Other relevant information about the meaning

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_misc](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_misc)

***

### partOfSpeech

> **partOfSpeech**: `string`[]

Defined in: [types.ts:139](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L139)

Part of speech information

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_pos](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_pos)

***

### readingRestrictions?

> `optional` **readingRestrictions**: `string`[]

Defined in: [types.ts:155](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L155)

Readings the meaning is restricted to

***

### references?

> `optional` **references**: `string`[]

Defined in: [types.ts:147](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L147)

Cross-references to other similar/related words *(when used with this meaning)*

***

### translations

> **translations**: [`DictTranslation`](../type-aliases/DictTranslation.md)[]

Defined in: [types.ts:143](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L143)

Word glosses
