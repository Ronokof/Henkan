import libxml from "libxmljs2";
import xml from "xml2js";
import iconv from "iconv-lite";
import {
  noteHeaderKeys,
  noteMap,
  notSearchedForms,
  regexps,
} from "./constants";
import {
  DefaultNoteInfo,
  Definition,
  DictKanji,
  DictKanjiForm,
  DictKanjiReading,
  DictKanjiReadingMeaning,
  DictKanjiReadingMeaningGroup,
  DictKanjiWithRadicals,
  DictMeaning,
  DictRadical,
  DictReading,
  DictTranslation,
  DictWord,
  EntryMaps,
  ExamplePart,
  Grammar,
  JaWiktionaryEntry,
  JLPT,
  Kana,
  Kanji,
  KanjiComponent,
  KanjiEntryMap,
  KanjiForm,
  KanjiSVGMap,
  KanjiWordsMap,
  NoteAndTag,
  Phrase,
  POS,
  Radical,
  Reading,
  ReadingsKanjiFormsPair,
  Result,
  StringNumber,
  TanakaExample,
  TanakaID,
  Translation,
  Word,
  WordDefinitionPair,
  WordDefinitionsMap,
  WordExamplesMap,
  WordIDEntryMap,
} from "./types";
import { ReadStream } from "fs";
import { createInterface, Interface } from "readline";

const Kuroshiro: any = require("kuroshiro");
const KuromojiAnalyzer: any = require("kuroshiro-analyzer-kuromoji");

/**
 * Capitalizes a string.
 * @param value The string to capitalize
 * @returns The capitalized string
 */
