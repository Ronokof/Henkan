import { describe, it, expect, beforeAll, afterAll, inject } from "vitest";
import {
  Definition,
  DictKanji,
  DictWord,
  Kanji,
  KanjiForm,
  StringNumber,
  TanakaExample,
  Word,
  WordDefinitionPair,
} from "../src/types";
import {
  convertJawiktionarySync,
  convertJMdict,
  convertKanjiDic,
  convertTanakaCorpusWithFurigana,
  generateAnkiNote,
  generateAnkiNotesFile,
  getWord,
  getWordDefinitionsWithFurigana,
  isWord,
  shuffleArray,
} from "../src/utils";
import { regexps } from "../src/constants";

function checkTransformedEntry(
  transformedEntry: Word,
  dictEntry: DictWord,
  noteTypeName: string,
  deckPath: string,
  checkKanji?: true | undefined,
  checkPhrases?: true | undefined,
  ignoreTags?: true | undefined,
): void {
  expect(isWord(transformedEntry)).toBeTruthy();
  expect(
    transformedEntry.id !== undefined && transformedEntry.id === dictEntry.id,
  ).toBeTruthy();
  expect(
    transformedEntry.noteID === `word_${transformedEntry.id}`,
  ).toBeTruthy();
  expect(transformedEntry.readings.length).toBeGreaterThan(0);
  expect(transformedEntry.translations.length).toBeGreaterThan(0);

  expect(transformedEntry.noteTypeName === noteTypeName).toBeTruthy();
  expect(transformedEntry.deckPath === deckPath).toBeTruthy();

  if (ignoreTags === undefined) expect(transformedEntry.tags).toBeDefined();

  if (transformedEntry.tags)
    expect(transformedEntry.tags.length).toBeGreaterThan(0);

  expect(transformedEntry.common === dictEntry.isCommon).toBeTruthy();
  expect(
    transformedEntry.usuallyInKana === dictEntry.usuallyInKana,
  ).toBeTruthy();

  expect(generateAnkiNote(transformedEntry).length).toBe(
    ignoreTags === true && transformedEntry.tags === undefined ? 6 : 7,
  );

  if (checkKanji === true)
    if (transformedEntry.kanjiForms)
      expect(
        transformedEntry.kanjiForms.length > 0 && dictEntry.kanjiForms,
      ).toBeTruthy();
  if (transformedEntry.kanji)
    expect(
      transformedEntry.kanjiForms &&
        transformedEntry.kanji.every(
          (kanji: Kanji) =>
            transformedEntry.kanjiForms &&
            transformedEntry.kanjiForms.some((kf: KanjiForm) =>
              kf.kanjiForm.includes(kanji.kanji),
            ),
        ),
    ).toBeTruthy();

  if (checkPhrases === true && transformedEntry.phrases)
    expect(transformedEntry.phrases.length).toBeGreaterThan(0);
}

let convertedJMdict: DictWord[];
let convertedKanjiDic: DictKanji[];
let convertedTanakaCorpus: TanakaExample[];
let wordDefs: WordDefinitionPair[];
let idWordMap: Map<StringNumber, DictWord>;
let charKanjiMap: Map<string, DictKanji[]>;
let wordExamplesMap: Map<StringNumber, TanakaExample[]>;
let wordDefsMap: Map<StringNumber, Definition[]>;
let randomWordID: string;

