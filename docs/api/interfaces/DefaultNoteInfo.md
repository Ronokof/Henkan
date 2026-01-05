[**henkan**](../README.md)

***

[henkan](../README.md) / DefaultNoteInfo

# Interface: DefaultNoteInfo

Defined in: [types.ts:973](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L973)

Default note ID, note type and deck name of a note

Setting any of the properties to:

- a `string` will make that string the default note ID/note type/deck name of the note in case [Result.noteID](Grammar.md#noteid)/[Result.noteTypeName](Grammar.md#notetypename)/[Result.deckPath](Grammar.md#deckpath) is `undefined`.

- `true` will require all [Result](../type-aliases/Result.md) objects to have [Result.noteID](Grammar.md#noteid)/[Result.noteTypeName](Grammar.md#notetypename)/[Result.deckPath](Grammar.md#deckpath) set (*no default values*).

- `undefined` (*or not set*) will require all [Result](../type-aliases/Result.md) objects to either have [Result.noteID](Grammar.md#noteid)/[Result.noteTypeName](Grammar.md#notetypename)/[Result.deckPath](Grammar.md#deckpath) set or not set (*no default values*).

## Properties

### deckPath?

> `optional` **deckPath**: `string` \| `true`

Defined in: [types.ts:987](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L987)

A default for [Result.deckPath](Grammar.md#deckpath)

***

### guid?

> `optional` **guid**: `true` \| `"main_information"`

Defined in: [types.ts:979](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L979)

A default for [Result.noteID](Grammar.md#noteid)

`main_information` will make either the ID or kana/kanji/radical character the default note ID of the note.

***

### noteType?

> `optional` **noteType**: `string` \| `true`

Defined in: [types.ts:983](https://github.com/Ronokof/Henkan/blob/main/src/types.ts#L983)

A default for [Result.noteTypeName](Grammar.md#notetypename)
