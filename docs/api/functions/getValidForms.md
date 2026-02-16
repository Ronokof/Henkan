[**henkan**](../README.md)

***

[henkan](../README.md) / getValidForms

# Function: getValidForms()

> **getValidForms**(`readings`, `kanjiForms?`, `wordIsCommon?`): [`ReadingsKanjiFormsPair`](../interfaces/ReadingsKanjiFormsPair.md)

Defined in: [utils.ts:214](https://github.com/Ronokof/Henkan/blob/main/src/utils.ts#L214)

Filters out all the old/rare or (if [wordIsCommon](#getvalidforms) is `true`) uncommon readings and kanji forms of a JMdict entry.

## Parameters

### readings

readonly [`DictReading`](../interfaces/DictReading.md)[]

The word's readings

### kanjiForms?

readonly [`DictKanjiForm`](../interfaces/DictKanjiForm.md)[]

The word's kanji forms

### wordIsCommon?

`true`

Whether or not the word is common

## Returns

[`ReadingsKanjiFormsPair`](../interfaces/ReadingsKanjiFormsPair.md)

An object containing the valid readings and kanji forms of the word