beforeAll(async () => {
  charKanjiMap = new Map<string, DictKanji[]>();
  wordExamplesMap = new Map<StringNumber, TanakaExample[]>();

  convertedTanakaCorpus = await convertTanakaCorpusWithFurigana(
    inject("examples.utf"),
  );

  convertedKanjiDic = shuffleArray<DictKanji>(
    convertKanjiDic(inject("kanjidic2.xml")),
  );

  convertedJMdict = shuffleArray<DictWord>(
    convertJMdict(inject("JMdict_e"), convertedTanakaCorpus),
  );

  idWordMap = new Map<StringNumber, DictWord>();

  for (const entry of convertedJMdict) idWordMap.set(entry.id, entry);

  wordDefs = await getWordDefinitionsWithFurigana(
    convertJawiktionarySync(inject("raw-wiktextract-data")),
    convertedJMdict,
  );

  wordDefsMap = new Map<StringNumber, Definition[]>();

  for (const pair of wordDefs) wordDefsMap.set(pair.wordID, pair.definitions);

  const kanjiMap: Map<string, DictKanji> = new Map<string, DictKanji>();

  for (const kanji of convertedKanjiDic) kanjiMap.set(kanji.kanji, kanji);

  const wordsWithKanjiForms: Set<string> = new Set<string>();

  for (const word of convertedJMdict) {
    if (word.kanjiForms) {
      for (const kf of word.kanjiForms)
        for (const char of kf.form
          .split("")
          .filter((c: string) => regexps.kanji.test(c))) {
          const kanjiChar: DictKanji | undefined = kanjiMap.get(char);

          wordsWithKanjiForms.add(word.id);

          if (!charKanjiMap.has(char))
            charKanjiMap.set(char, kanjiChar ? [kanjiChar] : []);
          else if (kanjiChar) charKanjiMap.get(char)!.push(kanjiChar);
        }
    }
  }

  const entryParts: Set<string> = new Set<string>();
  const wordPartsMap: Map<StringNumber, Set<string>> = new Map<
    StringNumber,
    Set<string>
  >();

  for (let i: number = 0; i < convertedJMdict.length; i++) {
    const word: DictWord | undefined = convertedJMdict[i];
    if (!word) continue;

    let localPartParts: Set<string> = new Set<string>();

    for (const reading of word.readings) {
      entryParts.add(reading.reading);
      localPartParts.add(reading.reading);
    }

    if (word.kanjiForms !== undefined)
      for (const kanjiForm of word.kanjiForms) {
        entryParts.add(kanjiForm.form);
        localPartParts.add(kanjiForm.form);
      }

    entryParts.add(word.id);
    localPartParts.add(word.id);

    wordPartsMap.set(word.id, localPartParts);
  }

  const partExamplesMap: Map<string, TanakaExample[]> = new Map<
    string,
    TanakaExample[]
  >();

  for (const ex of convertedTanakaCorpus) {
    for (const part of ex.parts) {
      if (entryParts.has(part.baseForm)) {
        let exList: TanakaExample[] | undefined = partExamplesMap.get(
          part.baseForm,
        );
        if (!exList) {
          exList = [];
          partExamplesMap.set(part.baseForm, exList);
        }

        exList.push(ex);
      }
      if (part.reading && entryParts.has(part.reading)) {
        let exList: TanakaExample[] | undefined = partExamplesMap.get(
          part.reading,
        );
        if (!exList) {
          exList = [];
          partExamplesMap.set(part.reading, exList);
        }

        exList.push(ex);
      }
      if (part.inflectedForm && entryParts.has(part.inflectedForm)) {
        let exList: TanakaExample[] | undefined = partExamplesMap.get(
          part.inflectedForm,
        );
        if (!exList) {
          exList = [];
          partExamplesMap.set(part.inflectedForm, exList);
        }

        exList.push(ex);
      }

      if (part.referenceID && entryParts.has(part.referenceID)) {
        let exList: TanakaExample[] | undefined = partExamplesMap.get(
          part.referenceID,
        );
        if (!exList) {
          exList = [];
          partExamplesMap.set(part.referenceID, exList);
        }

        exList.push(ex);
      }
    }
  }

  for (let i: number = 0; i < convertedJMdict.length; i++) {
    const word: DictWord | undefined = convertedJMdict[i];
    if (!word) continue;

    const entryParts: Set<string> | undefined = wordPartsMap.get(word.id);
    if (!entryParts) continue;

    const seenEx: Set<string> = new Set<string>();
    const validExamples: TanakaExample[] = [];

    for (const p of entryParts) {
      const examplesForPart: TanakaExample[] | undefined =
        partExamplesMap.get(p);
      if (!examplesForPart) continue;

      for (const ex of examplesForPart)
        if (!seenEx.has(ex.id)) {
          seenEx.add(ex.id);
          validExamples.push(ex);
        }
    }

    if (validExamples.length > 0) wordExamplesMap.set(word.id, validExamples);
  }

  randomWordID = "";

  for (const id of wordExamplesMap.keys())
    if (wordsWithKanjiForms.has(id) && wordDefsMap.has(id)) {
      randomWordID = id;
      break;
    }
});

