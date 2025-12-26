import { describe, it, expect, beforeAll, afterAll, inject } from "vitest";
import {
  DictKanji,
  DictKanjiReading,
  DictKanjiReadingMeaning,
  DictKanjiReadingMeaningGroup,
  DictWord,
  EntryMaps,
  Kanji,
  KanjiComponent,
  KanjiForm,
  Reading,
  Translation,
  Word,
} from "../src/types";
import {
  convertJMdict,
  convertKanjiDic,
  createEntryMaps,
  generateAnkiNote,
  generateAnkiNotesFile,
  getKanji,
  getKanjiExtended,
  isKanji,
  shuffleArray,
} from "../src/utils";
import { regexps } from "../src/constants";

function checkTransformedEntry(
  transformedEntry: Kanji,
  dictEntry: DictKanji,
  noteTypeName: string,
  deckPath: string,
  checkWords?: true | undefined,
  kanjiInfo?: Kanji,
  sourceURL?: string,
  ignoreExtraInfo?: true | undefined,
): void {
  expect(isKanji(transformedEntry)).toBeTruthy();
  expect(
    transformedEntry.kanji.length === 1 &&
      transformedEntry.kanji === dictEntry.kanji &&
      regexps.kanji.test(transformedEntry.kanji),
  ).toBeTruthy();
  expect(
    transformedEntry.noteID === `kanji_${transformedEntry.kanji}`,
  ).toBeTruthy();
  expect(transformedEntry.noteTypeName === noteTypeName).toBeTruthy();
  expect(transformedEntry.deckPath === deckPath).toBeTruthy();
  expect(
    transformedEntry.svg === undefined ||
      (transformedEntry.svg.toLowerCase().endsWith(".svg") &&
        transformedEntry.svg
          .toLowerCase()
          .includes(
            transformedEntry.kanji.codePointAt(0)?.toString(16) ?? "KANJIERROR",
          )),
  ).toBeTruthy();

  expect(
    dictEntry.misc !== undefined &&
      transformedEntry.frequency == dictEntry.misc.frequency,
  ).toBeTruthy();
  expect(
    dictEntry.misc !== undefined &&
      transformedEntry.grade === dictEntry.misc.grade,
  ).toBeTruthy();
  expect(
    dictEntry.misc !== undefined &&
      transformedEntry.jlpt === dictEntry.misc.jlpt,
  ).toBeTruthy();
  expect(
    transformedEntry.strokes !== undefined &&
      transformedEntry.strokes.length > 0 &&
      Number.isSafeInteger(Number.parseInt(transformedEntry.strokes)) &&
      dictEntry.misc &&
      transformedEntry.strokes === dictEntry.misc.strokeNumber,
  ).toBeTruthy();

  if (
    dictEntry.readingMeaning !== undefined &&
    dictEntry.readingMeaning.length > 0
  )
    expect(
      dictEntry.readingMeaning.some((rm: DictKanjiReadingMeaning) => {
        let nanori: boolean = false;
        let groups: boolean = false;

        if (rm.nanori && rm.nanori.length > 0)
          nanori = transformedEntry.nanori !== undefined;
        else if (transformedEntry.nanori === undefined) nanori = true;

        groups =
          ((rm.groups === undefined || rm.groups.length === 0) &&
            transformedEntry.meanings === undefined &&
            transformedEntry.onyomi === undefined &&
            transformedEntry.kunyomi === undefined) ||
          (rm.groups !== undefined &&
            rm.groups.some(
              (group: DictKanjiReadingMeaningGroup) =>
                ((transformedEntry.onyomi !== undefined ||
                  transformedEntry.kunyomi !== undefined) &&
                  group.readings !== undefined &&
                  group.readings.some(
                    (kr: DictKanjiReading) =>
                      (transformedEntry.onyomi &&
                        kr.type === "ja_on" &&
                        transformedEntry.onyomi.some(
                          (on: string) => on === kr.reading,
                        )) ||
                      (transformedEntry.kunyomi &&
                        kr.type === "ja_kun" &&
                        transformedEntry.kunyomi.some(
                          (kun: string) => kun === kr.reading,
                        )),
                  )) ||
                (transformedEntry.meanings !== undefined &&
                  group.meanings !== undefined &&
                  group.meanings.some(
                    (meaning: string) =>
                      transformedEntry.meanings &&
                      (dictEntry.isKokuji === true ||
                        transformedEntry.meanings.some(
                          (m: string) => m === meaning,
                        )),
                  )),
            ));

        return nanori && groups;
      }),
    ).toBeTruthy();
  else
    expect(
      transformedEntry.meanings === undefined &&
        transformedEntry.onyomi === undefined &&
        transformedEntry.kunyomi === undefined,
    ).toBeTruthy();

  expect(transformedEntry.tags).toBeDefined();

  if (transformedEntry.tags)
    expect(transformedEntry.tags.length).toBeGreaterThan(0);

  expect(generateAnkiNote(transformedEntry).length).toBe(11);

  if (checkWords && transformedEntry.words)
    expect(
      transformedEntry.words.some(
        (word: Word) =>
          word.kanjiForms &&
          word.kanjiForms.some((kf: KanjiForm) =>
            kf.kanjiForm.includes(transformedEntry.kanji),
          ),
      ),
    ).toBeTruthy();

  if (kanjiInfo && ignoreExtraInfo === undefined) {
    expect(
      transformedEntry.components !== undefined &&
        transformedEntry.components.every(
          (component: KanjiComponent) =>
            kanjiInfo.components &&
            kanjiInfo.components.some(
              (comp: KanjiComponent) =>
                comp.component === component.component &&
                comp.meaning === component.meaning,
            ),
        ),
    ).toBeTruthy();
    expect(transformedEntry.mnemonic === kanjiInfo.mnemonic).toBeTruthy();
    expect(
      transformedEntry.words !== undefined &&
        transformedEntry.words.every(
          (word: Word) =>
            kanjiInfo.words &&
            kanjiInfo.words.some(
              (w: Word) =>
                w.kanjiForms &&
                w.kanjiForms.some(
                  (kf: KanjiForm) =>
                    word.kanjiForms &&
                    word.kanjiForms.some(
                      (kf2: KanjiForm) =>
                        kf.kanjiForm === kf2.kanjiForm &&
                        kf2.kanjiForm.includes(dictEntry.kanji),
                    ),
                ) &&
                w.readings.some((r: Reading) =>
                  word.readings.some((r2: Reading) => r2.reading === r.reading),
                ) &&
                w.translations.some((t: Translation) =>
                  word.translations.some(
                    (t2: Translation) => t2.translation === t.translation,
                  ),
                ),
            ),
        ),
    ).toBeTruthy();
    expect(transformedEntry.source === sourceURL).toBeTruthy();

    expect(
      transformedEntry.tags !== undefined &&
        [
          `kanji::components::${transformedEntry.components!.length}`,
          "kanji::has_mnemonic",
          `kanji::words::${transformedEntry.words!.length}`,
        ].every(
          (tag: string) =>
            transformedEntry.tags &&
            transformedEntry.tags.some((tag2: string) => tag2 === tag),
        ),
    ).toBeTruthy();
  }
}

