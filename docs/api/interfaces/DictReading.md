[**henkan**](../README.md)

***

[henkan](../README.md) / DictReading

# Interface: DictReading

Defined in: [types.ts:81](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L81)

Word reading information

Equivalent to the `r_ele` JMdict element

## Properties

### commonness?

> `optional` **commonness**: `string`[]

Defined in: [types.ts:97](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L97)

Priority codes

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_freq](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_freq)

***

### kanjiFormRestrictions?

> `optional` **kanjiFormRestrictions**: `string`[]

Defined in: [types.ts:101](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L101)

Kanji forms the reading is restricted to

***

### notes?

> `optional` **notes**: `string`[]

Defined in: [types.ts:91](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L91)

Other information about the reading

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_rinf](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_rinf)

***

### reading

> `readonly` **reading**: `string`

Defined in: [types.ts:85](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L85)

The reading of the word
