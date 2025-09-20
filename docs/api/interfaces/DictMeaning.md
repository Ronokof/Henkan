[**henkan**](../README.md)

***

[henkan](../README.md) / DictMeaning

# Interface: DictMeaning

Defined in: types.ts:67

Word meaning/sense information

Equivalent to the `sense` JMdict element

## Properties

### antonyms?

> `optional` **antonyms**: `string`[]

Defined in: types.ts:95

References to antonyms of the word *(when used with this meaning)*

***

### dialects?

> `optional` **dialects**: `string`[]

Defined in: types.ts:117

Regional dialects the meaning is restricted to

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_dial](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_dial)

***

### fields?

> `optional` **fields**: `string`[]

Defined in: types.ts:101

Field of application of the word *(when used with this meaning)*

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_fld](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_fld)

***

### info?

> `optional` **info**: `string`[]

Defined in: types.ts:105

Additional information about the meaning

***

### kanjiFormRestrictions?

> `optional` **kanjiFormRestrictions**: `string`[]

Defined in: types.ts:87

Kanji forms the meaning is restricted to

***

### misc?

> `optional` **misc**: `string`[]

Defined in: types.ts:111

Other relevant information about the meaning

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_misc](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_misc)

***

### partOfSpeech?

> `optional` **partOfSpeech**: `string`[]

Defined in: types.ts:73

Part of speech information

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_pos](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_pos)

***

### readingRestrictions?

> `optional` **readingRestrictions**: `string`[]

Defined in: types.ts:91

Readings the meaning is restricted to

***

### references?

> `optional` **references**: `string`[]

Defined in: types.ts:83

Cross-references to other similar/related words *(when used with this meaning)*

***

### translations?

> `optional` **translations**: (`string` \| \{ `translation`: `string`; `type`: `"lit"` \| `"expl"` \| `"tm"`; \})[]

Defined in: types.ts:77

Word glosses
