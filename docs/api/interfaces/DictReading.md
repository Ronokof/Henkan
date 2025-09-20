[**henkan**](../README.md)

***

[henkan](../README.md) / DictReading

# Interface: DictReading

Defined in: types.ts:40

Word reading information

Equivalent to the `r_ele` JMdict element

## Properties

### commonness?

> `optional` **commonness**: `string`[]

Defined in: types.ts:56

Priority codes

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_freq](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_freq)

***

### kanjiFormRestrictions?

> `optional` **kanjiFormRestrictions**: `string`[]

Defined in: types.ts:60

Kanji forms the reading is restricted to

***

### notes?

> `optional` **notes**: `string`[]

Defined in: types.ts:50

Other information about the reading

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_rinf](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_rinf)

***

### reading

> `readonly` **reading**: `string`

Defined in: types.ts:44

The reading of the word