export function capitalizeString(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Checks if the argument is an array and has at least one element.
 * @param arg The argument
 * @returns Whether or not {@link arg} is an array and has at least one element
 */
export function isValidArrayWithFirstElement(arg: unknown): arg is any[] {
  return Array.isArray(arg) && arg.length > 0;
}

/**
 * Checks if the argument is an array of strings.
 * @param arg The argument
 * @returns Whether or not {@link arg} is an array of strings
 */
export function isStringArray(arg: unknown): arg is string[] {
  return (
    isValidArrayWithFirstElement(arg) &&
    arg.every((element: any) => typeof element === "string")
  );
}

/**
 * Checks if the argument is an array of object.
 * @param arg The argument
 * @returns Whether or not {@link arg} is an array of objects
 */
export function isObjectArray(arg: unknown): arg is any[] {
  return (
    isValidArrayWithFirstElement(arg) &&
    arg.every((element: unknown) => typeof element === "object")
  );
}

/**
 * Shuffles an array using the `Fisher–Yates shuffle` algorithm
 * @param arr The array to be shuffled
 * @returns The shuffled array
 */
export function shuffleArray<T>(arr: readonly T[]): T[] {
  const a: T[] = arr.slice();

  for (let i: number = a.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    const tmp: T = a[i]!;
    a[i] = a[j]!;
    a[j] = tmp;
  }

  return a;
}

/**
 * Filters out all the old/rare or (if {@link wordIsCommon} is `true`) uncommon readings and kanji forms of a JMdict entry.
 * @param readings The word's readings
 * @param kanjiForms The word's kanji forms
 * @param wordIsCommon Whether or not the word is common
 * @returns An object containing the valid readings and kanji forms of the word
 */
export function getValidForms(
  readings: readonly DictReading[],
  kanjiForms?: readonly DictKanjiForm[] | undefined,
  wordIsCommon?: true | undefined,
): ReadingsKanjiFormsPair {
  const kanjiFormRestrictions: Set<string> = new Set<string>();

  const validReadings: DictReading[] = readings.filter(
    (reading: DictReading, index: number) => {
      if (index === 0) return true;

      if (
        reading.notes === undefined ||
        !reading.notes.some((note: string) => notSearchedForms.has(note))
      ) {
        if (reading.kanjiFormRestrictions) {
          for (const kfr of reading.kanjiFormRestrictions)
            kanjiFormRestrictions.add(kfr);

          return true;
        }

        if (wordIsCommon === undefined || reading.commonness !== undefined)
          return true;
      }

      return false;
    },
  );

  const existValidKf: boolean | undefined =
    kanjiForms !== undefined
      ? kanjiForms.some(
          (kf: DictKanjiForm, index: number) =>
            index !== 0 &&
            (((kf.notes === undefined ||
              !kf.notes.some((note: string) => notSearchedForms.has(note))) &&
              (wordIsCommon === undefined || kf.commonness !== undefined)) ||
              kanjiFormRestrictions.has(kf.form)),
        )
      : undefined;

  const validKanjiForms: DictKanjiForm[] | undefined =
    kanjiForms !== undefined
      ? kanjiForms.filter((kanjiForm: DictKanjiForm, index: number) => {
          if (index === 0) return true;

          if (existValidKf === true)
            return (
              ((kanjiForm.notes === undefined ||
                !kanjiForm.notes.some((note: string) =>
                  notSearchedForms.has(note),
                )) &&
                (wordIsCommon === undefined ||
                  kanjiForm.commonness !== undefined)) ||
              kanjiFormRestrictions.has(kanjiForm.form)
            );
          else return true;
        })
      : undefined;

  return {
    readings: validReadings,
    ...(validKanjiForms ? { kanjiForms: validKanjiForms } : {}),
  };
}

/**
 * Converts a JMdict `JMdict_e` file into an array of {@link DictWord} objects.
 * @param xmlString The raw `JMdict_e` file contents
 * @param examples An array of converted `Tanaka Corpus` examples
 * @returns An array of converted {@link DictWord} objects
 */
export function convertJMdict(
  xmlString: string,
  examples?: readonly TanakaExample[] | undefined,
): DictWord[] {
  const dictParsed: libxml.Document = libxml.parseXml(xmlString, {
    dtdvalid: true,
    nonet: false,
    noent: true,
    recover: false,
  });
  const dict: DictWord[] = [];

  xml.parseString(dictParsed, (_err: Error | null, result: any) => {
    const tanakaParts: Set<string> | undefined =
      examples && examples.length > 0
        ? new Set<string>(
            examples.flatMap((example: TanakaExample) =>
              example.parts.flatMap((part: ExamplePart) => [
                part.baseForm,
                ...(part.reading ? [part.reading] : []),
                ...(part.inflectedForm ? [part.inflectedForm] : []),
                ...(part.referenceID ? [part.referenceID] : []),
              ]),
            ),
          )
        : undefined;

    for (const entry of result.JMdict.entry) {
      const entryObj: DictWord = {
        id: entry.ent_seq[0],
        readings: [],
        meanings: [],
      };

      const kanjiForms: any = entry.k_ele;
      const readings: any = entry.r_ele;
      const meanings: any = entry.sense;

      if (isObjectArray(kanjiForms)) {
        entryObj.kanjiForms = [];

        for (const kanjiForm of kanjiForms) {
          const form: DictKanjiForm = {
            form: kanjiForm.keb[0],
          };

          if (isStringArray(kanjiForm.ke_inf)) form.notes = kanjiForm.ke_inf;
          if (isStringArray(kanjiForm.ke_pri)) {
            form.commonness = kanjiForm.ke_pri;

            if (entryObj.isCommon === undefined) entryObj.isCommon = true;
          }

          entryObj.kanjiForms.push(form);
        }
      }

      for (const reading of readings) {
        const readingObj: DictReading = {
          reading: reading.reb[0],
        };

        if (isStringArray(reading.re_inf)) readingObj.notes = reading.re_inf;
        if (isStringArray(reading.re_restr))
          readingObj.kanjiFormRestrictions = reading.re_restr;
        if (isStringArray(reading.re_pri)) {
          readingObj.commonness = reading.re_pri;

          if (entryObj.isCommon === undefined) entryObj.isCommon = true;
        }

        entryObj.readings.push(readingObj);
      }

      let usuallyInKanaMeanings: number = 0;

      for (const meaning of meanings) {
        const meaningObj: DictMeaning = { partOfSpeech: [], translations: [] };

        meaningObj.partOfSpeech = meaning.pos;

        meaningObj.translations = [];

        for (const gloss of meaning.gloss)
          if (typeof gloss === "string") meaningObj.translations.push(gloss);
          else if (
            typeof gloss === "object" &&
            gloss._ &&
            typeof gloss._ === "string" &&
            gloss.$ &&
            typeof gloss.$ === "object" &&
            gloss.$.g_type &&
            (gloss.$.g_type === "lit" ||
              gloss.$.g_type === "expl" ||
              gloss.$.g_type === "tm")
          )
            meaningObj.translations.push({
              translation: gloss._,
              type: gloss.$.g_type,
            });

        if (isStringArray(meaning.xref)) meaningObj.references = meaning.xref;
        if (isStringArray(meaning.stagk))
          meaningObj.kanjiFormRestrictions = meaning.stagk;
        if (isStringArray(meaning.stagr))
          meaningObj.readingRestrictions = meaning.stagr;
        if (isStringArray(meaning.ant)) meaningObj.antonyms = meaning.ant;
        if (isStringArray(meaning.field)) meaningObj.fields = meaning.field;
        if (isStringArray(meaning.s_inf)) meaningObj.info = meaning.s_inf;
        if (isStringArray(meaning.misc)) {
          meaningObj.misc = meaning.misc;

          if (
            meaningObj.misc &&
            meaningObj.misc.includes("word usually written using kana alone")
          )
            usuallyInKanaMeanings++;
        }
        if (isStringArray(meaning.dial)) meaningObj.dialects = meaning.dial;

        entryObj.meanings.push(meaningObj);
      }

      if (entryObj.meanings.length === usuallyInKanaMeanings)
        entryObj.usuallyInKana = true;

      if (examples) {
        let existsExample: boolean = false;

        if (tanakaParts && tanakaParts.has(entryObj.id)) existsExample = true;

        if (!existsExample) {
          const rkf: ReadingsKanjiFormsPair = getValidForms(
            entryObj.readings,
            entryObj.kanjiForms,
            entryObj.isCommon,
          );

          const readings: Set<string> = new Set<string>(
            rkf.readings.map((r: DictReading) => r.reading),
          );
          const kanjiForms: Set<string> | undefined = rkf.kanjiForms
            ? new Set<string>(
                rkf.kanjiForms.map((kf: DictKanjiForm) => kf.form),
              )
            : undefined;

          if (kanjiForms && kanjiForms.size > 0 && tanakaParts)
            for (const kf of kanjiForms)
              if (tanakaParts.has(kf)) {
                existsExample = true;
                break;
              }
          if (
            entryObj.kanjiForms === undefined &&
            readings.size > 0 &&
            tanakaParts
          )
            for (const r of readings)
              if (tanakaParts.has(r)) {
                existsExample = true;
                break;
              }
        }

        if (existsExample) entryObj.hasPhrases = true;
      }

      dict.push(entryObj);
    }
  });

  return dict;
}

/**
 * Converts a KANJIDIC `kanjidic2.xml` file into an array of {@link DictKanji} objects.
 * @param xmlString The raw `kanjidic2.xml` file contents
 * @returns An array of converted {@link DictKanji} objects
 */
export function convertKanjiDic(xmlString: string): DictKanji[] {
  const dictParsed: libxml.Document = libxml.parseXml(xmlString, {
    dtdvalid: true,
    nonet: false,
    noent: true,
    recover: false,
  });
  const dict: DictKanji[] = [];

  xml.parseString(dictParsed, (_err: Error | null, result: any) => {
    for (const entry of result.kanjidic2.character) {
      const kanjiObj: DictKanji = {
        kanji: entry.literal[0],
        readingMeaning: [],
      };

      if (typeof kanjiObj.kanji === "string" && kanjiObj.kanji.length === 1) {
        const misc: any = entry.misc[0];

        kanjiObj.misc = { strokeNumber: misc.stroke_count[0] };

        if (isStringArray(misc.grade)) kanjiObj.misc.grade = misc.grade[0];
        if (isStringArray(misc.freq)) kanjiObj.misc.frequency = misc.freq[0];
        if (
          isStringArray(misc.jlpt) &&
          ["5", "4", "3", "2", "1"].includes(misc.jlpt[0])
        )
          kanjiObj.misc.jlpt = `N${misc.jlpt[0]}` as JLPT;

        if (isObjectArray(entry.reading_meaning))
          for (const rm of entry.reading_meaning) {
            const rmObj: DictKanjiReadingMeaning = { groups: [] };

            for (const group of rm.rmgroup) {
              const groupObj: DictKanjiReadingMeaningGroup = {
                readings: [],
                meanings: [],
              };

              if (isObjectArray(group.reading))
                for (const reading of group.reading)
                  if (
                    reading._ &&
                    typeof reading._ === "string" &&
                    reading.$ &&
                    typeof reading.$ === "object" &&
                    reading.$.r_type &&
                    (reading.$.r_type === "ja_on" ||
                      reading.$.r_type === "ja_kun")
                  )
                    groupObj.readings!.push({
                      reading: reading._,
                      type: reading.$.r_type,
                    });

              if (Array.isArray(group.meaning))
                for (const meaning of group.meaning)
                  if (typeof meaning === "string") {
                    if (
                      kanjiObj.isKokuji === undefined &&
                      meaning === "(kokuji)"
                    ) {
                      kanjiObj.isKokuji = true;
                      continue;
                    }

                    groupObj.meanings!.push(meaning);
                  }
              if (
                groupObj.readings!.length > 0 ||
                groupObj.meanings!.length > 0
              ) {
                if (groupObj.readings!.length === 0) delete groupObj.readings;
                if (groupObj.meanings!.length === 0) delete groupObj.meanings;

                rmObj.groups!.push(groupObj);
              }
            }

            if (isStringArray(rm.nanori) && rm.nanori.length > 0)
              rmObj.nanori = rm.nanori;

            if (rmObj.groups!.length > 0 || rmObj.nanori)
              kanjiObj.readingMeaning!.push(rmObj);
          }

        dict.push(kanjiObj);
      }
    }
  });

  return dict;
}

/**
 * Converts a Tanaka Corpus `examples.utf` file into an array of {@link TanakaExample} objects.
 * @param tanakaString The raw contents of a `examples.utf` file
 * @returns A promise resolving with an array of converted {@link TanakaExample} objects
 */
export function convertTanakaCorpus(tanakaString: string): TanakaExample[] {
  const tanakaArray: TanakaExample[] = [];
  const tanakaParsed: string[] = tanakaString.split("\n");

  for (let i: number = 0; i <= tanakaParsed.length; i += 2) {
    let a: string | undefined = tanakaParsed[i];
    let b: string | undefined = tanakaParsed[i + 1];

    if (a && b && a.startsWith("A: ") && b.startsWith("B: ")) {
      a = a.replace("A: ", "");
      b = b.replace("B: ", "");

      const idMatch: RegExpExecArray | null = regexps.tanakaID.exec(a);

      const aParts: string[] = a.replace(regexps.tanakaID, "").split("\t");

      const bRawParts = b
        .split(" ")
        .filter((part: string) => part.trim().length !== 0);

      const bParts: ExamplePart[] = [];

      for (const part of bRawParts) {
        const partMatches: RegExpExecArray | null =
          regexps.tanakaPart.exec(part);

        const baseForm: string = partMatches?.groups!["base"]!;

        const examplePart: ExamplePart = { baseForm: baseForm };

        const reading: string | undefined = partMatches?.groups!["reading"];
        const glossNumber: string | undefined =
          partMatches?.groups!["glossnum"];
        const inflectedForm: string | undefined =
          partMatches?.groups!["inflection"];

        if (reading)
          if (regexps.tanakaReferenceID.test(reading)) {
            const referenceID: RegExpExecArray | null =
              regexps.tanakaReferenceID.exec(reading);

            examplePart.referenceID = referenceID?.groups![
              "entryid"
            ] as StringNumber;
          } else examplePart.reading = reading;

        if (glossNumber)
          examplePart.glossNumber = glossNumber.startsWith("0")
            ? Number.parseInt(glossNumber.substring(1))
            : Number.parseInt(glossNumber);
        if (inflectedForm) examplePart.inflectedForm = inflectedForm;
        if (baseForm.endsWith("~")) {
          examplePart.edited = true;
          examplePart.baseForm = examplePart.baseForm.replace("~", "");
        }

        bParts.push(examplePart);
      }

      const phrase: string = aParts[0]!;
      const translation: string = aParts[1]!;

      tanakaArray.push({
        id: idMatch?.groups!["id"]?.trim() as TanakaID,
        phrase: phrase.trim(),
        translation: translation.trim(),
        parts: bParts,
      });
    }
  }

  return tanakaArray;
}

/**
 * Converts a Tanaka Corpus `examples.utf` file into an array of {@link TanakaExample} objects (with furigana).
 * @param tanakaString The raw contents of a `examples.utf` file
 * @returns A promise resolving with an array of converted {@link TanakaExample} objects (with furigana)
 */
export async function convertTanakaCorpusWithFurigana(
  tanakaString: string,
): Promise<TanakaExample[]> {
  return new Promise<TanakaExample[]>(
    async (
      resolve: (value: TanakaExample[] | PromiseLike<TanakaExample[]>) => void,
    ) => {
      let tanakaArray: TanakaExample[] = convertTanakaCorpus(tanakaString);

      const kuroshiro: any = new Kuroshiro.default();

      await kuroshiro.init(new KuromojiAnalyzer());

      const convert: any = kuroshiro.convert.bind(kuroshiro);

      tanakaArray = await Promise.all(
        tanakaArray.map(async (ex: TanakaExample) => {
          let furigana: string | undefined = undefined;

          if (convert !== null && !ex.phrase.includes("・"))
            furigana = (await convert(ex.phrase, {
              to: "hiragana",
              mode: "furigana",
            })) as string;

          if (furigana) ex.furigana = furigana;

          return ex;
        }),
      );

      resolve(tanakaArray);
    },
  );
}

/**
 * Converts a `radkfile2` file (EUC-JP encoded) into an array of {@link DictRadical} objects.
 * @param radkBuffer A `radkfile2` buffer
 * @param kanjiDic An array of converted `KANJIDIC` entries
 * @returns An array of converted {@link DictRadical} objects
 */
export function convertRadkFile(
  radkBuffer: Buffer<ArrayBuffer>,
  kanjiDic: readonly DictKanji[],
): DictRadical[] {
  const fileParsed: string[] = iconv
    .decode(radkBuffer, "euc-jp")
    .split("\n")
    .filter((line: string) => !line.startsWith("#"));
  const radicals: DictRadical[] = [];

  for (let i = 0; i < fileParsed.length; i++) {
    const line: string | undefined = fileParsed[i];

    if (line && line.startsWith("$ ")) {
      const radical: DictRadical = {
        radical: line.charAt(2).trim(),
        strokes: line.substring(4).trim(),
      };

      let j: number = i + 1;
      let kanjiLine: string | undefined = fileParsed[j];

      const kanjiList: DictKanji[] = [];

      while (kanjiLine && !kanjiLine.startsWith("$ ")) {
        const kanjis: string[] = kanjiLine.split("");

        for (const kanji of kanjis) {
          const foundKanji: DictKanji = kanjiDic.find(
            (dictKanji: DictKanji) => dictKanji.kanji === kanji,
          )!;

          let kanjiObj: DictKanji = { kanji: kanji };

          kanjiObj = foundKanji;

          kanjiList.push(kanjiObj);
        }

        kanjiLine = fileParsed[++j];
        if (!kanjiLine) continue;

        if (kanjiLine.startsWith("$ ")) i = j - 1;
      }

      if (kanjiList.length > 0) radical.kanji = kanjiList;

      radicals.push(radical);
    }
  }

  return radicals;
}

/**
 * Converts a `kradfile2` file (EUC-JP encoded) into an array of {@link DictKanjiWithRadicals} objects.
 * @param kradBuffer A `kradfile2` buffer
 * @param kanjiDic An array of converted `KANJIDIC` entries
 * @param katakanaList An array of katakana {@link Kana} objects
 * @returns An array of converted {@link DictKanjiWithRadicals} objects
 */
export function convertKradFile(
  kradBuffer: Buffer<ArrayBuffer>,
  kanjiDic: readonly DictKanji[],
  katakanaList: readonly Kana[],
): DictKanjiWithRadicals[] {
  const fileParsed: string[] = iconv
    .decode(kradBuffer, "euc-jp")
    .split("\n")
    .filter((line: string) => !line.startsWith("#"));
  const kanjiWithRadicals: DictKanjiWithRadicals[] = [];

  for (const line of fileParsed) {
    if (line.length > 0) {
      const split: string[] = line.split(" : ");

      const kanjiChar: string = split[0]!;
      const radicalsRow: string = split[1]!;

      const kanji: DictKanjiWithRadicals = {
        kanji: kanjiChar,
        radicals: [],
      };

      const radicals: string[] = radicalsRow.split(" ");

      for (const radical of radicals) {
        const foundRadical: DictKanji | undefined = kanjiDic.find(
          (dictKanji: DictKanji) => dictKanji.kanji === radical,
        );

        let radicalObj: DictKanji = foundRadical ?? { kanji: radical };

        if (!foundRadical) {
          const katakanaChar: Kana | undefined = katakanaList.find(
            (kana: Kana) => kana.kana === radical,
          );
          if (!katakanaChar) continue;

          radicalObj = {
            kanji: katakanaChar.kana,
            readingMeaning: [
              {
                groups: [
                  {
                    readings: [{ reading: katakanaChar.kana, type: "ja_on" }],
                    meanings: [katakanaChar.reading],
                  },
                ],
              },
            ],
          };
        }

        kanji.radicals.push(radicalObj);
      }

      if (kanji.kanji.length === 1 && kanji.radicals.length > 0)
        kanjiWithRadicals.push(kanji);
    }
  }

  return kanjiWithRadicals;
}

/**
 * Maps entry properties (IDs and kanji) with other entries.
 *
 * - {@link jmDict} => {@link WordIDEntryMap}, {@link KanjiWordsMap}
 *
 * - {@link kanjiDic} => {@link KanjiEntryMap}, {@link KanjiSVGMap} (only if {@link svgList} is present)
 *
 * - {@link tanakaExamples} (requires {@link jmDict}) => {@link WordExamplesMap}
 *
 * - {@link wordDefinitionPairs} => {@link WordDefinitionsMap}
 *
 * @param jmDict An array of converted `JMdict` entries
 * @param kanjiDic An array of converted `KANJIDIC` entries
 * @param tanakaExamples An array of converted `Tanaka Corpus` examples
 * @param wordDefinitionPairs An array of `ja.wiktionary.org` word-definitions pairs
 * @param svgList An array of SVG file names
 * @returns An object containing of any entry maps, their presence being dependent on the provided arguments.
 */
export function createEntryMaps(
  jmDict?: readonly DictWord[],
  kanjiDic?: readonly DictKanji[],
  tanakaExamples?: readonly TanakaExample[],
  wordDefinitionPairs?: readonly WordDefinitionPair[],
  svgList?: readonly string[],
): EntryMaps {
  const kanjiEntryMap: KanjiEntryMap = new Map<string, DictKanji>();
  const wordIDEntryMap: WordIDEntryMap = new Map<StringNumber, DictWord>();
  const kanjiWordsMap: KanjiWordsMap = new Map<string, DictWord[]>();
  const wordExamplesMap: WordExamplesMap = new Map<
    StringNumber,
    TanakaExample[]
  >();
  const wordDefinitionsMap: WordDefinitionsMap = new Map<
    StringNumber,
    Definition[]
  >();
  const kanjiSVGMap: KanjiSVGMap = new Map<string, string>();

  const wordPartsMap: Map<StringNumber, Set<string>> = new Map<
    StringNumber,
    Set<string>
  >();
  const partExamplesMap: Map<string, TanakaExample[]> = new Map<
    string,
    TanakaExample[]
  >();
  const entryParts: Set<string> = new Set<string>();

  if (kanjiDic)
    for (const kanji of kanjiDic) kanjiEntryMap.set(kanji.kanji, kanji);
  if (wordDefinitionPairs)
    for (const pair of wordDefinitionPairs)
      wordDefinitionsMap.set(pair.wordID, pair.definitions);

  if (kanjiDic && svgList)
    for (const kanji of kanjiDic) {
      const codePoint: string = kanji.kanji
        .codePointAt(0)!
        .toString(16)
        .toLowerCase();

      const svg: string | undefined = svgList.find((file: string) => {
        const baseName: string = file.split(".")[0]!.toLowerCase();

        return baseName === codePoint || baseName === `0${codePoint}`;
      });

      if (svg) kanjiSVGMap.set(kanji.kanji, svg);
    }

  if (jmDict) {
    for (const word of jmDict) {
      wordIDEntryMap.set(word.id, word);

      if (word.kanjiForms)
        for (const kf of word.kanjiForms)
          for (const char of kf.form
            .split("")
            .filter((c: string) => regexps.kanji.test(c))) {
            if (!kanjiWordsMap.has(char)) kanjiWordsMap.set(char, [word]);
            else kanjiWordsMap.get(char)!.push(word);
          }

      if (tanakaExamples) {
        const rkf: ReadingsKanjiFormsPair = getValidForms(
          word.readings,
          word.kanjiForms,
          word.isCommon,
        );

        const localPartParts: Set<string> = new Set<string>();

        for (const reading of rkf.readings) {
          entryParts.add(reading.reading);
          localPartParts.add(reading.reading);
        }

        if (rkf.kanjiForms && rkf.kanjiForms.length > 0)
          for (const kanjiForm of rkf.kanjiForms) {
            entryParts.add(kanjiForm.form);
            localPartParts.add(kanjiForm.form);
          }

        entryParts.add(word.id);
        localPartParts.add(word.id);

        wordPartsMap.set(word.id, localPartParts);
      }
    }

    if (tanakaExamples) {
      for (const ex of tanakaExamples) {
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

      for (const word of jmDict) {
        const entryParts: Set<string> = wordPartsMap.get(word.id)!;

        const seenEx: Set<string> = new Set<string>();
        const validExamples: TanakaExample[] = [];

        for (const p of entryParts) {
          const examplesForPart: TanakaExample[] | undefined = partExamplesMap
            .get(p)
            ?.filter((ex: TanakaExample) => !seenEx.has(ex.id));
          if (!examplesForPart) continue;

          for (const ex of examplesForPart) {
            seenEx.add(ex.id);
            validExamples.push(ex);
          }
        }

        if (validExamples.length > 0)
          wordExamplesMap.set(word.id, validExamples);
      }
    }
  }

  return {
    ...(wordIDEntryMap.size > 0 ? { wordIDEntryMap: wordIDEntryMap } : {}),
    ...(kanjiWordsMap.size > 0 ? { kanjiWordsMap: kanjiWordsMap } : {}),
    ...(kanjiEntryMap.size > 0 ? { kanjiEntryMap: kanjiEntryMap } : {}),
    ...(wordExamplesMap.size > 0 ? { wordExamplesMap: wordExamplesMap } : {}),
    ...(wordDefinitionsMap.size > 0
      ? { wordDefinitionsMap: wordDefinitionsMap }
      : {}),
    ...(kanjiSVGMap.size > 0 ? { kanjiSVGMap: kanjiSVGMap } : {}),
  };
}

function mapEntry(entry: any): JaWiktionaryEntry {
  return {
    word: entry.word,
    pos_title: entry.pos_title,
    senses: entry.senses
      .filter(
        (sense: any) =>
          (isObjectArray(sense.form_of) &&
            sense.form_of.every(
              (form: any) => form.word && typeof form.word === "string",
            )) ||
          isStringArray(sense.glosses),
      )
      .map((sense: any) => ({
        ...(sense.form_of
          ? {
              form_of: sense.form_of.map((form: any) => form.word),
            }
          : {}),
        glosses: sense.glosses,
      })),
    ...(isObjectArray(entry.forms) &&
    entry.forms.every((form: any) => typeof form.form === "string")
      ? { forms: entry.forms.map((form: any) => form.form) }
      : {}),
  };
}

/**
 * Converts and filters a `ja.wiktionary.org` JSONL dump (sync)
 *
 * The dump file needs to be converted from a `jawiktionary-latest-pages-articles.xml.bz2` file from {@link https://dumps.wikimedia.org/jawiktionary/latest/} using {@link https://github.com/tatuylonen/wiktextract | wiktextract}.
 * @param buffer A JSONL dump file buffer
 * @returns An array containing only the Japanese entries
 */
export function convertJawiktionarySync(buffer: Buffer): JaWiktionaryEntry[] {
  const lines = buffer.toString("utf-8").split("\n");
  const entries: JaWiktionaryEntry[] = [];

  for (let i: number = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const obj: any = JSON.parse(line);

    if (
      obj &&
      typeof obj === "object" &&
      typeof obj.lang === "string" &&
      (obj.lang === "日本語" || obj.lang === "古典日本語")
    )
      entries.push(mapEntry(obj));
  }

  return entries;
}

/**
 * Converts and filters a `ja.wiktionary.org` JSONL dump (async)
 *
 * The dump file needs to be converted from a `jawiktionary-latest-pages-articles.xml.bz2` file from {@link https://dumps.wikimedia.org/jawiktionary/latest/} using {@link https://github.com/tatuylonen/wiktextract | wiktextract}.
 * @param stream A JSONL dump file stream
 * @returns An array containing only the Japanese entries
 */
export async function convertJawiktionaryAsync(
  stream: ReadStream,
): Promise<JaWiktionaryEntry[]> {
  return new Promise<JaWiktionaryEntry[]>(
    async (
      resolve: (
        value: JaWiktionaryEntry[] | PromiseLike<JaWiktionaryEntry[]>,
      ) => void,
    ) => {
      const rl: Interface = createInterface({
        input: stream,
        crlfDelay: Infinity,
      });

      const entries: JaWiktionaryEntry[] = [];

      for await (const line of rl) {
        const obj: any = JSON.parse(line.trim());

        if (
          obj &&
          typeof obj === "object" &&
          typeof obj.lang === "string" &&
          (obj.lang === "日本語" || obj.lang === "古典日本語")
        )
          entries.push(mapEntry(obj));
      }

      rl.close();
      stream.close();
      stream.destroy();

      resolve(entries);
    },
  );
}

function parseEntry(
  entry: JaWiktionaryEntry,
  definitions: Definition[],
  definitionMap: Map<string, { count: number }>,
): void {
  for (const sense of entry.senses) {
    const definition: string = sense.glosses.join("");

    if (!definitions.some((def: Definition) => def.definition === definition)) {
      if (!definitionMap.has(definition))
        definitionMap.set(definition, { count: 1 });
      else definitionMap.get(definition)!.count++;

      definitions.push({ definition: definition });
    }
  }
}

/**
 * Pairs Japanese definitions with JMdict word entries
 * @param entryList An array containing `ja.wiktionary.org` Japanese entries (converted using {@link convertJawiktionarySync} or {@link convertJawiktionaryAsync})
 * @param jmDict An array of converted `JMdict` entries
 * @returns A promise resolving with an array of {@link WordDefinitionPair} objects
 */
export function getWordDefinitions(
  entryList: readonly JaWiktionaryEntry[],
  jmDict: readonly DictWord[],
): WordDefinitionPair[] {
  const entries: Map<string, JaWiktionaryEntry[]> = new Map<
    string,
    JaWiktionaryEntry[]
  >();

  for (const entry of entryList) {
    const ent: JaWiktionaryEntry[] | undefined = entries.get(entry.word);

    if (ent) ent.push(entry);
    else entries.set(entry.word, [entry]);
  }

  const japaneseDefinitions: WordDefinitionPair[] = [];
  const definitionMap: Map<string, { count: number }> = new Map<
    string,
    { count: number }
  >();

  const wordFormsMap: Map<
    StringNumber,
    { readings: Set<string>; kanjiForms?: Set<string> | undefined }
  > = new Map<
    StringNumber,
    { readings: Set<string>; kanjiForms?: Set<string> | undefined }
  >();
  const validReadings: Set<string> = new Set<string>();
  const validKanjiForms: Set<string> = new Set<string>();
  const validForms: Set<string> = new Set<string>();

  for (const word of jmDict) {
    const wordReadings: Set<string> = new Set<string>();
    const wordKanjiForms: Set<string> = new Set<string>();

    const rkf: ReadingsKanjiFormsPair = getValidForms(
      word.readings,
      word.kanjiForms,
      word.isCommon,
    );

    for (const r of rkf.readings) {
      validReadings.add(r.reading);
      wordReadings.add(r.reading);
      validForms.add(r.reading);
    }
    if (rkf.kanjiForms && rkf.kanjiForms.length > 0)
      for (const kf of rkf.kanjiForms) {
        validKanjiForms.add(kf.form);
        wordKanjiForms.add(kf.form);
        validForms.add(kf.form);
      }

    wordFormsMap.set(word.id, {
      readings: wordReadings,
      ...(wordKanjiForms.size > 0 ? { kanjiForms: wordKanjiForms } : {}),
    });
  }

  const validTitleEntries: Map<string, JaWiktionaryEntry[]> = new Map<
    string,
    JaWiktionaryEntry[]
  >();
  const entriesWithFormTitlesGlobal: Map<string, JaWiktionaryEntry[]> = new Map<
    string,
    JaWiktionaryEntry[]
  >();
  const entriesWithFormsGlobal: Map<string, JaWiktionaryEntry[]> = new Map<
    string,
    JaWiktionaryEntry[]
  >();

  const validFormOfEntries: Set<string> = new Set<string>();
  const validGlossesEntries: Set<string> = new Set<string>();
  const validFormsEntries: Set<string> = new Set<string>();

  const ents = Array.from(entries.values()).flat();

  for (const entry of ents) {
    let valid: boolean = false;

    if (validKanjiForms && validKanjiForms.has(entry.word)) {
      valid = true;

      for (const sense of entry.senses) {
        if (
          sense.form_of &&
          sense.form_of.some((form: string) => validForms.has(form))
        )
          validFormOfEntries.add(entry.word);

        for (const gloss of sense.glosses) {
          let hasForm: boolean = false;

          if (gloss.includes("表記") || gloss.includes("参照"))
            for (const r of validForms)
              if (gloss.includes(r)) {
                hasForm = true;
                break;
              }

          if (hasForm) validGlossesEntries.add(entry.word);
        }
      }

      if (entry.forms)
        for (const form of entry.forms)
          if (validForms.has(form)) validFormsEntries.add(entry.word);
    }

    if (validForms.has(entry.word)) {
      valid = true;
      const ftEntry = entriesWithFormTitlesGlobal.get(entry.word);

      if (ftEntry) ftEntry.push(entry);
      else entriesWithFormTitlesGlobal.set(entry.word, [entry]);
    }

    if (valid) {
      const tEntry = validTitleEntries.get(entry.word);

      if (tEntry) tEntry.push(entry);
      else validTitleEntries.set(entry.word, [entry]);
    }

    if (
      entry.forms &&
      validForms.has(entry.word) &&
      entry.forms.some((form: string) => validForms.has(form))
    ) {
      const wfEntry = entriesWithFormsGlobal.get(entry.word);

      if (wfEntry) wfEntry.push(entry);
      else entriesWithFormsGlobal.set(entry.word, [entry]);
    }
  }

  ents.length = 0;

  const posMap: Map<
    POS,
    {
      title?: Map<string, JaWiktionaryEntry[]>;
      formTitle?: Map<string, JaWiktionaryEntry[]>;
      form?: Map<string, JaWiktionaryEntry[]>;
    }
  > = new Map<
    POS,
    {
      title?: Map<string, JaWiktionaryEntry[]>;
      formTitle?: Map<string, JaWiktionaryEntry[]>;
      form?: Map<string, JaWiktionaryEntry[]>;
    }
  >();

  const vte: JaWiktionaryEntry[] = Array.from(
    validTitleEntries.values(),
  ).flat();
  const fge: JaWiktionaryEntry[] = Array.from(
    entriesWithFormTitlesGlobal.values(),
  ).flat();
  const wfe: JaWiktionaryEntry[] = Array.from(
    entriesWithFormsGlobal.values(),
  ).flat();

  for (const pos of [
    "名詞",
    "動詞",
    "成句",
    "副詞",
    "形容動詞",
    "助詞",
    "感動詞",
    "代名詞",
    "接尾辞",
    "接頭語",
    "造語成分",
    "略語",
    "固有名詞",
    "人称代名詞",
    "接頭辞",
    "接続助詞",
    "間投詞",
    "助動詞",
    "形容詞",
    "縮約形",
    "接辞",
    "接続詞",
    "連体詞",
    "人名",
    "記号",
    "数詞",
    "慣用句",
    "ことわざ",
    "助数詞",
    "英数字混合表記",
    "動詞句",
    "成語",
    "意義",
    "頭字語",
    "接尾語",
  ]) {
    posMap.set(pos as POS, {});

    for (const te of vte)
      if (te.pos_title === pos || te.pos_title === "和語の漢字表記") {
        const posEntries: {
          title?: Map<string, JaWiktionaryEntry[]>;
          formTitle?: Map<string, JaWiktionaryEntry[]>;
          form?: Map<string, JaWiktionaryEntry[]>;
        } = posMap.get(pos as POS)!;

        if (posEntries.title === undefined)
          posEntries.title = new Map<string, JaWiktionaryEntry[]>();

        const entryList: JaWiktionaryEntry[] | undefined = posEntries.title.get(
          te.word,
        );

        if (entryList) entryList.push(te);
        else posEntries.title.set(te.word, [te]);
      }

    for (const ft of fge)
      if (ft.pos_title === pos) {
        const posEntries: {
          title?: Map<string, JaWiktionaryEntry[]>;
          formTitle?: Map<string, JaWiktionaryEntry[]>;
          form?: Map<string, JaWiktionaryEntry[]>;
        } = posMap.get(pos as POS)!;

        if (posEntries.formTitle === undefined)
          posEntries.formTitle = new Map<string, JaWiktionaryEntry[]>();

        const entryList: JaWiktionaryEntry[] | undefined =
          posEntries.formTitle.get(ft.word);

        if (entryList) entryList.push(ft);
        else posEntries.formTitle.set(ft.word, [ft]);
      }

    for (const wf of wfe)
      if (wf.pos_title === pos) {
        const posEntries: {
          title?: Map<string, JaWiktionaryEntry[]>;
          formTitle?: Map<string, JaWiktionaryEntry[]>;
          form?: Map<string, JaWiktionaryEntry[]>;
        } = posMap.get(pos as POS)!;

        if (posEntries.form === undefined)
          posEntries.form = new Map<string, JaWiktionaryEntry[]>();

        const entryList: JaWiktionaryEntry[] | undefined = posEntries.form.get(
          wf.word,
        );

        if (entryList) entryList.push(wf);
        else posEntries.form.set(wf.word, [wf]);
      }
  }

  vte.length = 0;
  fge.length = 0;
  wfe.length = 0;

  const wordEntriesPairs: {
    word: DictWord;
    readings: Set<string>;
    kanjiForms?: Set<string>;
    forms: Set<string>;
    entriesWithTitles: JaWiktionaryEntry[];
    entriesWithFormTitles: JaWiktionaryEntry[];
    entriesWithForms: JaWiktionaryEntry[];
  }[] = [];

  for (const word of jmDict) {
    const poses: Set<POS> = new Set<POS>();

    for (const m of word.meanings)
      for (const note of m.partOfSpeech) {
        const noteEntry:
          | readonly [string, string]
          | readonly [string, string, POS | readonly POS[]]
          | undefined = noteMap.get(note);

        if (noteEntry && noteEntry.length === 3) {
          const notePos: POS | readonly POS[] = noteEntry[2];

          if (Array.isArray(notePos))
            for (const pos of notePos) {
              if (!poses.has(pos)) poses.add(pos);
            }
          else if (typeof notePos === "string" && !poses.has(notePos))
            poses.add(notePos);
        }
      }

    const rkf: { readings: Set<string>; kanjiForms?: Set<string> | undefined } =
      wordFormsMap.get(word.id)!;

    const entriesWithTitles: JaWiktionaryEntry[] = [];
    const entriesWithFormTitles: JaWiktionaryEntry[] = [];
    const entriesWithForms: JaWiktionaryEntry[] = [];

    if (poses.size > 0)
      for (const pos of poses) {
        const posEntries: {
          title?: Map<string, JaWiktionaryEntry[]>;
          formTitle?: Map<string, JaWiktionaryEntry[]>;
          form?: Map<string, JaWiktionaryEntry[]>;
        } = posMap.get(pos)!;

        if (rkf.kanjiForms)
          for (const kf of rkf.kanjiForms) {
            const te: JaWiktionaryEntry[] | undefined =
              posEntries.title?.get(kf);
            const fe: JaWiktionaryEntry[] | undefined =
              posEntries.form?.get(kf);

            if (te)
              entriesWithTitles.push(
                ...te.filter(
                  (ent: JaWiktionaryEntry) =>
                    validFormOfEntries.has(ent.word) ||
                    validGlossesEntries.has(ent.word) ||
                    validFormsEntries.has(ent.word),
                ),
              );
            if (fe)
              entriesWithForms.push(
                ...fe.filter(
                  (ent: JaWiktionaryEntry) =>
                    ent.forms &&
                    ent.forms.some(
                      (form: string) =>
                        rkf.kanjiForms?.has(form) || rkf.readings.has(form),
                    ),
                ),
              );
          }

        for (const r of rkf.readings) {
          const te: JaWiktionaryEntry[] | undefined = posEntries.title?.get(r);
          const fe: JaWiktionaryEntry[] | undefined = posEntries.form?.get(r);
          const fte: JaWiktionaryEntry[] | undefined =
            posEntries.formTitle?.get(r);

          if (te)
            entriesWithTitles.push(
              ...te.filter(
                (ent: JaWiktionaryEntry) =>
                  ent.forms &&
                  ent.forms.some(
                    (form: string) =>
                      rkf.kanjiForms?.has(form) || rkf.readings.has(form),
                  ),
              ),
            );
          if (fe)
            entriesWithForms.push(
              ...fe.filter(
                (ent: JaWiktionaryEntry) =>
                  ent.forms &&
                  ent.forms.some(
                    (form: string) =>
                      rkf.kanjiForms?.has(form) || rkf.readings.has(form),
                  ),
              ),
            );
          if (fte) entriesWithFormTitles.push(...fte);
        }
      }

    if (
      entriesWithTitles.length === 0 &&
      entriesWithFormTitles.length === 0 &&
      entriesWithForms.length === 0
    ) {
      if (rkf.kanjiForms)
        for (const kf of rkf.kanjiForms) {
          const te: JaWiktionaryEntry[] | undefined = validTitleEntries.get(kf);
          const fe: JaWiktionaryEntry[] | undefined =
            entriesWithFormsGlobal.get(kf);

          if (te)
            entriesWithTitles.push(
              ...te.filter(
                (ent: JaWiktionaryEntry) =>
                  validFormOfEntries.has(ent.word) ||
                  validGlossesEntries.has(ent.word) ||
                  validFormsEntries.has(ent.word),
              ),
            );
          if (fe)
            entriesWithForms.push(
              ...fe.filter(
                (ent: JaWiktionaryEntry) =>
                  ent.forms &&
                  ent.forms.some(
                    (form: string) =>
                      rkf.kanjiForms?.has(form) || rkf.readings.has(form),
                  ),
              ),
            );
        }

      for (const r of rkf.readings) {
        const te: JaWiktionaryEntry[] | undefined = validTitleEntries.get(r);
        const fe: JaWiktionaryEntry[] | undefined =
          entriesWithFormsGlobal.get(r);
        const fte: JaWiktionaryEntry[] | undefined =
          entriesWithFormTitlesGlobal.get(r);

        if (te)
          entriesWithTitles.push(
            ...te.filter(
              (ent: JaWiktionaryEntry) =>
                ent.forms &&
                ent.forms.some(
                  (form: string) =>
                    rkf.kanjiForms?.has(form) || rkf.readings.has(form),
                ),
            ),
          );
        if (fe)
          entriesWithForms.push(
            ...fe.filter(
              (ent: JaWiktionaryEntry) =>
                ent.forms &&
                ent.forms.some(
                  (form: string) =>
                    rkf.kanjiForms?.has(form) || rkf.readings.has(form),
                ),
            ),
          );
        if (fte) entriesWithFormTitles.push(...fte);
      }
    }

    if (
      entriesWithTitles.length > 0 &&
      (entriesWithFormTitles.length > 0 || entriesWithForms.length > 0)
    )
      wordEntriesPairs.push({
        word: word,
        readings: rkf.readings,
        ...(rkf.kanjiForms ? { kanjiForms: rkf.kanjiForms } : {}),
        forms: rkf.kanjiForms
          ? rkf.readings.union(rkf.kanjiForms)
          : rkf.readings,
        entriesWithTitles: entriesWithTitles,
        entriesWithFormTitles: entriesWithFormTitles,
        entriesWithForms: entriesWithForms,
      });
  }

  for (const pair of wordEntriesPairs) {
    const definitions: Definition[] = [];

    const kanjiFormEntries: JaWiktionaryEntry[] = [];
    const entriesWithForms: JaWiktionaryEntry[] = [];
    const readingEntries: JaWiktionaryEntry[] = [];

    const titleFormMap: Map<string, Set<string>> = new Map<
      string,
      Set<string>
    >();
    const refsMap: Map<string, Set<string>> = new Map<string, Set<string>>();
    const forms: Set<string> = new Set<string>();

    for (const ent of pair.entriesWithTitles) {
      const validFormOf: boolean = validFormOfEntries.has(ent.word);
      const validGlosses: boolean = validGlossesEntries.has(ent.word);
      const validForms: boolean = validFormsEntries.has(ent.word);

      const hasForms: boolean =
        ent.forms !== undefined &&
        ent.forms.some((form: string) => pair.forms.has(form));

      if (
        pair.kanjiForms &&
        pair.kanjiForms.has(ent.word) &&
        (validFormOf || validGlosses || validForms)
      ) {
        kanjiFormEntries.push(ent);

        if ((validFormOf || validGlosses) && ent.senses)
          for (const sense of ent.senses) {
            if (validFormOf && sense.form_of) {
              for (const form of sense.form_of)
                if (pair.forms.has(form)) {
                  const elem: Set<string> | undefined = titleFormMap.get(form);

                  if (!elem)
                    titleFormMap.set(form, new Set<string>([ent.word]));
                  else elem.add(ent.word);
                }
            }

            if (validGlosses)
              for (const gloss of sense.glosses)
                if (gloss.includes("表記") || gloss.includes("参照"))
                  for (const f of pair.forms)
                    if (gloss.includes(f)) {
                      const elem: Set<string> | undefined = refsMap.get(f);

                      if (!elem) refsMap.set(f, new Set<string>([ent.word]));
                      else elem.add(ent.word);
                    }
          }

        if (validForms && ent.forms)
          for (const form of ent.forms)
            if (pair.forms.has(form)) forms.add(form);
      }

      if (pair.readings.has(ent.word) && hasForms) entriesWithForms.push(ent);
      if (pair.kanjiForms === undefined && pair.readings.has(ent.word))
        readingEntries.push(ent);
    }

    for (const entry of pair.entriesWithForms) {
      const elem: Set<string> | undefined = titleFormMap.get(entry.word);

      if (
        elem &&
        entry.forms &&
        entry.forms.some((form: string) => elem.has(form))
      )
        entriesWithForms.push(entry);
    }

    for (const entry of pair.entriesWithFormTitles) {
      if (forms.has(entry.word)) {
        entriesWithForms.push(entry);
        continue;
      }

      const ft: Set<string> | undefined = refsMap.get(entry.word);

      if (ft && !ft.isDisjointFrom(pair.forms)) entriesWithForms.push(entry);
    }

    if (kanjiFormEntries.length > 0)
      for (const entry of kanjiFormEntries)
        if (entry.pos_title !== "和語の漢字表記")
          parseEntry(entry, definitions, definitionMap);

    if (entriesWithForms.length > 0)
      for (const ref of entriesWithForms)
        parseEntry(ref, definitions, definitionMap);

    if (readingEntries.length > 0)
      for (const readingEntry of readingEntries)
        parseEntry(readingEntry, definitions, definitionMap);

    if (definitions.length > 0)
      japaneseDefinitions.push({
        wordID: pair.word.id,
        definitions: definitions,
        wordForms: pair.forms,
      });
  }

  for (let i: number = 0; i < japaneseDefinitions.length; i++) {
    const pair: WordDefinitionPair = japaneseDefinitions[i]!;

    for (let j: number = 0; j < pair.definitions.length; j++) {
      const defCount: { count: number } | undefined = definitionMap.get(
        pair.definitions[j]!.definition,
      );

      if (defCount && defCount.count > 1) {
        let mnba: boolean = true;

        for (const f of pair.wordForms!)
          if (pair.definitions[j]!.definition.includes(f)) {
            mnba = false;
            break;
          }

        if (mnba) pair.definitions[j]!.mayNotBeAccurate = true;
      }
    }

    delete pair.wordForms;

    japaneseDefinitions[i] = pair;
  }

  return japaneseDefinitions;
}

/**
 * Pairs Japanese definitions with JMdict word entries (with furigana)
 * @param entryList An array containing `ja.wiktionary.org` Japanese entries (converted using {@link convertJawiktionarySync} or {@link convertJawiktionaryAsync})
 * @param jmDict An array of converted `JMdict` entries
 * @returns A promise resolving with an array of {@link WordDefinitionPair} objects (with furigana)
 */
export async function getWordDefinitionsWithFurigana(
  entryList: readonly JaWiktionaryEntry[],
  jmDict: readonly DictWord[],
): Promise<WordDefinitionPair[]> {
  return new Promise<WordDefinitionPair[]>(async (resolve) => {
    const japaneseDefinitions: WordDefinitionPair[] = getWordDefinitions(
      entryList,
      jmDict,
    );

    const kuroshiro: any = new Kuroshiro.default();
    await kuroshiro.init(new KuromojiAnalyzer());

    const convert: any = kuroshiro.convert.bind(kuroshiro);

    for (let i: number = 0; i < japaneseDefinitions.length; i++) {
      const pair: WordDefinitionPair = japaneseDefinitions[i]!;

      for (let j: number = 0; j < pair.definitions.length; j++)
        if (!pair.definitions[j]!.definition.includes("・"))
          pair.definitions[j]!.furigana = (await convert(
            pair.definitions[j]!.definition,
            {
              to: "hiragana",
              mode: "furigana",
            },
          )) as string;

      japaneseDefinitions[i] = pair;
    }

    resolve(japaneseDefinitions);
  });
}

function lookupWordNote(
  key: string,
  notes: string[],
  tags: string[],
): NoteAndTag {
  const info:
    | readonly [string, string]
    | readonly [string, string, POS | readonly POS[]]
    | undefined = noteMap.get(key.toLowerCase());

  if (!info) {
    notes.push(key);

    return { note: key };
  }

  const tag: string = `word::${info[0]}`;

  if (!tags.includes(tag)) tags.push(tag);
  notes.push(info[1]);

  return { note: info[1], tag: tag };
}

const wordAddNoteArray: (
  arr: string[] | undefined,
  cb: (v: string) => void,
) => void = (arr: string[] | undefined, cb: (v: string) => void) => {
  if (!arr) return;
  for (const v of arr) cb(v);
};

/**
 * Transforms a converted `JMdict` entry into a more readable format, by providing either its JMdict entry ID or the {@link DictWord} object directly.
 * @param word The ID of the `JMdict` entry (requires {@link dict}) or a {@link DictWord} object
 * @param dict An array converted `JMdict` entries or a {@link WordIDEntryMap} *(not needed if {@link word} is a {@link DictWord} object)*
 * @param kanjiDic An array of converted `KANJIDIC` entries or a {@link KanjiEntryMap}
 * @param examples An array of converted `Tanaka Corpus` examples or a {@link WordExamplesMap}
 * @param definitions An array of `ja.wiktionary.org` word-definitions pairs or a {@link WordDefinitionsMap}
 * @param noteTypeName The Anki note type name
 * @param deckPath The full Anki deck path
 * @returns The transformed {@link DictWord} object or `undefined` if entry is not found
 */
export function getWord(
  word: StringNumber | DictWord,
  dict?: readonly DictWord[] | WordIDEntryMap,
  kanjiDic?: readonly DictKanji[] | KanjiEntryMap,
  examples?: readonly TanakaExample[] | WordExamplesMap,
  definitions?: readonly WordDefinitionPair[] | WordDefinitionsMap,
  noteTypeName?: string,
  deckPath?: string,
): Word | undefined {
  let dictWord: DictWord | undefined = undefined;

  if (typeof word === "string" && dict) {
    if (Array.isArray(dict))
      dictWord = (dict as readonly DictWord[]).find(
        (entry: DictWord) => entry.id === word,
      );
    if (dict instanceof Map) dictWord = dict.get(word);
  }

  if (typeof word === "object") dictWord = word;

  if (dictWord) {
    const word: Word = {
      id: dictWord.id,
      readings: [],
      translations: [],
      noteID: `word_${dictWord.id}`,
      noteTypeName: noteTypeName,
      deckPath: deckPath,
      tags: [],
    };

    if (dictWord.isCommon === true) {
      word.common = true;
      word.tags!.push("word::common");
    }

    if (dictWord.kanjiForms)
      word.kanjiForms = dictWord.kanjiForms.map(
        (dictKanjiForm: DictKanjiForm) => ({
          kanjiForm: dictKanjiForm.form,
          ...(dictKanjiForm.notes
            ? {
                notes: dictKanjiForm.notes.map((note: string) => {
                  const noteAndTag: NoteAndTag = lookupWordNote(
                    note,
                    [],
                    word.tags!,
                  );

                  return capitalizeString(noteAndTag.note);
                }),
              }
            : {}),
          ...(dictKanjiForm.commonness && dictKanjiForm.commonness.length > 0
            ? { common: true }
            : {}),
        }),
      );

    word.readings = dictWord.readings.map((dictReading: DictReading) => ({
      reading: dictReading.reading,
      ...(dictReading.kanjiFormRestrictions || dictReading.notes
        ? {
            notes: [
              ...(dictReading.kanjiFormRestrictions
                ? dictReading.kanjiFormRestrictions.map(
                    (restriction: string) =>
                      `Reading restricted to ${restriction}`,
                  )
                : []),
              ...(dictReading.notes
                ? dictReading.notes.map((note: string) => {
                    const noteAndTag: NoteAndTag = lookupWordNote(
                      note,
                      [],
                      word.tags!,
                    );

                    return capitalizeString(noteAndTag.note);
                  })
                : []),
            ],
          }
        : {}),
      ...(dictReading.commonness && dictReading.commonness.length > 0
        ? { common: true }
        : {}),
    }));

    word.translations = [];

    for (const dictMeaning of dictWord.meanings) {
      const translationTypes: string[] = [];
      const translations: string[] = dictMeaning.translations.map(
        (
          translation:
            | string
            | { translation: string; type: "lit" | "expl" | "tm" },
        ) => {
          if (typeof translation === "string") return translation;
          else {
            const translationNoteAndTag:
              | readonly [string, string]
              | readonly [string, string, POS | readonly POS[]] = noteMap.get(
              translation.type,
            )!;

            translationTypes.push(translationNoteAndTag[1]);
            word.tags!.push(`word::${translationNoteAndTag[0]}`);

            return translation.translation;
          }
        },
      );

      const notes: string[] = [];

      wordAddNoteArray(
        dictMeaning.kanjiFormRestrictions,
        (restriction: string) =>
          notes.push(`Meaning restricted to ${restriction}`),
      );
      wordAddNoteArray(dictMeaning.readingRestrictions, (restriction: string) =>
        notes.push(`Meaning restricted to ${restriction}`),
      );
      for (const t of translationTypes) notes.push(t);
      wordAddNoteArray(dictMeaning.partOfSpeech, (pos: string) =>
        lookupWordNote(pos, notes, word.tags!),
      );
      wordAddNoteArray(dictMeaning.fields, (field: string) =>
        lookupWordNote(field, notes, word.tags!),
      );
      wordAddNoteArray(dictMeaning.dialects, (dialect: string) =>
        lookupWordNote(dialect, notes, word.tags!),
      );
      wordAddNoteArray(dictMeaning.antonyms, (antonym: string) =>
        notes.push(`Antonym: ${antonym}`),
      );
      wordAddNoteArray(dictMeaning.references, (reference: string) =>
        notes.push(`Related: ${reference}`),
      );
      wordAddNoteArray(dictMeaning.info, (info: string) =>
        lookupWordNote(info, notes, word.tags!),
      );
      wordAddNoteArray(dictMeaning.misc, (misc: string) =>
        lookupWordNote(misc, notes, word.tags!),
      );

      for (let i: number = 0; i < notes.length; i++)
        notes[i] = capitalizeString(notes[i]!);

      word.translations.push({
        translation: translations.join("; "),
        notes: notes,
      });
    }

    if (dictWord.usuallyInKana === true) {
      word.usuallyInKana = true;
      word.tags!.push("word::usually_in_kana_for_all_senses");
    }

    if (kanjiDic && word.kanjiForms) {
      const kanji: Kanji[] = [];
      const seenChars: Set<string> = new Set<string>();

      for (const kanjiForm of word.kanjiForms)
        for (const char of kanjiForm.kanjiForm
          .split("")
          .filter((c: string) => regexps.kanji.test(c))) {
          if (seenChars.has(char)) continue;
          seenChars.add(char);

          const kanjiEntry: DictKanji | undefined =
            kanjiDic instanceof Map ? kanjiDic.get(char) : undefined;

          const kanjiObj: Kanji | undefined = getKanji(
            kanjiEntry ?? char,
            Array.isArray(kanjiDic) ? (kanjiDic as DictKanji[]) : undefined,
          );

          if (kanjiObj)
            kanji.push({
              kanji: kanjiObj.kanji,
              ...(kanjiObj.meanings && kanjiObj.meanings.length > 0
                ? { meanings: kanjiObj.meanings }
                : {}),
            });
        }

      if (kanji.length > 0) word.kanji = kanji;
    }

    if (dictWord.hasPhrases !== undefined && examples) {
      const exampleList: readonly TanakaExample[] = Array.isArray(examples)
        ? (examples as readonly TanakaExample[])
        : ((examples as WordExamplesMap).get(dictWord.id) ?? []);

      const rkf: ReadingsKanjiFormsPair = getValidForms(
        dictWord.readings,
        dictWord.kanjiForms,
        dictWord.isCommon,
      );

      const readings: Set<string> = new Set<string>(
        rkf.readings.map((r: DictReading) => r.reading),
      );
      const kanjiForms: Set<string> | undefined = rkf.kanjiForms
        ? new Set<string>(rkf.kanjiForms.map((kf: DictKanjiForm) => kf.form))
        : undefined;

      let kanjiFormExamples: {
        ex: TanakaExample;
        partIndex: number;
        form?: string | undefined;
      }[] = [];
      const readingMatchingKanjiFormExamples: {
        ex: TanakaExample;
        partIndex: number;
      }[] = [];
      const readingExamples: { ex: TanakaExample; partIndex: number }[] = [];
      const readingMatchingKanjiForms: Set<string> = new Set<string>();

      for (const example of exampleList)
        for (let i: number = 0; i < example.parts.length; i++) {
          const part: ExamplePart = example.parts[i]!;

          const readingAsReadingMatch: boolean =
            part.reading !== undefined && readings.has(part.reading);
          const readingAsInflectedFormMatch: boolean =
            part.inflectedForm !== undefined &&
            readings.has(part.inflectedForm);

          const referenceIDMatch: boolean = part.referenceID === dictWord.id;

          if (
            (kanjiForms && kanjiForms.has(part.baseForm)) ||
            referenceIDMatch
          ) {
            if (readingAsReadingMatch || readingAsInflectedFormMatch) {
              readingMatchingKanjiFormExamples.push({
                ex: example,
                partIndex: i,
              });

              readingMatchingKanjiForms.add(part.baseForm);
            } else
              kanjiFormExamples.push({
                ex: example,
                partIndex: i,
                form: part.baseForm,
              });

            break;
          }

          const readingAsBaseFormMatch: boolean = readings.has(part.baseForm);

          if (
            (readingAsBaseFormMatch || referenceIDMatch) &&
            kanjiForms === undefined
          ) {
            readingExamples.push({ ex: example, partIndex: i });

            break;
          }
        }

      if (readingMatchingKanjiForms.size > 0)
        kanjiFormExamples = kanjiFormExamples.filter(
          (ex: {
            ex: TanakaExample;
            partIndex: number;
            form?: string | undefined;
          }) => ex.form && readingMatchingKanjiForms.has(ex.form),
        );

      const includeKanjiFormExamples: boolean = word.kanjiForms !== undefined;

      let wordExamples: { ex: TanakaExample; partIndex: number }[] = [
        ...(includeKanjiFormExamples
          ? [...readingMatchingKanjiFormExamples, ...kanjiFormExamples]
          : readingExamples),
      ];

      wordExamples.sort(
        (
          a: { ex: TanakaExample; partIndex: number },
          b: { ex: TanakaExample; partIndex: number },
        ) => a.ex.phrase.length - b.ex.phrase.length,
      );

      readingMatchingKanjiForms.clear();

      const glossSpecificExamples: {
        ex: TanakaExample;
        partIndex: number;
      }[] = [];
      const seenPhrases: Set<string> = new Set<string>();

      for (let i: number = 0; i < word.translations.length; i++) {
        outer: for (const example of wordExamples) {
          if (seenPhrases.has(example.ex.phrase)) continue;

          for (let j: number = 0; j < example.ex.parts.length; j++) {
            const part: ExamplePart = example.ex.parts[j]!;

            if (j === example.partIndex && part.glossNumber === i + 1) {
              example.ex.glossNumber = {
                wordId: word.id!,
                glossNumber: i + 1,
              };

              glossSpecificExamples.push(example);
              seenPhrases.add(example.ex.phrase);

              break outer;
            }
          }
        }
      }

      if (glossSpecificExamples.length > 0) {
        if (glossSpecificExamples.length < 5) {
          wordExamples = wordExamples.filter(
            (ex: { ex: TanakaExample; partIndex: number }) =>
              !seenPhrases.has(ex.ex.phrase),
          );

          if (wordExamples.length > 0)
            for (const ex of wordExamples) {
              glossSpecificExamples.push(ex);

              if (glossSpecificExamples.length === 5) break;
            }
        }

        wordExamples = glossSpecificExamples;
      }

      if (wordExamples.length > 0) {
        word.phrases = (
          glossSpecificExamples.length === 0
            ? wordExamples.slice(0, 5)
            : wordExamples
        ).map((ex: { ex: TanakaExample; partIndex: number }) => ({
          phrase: ex.ex.furigana ?? ex.ex.phrase,
          translation: ex.ex.translation,
          originalPhrase: ex.ex.phrase,
          ...(ex.ex.glossNumber ? { glossNumber: ex.ex.glossNumber } : {}),
        }));

        word.tags!.push("word::has_phrases");
        if (glossSpecificExamples.length > 0)
          word.tags!.push("word::has_meaning-specific_phrases");
      }
    }

    if (definitions) {
      const defs: readonly Definition[] | undefined = Array.isArray(definitions)
        ? definitions.find((wdp: WordDefinitionPair) => wdp.wordID === word.id!)
            ?.definitions
        : (definitions as WordDefinitionsMap).get(word.id!);

      if (defs)
        word.definitions = [
          ...defs.toSorted(
            (a: Definition, b: Definition) =>
              Number(Boolean(a.mayNotBeAccurate)) -
              Number(Boolean(b.mayNotBeAccurate)),
          ),
        ];
    }

    return word;
  } else return undefined;
}

/**
 * Transforms a converted `KANJIDIC` entry into a more readable format, by providing either the kanji or the {@link DictKanji} object directly.
 * @param kanji The kanji character (requires {@link dict}) or a {@link DictKanji} object
 * @param dict An array of converted `KANJIDIC` entries or a {@link KanjiEntryMap} (not needed if {@link kanji} is a {@link DictKanji} object)
 * @param jmDict An array of converted `JMdict` entries or a {@link KanjiWordsMap}
 * @param svgList An array of SVG file names or a {@link KanjiSVGMap}
 * @param noteTypeName The Anki note type name
 * @param deckPath The full Anki deck path
 * @returns The transformed {@link DictKanji} object or `undefined` if entry is not found
 */
export function getKanji(
  kanji: string | DictKanji,
  dict?: readonly DictKanji[] | KanjiEntryMap,
  jmDict?: readonly DictWord[] | KanjiWordsMap,
  svgList?: readonly string[] | KanjiSVGMap,
  noteTypeName?: string,
  deckPath?: string,
): Kanji | undefined {
  let dictKanji: DictKanji | undefined = undefined;

  if (typeof kanji === "string" && dict)
    dictKanji = Array.isArray(dict)
      ? dict.find((entry: DictKanji) => entry.kanji === kanji)
      : (dict as KanjiEntryMap).get(kanji);
  else if (typeof kanji === "object") dictKanji = kanji;

  if (dictKanji) {
    const kanji: Kanji = {
      kanji: dictKanji.kanji,
      strokes: dictKanji.misc!.strokeNumber,
      ...(dictKanji.misc && dictKanji.misc.grade
        ? { grade: dictKanji.misc.grade }
        : {}),
      ...(dictKanji.misc && dictKanji.misc.frequency
        ? { frequency: dictKanji.misc.frequency }
        : {}),
      ...(dictKanji.misc && dictKanji.misc.jlpt
        ? { jlpt: dictKanji.misc.jlpt }
        : {}),
      noteID: `kanji_${dictKanji.kanji}`,
      ...(noteTypeName ? { noteTypeName: noteTypeName } : {}),
      ...(deckPath ? { deckPath: deckPath } : {}),
      tags: [],
    };

    if (dictKanji.readingMeaning && dictKanji.readingMeaning.length > 0) {
      const meanings: string[] = [];
      const nanori: string[] = [];
      const onyomi: string[] = [];
      const kunyomi: string[] = [];

      for (const rm of dictKanji.readingMeaning) {
        if (rm.nanori && rm.nanori.length > 0) nanori.push(...rm.nanori);

        for (const group of rm.groups!) {
          if (group.readings) {
            onyomi.push(
              ...group.readings
                .filter((reading: DictKanjiReading) => reading.type === "ja_on")
                .map((reading: DictKanjiReading) => reading.reading),
            );
            kunyomi.push(
              ...group.readings
                .filter(
                  (reading: DictKanjiReading) => reading.type === "ja_kun",
                )
                .map((reading: DictKanjiReading) => reading.reading),
            );
          }

          if (group.meanings && group.meanings.length > 0)
            meanings.push(...group.meanings);
        }
      }

      if (meanings.length > 0) kanji.meanings = meanings;
      if (nanori.length > 0) kanji.nanori = nanori;
      if (onyomi.length > 0) kanji.onyomi = onyomi;
      if (kunyomi.length > 0) kanji.kunyomi = kunyomi;
    }

    if (jmDict) {
      let kanjiWords: readonly DictWord[] | Word[] | undefined = Array.isArray(
        jmDict,
      )
        ? (jmDict as readonly DictWord[])
        : (jmDict as KanjiWordsMap).get(kanji.kanji);

      const firstKfWords: readonly DictWord[] | undefined = kanjiWords?.filter(
        (word: DictWord) =>
          word.kanjiForms && word.kanjiForms[0]!.form.includes(kanji.kanji),
      );

      if (firstKfWords && firstKfWords.length > 0) kanjiWords = firstKfWords;

      if (kanjiWords) {
        const validWords: Word[] = [];

        for (const word of kanjiWords) {
          const kanjiForm: string | undefined = (
            firstKfWords && firstKfWords.length > 0
              ? word.kanjiForms![0]
              : word.kanjiForms!.find((kf: DictKanjiForm) =>
                  kf.form.includes(kanji.kanji),
                )
          )?.form;

          if (kanjiForm) {
            const reading: string | undefined = (
              firstKfWords && firstKfWords.length > 0
                ? word.readings[0]
                : word.readings.find(
                    (reading: DictReading) =>
                      reading.kanjiFormRestrictions &&
                      reading.kanjiFormRestrictions.includes(kanjiForm),
                  )
            )?.reading;
            if (!reading) continue;

            const translation: DictTranslation | undefined = (
              firstKfWords && firstKfWords.length > 0
                ? word.meanings[0]
                : word.meanings.find(
                    (m: DictMeaning) =>
                      m.translations &&
                      m.kanjiFormRestrictions &&
                      m.kanjiFormRestrictions.includes(kanjiForm),
                  )
            )?.translations!.map((t: DictTranslation) =>
              typeof t === "string" ? t : t.translation,
            )[0];
            if (!translation) continue;

            validWords.push({
              kanjiForms: [{ kanjiForm: kanjiForm }],
              readings: [{ reading: reading }],
              translations: [
                {
                  translation: translation,
                },
              ],
            });
          }

          if (validWords.length === 3) break;
        }

        if (validWords.length > 0) kanji.words = validWords;
      }
    }

    if (svgList) {
      const codePoint: string = kanji.kanji
        .codePointAt(0)!
        .toString(16)
        .toLowerCase();

      const svg: string | undefined = Array.isArray(svgList)
        ? svgList.find((svgFile: string) =>
            [`${codePoint}.svg`, `0${codePoint}.svg`].includes(
              svgFile.toLowerCase(),
            ),
          )
        : (svgList as KanjiSVGMap).get(kanji.kanji);

      if (svg) kanji.svg = svg;
    }

    if (kanji.tags && dictKanji.isKokuji === true) {
      kanji.kokuji = true;
      kanji.tags.push("kanji::kokuji");
    }

    kanji.tags!.push(
      `kanji::strokes::${kanji.strokes}`,
      ...(kanji.frequency ? [`kanji::frequency::${kanji.frequency}`] : []),
      ...(kanji.grade ? [`kanji::grade::${kanji.grade}`] : []),
      ...(kanji.jlpt
        ? [`kanji::pre-2010_jlpt::${kanji.jlpt.toLowerCase()}`]
        : []),
      `kanji::onyomi::${kanji.onyomi?.length ?? 0}`,
      `kanji::kunyomi::${kanji.kunyomi?.length ?? 0}`,
      `kanji::nanori::${kanji.nanori?.length ?? 0}`,
      `kanji::words::${kanji.words?.length ?? 0}`,
      ...(kanji.svg ? ["kanji::has_svg"] : []),
    );

    return kanji;
  } else return undefined;
}

/**
 * Same as {@link getKanji}, but with possible extra info.
 * @param info Additional info for the kanji (mnemonic, components, words)
 * @param kanji The kanji character or a {@link DictKanji} object
 * @param dict An array of converted KANJIDIC entries or a {@link KanjiEntryMap} *(not needed if {@link kanji} is a {@link DictKanji} object)*
 * @param useWords Whether or not to use the words provided in the `info` object (if present) instead of other words from `JMdict`
 * @param jmDict An array of converted `JMdict` entries or a {@link KanjiWordsMap}
 * @param svgList An array of SVG file names or a {@link KanjiSVGMap}
 * @param noteTypeName The Anki note type name
 * @param deckPath The full Anki deck path
 * @param sourceURL A link leading to the source of {@link info}
 * @returns The transformed {@link DictKanji} object
 */
export function getKanjiExtended(
  info: Kanji,
  kanji: string | DictKanji,
  dict?: readonly DictKanji[] | KanjiEntryMap,
  useWords?: true,
  jmDict?: readonly DictWord[] | KanjiWordsMap,
  svgList?: readonly string[] | KanjiSVGMap,
  noteTypeName?: string,
  deckPath?: string,
  sourceURL?: string,
): Kanji | undefined {
  const kanjiObj: Kanji | undefined = getKanji(
    kanji,
    dict,
    jmDict,
    svgList,
    noteTypeName,
    deckPath,
  );

  if (kanjiObj) {
    let usedInfo: boolean = false;

    if (info.components) {
      kanjiObj.components = info.components;
      usedInfo = true;
    }
    if (info.mnemonic && info.mnemonic.length > 0) {
      kanjiObj.mnemonic = info.mnemonic;
      usedInfo = true;
    }
    if (useWords === true && info.words && info.words.length > 0) {
      kanjiObj.words = info.words;
      usedInfo = true;
    }

    if (kanjiObj.components)
      kanjiObj.tags!.push(`kanji::components::${kanjiObj.components.length}`);

    if (kanjiObj.mnemonic && kanjiObj.mnemonic.length > 0)
      kanjiObj.tags!.push("kanji::has_mnemonic");

    if (useWords === true && kanjiObj.words && info.words)
      kanjiObj.tags!.forEach((tag: string, index: number) => {
        if (tag.startsWith("kanji::words::") && kanjiObj.words) {
          kanjiObj.tags!.splice(
            index,
            1,
            `kanji::words::${kanjiObj.words.length}`,
          );
        }
      });

    if (sourceURL && info.externalInfo === true && usedInfo)
      kanjiObj.source = sourceURL;

    return kanjiObj;
  } else return undefined;
}

export function isWord(entry: Result): entry is Word {
  return (
    (entry as Word).translations !== undefined &&
    (entry as Word).readings !== undefined
  );
}

export function isRadical(entry: Result): entry is Radical {
  return (entry as Radical).radical !== undefined;
}

export function isKanji(entry: Result): entry is Kanji {
  return (
    (entry as Word).translations === undefined &&
    (entry as Word).readings === undefined &&
    (entry as Radical).radical === undefined &&
    (entry as Kanji).kanji !== undefined
  );
}

export function isKana(entry: Result): entry is Kana {
  return (entry as Kana).kana !== undefined;
}

export function isGrammar(entry: Result): entry is Grammar {
  return (entry as Grammar).point !== undefined;
}

const createNotes: (notes: string[], phrase?: true) => string = (
  notes: string[],
  phrase?: true,
) =>
  `${phrase === true ? "<details><summary>Show translation</summary>" : ""}<ul class="note-list">${notes.map((note: string) => `<li class="note">${note}</li>`).join("")}</ul>${phrase === true ? "</details>" : ""}`;
const createEntry: (
  entry: string,
  notes?: string[],
  phrase?: true,
  glossSpecific?: true,
) => string = (
  entry: string,
  notes?: string[],
  phrase?: true,
  glossSpecific?: true,
) =>
  `<div class="entry${glossSpecific ? " gloss-specific" : ""}">${entry}${notes && notes.length > 0 ? createNotes(notes, phrase) : ""}</div>`;

/**
 * Generates an array where each field holds an entry’s info wrapped in HTML tags.
 * @param entry Any type of mapped entry ({@link Word}, {@link Kanji}, {@link Radical}, {@link Kana}, {@link Grammar})
 * @returns An array of fields, each corresponding to an Anki note type field
 */
export function generateAnkiNote(entry: Result): string[] {
  const fields: string[] = [];

  if (isWord(entry)) {
    const firstReading: string = createEntry(
      `<span class="word word-reading">${entry.readings[0]!.reading}${entry.readings[0]!.audio !== undefined ? `<br>[sound:${entry.readings[0]!.audio}]` : ""}</span>`,
      entry.readings[0]!.notes,
    );
    const otherReadings: string =
      entry.readings.length > 1
        ? `<details><summary>Show other readings</summary>${entry.readings
            .slice(1)
            .map((readingEntry: Reading) =>
              createEntry(
                `<span class="word word-reading">${readingEntry.reading}${readingEntry.audio !== undefined ? `<br>[sound:${readingEntry.audio}]` : ""}</span>`,
                readingEntry.notes,
              ),
            )
            .join("")}</details>`
        : "";
    const readingsField: string = `${firstReading}${otherReadings}`;

    const firstKanjiForm: string | undefined = entry.kanjiForms
      ? createEntry(
          `<span class="word word-kanjiform"><ruby><rb>${entry.kanjiForms[0]!.kanjiForm}</rb><rt>${entry.readings[0]!.reading}</rt></ruby></span>`,
          entry.kanjiForms[0]!.notes,
        )
      : undefined;
    const otherKanjiForms: string =
      entry.kanjiForms && entry.kanjiForms.length > 1
        ? `<details><summary>Show other kanji forms</summary>${entry.kanjiForms
            .slice(1)
            .map((kanjiFormEntry: KanjiForm) => {
              const restrictedReading: Reading | undefined =
                entry.readings.find(
                  (r: Reading) =>
                    r.notes &&
                    r.notes.includes(
                      `Reading restricted to ${kanjiFormEntry.kanjiForm}`,
                    ),
                );

              return `${createEntry(`<span class="word word-kanjiform">${restrictedReading ? "<ruby><rb>" : ""}${kanjiFormEntry.kanjiForm}${restrictedReading ? `</rb><rt>${restrictedReading.reading}</rt></ruby>` : ""}</span>`, kanjiFormEntry.notes)}`;
            })
            .join("")}</details>`
        : "";

    const kanjiFormsField: string = firstKanjiForm
      ? `${firstKanjiForm}${otherKanjiForms}`
      : '<span class="word word-kanjiform">(no kanji forms)</span>';

    const firstThreeTranslations: string = entry.translations
      .slice(0, 3)
      .map((translationEntry: Translation, index: number) =>
        createEntry(
          `<span class="word word-translation">${translationEntry.translation}</span>`,
          translationEntry.notes,
          undefined,
          entry.phrases?.some(
            (phrase: Phrase, index2: number) =>
              index === index2 &&
              phrase.glossNumber &&
              phrase.glossNumber.wordId === entry.id &&
              phrase.glossNumber.glossNumber === index + 1,
          )
            ? true
            : undefined,
        ),
      )
      .join("");

    const otherTranslations: string =
      entry.translations.length > 3
        ? `<details><summary>Show other translations</summary>${entry.translations
            .map((translationEntry: Translation, index: number) => {
              if (index < 3) return "null";

              return createEntry(
                `<span class="word word-translation">${translationEntry.translation}</span>`,
                translationEntry.notes,
                undefined,
                entry.phrases?.some(
                  (phrase: Phrase, index2: number) =>
                    index === index2 &&
                    phrase.glossNumber &&
                    phrase.glossNumber.wordId === entry.id &&
                    phrase.glossNumber.glossNumber === index + 1,
                )
                  ? true
                  : undefined,
              );
            })
            .filter((translation: string) => translation !== "null")
            .join("")}</details>`
        : "";

    const translationsField: string = `${firstThreeTranslations}${otherTranslations}`;

    const firstFivePhrases: string | undefined = entry.phrases
      ?.slice(0, 5)
      .map((phraseEntry: Phrase, index: number) =>
        createEntry(
          `<span class="word word-phrase"><span class="word word-phrase-original">${phraseEntry.originalPhrase}</span><span class="word word-phrase-furigana">${phraseEntry.phrase}</span></span>`,
          [phraseEntry.translation],
          true,
          entry.translations.some(
            (_translation: Translation, index2: number) =>
              index === index2 &&
              phraseEntry.glossNumber &&
              phraseEntry.glossNumber.wordId === entry.id &&
              phraseEntry.glossNumber.glossNumber === index2 + 1,
          )
            ? true
            : undefined,
        ),
      )
      .join("");

    const otherPhrases: string =
      entry.phrases !== undefined && entry.phrases.length > 5
        ? `<details><summary>Show other phrases</summary>${entry.phrases
            .map((phraseEntry: Phrase, index: number) => {
              if (index < 5) return "null";

              return createEntry(
                `<span class="word word-phrase"><span class="word word-phrase-original">${phraseEntry.originalPhrase}</span><span class="word word-phrase-furigana">${phraseEntry.phrase}</span></span>`,
                [phraseEntry.translation],
                true,
                entry.translations.some(
                  (_translation: Translation, index2: number) =>
                    index === index2 &&
                    phraseEntry.glossNumber &&
                    phraseEntry.glossNumber.wordId === entry.id &&
                    phraseEntry.glossNumber.glossNumber === index2 + 1,
                )
                  ? true
                  : undefined,
              );
            })
            .filter((phrase: string) => phrase !== "null")
            .join("")}</details>`
        : "";

    const phrasesField: string = firstFivePhrases
      ? `${firstFivePhrases}${otherPhrases}`
      : '<span class="word word-phrase">(no phrases) (Search on dictionaries!)</span>';

    const firstThreeDefinitions: string | undefined = entry.definitions
      ?.slice(0, 3)
      .map((definitionEntry: Definition) =>
        createEntry(
          `<span class="word word-definition${definitionEntry.mayNotBeAccurate === true ? " mnba" : ""}"><span class="word word-definition-original">${definitionEntry.definition}</span><span class="word word-definition-furigana">${definitionEntry.furigana ?? definitionEntry.definition}</span></span>`,
        ),
      )
      .join("");

    const otherDefinitions: string =
      entry.definitions !== undefined && entry.definitions.length > 3
        ? `<details><summary>Show other definitions</summary>${entry.definitions
            .map((definitionEntry: Definition, index: number) =>
              index > 2
                ? `${createEntry(
                    `<span class="word word-definition${definitionEntry.mayNotBeAccurate === true ? " mnba" : ""}"><span class="word word-definition-original">${definitionEntry.definition}</span><span class="word word-definition-furigana">${definitionEntry.furigana ?? definitionEntry.definition}</span></span>`,
                  )}`
                : "null",
            )
            .filter((definition: string) => definition !== "null")
            .join("")}</details>`
        : "";

    const definitionsField: string = firstThreeDefinitions
      ? `${firstThreeDefinitions}${otherDefinitions}`
      : '<span class="word word-definition">(no definitions)</span>';

    fields.push(
      ...(entry.kanjiForms && !entry.usuallyInKana
        ? [kanjiFormsField, readingsField]
        : [readingsField, kanjiFormsField]),
      translationsField,
      phrasesField,
      definitionsField,
      entry.kanji
        ? entry.kanji
            .map((kanjiEntry: Kanji) =>
              createEntry(
                `<span class="word word-kanji">${kanjiEntry.kanji}${kanjiEntry.meanings === undefined ? " (no meanings)" : ""}</span>`,
                kanjiEntry.meanings,
              ),
            )
            .join("")
        : '<span class="word word-kanji">(no kanji)</span>',
      ...(entry.tags && entry.tags.length > 0
        ? [
            entry.tags
              .map((tag: string) =>
                tag.trim().toLowerCase().replaceAll(" ", "::"),
              )
              .join(" "),
          ]
        : []),
    );
  }

  if (isRadical(entry))
    fields.push(
      createEntry(
        `<span class="radical radical-character">${entry.radical}</span>`,
      ),
      createEntry(
        `<span class="radical radical-reading">${entry.reading}</span>`,
      ),
      entry.meanings
        .map((meaningEntry: string) =>
          createEntry(
            `<span class="radical radical-meaning">${meaningEntry}</span>`,
          ),
        )
        .join(""),
      entry.mnemonic
        ? createEntry(
            `<span class="radical radical-mnemonic">${entry.mnemonic}</span>`,
          )
        : '<span class="radical radical-mnemonic">(no mnemonic) (Come up with your own!)</span>',
      entry.kanji
        ? entry.kanji
            .map((kanji: Kanji) =>
              createEntry(
                `<span class="radical radical-kanji">${kanji.kanji}${kanji.meanings && kanji.meanings.length === 1 ? ` - ${kanji.meanings[0]}` : ""}</span>`,
              ),
            )
            .join("")
        : '<span class="radical radical-kanji">(no "used-in" kanji)</span>',
      entry.strokes
        ? createEntry(
            `<span class="radical radical-strokes">${entry.strokes}<br>${entry.svg ? `<img class="radical radical-stroke-order" src="${entry.svg}" alt="${entry.radical} stroke order SVG">` : "(no stroke order SVG available)"}</span>`,
          )
        : '<span class="radical radical-strokes">(no stroke number)</span>',
      entry.sources
        ? `<span class="radical radical-source">${entry.sources.map((source: string, index: number) => `<a href="${source}" target="_blank">Source ${index + 1}</a>`).join("<br>")}</span>`
        : '<span class="radical radical-source">(no sources)</span>',
      ...(entry.tags && entry.tags.length > 0
        ? [
            entry.tags
              .map((tag: string) =>
                tag.trim().toLowerCase().replaceAll(" ", "::"),
              )
              .join(" "),
          ]
        : []),
    );

  if (isKanji(entry))
    fields.push(
      createEntry(`<span class="kanji kanji-character">${entry.kanji}</span>`),
      entry.meanings
        ? entry.meanings
            .map((meaningEntry: string) =>
              createEntry(
                `<span class="kanji kanji-meaning">${meaningEntry}</span>`,
              ),
            )
            .join("")
        : '<span class="kanji kanji-meaning">(no meanings)</span>',
      entry.onyomi
        ? entry.onyomi
            .map((onyomiEntry: string) =>
              createEntry(
                `<span class="kanji kanji-onyomi">${onyomiEntry}</span>`,
              ),
            )
            .join("")
        : `<span class="kanji kanji-onyomi">(no onyomi) ${entry.kokuji === true ? "(kokuji)" : ""}</span>`,
      entry.kunyomi
        ? entry.kunyomi
            .map((kunyomiEntry: string) =>
              createEntry(
                `<span class="kanji kanji-kunyomi">${kunyomiEntry}</span>`,
              ),
            )
            .join("")
        : `<span class="kanji kanji-kunyomi">(no kunyomi) ${entry.kokuji === true ? "(kokuji)" : ""}</span>`,
      entry.nanori
        ? entry.nanori
            .map((nanoriEntry: string) =>
              createEntry(
                `<span class="kanji kanji-nanori">${nanoriEntry}</span>`,
              ),
            )
            .join("")
        : '<span class="kanji kanji-nanori">(no nanori)</span>',
      entry.components
        ? entry.components
            .map((componentEntry: KanjiComponent) =>
              createEntry(
                `<span class="kanji kanji-component">${componentEntry.component}${componentEntry.meaning ? ` - ${componentEntry.meaning}` : ""}</span>`,
              ),
            )
            .join("")
        : '<span class="kanji kanji-component">(no components)</span>',
      entry.mnemonic
        ? createEntry(
            `<span class="kanji kanji-mnemonic">${entry.mnemonic}</span>`,
          )
        : '<span class="kanji kanji-mnemonic">(no mnemonic) (Come up with your own!)</span>',
      entry.words
        ? entry.words
            .map((word: Word) =>
              createEntry(
                `<span class="kanji kanji-words">${word.kanjiForms![0]!.kanjiForm} / ${word.readings[0]!.reading} - ${word.translations[0]!.translation}</span>`,
              ),
            )
            .join("")
        : '<span class="kanji kanji-words">(no words) (Search on dictionaries!)</span>',
      entry.strokes
        ? createEntry(
            `<span class="kanji kanji-strokes">${entry.strokes}<br>${entry.svg ? `<img class="kanji kanji-stroke-order" src="${entry.svg}" alt="${entry.kanji} stroke order SVG">` : "(no stroke order SVG available)"}</span>`,
          )
        : '<span class="kanji kanji-strokes">(no stroke number)</span>',
      entry.source
        ? `<span class="kanji kanji-source"><a href="${entry.source}" target="_blank">Source</a></span>`
        : '<span class="kanji kanji-source">(no components/mnemonic source)</span>',
      ...(entry.tags && entry.tags.length > 0
        ? [
            entry.tags
              .map((tag: string) =>
                tag.trim().toLowerCase().replaceAll(" ", "::"),
              )
              .join(" "),
          ]
        : []),
    );

  if (isKana(entry))
    fields.push(
      createEntry(`<span class="kana kana-character">${entry.kana}</span>`),
      createEntry(
        `<span class="kana kana-reading">${entry.reading}${entry.audio !== undefined ? `<br>[sound:${entry.audio}]` : ""}</span>`,
      ),
      entry.svg
        ? createEntry(
            `<img class="kana kana-stroke-order" src="${entry.svg}" alt="${entry.kana} stroke order SVG">`,
          )
        : "(no stroke order SVG available)",
      ...(entry.tags && entry.tags.length > 0
        ? [
            entry.tags
              .map((tag: string) =>
                tag.trim().toLowerCase().replaceAll(" ", "::"),
              )
              .join(" "),
          ]
        : []),
    );

  if (isGrammar(entry))
    fields.push(
      createEntry(`<span class="grammar grammar-point">${entry.point}</span>`),
      entry.readings
        ? entry.readings
            .map((readingEntry: Reading) =>
              createEntry(
                `<span class="grammar grammar-reading">${readingEntry.reading}</span>`,
              ),
            )
            .join("")
        : '<span class="grammar grammar-reading">(no additional readings)</span>',
      createEntry(
        `<span class="grammar grammar-meaning">${entry.meaning.meaning}${entry.meaning.example && entry.meaning.example.length > 0 ? `<br><span class="grammar grammar-meaning-example">${entry.meaning.example}</span>` : ""}</span>`,
      ),
      entry.usages
        ? entry.usages
            .map((usage) =>
              createEntry(
                `<span class="grammar grammar-usage">${usage}</span>`,
              ),
            )
            .join("")
        : '<span class="grammar grammar-usage">(no usages)</span>',
      entry.phrases
        ? entry.phrases
            .map((phraseEntry: Phrase) =>
              createEntry(
                `<span class="grammar grammar-phrase"><span class="grammar grammar-phrase-original">${phraseEntry.originalPhrase}</span><span class="grammar grammar-phrase-furigana">${phraseEntry.phrase}</span></span>`,
                [phraseEntry.translation],
                true,
              ),
            )
            .join("")
        : '<span class="grammar grammar-phrase">(no phrases) (Search on dictionaries!)</span>',
      entry.source
        ? `<span class="grammar grammar-source"><a href="${entry.source}" target="_blank">Source</a></span>`
        : '<span class="grammar grammar-source">(no source)</span>',
      ...(entry.tags && entry.tags.length > 0
        ? [
            entry.tags
              .map((tag: string) =>
                tag.trim().toLowerCase().replaceAll(" ", "::"),
              )
              .join(" "),
          ]
        : []),
    );

  return fields.map((field: string) => field.replaceAll("\n", "<br>"));
}

/**
 * Generates an Anki notes file with each entry’s info organized into fields, either in HTML or plain text.
 * @param list An array containing any type of transformed entries ({@link Word}, {@link Kanji}, {@link Radical}, {@link Kana}, {@link Grammar})
 * @param defaultNoteInfo An object with options regarding default values of some note information
 * @returns The resulting Anki notes file's content
 */
export function generateAnkiNotesFile(
  list: readonly Result[],
  defaultNoteInfo?: DefaultNoteInfo | undefined,
): string {
  const headers: string[] = [noteHeaderKeys.separator, noteHeaderKeys.html];
  let ankiNotes: string = "";

  if (list.length > 0) {
    if (defaultNoteInfo === undefined) defaultNoteInfo = {};

    const infoValues: any[] = Object.values(defaultNoteInfo);

    let invalidList: boolean = false;

    const firstEntry: Result = list[0]!;
    const firstEntryInfo: {
      readonly guid: "string" | "undefined";
      readonly noteType: "string" | "undefined";
      readonly deckPath: "string" | "undefined";
    } = {
      guid: typeof firstEntry.noteID as "string" | "undefined",
      noteType: typeof firstEntry.noteTypeName as "string" | "undefined",
      deckPath: typeof firstEntry.deckPath as "string" | "undefined",
    };

    if (
      infoValues.length === 0 ||
      infoValues.some((value: any) => value === true || value === undefined)
    )
      for (const res of list)
        if (
          (defaultNoteInfo.guid === true && res.noteID === undefined) ||
          (defaultNoteInfo.noteType === true &&
            res.noteTypeName === undefined) ||
          (defaultNoteInfo.deckPath === true && res.deckPath === undefined) ||
          (defaultNoteInfo.guid === undefined &&
            typeof res.noteID !== firstEntryInfo.guid) ||
          (defaultNoteInfo.noteType === undefined &&
            typeof res.noteTypeName !== firstEntryInfo.noteType) ||
          (defaultNoteInfo.deckPath === undefined &&
            typeof res.deckPath !== firstEntryInfo.deckPath)
        ) {
          invalidList = true;
          break;
        }

    if (invalidList) throw new Error("Invalid result list");

    const hasHeader: {
      guid: boolean;
      noteType: boolean;
      deckPath: boolean;
      tags: boolean;
    } = { guid: false, noteType: false, deckPath: false, tags: false };
    let headerCount: 0 | 1 | 2 | 3 = 0;

    ankiNotes = list
      .filter((result: Result) => result.doNotCreateNote === undefined)
      .map((result: Result) => {
        if (
          typeof defaultNoteInfo!.guid === "string" &&
          result.noteID === undefined
        ) {
          if (isWord(result) && result.id) result.noteID = result.id;
          if (isKanji(result)) result.noteID = result.kanji;
          if (isRadical(result)) result.noteID = result.radical;
          if (isKana(result)) result.noteID = result.kana;
          if (isGrammar(result) && result.id) result.noteID = result.id;
        }

        if (
          typeof defaultNoteInfo!.noteType === "string" &&
          result.noteTypeName === undefined
        )
          result.noteTypeName = defaultNoteInfo!.noteType;
        if (
          typeof defaultNoteInfo!.deckPath === "string" &&
          result.deckPath === undefined
        )
          result.deckPath = defaultNoteInfo!.deckPath;

        if (!hasHeader.guid && result.noteID) {
          headers.push(`${noteHeaderKeys.guid}${++headerCount}`);
          hasHeader.guid = true;
        }
        if (!hasHeader.noteType && result.noteTypeName) {
          headers.push(`${noteHeaderKeys.notetype}${++headerCount}`);
          hasHeader.noteType = true;
        }
        if (!hasHeader.deckPath && result.deckPath) {
          headers.push(`${noteHeaderKeys.deck}${++headerCount}`);
          hasHeader.deckPath = true;
        }

        const note: string[] = generateAnkiNote(result);

        if (!hasHeader.tags) {
          headers.push(`${noteHeaderKeys.tags}${note.length + headerCount}`);
          hasHeader.tags = true;
        }

        return `${result.noteID ? `${result.noteID}\t` : ""}${result.noteTypeName ? `${result.noteTypeName}\t` : ""}${result.deckPath ? `${result.deckPath}\t` : ""}${note.join("\t")}`;
      })
      .join("\n")
      .trim();
  }

  return `${headers.join("\n")}\n\n${ankiNotes}`;
}
