[**henkan**](../README.md)

***

[henkan](../README.md) / DictMeaning

# Interface: DictMeaning

Defined in: [types.ts:116](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L116)

Word meaning/sense information

Equivalent to the `sense` JMdict element

## Properties

### antonyms?

> `optional` **antonyms**: `string`[]

Defined in: [types.ts:142](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L142)

References to antonyms of the word *(when used with this meaning)*

***

### dialects?

> `optional` **dialects**: `string`[]

Defined in: [types.ts:164](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L164)

Regional dialects the meaning is restricted to

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_dial](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_dial)

***

### fields?

> `optional` **fields**: `string`[]

Defined in: [types.ts:148](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L148)

Field of application of the word *(when used with this meaning)*

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_fld](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_fld)

***

### info?

> `optional` **info**: `string`[]

Defined in: [types.ts:152](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L152)

Additional information about the meaning

***

### kanjiFormRestrictions?

> `optional` **kanjiFormRestrictions**: `string`[]

Defined in: [types.ts:134](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L134)

Kanji forms the meaning is restricted to

***

### misc?

> `optional` **misc**: `string`[]

Defined in: [types.ts:158](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L158)

Other relevant information about the meaning

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_misc](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_misc)

***

### partOfSpeech?

> `optional` **partOfSpeech**: `string`[]

Defined in: [types.ts:122](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L122)

Part of speech information

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_pos](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_pos)

***

### readingRestrictions?

> `optional` **readingRestrictions**: `string`[]

Defined in: [types.ts:138](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L138)

Readings the meaning is restricted to

***

### references?

> `optional` **references**: `string`[]

Defined in: [types.ts:130](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L130)

Cross-references to other similar/related words *(when used with this meaning)*

***

### translations?

> `optional` **translations**: [`DictTranslation`](../type-aliases/DictTranslation.md)[]

Defined in: [types.ts:126](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L126)

Word glosses
