[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanjiForm

# Interface: DictKanjiForm

Defined in: [types.ts:62](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L62)

Word/Name kanji form information

Equivalent to the `k_ele` JMdict/JMnedict element

## Properties

### commonness?

> `optional` **commonness**: `string`[]

Defined in: [types.ts:78](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L78)

Priority codes

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_freq](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_freq)

***

### form

> `readonly` **form**: `string`

Defined in: [types.ts:66](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L66)

The kanji form of the word

***

### notes?

> `optional` **notes**: `string`[]

Defined in: [types.ts:72](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L72)

Other information about the kanji form

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_kinf](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_kinf)
