import { describe, it, expect, beforeAll, afterAll } from "vitest";
import loadDict from "./utils/loadDict";
import {
  DictKanji,
  DictKanjiForm,
  DictKanjiReading,
  DictKanjiReadingMeaning,
  DictKanjiReadingMeaningGroup,
  DictWord,
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
  generateAnkiNote,
  generateAnkiNotesFile,
  getKanji,
  getKanjiExtended,
  isKanji,
} from "../src/utils";
import { regexps } from "../src/constants";

function checkTransformedEntry(
  transformedEntry: Kanji,
  dictEntry: DictKanji,
  noteTypeName: string,
  deckPath: string,
  checkWords?: true | undefined,
  kanjiInfo?: Kanji,
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
    dictEntry.misc && transformedEntry.frequency == dictEntry.misc.frequency,
  ).toBeTruthy();
  expect(
    dictEntry.misc && transformedEntry.grade === dictEntry.misc.grade,
  ).toBeTruthy();
  expect(
    transformedEntry.strokes !== undefined &&
      transformedEntry.strokes.length > 0 &&
      Number.isSafeInteger(Number.parseInt(transformedEntry.strokes)) &&
      dictEntry.misc &&
      transformedEntry.strokes === dictEntry.misc.strokeNumber,
  ).toBeTruthy();

  if (dictEntry.readingMeaning && dictEntry.readingMeaning.length > 0)
    expect(
      dictEntry.readingMeaning.some((rm: DictKanjiReadingMeaning) => {
        let nanori: boolean = false;
        let groups: boolean = false;

        if (rm.nanori && rm.nanori.length > 0)
          nanori = transformedEntry.nanori !== undefined;
        else if (transformedEntry.nanori === undefined) nanori = true;

        groups =
          (rm.groups.length === 0 &&
            transformedEntry.meanings === undefined &&
            transformedEntry.onyomi === undefined &&
            transformedEntry.kunyomi === undefined) ||
          rm.groups.some(
            (group: DictKanjiReadingMeaningGroup) =>
              ((transformedEntry.onyomi !== undefined ||
                transformedEntry.kunyomi !== undefined) &&
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
                group.meanings.some(
                  (meaning: string) =>
                    transformedEntry.meanings &&
                    ((dictEntry.isKokuji === true && meaning === "(kokuji)") ||
                      transformedEntry.meanings.some(
                        (m: string) => m === meaning,
                      )),
                )),
          );

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

  if (kanjiInfo) {
    expect(
      transformedEntry.components &&
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
      transformedEntry.words &&
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
    expect(
      transformedEntry.source === `https://jpdb.io/kanji/${dictEntry.kanji}`,
    ).toBeTruthy();

    expect(
      transformedEntry.tags &&
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
let convertedKanjiDicWithWords: DictKanji[];
let svgList: string[];

beforeAll(async () => {
  const kanjidic: string = (await loadDict("kanjidic2.xml")) as string;
  const jmdict: string = (await loadDict("JMdict_e")) as string;
  svgList = (await loadDict("svg_list")) as string[];

  const kanjiChars: Set<string> = new Set<string>();

  convertedKanjiDic = convertKanjiDic(kanjidic).filter(
    (kanji: DictKanji) =>
      kanji.isKokuji === true ||
      (kanji.misc &&
        (kanji.misc.frequency !== undefined ||
          kanji.misc.grade !== undefined ||
          kanji.misc.jlpt !== undefined) &&
        ((kanji.readingMeaning &&
          kanji.readingMeaning.some(
            (rm: DictKanjiReadingMeaning) => rm.nanori !== undefined,
          )) ||
          kanji.readingMeaning === undefined)),
  );

  for (const kanji of convertedKanjiDic)
    if (!kanjiChars.has(kanji.kanji)) kanjiChars.add(kanji.kanji);

  const kanjiWithWords: Set<string> = new Set<string>();

  convertedJMdict = convertJMdict(jmdict).filter(
    (word: DictWord) =>
      word.kanjiForms &&
      word.kanjiForms.some((kf: DictKanjiForm) =>
        kf.form.split("").some((char: string) => {
          if (kanjiChars.has(char)) {
            kanjiWithWords.add(char);
            return true;
          } else return false;
        }),
      ),
  );

  convertedKanjiDicWithWords = convertedKanjiDic
    .filter((kanji: DictKanji) => kanjiWithWords.has(kanji.kanji))
    .slice(0, 101);
});

afterAll(() => {
  convertedJMdict.length = 0;
  convertedKanjiDic.length = 0;
  convertedKanjiDicWithWords.length = 0;
  svgList.length = 0;
});

describe("DictKanji transformation to Kanji", () => {
  it("transformation without words or extra info", () => {
    const entries: Kanji[] = [];

    for (const entry of convertedKanjiDic) {
      const noteTypeName: string = crypto.randomUUID();
      const deckPath: string = crypto.randomUUID();

      const transformedEntry: Kanji = getKanji(
        convertedKanjiDic,
        undefined,
        entry,
        undefined,
        svgList,
        noteTypeName,
        deckPath,
      );

      checkTransformedEntry(transformedEntry, entry, noteTypeName, deckPath);

      entries.push(transformedEntry);
    }

    expect(generateAnkiNotesFile(entries).split("\n").length).toBe(
      entries.length + 7,
    );
  });

  it("transformation with extra info", () => {
    const entries: Kanji[] = [];

    for (const entry of convertedKanjiDicWithWords) {
      const noteTypeName: string = crypto.randomUUID();
      const deckPath: string = crypto.randomUUID();

      const kanjiInfo: Kanji = {
        kanji: entry.kanji,
        components: [
          { component: crypto.randomUUID(), meaning: crypto.randomUUID() },
          { component: crypto.randomUUID() },
        ],
        mnemonic: crypto.randomUUID(),
        words: [
          {
            kanjiForms: [
              { kanjiForm: `${entry.kanji}-${crypto.randomUUID()}` },
            ],
            readings: [{ reading: crypto.randomUUID() }],
            translations: [{ translation: crypto.randomUUID() }],
          },
        ],
        fromJpdb: true,
      };

      const transformedEntry: Kanji = getKanjiExtended(
        kanjiInfo,
        convertedKanjiDicWithWords,
        undefined,
        entry,
        true,
        convertedJMdict,
        svgList,
        noteTypeName,
        deckPath,
      );

      checkTransformedEntry(
        transformedEntry,
        entry,
        noteTypeName,
        deckPath,
        true,
        kanjiInfo,
      );

      entries.push(transformedEntry);
    }

    expect(generateAnkiNotesFile(entries).split("\n").length).toBe(
      entries.length + 7,
    );
  });

  it("transformation with words", () => {
    const entries: Kanji[] = [];

    for (const entry of convertedKanjiDicWithWords) {
      const noteTypeName: string = crypto.randomUUID();
      const deckPath: string = crypto.randomUUID();

      const transformedEntry: Kanji = getKanji(
        convertedKanjiDic,
        undefined,
        entry,
        convertedJMdict,
        svgList,
        noteTypeName,
        deckPath,
      );

      checkTransformedEntry(
        transformedEntry,
        entry,
        noteTypeName,
        deckPath,
        true,
      );

      entries.push(transformedEntry);
    }

    expect(generateAnkiNotesFile(entries).split("\n").length).toBe(
      entries.length + 7,
    );
  });
});
