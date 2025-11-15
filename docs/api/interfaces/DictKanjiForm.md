[**henkan**](../README.md)

***

[henkan](../README.md) / DictKanjiForm

# Interface: DictKanjiForm

Defined in: [types.ts:16](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L16)

Word kanji form information

Equivalent to the `k_ele` JMdict element

## Properties

### commonness?

> `optional` **commonness**: `string`[]

Defined in: [types.ts:32](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L32)

Priority codes

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_freq](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_freq)

***

### form

> `readonly` **form**: `string`

Defined in: [types.ts:20](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L20)

The kanji form of the word

***

### notes?

> `optional` **notes**: `string`[]

Defined in: [types.ts:26](https://github.com/Ronokof/Henkan/blob/874e0ce148c5695af9a488b65483b45b6d79c57b/src/types.ts#L26)

Other information about the kanji form

#### See

[https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw\_kinf](https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_kinf)
