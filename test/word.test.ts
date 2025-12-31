import { describe, it, expect, beforeAll, afterAll, inject } from "vitest";
import {
  DictKanji,
  DictWord,
  EntryMaps,
  Kanji,
  KanjiForm,
  TanakaExample,
  Word,
  WordDefinitionPair,
} from "../src/types";
import {
  convertJawiktionarySync,
  convertJMdict,
  convertKanjiDic,
  convertTanakaCorpusWithFurigana,
  createEntryMaps,
  generateAnkiNote,
  generateAnkiNotesFile,
  getWord,
  getWordDefinitionsWithFurigana,
  isWord,
  shuffleArray,
} from "../src/utils";

function checkTransformedEntry(
  transformedEntry: Word,
  dictEntry: DictWord,
  noteTypeName: string,
  deckPath: string,
  checkKanji?: true,
  checkPhrases?: true,
  ignoreTags?: true,
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

  if (transformedEntry.tags !== undefined)
    expect(transformedEntry.tags.length).toBeGreaterThan(0);

  expect(transformedEntry.common === dictEntry.isCommon).toBeTruthy();
  expect(
    transformedEntry.usuallyInKana === dictEntry.usuallyInKana,
  ).toBeTruthy();

  expect(generateAnkiNote(transformedEntry).length).toBe(
    ignoreTags === true && transformedEntry.tags === undefined ? 6 : 7,
  );

  if (checkKanji === true)
    if (transformedEntry.kanjiForms !== undefined)
      expect(
        transformedEntry.kanjiForms.length > 0 &&
          dictEntry.kanjiForms !== undefined,
      ).toBeTruthy();

  if (transformedEntry.kanji !== undefined)
    expect(
      transformedEntry.kanjiForms !== undefined &&
        transformedEntry.kanji.every(
          (kanji: Kanji) =>
            transformedEntry.kanjiForms !== undefined &&
            transformedEntry.kanjiForms.some((kf: KanjiForm) =>
              kf.kanjiForm.includes(kanji.kanji),
            ),
        ),
    ).toBeTruthy();

  if (checkPhrases === true && transformedEntry.phrases !== undefined)
    expect(transformedEntry.phrases.length).toBeGreaterThan(0);
}

let convertedJMdict: DictWord[];
let convertedKanjiDic: DictKanji[];
let convertedTanakaCorpus: TanakaExample[];
let wordDefs: WordDefinitionPair[];
let entryMaps: EntryMaps;
let randomWordID: string;

beforeAll(async () => {
  convertedTanakaCorpus = await convertTanakaCorpusWithFurigana(
    inject("examples.utf"),
  );

  convertedKanjiDic = shuffleArray<DictKanji>(
    convertKanjiDic(inject("kanjidic2.xml")),
  );

  convertedJMdict = shuffleArray<DictWord>(
    convertJMdict(inject("JMdict_e"), convertedTanakaCorpus),
  );

  wordDefs = await getWordDefinitionsWithFurigana(
    convertJawiktionarySync(inject("raw-wiktextract-data")),
    convertedJMdict,
  );

  entryMaps = createEntryMaps(
    convertedJMdict,
    convertedKanjiDic,
    convertedTanakaCorpus,
    wordDefs,
  );

  randomWordID = "";

  for (const id of entryMaps.wordExamplesMap!.keys())
    if (
      entryMaps.wordIDEntryMap!.get(id)?.kanjiForms !== undefined &&
      entryMaps.wordDefinitionsMap!.has(id)
    ) {
      randomWordID = id;
      break;
    }
});

afterAll(() => (entryMaps = {}));

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
        entry.id !== randomWordID ? entryMaps.kanjiEntryMap : convertedKanjiDic,
        undefined,
        entry.id !== randomWordID ? entryMaps.wordDefinitionsMap : wordDefs,
        noteTypeName,
        deckPath,
      );

      expect(transformedEntry).toBeDefined();

      if (transformedEntry !== undefined) {
        checkTransformedEntry(
          transformedEntry,
          entry,
          noteTypeName,
          deckPath,
          true,
        );

        for (let j: number = 0; j < transformedEntry.readings.length; j++)
          transformedEntry.readings[j]!.audio = crypto.randomUUID();

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
        entry.id !== randomWordID
          ? entryMaps.wordExamplesMap
          : convertedTanakaCorpus,
        entry.id !== randomWordID ? entryMaps.wordDefinitionsMap : wordDefs,
        noteTypeName,
        deckPath,
      );

      expect(transformedEntry).toBeDefined();

      if (transformedEntry !== undefined) {
        checkTransformedEntry(
          transformedEntry,
          entry,
          noteTypeName,
          deckPath,
          undefined,
          true,
        );

        for (let j: number = 0; j < transformedEntry.readings.length; j++)
          transformedEntry.readings[j]!.audio = crypto.randomUUID();

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
        entry.id !== randomWordID ? entryMaps.kanjiEntryMap : convertedKanjiDic,
        entry.id !== randomWordID
          ? entryMaps.wordExamplesMap
          : convertedTanakaCorpus,
        entry.id !== randomWordID ? entryMaps.wordDefinitionsMap : wordDefs,
        noteTypeName,
        deckPath,
      );

      expect(transformedEntry).toBeDefined();

      if (transformedEntry !== undefined) {
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

        for (let j: number = 0; j < transformedEntry.readings.length; j++)
          transformedEntry.readings[j]!.audio = crypto.randomUUID();

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
    expect(getWord("-1", entryMaps.wordIDEntryMap)).toBeUndefined();

    const testWord: Word | undefined = getWord(
      "1002080",
      entryMaps.wordIDEntryMap,
      convertedKanjiDic,
      convertedTanakaCorpus,
    );

    entryMaps.wordExamplesMap?.delete("1002080");

    const testWord2: Word | undefined = getWord(
      "1002080",
      convertedJMdict,
      convertedKanjiDic,
      entryMaps.wordExamplesMap,
    );

    entryMaps.wordIDEntryMap?.delete("1002080");

    const testWord3: Word | undefined = getWord(
      "1002080",
      entryMaps.wordIDEntryMap,
      convertedKanjiDic,
      entryMaps.wordExamplesMap,
    );

    expect(testWord).toBeDefined();
    expect(testWord2).toBeDefined();
    expect(
      testWord !== undefined &&
        testWord2 !== undefined &&
        testWord.id === testWord2.id,
    ).toBeTruthy();
    expect(testWord3).toBeUndefined();

    if (testWord !== undefined) {
      testWord.tags = undefined;

      expect(testWord.definitions).toBeUndefined();

      expect(generateAnkiNote(testWord).length).toBe(6);
      expect(generateAnkiNotesFile([]).split("\n").length).toBe(4);
    }

    expect(Object.keys(createEntryMaps()).length).toBe(0);
  });
});
