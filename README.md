# henkan

A Node.JS library that helps you convert any dictionary from [EDRDG](https://www.edrdg.org/), transform their entries into more user-friendly schemas and create Anki notes from them.

> The library is used for the [Full Japanese Study Deck](https://ankiweb.net/shared/info/1407096987), so some features might be tailored specifically to the deck.

[![npm](https://img.shields.io/npm/v/henkan.svg)](https://www.npmjs.com/package/henkan) [![license](https://img.shields.io/github/license/Ronokof/Henkan)]()

---

# Table of contents

- [Install](#install)
- [Features](#features)
- [Example](#example)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

---

# Install

```bash
# npm
npm install henkan

# or yarn
yarn add henkan

# or pnpm
pnpm add henkan
```

# Features
 - JMdict, KANJIDIC, Tanaka Corpus, RADK and KRAD conversion
 - User-friendly schemas for dictionary entries
 - Anki note generation
 - Other useful tools (AWS Polly audio generation, Japanese RegExps, array checking etc.)

---

# Example

Download the [JMdict_e.gz](http://ftp.edrdg.org/pub/Nihongo/JMdict_e.gz) archive and extract `JMdict_e` from it.

```js
import fs from 'fs';
import { convertJMdict, generateAnkiNotesFile, getWord } from 'henkan';
//const fs = require('fs');
//const { convertJMdict, generateAnkiNotesFile, getWord } = require('henkan');

const dictPath = './JMdict_e';
const dictContent = fs.readFileSync(dictPath, 'utf-8');

const dictWords = convertJMdict(dictContent);

const noteTypeName = 'Word';
const deckName = 'Japanese::Vocabulary::No kanji form words';

const noKanjiFormWords = dictWords
    .filter(word => word.kanjiForms === undefined)
    .map(word => getWord(undefined, undefined, undefined, undefined, word, noteTypeName, deckName));

const ankiNotesFile = generateAnkiNotesFile(noKanjiFormWords);

if (ankiNotesFile) fs.writeFileSync('./nokfwords.json', ankiNotesFile, 'utf-8');
```

# API

See [API README](docs/api/README.md)

---

# Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

# License

This library is licensed under the [MIT License](LICENSE.md).