let convertedJMdict: DictWord[];
let convertedKanjiDic: DictKanji[];
let svgList: readonly string[];
let entryMaps: EntryMaps;
let randomKanjiWithWords: string;
let randomKanjiWithSVG: string;

beforeAll(() => {
  svgList = inject("svg_list");

  convertedKanjiDic = shuffleArray<DictKanji>(
    convertKanjiDic(inject("kanjidic2.xml")),
  );

  convertedJMdict = shuffleArray<DictWord>(convertJMdict(inject("JMdict_e")));

  entryMaps = createEntryMaps(
    convertedJMdict,
    convertedKanjiDic,
    undefined,
    undefined,
    svgList,
  );

  randomKanjiWithSVG = entryMaps.kanjiSVGMap!.keys().toArray()[0]!;
  randomKanjiWithWords = entryMaps.kanjiWordsMap!.keys().toArray()[0]!;
});

afterAll(() => (entryMaps = {}));

describe("DictKanji transformation to Kanji", () => {
  it("transformation without words or extra info", () => {
    const entries: Kanji[] = [];

    for (const entry of convertedKanjiDic) {
      const noteTypeName: string = crypto.randomUUID();
      const deckPath: string = crypto.randomUUID();

      const transformedEntry: Kanji | undefined = getKanji(
        entry,
        undefined,
        undefined,
        entry.kanji !== randomKanjiWithSVG ? entryMaps.kanjiSVGMap : svgList,
        noteTypeName,
        deckPath,
      );

      expect(transformedEntry).toBeDefined();

      if (transformedEntry) {
        checkTransformedEntry(transformedEntry, entry, noteTypeName, deckPath);

        entries.push(transformedEntry);
      }
    }

    expect(generateAnkiNotesFile(entries).split("\n").length).toBe(
      entries.length + 7,
    );
  });

  it("transformation with extra info", () => {
    const entries: Kanji[] = [];

    const randomIndex: number = Math.floor(
      Math.random() * convertedKanjiDic.length,
    );

    for (let i: number = 0; i < convertedKanjiDic.length; i++) {
      const entry: DictKanji = convertedKanjiDic[i]!;

      const noteTypeName: string = crypto.randomUUID();
      const deckPath: string = crypto.randomUUID();
      const sourceURL: string = crypto.randomUUID();

      const kanjiInfo: Kanji = {
        kanji: entry.kanji,
        ...(i !== randomIndex
          ? {
              components: [
                {
                  component: crypto.randomUUID(),
                  meaning: crypto.randomUUID(),
                },
                { component: crypto.randomUUID() },
              ],
            }
          : {}),
        ...(i !== randomIndex ? { mnemonic: crypto.randomUUID() } : {}),
        ...(i !== randomIndex
          ? {
              words: [
                {
                  kanjiForms: [
                    { kanjiForm: `${entry.kanji}-${crypto.randomUUID()}` },
                  ],
                  readings: [{ reading: crypto.randomUUID() }],
                  translations: [{ translation: crypto.randomUUID() }],
                },
              ],
            }
          : {}),
        ...(i !== randomIndex ? { externalInfo: true } : {}),
      };

      const transformedEntry: Kanji | undefined = getKanjiExtended(
        kanjiInfo,
        entry,
        undefined,
        true,
        undefined,
        entry.kanji !== randomKanjiWithSVG ? entryMaps.kanjiSVGMap : svgList,
        noteTypeName,
        deckPath,
        sourceURL,
      );

      expect(transformedEntry).toBeDefined();

      if (transformedEntry) {
        checkTransformedEntry(
          transformedEntry,
          entry,
          noteTypeName,
          deckPath,
          true,
          kanjiInfo,
          sourceURL,
          i !== randomIndex ? undefined : true,
        );

        entries.push(transformedEntry);
      }
    }

    expect(generateAnkiNotesFile(entries).split("\n").length).toBe(
      entries.length + 7,
    );
  });

  it("transformation with words", () => {
    const entries: Kanji[] = [];

    for (let i: number = 0; i < convertedKanjiDic.length; i++) {
      const entry: DictKanji = convertedKanjiDic[i]!;

      const noteTypeName: string = crypto.randomUUID();
      const deckPath: string = crypto.randomUUID();

      const transformedEntry: Kanji | undefined = getKanji(
        entry,
        undefined,
        entry.kanji !== randomKanjiWithWords
          ? entryMaps.kanjiWordsMap
          : convertedJMdict,
        entry.kanji !== randomKanjiWithSVG ? entryMaps.kanjiSVGMap : svgList,
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

        entries.push(transformedEntry);
      }
    }

    expect(generateAnkiNotesFile(entries).split("\n").length).toBe(
      entries.length + 7,
    );

    const randomIndex: number = Math.floor(Math.random() * entries.length);

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

    entries[randomIndex]!.noteID = noteID;
    entries[randomIndex]!.noteTypeName = undefined;

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
        entries.map((kanji: Kanji) => {
          kanji.noteID = undefined;
          kanji.noteTypeName = undefined;
          kanji.deckPath = undefined;
          return kanji;
        }),
      ).split("\n").length,
    ).toBe(entries.length + 4);
  });

  it("special cases transformation", () => {
    expect(
      getKanjiExtended({ kanji: "NAK" }, "NAK", entryMaps.kanjiEntryMap),
    ).toBeUndefined();

    const kokuji: Kanji | undefined = getKanji("込", entryMaps.kanjiEntryMap, [
      {
        id: "123456789",
        kanjiForms: [{ form: "馬" }],
        readings: [{ reading: "うま" }],
        meanings: [{ partOfSpeech: ["noun"], translations: ["horse"] }],
      },
    ]);

    expect(kokuji).toBeDefined();

    if (kokuji) {
      kokuji.strokes = undefined;
      kokuji.tags = undefined;

      expect(kokuji.kokuji === true).toBeTruthy();
      expect(kokuji.meanings && kokuji.meanings.length > 0).toBeTruthy();
      expect(
        kokuji.meanings && !kokuji.meanings.includes("(kokuji)"),
      ).toBeTruthy();
      expect(generateAnkiNote(kokuji).length).toBe(10);
    }

    expect(Object.keys(createEntryMaps()).length).toBe(0);
  });
});
