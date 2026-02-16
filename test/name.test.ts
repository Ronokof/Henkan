import { describe, it, expect, beforeAll, afterAll, inject } from "vitest";
import {
  DictKanji,
  DictName,
  EntryMaps,
  Kanji,
  KanjiForm,
  TanakaExample,
  Name,
  StringNumber,
} from "../src/types";
import {
  convertJMnedict,
  convertKanjiDic,
  convertTanakaCorpus,
  convertTanakaCorpusWithFurigana,
  createEntryMaps,
  generateAnkiNote,
  generateAnkiNotesFile,
  getName,
  isName,
  shuffleArray,
} from "../src/utils";

function checkTransformedEntry(
  transformedEntry: Name,
  dictEntry: DictName,
  noteTypeName: string,
  deckPath: string,
  checkKanji?: true,
  checkPhrases?: true,
  ignoreTags?: true,
): void {
  expect(isName(transformedEntry)).toBeTruthy();
  expect(
    transformedEntry.id !== undefined && transformedEntry.id === dictEntry.id,
  ).toBeTruthy();
  expect(
    transformedEntry.noteID === `name_${transformedEntry.id}`,
  ).toBeTruthy();
  expect(transformedEntry.nameReadings.length).toBeGreaterThan(0);
  expect(transformedEntry.translations.length).toBeGreaterThan(0);

  expect(transformedEntry.noteTypeName === noteTypeName).toBeTruthy();
  expect(transformedEntry.deckPath === deckPath).toBeTruthy();

  if (ignoreTags === undefined) expect(transformedEntry.tags).toBeDefined();

  if (transformedEntry.tags !== undefined)
    expect(transformedEntry.tags.length).toBeGreaterThan(0);

  expect(transformedEntry.common === dictEntry.isCommon).toBeTruthy();

  expect(generateAnkiNote(transformedEntry).length).toBe(
    ignoreTags === true && transformedEntry.tags === undefined ? 7 : 8,
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

let convertedJMnedict: DictName[];
let convertedKanjiDic: DictKanji[];
let convertedTanakaCorpusWithoutFurigana: TanakaExample[];
let entryMaps: EntryMaps;
let randomNameID: StringNumber;
let dictLength: number;

beforeAll(async () => {
  const convertedTanakaCorpus: TanakaExample[] =
    await convertTanakaCorpusWithFurigana(inject("examples.utf"));

  convertedTanakaCorpusWithoutFurigana = convertTanakaCorpus(
    inject("examples.utf"),
  );

  convertedKanjiDic = shuffleArray<DictKanji>(
    convertKanjiDic(inject("kanjidic2.xml")),
  );

  convertedJMnedict = shuffleArray<DictName>(
    convertJMnedict(inject("JMnedict.xml"), convertedTanakaCorpus),
  );

  entryMaps = createEntryMaps(
    undefined,
    convertedJMnedict,
    convertedKanjiDic,
    convertedTanakaCorpus,
  );

  randomNameID = "-1";

  for (const id of entryMaps.nameExamplesMap!.keys())
    if (
      entryMaps.nameIDEntryMap!.get(id)?.kanjiForms !== undefined &&
      convertedJMnedict.some(
        (name: DictName) => name.id === id && name.hasPhrases === true,
      ) &&
      getName(
        id,
        entryMaps.nameIDEntryMap,
        undefined,
        convertedTanakaCorpusWithoutFurigana,
      )?.phrases !== undefined
    ) {
      randomNameID = id;
      break;
    }

  dictLength = convertedJMnedict.length;
});

afterAll(() => (entryMaps = {}));

describe("DictName transformation to Name", () => {
  it("transformation only with KANJIDIC", () => {
    const entries: Name[] = [];

    for (let i: number = 0; i < dictLength; i++) {
      const entry: DictName = convertedJMnedict[i]!;

      const noteTypeName: string = crypto.randomUUID();
      const deckPath: string = crypto.randomUUID();

      const transformedEntry: Name | undefined = getName(
        entry,
        undefined,
        entry.id !== randomNameID ? entryMaps.kanjiEntryMap : convertedKanjiDic,
        undefined,
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

        for (let j: number = 0; j < transformedEntry.nameReadings.length; j++)
          transformedEntry.nameReadings[j]!.audio = crypto.randomUUID();

        if (i < dictLength / 20 || transformedEntry.id === randomNameID)
          entries.push(transformedEntry);
      }
    }

    expect(
      generateAnkiNotesFile(entries, undefined, "Test", ["test_tag"]).split(
        "\n",
      ).length,
    ).toBe(entries.length + 7);
  });

  it("transformation only with Tanaka examples", () => {
    const entries: Name[] = [];

    for (let i: number = 0; i < dictLength; i++) {
      const entry: DictName = convertedJMnedict[i]!;
      const noteTypeName: string = crypto.randomUUID();
      const deckPath: string = crypto.randomUUID();

      const transformedEntry: Name | undefined = getName(
        entry,
        undefined,
        undefined,
        entry.id !== randomNameID
          ? entryMaps.nameExamplesMap
          : convertedTanakaCorpusWithoutFurigana,
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

        for (let j: number = 0; j < transformedEntry.nameReadings.length; j++)
          transformedEntry.nameReadings[j]!.audio = crypto.randomUUID();

        if (i < dictLength / 20 || transformedEntry.id === randomNameID)
          entries.push(transformedEntry);
      }
    }

    expect(generateAnkiNotesFile(entries).split("\n").length).toBe(
      entries.length + 7,
    );
  });

  it("transformation with KANJIDIC and Tanaka examples", () => {
    const entries: Name[] = [];
    const randomName: DictName =
      convertedJMnedict[Math.floor(Math.random() * dictLength)]!;

    for (let i: number = 0; i < dictLength; i++) {
      const entry: DictName = convertedJMnedict[i]!;

      const noteTypeName: string = crypto.randomUUID();
      const deckPath: string = crypto.randomUUID();

      const transformedEntry: Name | undefined = getName(
        entry,
        undefined,
        entry.id !== randomNameID ? entryMaps.kanjiEntryMap : convertedKanjiDic,
        entry.id !== randomNameID
          ? entryMaps.nameExamplesMap
          : convertedTanakaCorpusWithoutFurigana,
        noteTypeName,
        deckPath,
      );

      expect(transformedEntry).toBeDefined();

      if (transformedEntry !== undefined) {
        if (transformedEntry.id === randomName.id)
          transformedEntry.tags = undefined;

        checkTransformedEntry(
          transformedEntry,
          entry,
          noteTypeName,
          deckPath,
          true,
          true,
          transformedEntry.id !== randomName.id ? undefined : true,
        );

        for (let j: number = 0; j < transformedEntry.nameReadings.length; j++)
          transformedEntry.nameReadings[j]!.audio = crypto.randomUUID();

        if (
          i < dictLength / 20 ||
          transformedEntry.id === randomName.id ||
          transformedEntry.id === randomNameID
        )
          entries.push(transformedEntry);
      }
    }

    expect(generateAnkiNotesFile(entries).split("\n").length).toBe(
      entries.length + 7,
    );

    const randomEntryIndex: number = entries.findIndex(
      (name: Name) => name.id === randomName.id,
    );

    const noteID: string = entries[randomEntryIndex]!.noteID!;
    const noteTypeName: string = entries[randomEntryIndex]!.noteTypeName!;
    const deckPath: string = entries[randomEntryIndex]!.deckPath!;

    entries[randomEntryIndex]!.noteID = undefined;

    expect(() =>
      generateAnkiNotesFile(entries, {
        guid: true,
        noteType: true,
        deckPath: true,
      }),
    ).toThrowError("Invalid result list");

    entries[randomEntryIndex]!.noteID = noteID;
    entries[randomEntryIndex]!.noteTypeName = undefined;

    expect(() =>
      generateAnkiNotesFile(entries, {
        guid: true,
        noteType: true,
        deckPath: true,
      }),
    ).toThrowError("Invalid result list");

    entries[randomEntryIndex]!.noteTypeName = noteTypeName;
    entries[randomEntryIndex]!.deckPath = undefined;

    expect(() =>
      generateAnkiNotesFile(entries, {
        guid: true,
        noteType: true,
        deckPath: true,
      }),
    ).toThrowError("Invalid result list");

    entries[randomEntryIndex]!.deckPath = deckPath;
    entries[randomEntryIndex]!.noteID = undefined;

    expect(() => generateAnkiNotesFile(entries)).toThrowError(
      "Invalid result list",
    );

    entries[randomEntryIndex]!.noteID = noteID;
    entries[randomEntryIndex]!.noteTypeName = undefined;

    expect(() => generateAnkiNotesFile(entries)).toThrowError(
      "Invalid result list",
    );

    entries[randomEntryIndex]!.noteTypeName = noteTypeName;
    entries[randomEntryIndex]!.deckPath = undefined;

    expect(() => generateAnkiNotesFile(entries)).toThrowError(
      "Invalid result list",
    );

    entries[randomEntryIndex]!.noteID = undefined;
    entries[randomEntryIndex]!.noteTypeName = undefined;

    expect(
      generateAnkiNotesFile(entries, {
        guid: "main_information",
        noteType: "Basic",
        deckPath: "Test::Test 2",
      }).split("\n").length,
    ).toBe(entries.length + 7);

    expect(
      generateAnkiNotesFile(
        entries.map((name: Name) => {
          name.noteID = undefined;
          name.noteTypeName = undefined;
          name.deckPath = undefined;
          name.tags = undefined;
          return name;
        }),
      ).split("\n").length,
    ).toBe(entries.length + 4);
  });

  it("special cases transformation", () => {
    expect(getName("-1", entryMaps.nameIDEntryMap)).toBeUndefined();

    const testName: Name | undefined = getName(
      randomNameID,
      entryMaps.nameIDEntryMap,
      convertedKanjiDic,
      convertedTanakaCorpusWithoutFurigana,
    );

    entryMaps.nameExamplesMap?.delete(randomNameID);

    const testName2: Name | undefined = getName(
      randomNameID,
      convertedJMnedict,
      convertedKanjiDic,
      entryMaps.nameExamplesMap,
    );

    entryMaps.nameIDEntryMap?.delete(randomNameID);

    const testName3: Name | undefined = getName(
      randomNameID,
      entryMaps.nameIDEntryMap,
      convertedKanjiDic,
      entryMaps.nameExamplesMap,
    );

    expect(testName).toBeDefined();
    expect(testName2).toBeDefined();
    expect(
      testName !== undefined &&
        testName2 !== undefined &&
        testName.id === testName2.id,
    ).toBeTruthy();
    expect(testName3).toBeUndefined();

    if (testName !== undefined && testName2 !== undefined) {
      testName.tags = undefined;

      expect(generateAnkiNote(testName).length).toBe(7);
      expect(generateAnkiNotesFile([]).split("\n").length).toBe(4);
    }

    expect(Object.keys(createEntryMaps()).length).toBe(0);
    expect(
      Object.keys(createEntryMaps(undefined, convertedJMnedict)).length,
    ).toBe(1);
  });
});
