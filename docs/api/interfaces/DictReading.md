[**henkan**](../README.md)

***

[henkan](../README.md) / DictReading

# Interface: DictReading

Defined in: [types.ts:40](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L40)

Word reading information

Equivalent to the `r_ele` JMdict element

## Properties

### commonness?

> `optional` **commonness**: `string`[]

Defined in: [types.ts:56](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L56)

Priority codes

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_freq](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_freq)

***

### kanjiFormRestrictions?

> `optional` **kanjiFormRestrictions**: `string`[]

Defined in: [types.ts:60](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L60)

Kanji forms the reading is restricted to

***

### notes?

> `optional` **notes**: `string`[]

Defined in: [types.ts:50](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L50)

Other information about the reading

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_rinf](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_rinf)

***

### reading

> `readonly` **reading**: `string`

Defined in: [types.ts:44](https://github.com/Ronokof/Henkan/blob/a8409ff59a4d15090def2ea20c6de370a8a9f4b3/src/types.ts#L44)

The reading of the word