afterAll(() => {
  charKanjiMap.clear();
  wordExamplesMap.clear();
  wordDefsMap.clear();
});

describe("DictWord transformation to Word", () => {
  it("transformation only with KANJIDIC", () => {
    const entries: Word[] = [];

    for (let i: number = 0; i < convertedJMdict.length; i++) {
      const entry: DictWord = convertedJMdict[i]!;

      const noteTypeName: string = crypto.randomUUID();
      const deckPath: string = crypto.randomUUID();

      const transformedEntry: Word | undefined = getWord(
        entry,
        undefined,
        entry.id !== randomWordID ? charKanjiMap : convertedKanjiDic,
        undefined,
        entry.id !== randomWordID ? wordDefsMap : wordDefs,
        noteTypeName,
        deckPath,
      );

      expect(transformedEntry).toBeDefined();

      if (transformedEntry) {
        checkTransformedEntry(
          transformedEntry,
          entry,
          noteTypeName,
          deckPath,
          true,
        );

        for (let i: number = 0; i < transformedEntry.readings.length; i++)
          transformedEntry.readings[i]!.audio = crypto.randomUUID();

        entries.push(transformedEntry);
      }
    }

    expect(generateAnkiNotesFile(entries).split("\n").length).toBe(
      entries.length + 7,
    );
  });

  it("transformation only with Tanaka examples", () => {
    const entries: Word[] = [];

    for (let i: number = 0; i < convertedJMdict.length; i++) {
      const entry: DictWord = convertedJMdict[i]!;
      const noteTypeName: string = crypto.randomUUID();
      const deckPath: string = crypto.randomUUID();

      const transformedEntry: Word | undefined = getWord(
        entry,
        undefined,
        undefined,
        entry.id !== randomWordID ? wordExamplesMap : convertedTanakaCorpus,
        entry.id !== randomWordID ? wordDefsMap : wordDefs,
        noteTypeName,
        deckPath,
      );

      expect(transformedEntry).toBeDefined();

      if (transformedEntry) {
        checkTransformedEntry(
          transformedEntry,
          entry,
          noteTypeName,
          deckPath,
          undefined,
          true,
        );

        for (let i: number = 0; i < transformedEntry.readings.length; i++)
          transformedEntry.readings[i]!.audio = crypto.randomUUID();

        entries.push(transformedEntry);
      }
    }

    expect(generateAnkiNotesFile(entries).split("\n").length).toBe(
      entries.length + 7,
    );
  });

  it("transformation with KANJIDIC and Tanaka examples", () => {
    const entries: Word[] = [];
    const randomIndex: number = Math.floor(
      Math.random() * convertedJMdict.length,
    );

    for (let i: number = 0; i < convertedJMdict.length; i++) {
      const entry: DictWord = convertedJMdict[i]!;

      const noteTypeName: string = crypto.randomUUID();
      const deckPath: string = crypto.randomUUID();

      const transformedEntry: Word | undefined = getWord(
        entry,
        undefined,
        entry.id !== randomWordID ? charKanjiMap : convertedKanjiDic,
        entry.id !== randomWordID ? wordExamplesMap : convertedTanakaCorpus,
        entry.id !== randomWordID ? wordDefsMap : wordDefs,
        noteTypeName,
        deckPath,
      );

      expect(transformedEntry).toBeDefined();

      if (transformedEntry) {
        if (i === randomIndex) transformedEntry.tags = undefined;

        checkTransformedEntry(
          transformedEntry,
          entry,
          noteTypeName,
          deckPath,
          true,
          true,
          i !== randomIndex ? undefined : true,
        );

        for (let i: number = 0; i < transformedEntry.readings.length; i++)
          transformedEntry.readings[i]!.audio = crypto.randomUUID();

        entries.push(transformedEntry);
      }
    }

    expect(generateAnkiNotesFile(entries).split("\n").length).toBe(
      entries.length + 7,
    );

    const noteID: string = entries[randomIndex]!.noteID!;
    const noteTypeName: string = entries[randomIndex]!.noteTypeName!;
    const deckPath: string = entries[randomIndex]!.deckPath!;

    entries[randomIndex]!.noteID = undefined;

    expect(() =>
      generateAnkiNotesFile(entries, {
        guid: true,
        noteType: true,
        deckPath: true,
      }),
    ).toThrowError("Invalid result list");

    entries[randomIndex]!.noteTypeName = noteTypeName;
    entries[randomIndex]!.deckPath = undefined;

    expect(() =>
      generateAnkiNotesFile(entries, {
        guid: true,
        noteType: true,
        deckPath: true,
      }),
    ).toThrowError("Invalid result list");

    entries[randomIndex]!.deckPath = deckPath;
    entries[randomIndex]!.noteID = undefined;

    expect(() => generateAnkiNotesFile(entries)).toThrowError(
      "Invalid result list",
    );

    entries[randomIndex]!.noteID = noteID;
    entries[randomIndex]!.noteTypeName = undefined;

    expect(() => generateAnkiNotesFile(entries)).toThrowError(
      "Invalid result list",
    );

    entries[randomIndex]!.noteTypeName = noteTypeName;
    entries[randomIndex]!.deckPath = undefined;

    expect(() => generateAnkiNotesFile(entries)).toThrowError(
      "Invalid result list",
    );

    entries[randomIndex]!.noteID = undefined;
    entries[randomIndex]!.noteTypeName = undefined;
    entries[randomIndex]!.deckPath = undefined;

    expect(
      generateAnkiNotesFile(entries, {
        guid: "main_information",
        noteType: "Basic",
        deckPath: "Test::Test 2",
      }).split("\n").length,
    ).toBe(entries.length + 7);

    expect(
      generateAnkiNotesFile(
        entries.map((word: Word) => {
          word.noteID = undefined;
          word.noteTypeName = undefined;
          word.deckPath = undefined;
          return word;
        }),
      ).split("\n").length,
    ).toBe(entries.length + 4);
  });

  it("special cases transformation", () => {
    expect(getWord("-1", idWordMap)).toBeUndefined();

    const testWord: Word | undefined = getWord(
      "1002080",
      idWordMap,
      convertedKanjiDic,
      convertedTanakaCorpus,
    );

    wordExamplesMap.delete("1002080");

    const testWord2: Word | undefined = getWord(
      "1002080",
      convertedJMdict,
      convertedKanjiDic,
      wordExamplesMap,
    );

    idWordMap.delete("1002080");

    const testWord3: Word | undefined = getWord(
      "1002080",
      idWordMap,
      convertedKanjiDic,
      wordExamplesMap,
    );

    expect(testWord).toBeDefined();
    expect(testWord2).toBeDefined();
    expect(testWord && testWord2 && testWord.id === testWord2.id).toBeTruthy();
    expect(testWord3).toBeUndefined();

    if (testWord) {
      testWord.tags = undefined;

      expect(testWord.definitions).toBeUndefined();

      expect(generateAnkiNote(testWord).length).toBe(6);
      expect(generateAnkiNotesFile([]).split("\n").length).toBe(4);
    }
  });
});
