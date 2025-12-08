import { describe, it, expect, beforeAll, afterAll } from "vitest";
import loadDict from "./utils/loadDict";
import {
  DictKanji,
  DictKanjiForm,
  DictMeaning,
  DictReading,
  DictTranslation,
  DictWord,
  Kanji,
  KanjiForm,
  TanakaExample,
  Word,
  WordDefinitionPair,
} from "../src/types";
import {
  convertJMdict,
  convertKanjiDic,
  convertTanakaCorpus,
  generateAnkiNote,
  generateAnkiNotesFile,
  getWord,
  isWord,
} from "../src/utils";
import { regexps } from "../src/constants";

function checkTransformedEntry(
  transformedEntry: Word,
  dictEntry: DictWord,
  noteTypeName: string,
  deckPath: string,
  checkKanji?: true | undefined,
  checkPhrases?: true | undefined,
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

  expect(transformedEntry.tags).toBeDefined();

  if (transformedEntry.tags)
    expect(transformedEntry.tags.length).toBeGreaterThan(0);

  expect(transformedEntry.common === dictEntry.isCommon).toBeTruthy();
  expect(
    transformedEntry.usuallyInKana === dictEntry.usuallyInKana,
  ).toBeTruthy();

  expect(generateAnkiNote(transformedEntry).length).toBe(7);

  if (checkKanji === true)
    if (transformedEntry.kanjiForms)
      expect(
        transformedEntry.kanjiForms.length > 0 && dictEntry.kanjiForms,
      ).toBeTruthy();
  if (transformedEntry.kanji)
    expect(
      transformedEntry.kanji.length > 0 &&
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

let convertedJMdictWithKanji: DictWord[];
let convertedJMdictWithExamples: DictWord[];
let convertedJMdictWithKanjiAndExamples: DictWord[];
let convertedKanjiDic: DictKanji[];
let convertedTanakaCorpus: TanakaExample[];
let wordDefs: WordDefinitionPair[];

beforeAll(async () => {
  const jmdict: string = (await loadDict("JMdict_e")) as string;
  const kanjidic: string = (await loadDict("kanjidic2.xml")) as string;
  const examples: string = (await loadDict("examples.utf")) as string;
  wordDefs = (await loadDict("word_defs.json")) as WordDefinitionPair[];
  convertedTanakaCorpus = await convertTanakaCorpus(examples);

  const kanjiChars: Set<string> = new Set<string>();

  convertedKanjiDic = convertKanjiDic(kanjidic);

  for (const kanji of convertedKanjiDic)
    if (!kanjiChars.has(kanji.kanji)) kanjiChars.add(kanji.kanji);

  const convertedJMdict: DictWord[] = convertJMdict(
    jmdict,
    convertedTanakaCorpus,
  ).filter(
    (entry: DictWord) =>
      (entry.isCommon === true || entry.usuallyInKana === true) &&
      ((entry.kanjiForms &&
        entry.kanjiForms.some(
          (kf: DictKanjiForm) =>
            kf.commonness !== undefined ||
            kf.notes !== undefined ||
            !regexps.kanji.test(kf.form),
        )) ||
        entry.kanjiForms === undefined) &&
      entry.readings.some(
        (r: DictReading) =>
          r.commonness !== undefined ||
          r.kanjiFormRestrictions !== undefined ||
          r.notes !== undefined,
      ) &&
      entry.meanings.some(
        (m: DictMeaning) =>
          (m.antonyms !== undefined ||
            m.dialects !== undefined ||
            m.fields !== undefined ||
            m.info !== undefined ||
            m.kanjiFormRestrictions !== undefined ||
            m.misc !== undefined ||
            m.partOfSpeech !== undefined ||
            m.readingRestrictions !== undefined ||
            m.references !== undefined) &&
          m.translations !== undefined &&
          m.translations.some((t: DictTranslation) => typeof t === "object"),
      ),
  );

  const kanjiWithWords: Set<string> = new Set<string>();
  const seenWords: Set<string> = new Set<string>();
  const kanjiFormsAndReadings: Set<string> = new Set<string>();

  convertedJMdictWithKanji = convertedJMdict.filter((word: DictWord) => {
    if (
      word.kanjiForms &&
      word.kanjiForms.some((kf: DictKanjiForm) =>
        kf.form.split("").some((char: string) => {
          if (kanjiChars.has(char)) {
            kanjiWithWords.add(char);
            return true;
          } else return false;
        }),
      )
    ) {
      for (const r of word.readings)
        if (!kanjiFormsAndReadings.has(r.reading))
          kanjiFormsAndReadings.add(r.reading);
      for (const kf of word.kanjiForms)
        if (!kanjiFormsAndReadings.has(kf.form))
          kanjiFormsAndReadings.add(kf.form);

      return true;
    } else return false;
  });
  convertedJMdictWithExamples = convertedJMdict.filter((word: DictWord) => {
    if (word.hasPhrases === true) {
      for (const r of word.readings)
        if (!kanjiFormsAndReadings.has(r.reading))
          kanjiFormsAndReadings.add(r.reading);
      if (word.kanjiForms)
        for (const kf of word.kanjiForms)
          if (!kanjiFormsAndReadings.has(kf.form))
            kanjiFormsAndReadings.add(kf.form);

      return true;
    } else return false;
  });
  convertedJMdictWithKanjiAndExamples = [
    ...convertedJMdictWithKanji,
    ...convertedJMdictWithExamples,
  ].filter((word: DictWord) => {
    if (!seenWords.has(word.id)) {
      seenWords.add(word.id);
      return (
        word.kanjiForms &&
        word.kanjiForms.some((kf: DictKanjiForm) =>
          kf.form.split("").some((char: string) => kanjiChars.has(char)),
        ) &&
        word.hasPhrases === true
      );
    } else return false;
  });

  convertedKanjiDic = convertedKanjiDic.filter((kanji: DictKanji) =>
    kanjiWithWords.has(kanji.kanji),
  );
  convertedTanakaCorpus = convertedTanakaCorpus.filter((ex: TanakaExample) => {
    const partParts: Set<string> = new Set<string>();

    for (const part of ex.parts) {
      if (!partParts.has(part.baseForm)) partParts.add(part.baseForm);
      if (part.reading && !partParts.has(part.reading))
        partParts.add(part.reading);
      if (part.inflectedForm && !partParts.has(part.inflectedForm))
        partParts.add(part.inflectedForm);
    }

    for (const part of partParts)
      if (kanjiFormsAndReadings.has(part)) return true;

    return false;
  });
});

afterAll(() => {
  convertedJMdictWithKanji.length = 0;
  convertedJMdictWithExamples.length = 0;
  convertedJMdictWithKanjiAndExamples.length = 0;
  convertedKanjiDic.length = 0;
  convertedTanakaCorpus.length = 0;
  wordDefs.length = 0;
});

describe("DictWord transformation to Word", () => {
  it("transformation only with KANJIDIC", () => {
    const entries: Word[] = [];

    for (const entry of convertedJMdictWithKanji) {
      const noteTypeName: string = crypto.randomUUID();
      const deckPath: string = crypto.randomUUID();

      const transformedEntry: Word = getWord(
        undefined,
        undefined,
        convertedKanjiDic,
        undefined,
        wordDefs,
        entry,
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

  it("transformation only with Tanaka examples", () => {
    const entries: Word[] = [];

    for (const entry of convertedJMdictWithExamples) {
      const noteTypeName: string = crypto.randomUUID();
      const deckPath: string = crypto.randomUUID();

      const transformedEntry: Word = getWord(
        undefined,
        undefined,
        undefined,
        convertedTanakaCorpus,
        wordDefs,
        entry,
        noteTypeName,
        deckPath,
      );

      checkTransformedEntry(
        transformedEntry,
        entry,
        noteTypeName,
        deckPath,
        undefined,
        true,
      );

      entries.push(transformedEntry);
    }

    expect(generateAnkiNotesFile(entries).split("\n").length).toBe(
      entries.length + 7,
    );
  });

  it("transformation with KANJIDIC and Tanaka examples", () => {
    const entries: Word[] = [];

    for (const entry of convertedJMdictWithKanjiAndExamples) {
      const noteTypeName: string = crypto.randomUUID();
      const deckPath: string = crypto.randomUUID();

      const transformedEntry: Word = getWord(
        undefined,
        undefined,
        convertedKanjiDic,
        convertedTanakaCorpus,
        wordDefs,
        entry,
        noteTypeName,
        deckPath,
      );

      checkTransformedEntry(
        transformedEntry,
        entry,
        noteTypeName,
        deckPath,
        true,
        true,
      );

      entries.push(transformedEntry);
    }

    expect(generateAnkiNotesFile(entries).split("\n").length).toBe(
      entries.length + 7,
    );
  });
});
