import { ReadStream } from "fs";
import { createInterface, Interface } from "readline";
import libxml from "libxmljs2";
import xml from "xml2js";
import iconv from "iconv-lite";
import {
  noteHeaderKeys,
  noteMap,
  notSearchedForms,
  posList,
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
  DictName,
  DictRadical,
  DictReading,
  DictTranslation,
  DictWord,
  EntryExamplesMap,
  EntryMaps,
  ExamplePart,
  Grammar,
  JaWiktionaryEntry,
  Kana,
  Kanji,
  KanjiComponent,
  KanjiEntryMap,
  KanjiForm,
  KanjiSVGMap,
  KanjiWordsMap,
  Name,
  NameIDEntryMap,
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
  WordIDEntryMap,
} from "./types";

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
  const a: T[] = Array.from(arr);

  for (let i: number = a.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    const tmp: T = a[i]!;
    a[i] = a[j]!;
    a[j] = tmp!;
  }

  return a;
}

/**
 * Convert hiragana text to katakana text
 * @param input The hiragana text
 * @returns The katakana text
 */
export function hiraganaToKatakana(input: string): string {
  const decomposed: string = input.normalize("NFD");
  const output: string[] = [];

  for (const ch of decomposed.split("")) {
    const cp: number = ch.codePointAt(0)!;

    if (cp === 0x3099 || cp === 0x309a) {
      output.push(ch);
      continue;
    }

    if (cp >= 0x3040 && cp <= 0x309f)
      output.push(String.fromCodePoint(cp + 0x60));
    else output.push(ch);
  }

  return output.join("").normalize("NFC");
}

/**
 * Convert katakana text to hiragana text
 * @param input The katakana text
 * @returns The hiragana text
 */
export function katakanaToHiragana(input: string): string {
  const decomposed: string = input.normalize("NFD");
  const output: string[] = [];

  for (const ch of decomposed.split("")) {
    const cp: number = ch.codePointAt(0)!;

    if (cp === 0x3099 || cp === 0x309a) {
      output.push(ch);
      continue;
    }

    if (cp >= 0x30a0 && cp <= 0x30ff)
      output.push(String.fromCodePoint(cp - 0x60));
    else output.push(ch);
  }

  return output.join("").normalize("NFC");
}

/**
 * Generates furigana for Japanese text.
 *
 * This a workaround function for some cases in which text contains `・` and `Kuroshiro` fails to parse it.
 * @param text The text
 * @param bindedFunction The `Kuroshiro` convert function
 * @returns The `<ruby>`-formatted furigana text
 */
export async function generateFurigana(
  text: string,
  bindedFunction: (text: string, options?: any) => Promise<string>,
): Promise<string> {
  if (!text.includes("・")) {
    const furigana: string = await bindedFunction(text, {
      to: "hiragana",
      mode: "furigana",
    });

    return furigana;
  }

  return (
    await Promise.all(
      text.split("・").map(async (part: string) => {
        const tFurigana: string = await bindedFunction(part, {
          to: "hiragana",
          mode: "furigana",
        });

        return tFurigana;
      }),
    )
  ).join("・");
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
  kanjiForms?: readonly DictKanjiForm[],
  wordIsCommon?: true,
): ReadingsKanjiFormsPair {
  const kanjiFormRestrictions: Set<string> = new Set<string>();

  const validReadings: DictReading[] = readings.filter(
    (reading: DictReading, index: number) => {
      if (index === 0) return true;

      if (
        reading.notes === undefined ||
        !reading.notes.some((note: string) => notSearchedForms.has(note))
      ) {
        if (reading.kanjiFormRestrictions !== undefined) {
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

  const existValidKf: boolean | undefined = kanjiForms?.some(
    (kf: DictKanjiForm, index: number) =>
      index !== 0 &&
      (kf.notes === undefined ||
        (!kf.notes.some((note: string) => notSearchedForms.has(note)) &&
          (wordIsCommon === undefined || kf.commonness !== undefined)) ||
        kanjiFormRestrictions.has(kf.form)),
  );

  const validKanjiForms: DictKanjiForm[] | undefined = kanjiForms?.filter(
    (kanjiForm: DictKanjiForm, index: number) => {
      if (index === 0) return true;

      if (existValidKf === true)
        return (
          kanjiForm.notes === undefined ||
          (!kanjiForm.notes.some((note: string) =>
            notSearchedForms.has(note),
          ) &&
            (wordIsCommon === undefined ||
              kanjiForm.commonness !== undefined)) ||
          kanjiFormRestrictions.has(kanjiForm.form)
        );
      else return true;
    },
  );

  return {
    readings: validReadings,
    ...(validKanjiForms !== undefined ? { kanjiForms: validKanjiForms } : {}),
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
  examples?: readonly TanakaExample[],
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
      examples !== undefined && examples.length > 0
        ? new Set<string>(
            examples.flatMap((example: TanakaExample) =>
              example.parts.flatMap((part: ExamplePart) => [
                part.baseForm,
                ...(part.reading !== undefined ? [part.reading] : []),
                ...(part.referenceID !== undefined ? [part.referenceID] : []),
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

        for (const gloss of meaning.gloss) {
          const translation: string = String(gloss._ ?? gloss).trim();
          const type: string | undefined =
            typeof gloss.$ === "object" && typeof gloss.$.g_type === "string"
              ? gloss.$.g_type
              : undefined;

          if (translation.length > 0 && type !== undefined && type.length > 0)
            meaningObj.translations.push({
              translation: translation,
              type: type,
            });
          else meaningObj.translations.push(translation);
        }

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
            meaningObj.misc !== undefined &&
            meaningObj.misc.includes("word usually written using kana alone")
          )
            usuallyInKanaMeanings++;
        }
        if (isStringArray(meaning.dial)) meaningObj.dialects = meaning.dial;

        entryObj.meanings.push(meaningObj);
      }

      if (entryObj.meanings.length === usuallyInKanaMeanings)
        entryObj.usuallyInKana = true;

      if (examples !== undefined) {
        let existsExample: boolean = false;

        if (tanakaParts !== undefined && tanakaParts.has(entryObj.id))
          existsExample = true;

        if (!existsExample) {
          const rkf: ReadingsKanjiFormsPair = getValidForms(
            entryObj.readings,
            entryObj.kanjiForms,
            entryObj.isCommon,
          );

          const validReadings: Set<string> = new Set<string>(
            rkf.readings.map((r: DictReading) => r.reading),
          );
          const validKanjiForms: Set<string> | undefined =
            rkf.kanjiForms !== undefined
              ? new Set<string>(
                  rkf.kanjiForms.map((kf: DictKanjiForm) => kf.form),
                )
              : undefined;

          if (
            validKanjiForms !== undefined &&
            validKanjiForms.size > 0 &&
            tanakaParts !== undefined
          )
            for (const kf of validKanjiForms)
              if (tanakaParts.has(kf)) {
                existsExample = true;
                break;
              }

          if (
            entryObj.kanjiForms === undefined &&
            validReadings.size > 0 &&
            tanakaParts !== undefined
          )
            for (const r of validReadings)
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
 * Converts a JMnedict `JMnedict.xml` file into an array of {@link DictWord} objects.
 * @param xmlString The raw `JMnedict.xml` file contents
 * @param examples An array of converted `Tanaka Corpus` examples
 * @returns An array of converted {@link DictWord} objects
 */
export function convertJMnedict(
  xmlString: string,
  examples?: readonly TanakaExample[],
): DictName[] {
  const dictParsed: libxml.Document = libxml.parseXml(xmlString, {
    dtdvalid: true,
    nonet: false,
    noent: true,
    recover: false,
  });
  const dict: DictName[] = [];

  xml.parseString(dictParsed, (_err: Error | null, result: any) => {
    const tanakaParts: Set<string> | undefined =
      examples !== undefined && examples.length > 0
        ? new Set<string>(
            examples.flatMap((example: TanakaExample) =>
              example.parts.flatMap((part: ExamplePart) => [
                part.baseForm,
                ...(part.reading !== undefined ? [part.reading] : []),
                ...(part.referenceID !== undefined ? [part.referenceID] : []),
              ]),
            ),
          )
        : undefined;

    for (const entry of result.JMnedict.entry) {
      const entryObj: DictName = {
        id: entry.ent_seq[0],
        nameReadings: [],
        meanings: [],
      };

      const kanjiForms: any = entry.k_ele;
      const readings: any = entry.r_ele;
      const translations: any = entry.trans;

      if (isObjectArray(kanjiForms)) {
        entryObj.kanjiForms = [];

        for (const kanjiForm of kanjiForms)
          entryObj.kanjiForms.push({ form: kanjiForm.keb[0] });
      }

      for (const reading of readings) {
        const readingObj: DictReading = {
          reading: reading.reb[0],
        };

        if (isStringArray(reading.re_restr))
          readingObj.kanjiFormRestrictions = reading.re_restr;

        if (isStringArray(reading.re_pri)) {
          readingObj.commonness = reading.re_pri;

          entryObj.isCommon = true;
        }

        entryObj.nameReadings.push(readingObj);
      }

      for (const trans of translations)
        entryObj.meanings.push({
          translations: trans.trans_det,
          ...(isStringArray(trans.name_type)
            ? { nameTypes: trans.name_type }
            : {}),
        });

      if (examples !== undefined) {
        let existsExample: boolean = false;

        const rkf: ReadingsKanjiFormsPair = getValidForms(
          entryObj.nameReadings,
          entryObj.kanjiForms,
          entryObj.isCommon,
        );

        const validReadings: Set<string> = new Set<string>(
          rkf.readings.map((r: DictReading) => r.reading),
        );
        const validKanjiForms: Set<string> | undefined =
          rkf.kanjiForms !== undefined
            ? new Set<string>(
                rkf.kanjiForms.map((kf: DictKanjiForm) => kf.form),
              )
            : undefined;

        if (
          validKanjiForms !== undefined &&
          validKanjiForms.size > 0 &&
          tanakaParts !== undefined
        )
          for (const kf of validKanjiForms)
            if (tanakaParts.has(kf)) {
              existsExample = true;
              break;
            }

        if (
          entryObj.kanjiForms === undefined &&
          validReadings.size > 0 &&
          tanakaParts !== undefined
        )
          for (const r of validReadings)
            if (tanakaParts.has(r)) {
              existsExample = true;
              break;
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
          kanjiObj.misc.jlpt = `N${Number(String(misc.jlpt[0]))}`;

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
                    typeof reading._ === "string" &&
                    typeof reading.$ === "object" &&
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

            if (rmObj.groups!.length > 0 || rmObj.nanori !== undefined)
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

    if (
      a !== undefined &&
      b !== undefined &&
      a.startsWith("A: ") &&
      b.startsWith("B: ")
    ) {
      a = a.replace("A: ", "");
      b = b.replace("B: ", "");

      const idMatch: string | undefined = regexps.tanakaID
        .exec(a)
        ?.groups!.id?.trim();
      const idParts: string[] = String(idMatch).split("_");
      const id: TanakaID = `${Number(idParts[0])}_${Number(idParts[1])}`;

      const aParts: string[] = a.replace(regexps.tanakaID, "").split("\t");

      const bRawParts: string[] = b
        .split(" ")
        .filter((part: string) => part.trim().length !== 0);

      const bParts: ExamplePart[] = [];

      for (const part of bRawParts) {
        const partMatches: RegExpExecArray | null =
          regexps.tanakaPart.exec(part);

        const baseForm: string = partMatches?.groups!.base!;

        const examplePart: ExamplePart = { baseForm: baseForm };

        const reading: string | undefined = partMatches?.groups!.reading;
        const glossNumber: string | undefined = partMatches?.groups!.glossnum;
        const inflectedForm: string | undefined =
          partMatches?.groups!.inflection;

        if (reading !== undefined)
          if (regexps.tanakaReferenceID.test(reading)) {
            const referenceID: RegExpExecArray | null =
              regexps.tanakaReferenceID.exec(reading);

            examplePart.referenceID = `${Number(referenceID?.groups!.entryid)}`;
          } else examplePart.reading = reading;

        if (glossNumber !== undefined)
          examplePart.glossNumber = glossNumber.startsWith("0")
            ? Number.parseInt(glossNumber.substring(1))
            : Number.parseInt(glossNumber);

        if (inflectedForm !== undefined)
          examplePart.inflectedForm = inflectedForm;

        if (baseForm.endsWith("~")) {
          examplePart.edited = true;
          examplePart.baseForm = examplePart.baseForm.replace("~", "");
        }

        bParts.push(examplePart);
      }

      const phrase: string = aParts[0]!;
      const translation: string = aParts[1]!;

      tanakaArray.push({
        id: id,
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
  const tanakaArray: TanakaExample[] = convertTanakaCorpus(tanakaString);

  const kuroshiro: any = new Kuroshiro.default();
  await kuroshiro.init(new KuromojiAnalyzer());

  const convert: any = kuroshiro.convert.bind(kuroshiro);

  for (let i: number = 0; i < tanakaArray.length; i++)
    tanakaArray[i]!.furigana = await generateFurigana(
      tanakaArray[i]!.phrase,
      convert,
    );

  return tanakaArray;
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

  for (let i: number = 0; i < fileParsed.length; i++) {
    const line: string | undefined = fileParsed[i];

    if (line !== undefined && line.startsWith("$ ")) {
      const radical: DictRadical = {
        radical: line.charAt(2).trim(),
        strokes: line.substring(4).trim(),
      };

      let j: number = i + 1;
      let kanjiLine: string | undefined = fileParsed[j];

      const kanjiList: DictKanji[] = [];

      while (kanjiLine !== undefined && !kanjiLine.startsWith("$ ")) {
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
        if (kanjiLine === undefined) continue;

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

  for (const line of fileParsed)
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

        if (foundRadical === undefined) {
          const katakanaChar: Kana | undefined = katakanaList.find(
            (kana: Kana) => kana.kana === radical,
          );
          if (katakanaChar === undefined) continue;

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

  return kanjiWithRadicals;
}

/**
 * Maps entry properties (IDs and kanji) with other entries.
 *
 * - {@link jmDict} => {@link WordIDEntryMap}, {@link KanjiWordsMap}
 *
 * - {@link jmNedict} => {@link NameIDEntryMap}
 *
 * - {@link kanjiDic} => {@link KanjiEntryMap}, {@link KanjiSVGMap} (only if {@link svgList} is present)
 *
 * - {@link tanakaExamples} => {@link EntryExamplesMap} (requires {@link jmDict} or/and {@link jmNedict})
 *
 * - {@link wordDefinitionPairs} => {@link WordDefinitionsMap}
 *
 * @param jmDict An array of converted `JMdict` entries
 * @param jmNedict
 * @param kanjiDic An array of converted `KANJIDIC` entries
 * @param tanakaExamples An array of converted `Tanaka Corpus` examples
 * @param wordDefinitionPairs An array of `ja.wiktionary.org` word-definitions pairs
 * @param svgList An array of SVG file names
 * @returns An object containing of any entry maps, their presence being dependent on the provided arguments.
 */
export function createEntryMaps(
  jmDict?: readonly DictWord[],
  jmNedict?: readonly DictName[],
  kanjiDic?: readonly DictKanji[],
  tanakaExamples?: readonly TanakaExample[],
  wordDefinitionPairs?: readonly WordDefinitionPair[],
  svgList?: readonly string[],
): EntryMaps {
  const kanjiEntryMap: KanjiEntryMap = new Map<string, DictKanji>();
  const wordIDEntryMap: WordIDEntryMap = new Map<StringNumber, DictWord>();
  const nameIDEntryMap: NameIDEntryMap = new Map<StringNumber, DictName>();
  const kanjiWordsMap: KanjiWordsMap = new Map<string, DictWord[]>();
  const wordExamplesMap: EntryExamplesMap = new Map<
    StringNumber,
    TanakaExample[]
  >();
  const nameExamplesMap: EntryExamplesMap = new Map<
    StringNumber,
    TanakaExample[]
  >();
  const wordDefinitionsMap: WordDefinitionsMap = new Map<
    StringNumber,
    Definition[]
  >();
  const kanjiSVGMap: KanjiSVGMap = new Map<string, string>();

  if (kanjiDic !== undefined)
    for (const kanji of kanjiDic) kanjiEntryMap.set(kanji.kanji, kanji);

  if (wordDefinitionPairs !== undefined)
    for (const pair of wordDefinitionPairs)
      wordDefinitionsMap.set(pair.wordID, pair.definitions);

  if (kanjiDic !== undefined && svgList !== undefined)
    for (const kanji of kanjiDic) {
      const codePoint: string = kanji.kanji
        .codePointAt(0)!
        .toString(16)
        .toLowerCase();

      const svg: string | undefined = svgList.find((file: string) => {
        const baseName: string = file.split(".")[0]!.toLowerCase();

        return baseName === codePoint || baseName === `0${codePoint}`;
      });

      if (svg !== undefined) kanjiSVGMap.set(kanji.kanji, svg);
    }

  if (jmDict !== undefined) {
    const wordPartsMap: Map<StringNumber, Set<string>> = new Map<
      StringNumber,
      Set<string>
    >();
    const partExamplesMap: Map<string, TanakaExample[]> = new Map<
      string,
      TanakaExample[]
    >();
    const entryParts: Set<string> = new Set<string>();

    for (const word of jmDict) {
      wordIDEntryMap.set(word.id, word);

      if (word.kanjiForms !== undefined)
        for (const kf of word.kanjiForms)
          for (const char of kf.form
            .split("")
            .filter((c: string) => regexps.kanji.test(c)))
            if (!kanjiWordsMap.has(char)) kanjiWordsMap.set(char, [word]);
            else kanjiWordsMap.get(char)!.push(word);

      if (tanakaExamples !== undefined) {
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

        if (rkf.kanjiForms !== undefined && rkf.kanjiForms.length > 0)
          for (const kanjiForm of rkf.kanjiForms) {
            entryParts.add(kanjiForm.form);
            localPartParts.add(kanjiForm.form);
          }

        entryParts.add(word.id);
        localPartParts.add(word.id);

        wordPartsMap.set(word.id, localPartParts);
      }
    }

    if (tanakaExamples !== undefined) {
      for (const ex of tanakaExamples)
        for (const part of ex.parts) {
          if (entryParts.has(part.baseForm)) {
            const exList: TanakaExample[] | undefined = partExamplesMap.get(
              part.baseForm,
            );

            if (exList === undefined) partExamplesMap.set(part.baseForm, [ex]);
            else exList.push(ex);
          }
          if (part.reading !== undefined && entryParts.has(part.reading)) {
            const exList: TanakaExample[] | undefined = partExamplesMap.get(
              part.reading,
            );

            if (exList === undefined) partExamplesMap.set(part.reading, [ex]);
            else exList.push(ex);
          }

          if (
            part.referenceID !== undefined &&
            entryParts.has(part.referenceID)
          ) {
            const exList: TanakaExample[] | undefined = partExamplesMap.get(
              part.referenceID,
            );

            if (exList === undefined)
              partExamplesMap.set(part.referenceID, [ex]);
            else exList.push(ex);
          }
        }

      for (const word of jmDict) {
        const seenEx: Set<string> = new Set<string>();
        const validExamples: TanakaExample[] = [];

        for (const p of wordPartsMap.get(word.id)!) {
          const examplesForPart: TanakaExample[] | undefined = partExamplesMap
            .get(p)
            ?.filter((ex: TanakaExample) => !seenEx.has(ex.id));
          if (examplesForPart === undefined) continue;

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

  if (jmNedict !== undefined) {
    const namePartsMap: Map<StringNumber, Set<string>> = new Map<
      StringNumber,
      Set<string>
    >();
    const partExamplesMap: Map<string, TanakaExample[]> = new Map<
      string,
      TanakaExample[]
    >();
    const entryParts: Set<string> = new Set<string>();

    for (const name of jmNedict) {
      nameIDEntryMap.set(name.id, name);

      if (tanakaExamples !== undefined) {
        const rkf: ReadingsKanjiFormsPair = getValidForms(
          name.nameReadings,
          name.kanjiForms,
          name.isCommon,
        );

        const localPartParts: Set<string> = new Set<string>();

        for (const reading of rkf.readings) {
          entryParts.add(reading.reading);
          localPartParts.add(reading.reading);
        }

        if (rkf.kanjiForms !== undefined && rkf.kanjiForms.length > 0)
          for (const kanjiForm of rkf.kanjiForms) {
            entryParts.add(kanjiForm.form);
            localPartParts.add(kanjiForm.form);
          }

        entryParts.add(name.id);
        localPartParts.add(name.id);

        namePartsMap.set(name.id, localPartParts);
      }
    }

    if (tanakaExamples !== undefined) {
      for (const ex of tanakaExamples)
        for (const part of ex.parts) {
          if (entryParts.has(part.baseForm)) {
            const exList: TanakaExample[] | undefined = partExamplesMap.get(
              part.baseForm,
            );

            if (exList === undefined) partExamplesMap.set(part.baseForm, [ex]);
            else exList.push(ex);
          }
          if (part.reading !== undefined && entryParts.has(part.reading)) {
            const exList: TanakaExample[] | undefined = partExamplesMap.get(
              part.reading,
            );

            if (exList === undefined) partExamplesMap.set(part.reading, [ex]);
            else exList.push(ex);
          }
        }

      for (const name of jmNedict) {
        const seenEx: Set<string> = new Set<string>();
        const validExamples: TanakaExample[] = [];

        for (const p of namePartsMap.get(name.id)!) {
          const examplesForPart: TanakaExample[] | undefined = partExamplesMap
            .get(p)
            ?.filter((ex: TanakaExample) => !seenEx.has(ex.id));
          if (examplesForPart === undefined) continue;

          for (const ex of examplesForPart) {
            seenEx.add(ex.id);
            validExamples.push(ex);
          }
        }

        if (validExamples.length > 0)
          nameExamplesMap.set(name.id, validExamples);
      }
    }
  }

  return {
    ...(wordIDEntryMap.size > 0 ? { wordIDEntryMap: wordIDEntryMap } : {}),
    ...(nameIDEntryMap.size > 0 ? { nameIDEntryMap: nameIDEntryMap } : {}),
    ...(kanjiWordsMap.size > 0 ? { kanjiWordsMap: kanjiWordsMap } : {}),
    ...(kanjiEntryMap.size > 0 ? { kanjiEntryMap: kanjiEntryMap } : {}),
    ...(wordExamplesMap.size > 0 ? { wordExamplesMap: wordExamplesMap } : {}),
    ...(nameExamplesMap.size > 0 ? { nameExamplesMap: nameExamplesMap } : {}),
    ...(wordDefinitionsMap.size > 0
      ? { wordDefinitionsMap: wordDefinitionsMap }
      : {}),
    ...(kanjiSVGMap.size > 0 ? { kanjiSVGMap: kanjiSVGMap } : {}),
  };
}

function mapEntry(entry: any): JaWiktionaryEntry {
  const senses: unknown[] = Array.from(
    entry.senses.filter(
      (sense: any) =>
        (isObjectArray(sense.form_of) &&
          sense.form_of.every((form: any) => typeof form.word === "string") ===
            true) ||
        isStringArray(sense.glosses),
    ),
  );

  return {
    word: entry.word,
    pos_title: entry.pos_title,
    ...(senses.length > 0
      ? {
          senses: entry.senses.map((sense: any) => ({
            ...(isObjectArray(sense.form_of)
              ? {
                  form_of: sense.form_of.map((form: any) => String(form.word)),
                }
              : {}),
            glosses: sense.glosses,
          })),
        }
      : {}),
    ...(isObjectArray(entry.forms) &&
    entry.forms.every((form: any) => typeof form.form === "string") === true
      ? { forms: entry.forms.map((form: any) => String(form.form)) }
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
  const lines: string[] = buffer.toString("utf-8").split("\n");
  const entries: JaWiktionaryEntry[] = [];

  for (let i: number = 0; i < lines.length; i++) {
    const line: string | undefined = lines[i]?.trim();
    if (line === undefined || line.length === 0) continue;

    const obj: any = JSON.parse(line);

    if (
      typeof obj === "object" &&
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
  const rl: Interface = createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  const entries: JaWiktionaryEntry[] = [];

  for await (const line of rl) {
    const obj: any = JSON.parse(line.trim());

    if (
      typeof obj === "object" &&
      (obj.lang === "日本語" || obj.lang === "古典日本語")
    )
      entries.push(mapEntry(obj));
  }

  rl.close();
  stream.close();
  stream.destroy();

  return entries;
}

function parseEntry(
  entry: JaWiktionaryEntry,
  definitions: Definition[],
  definitionMap: Map<string, { count: number }>,
): void {
  if (entry.senses !== undefined)
    for (const sense of entry.senses) {
      const definition: string = sense.glosses.join("");

      if (
        !definitions.some((def: Definition) => def.definition === definition)
      ) {
        if (!definitionMap.has(definition))
          definitionMap.set(definition, { count: 1 });
        else definitionMap.get(definition)!.count++;

        definitions.push({ definition: definition });
      }
    }
}

/**
 * Pairs Japanese definitions with JMdict word entries
 * @param wiktionaryEntries An array containing `ja.wiktionary.org` Japanese entries (converted using {@link convertJawiktionarySync} or {@link convertJawiktionaryAsync})
 * @param jmDict An array of converted `JMdict` entries
 * @returns An array of {@link WordDefinitionPair} objects
 */
export function getWordDefinitions(
  wiktionaryEntries: readonly JaWiktionaryEntry[],
  jmDict: readonly DictWord[],
): WordDefinitionPair[] {
  const entries: Map<string, JaWiktionaryEntry[]> = new Map<
    string,
    JaWiktionaryEntry[]
  >();

  for (const entry of wiktionaryEntries) {
    const ent: JaWiktionaryEntry[] | undefined = entries.get(entry.word);

    if (ent !== undefined) ent.push(entry);
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
    );

    for (const r of rkf.readings) {
      validReadings.add(r.reading);
      wordReadings.add(r.reading);
      validForms.add(r.reading);
    }
    if (rkf.kanjiForms !== undefined && rkf.kanjiForms.length > 0)
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

  const ents: JaWiktionaryEntry[] = Array.from(entries.values()).flat();

  for (const entry of ents) {
    let valid: boolean = false;

    if (validKanjiForms.has(entry.word)) {
      valid = true;

      if (entry.senses !== undefined)
        for (const sense of entry.senses) {
          if (
            sense.form_of !== undefined &&
            sense.form_of.some((form: string) => validForms.has(form))
          )
            validFormOfEntries.add(entry.word);

          for (const gloss of sense.glosses) {
            let hasForm: boolean = false;

            for (const r of validForms)
              if (gloss.includes(r)) {
                hasForm = true;
                break;
              }

            if (hasForm) validGlossesEntries.add(entry.word);
          }
        }

      if (entry.forms !== undefined)
        for (const form of entry.forms)
          if (validForms.has(form)) validFormsEntries.add(entry.word);
    }

    if (validForms.has(entry.word)) {
      valid = true;
      const ftEntry: JaWiktionaryEntry[] | undefined =
        entriesWithFormTitlesGlobal.get(entry.word);

      if (ftEntry !== undefined) ftEntry.push(entry);
      else entriesWithFormTitlesGlobal.set(entry.word, [entry]);
    }

    if (valid) {
      const tEntry: JaWiktionaryEntry[] | undefined = validTitleEntries.get(
        entry.word,
      );

      if (tEntry !== undefined) tEntry.push(entry);
      else validTitleEntries.set(entry.word, [entry]);
    }

    if (
      entry.forms !== undefined &&
      validForms.has(entry.word) &&
      entry.forms.some((form: string) => validForms.has(form))
    ) {
      const wfEntry: JaWiktionaryEntry[] | undefined =
        entriesWithFormsGlobal.get(entry.word);

      if (wfEntry !== undefined) wfEntry.push(entry);
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

  for (const pos of posList) {
    posMap.set(pos, {});

    for (const te of vte)
      if (te.pos_title === pos || te.pos_title === "和語の漢字表記") {
        const posEntries: {
          title?: Map<string, JaWiktionaryEntry[]>;
          formTitle?: Map<string, JaWiktionaryEntry[]>;
          form?: Map<string, JaWiktionaryEntry[]>;
        } = posMap.get(pos)!;

        if (posEntries.title === undefined)
          posEntries.title = new Map<string, JaWiktionaryEntry[]>();

        const entryList: JaWiktionaryEntry[] | undefined = posEntries.title.get(
          te.word,
        );

        if (entryList !== undefined) entryList.push(te);
        else posEntries.title.set(te.word, [te]);
      }

    for (const ft of fge)
      if (ft.pos_title === pos) {
        const posEntries: {
          title?: Map<string, JaWiktionaryEntry[]>;
          formTitle?: Map<string, JaWiktionaryEntry[]>;
          form?: Map<string, JaWiktionaryEntry[]>;
        } = posMap.get(pos)!;

        if (posEntries.formTitle === undefined)
          posEntries.formTitle = new Map<string, JaWiktionaryEntry[]>();

        const entryList: JaWiktionaryEntry[] | undefined =
          posEntries.formTitle.get(ft.word);

        if (entryList !== undefined) entryList.push(ft);
        else posEntries.formTitle.set(ft.word, [ft]);
      }

    for (const wf of wfe)
      if (wf.pos_title === pos) {
        const posEntries: {
          title?: Map<string, JaWiktionaryEntry[]>;
          formTitle?: Map<string, JaWiktionaryEntry[]>;
          form?: Map<string, JaWiktionaryEntry[]>;
        } = posMap.get(pos)!;

        if (posEntries.form === undefined)
          posEntries.form = new Map<string, JaWiktionaryEntry[]>();

        const entryList: JaWiktionaryEntry[] | undefined = posEntries.form.get(
          wf.word,
        );

        if (entryList !== undefined) entryList.push(wf);
        else posEntries.form.set(wf.word, [wf]);
      }
  }

  vte.length = 0;
  fge.length = 0;
  wfe.length = 0;

  const wordEntriesPairs: {
    word: DictWord;
    readings: Set<string>;
    forms: Set<string>;
    entriesWithTitles: JaWiktionaryEntry[];
    entriesWithFormTitles: JaWiktionaryEntry[];
    entriesWithForms: JaWiktionaryEntry[];
    kanjiForms?: Set<string>;
  }[] = [];

  for (const word of jmDict) {
    const poses: Set<POS> = new Set<POS>();

    for (const m of word.meanings)
      for (const note of m.partOfSpeech) {
        const noteEntry:
          | readonly [string, string]
          | readonly [string, string, POS | readonly POS[]]
          | undefined = noteMap.get(note);

        if (noteEntry?.length === 3) {
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

        if (rkf.kanjiForms !== undefined)
          for (const kf of rkf.kanjiForms) {
            const te: JaWiktionaryEntry[] | undefined =
              posEntries.title?.get(kf);
            const fe: JaWiktionaryEntry[] | undefined =
              posEntries.form?.get(kf);

            if (te !== undefined)
              entriesWithTitles.push(
                ...te.filter(
                  (ent: JaWiktionaryEntry) =>
                    validFormOfEntries.has(ent.word) ||
                    validGlossesEntries.has(ent.word) ||
                    validFormsEntries.has(ent.word),
                ),
              );

            if (fe !== undefined)
              entriesWithForms.push(
                ...fe.filter(
                  (ent: JaWiktionaryEntry) =>
                    ent.forms !== undefined &&
                    ent.forms.some(
                      (form: string) =>
                        (rkf.kanjiForms !== undefined &&
                          rkf.kanjiForms.has(form)) ||
                        rkf.readings.has(form),
                    ),
                ),
              );
          }

        for (const r of rkf.readings) {
          const te: JaWiktionaryEntry[] | undefined = posEntries.title?.get(r);
          const fe: JaWiktionaryEntry[] | undefined = posEntries.form?.get(r);
          const fte: JaWiktionaryEntry[] | undefined =
            posEntries.formTitle?.get(r);

          if (te !== undefined)
            entriesWithTitles.push(
              ...te.filter(
                (ent: JaWiktionaryEntry) =>
                  ent.forms !== undefined &&
                  ent.forms.some(
                    (form: string) =>
                      (rkf.kanjiForms !== undefined &&
                        rkf.kanjiForms.has(form)) ||
                      rkf.readings.has(form),
                  ),
              ),
            );

          if (fe !== undefined)
            entriesWithForms.push(
              ...fe.filter(
                (ent: JaWiktionaryEntry) =>
                  ent.forms !== undefined &&
                  ent.forms.some(
                    (form: string) =>
                      (rkf.kanjiForms !== undefined &&
                        rkf.kanjiForms.has(form)) ||
                      rkf.readings.has(form),
                  ),
              ),
            );

          if (fte !== undefined) entriesWithFormTitles.push(...fte);
        }
      }

    if (
      entriesWithTitles.length === 0 &&
      entriesWithFormTitles.length === 0 &&
      entriesWithForms.length === 0
    ) {
      if (rkf.kanjiForms !== undefined)
        for (const kf of rkf.kanjiForms) {
          const te: JaWiktionaryEntry[] | undefined = validTitleEntries.get(kf);
          const fe: JaWiktionaryEntry[] | undefined =
            entriesWithFormsGlobal.get(kf);

          if (te !== undefined)
            entriesWithTitles.push(
              ...te.filter(
                (ent: JaWiktionaryEntry) =>
                  validFormOfEntries.has(ent.word) ||
                  validGlossesEntries.has(ent.word) ||
                  validFormsEntries.has(ent.word),
              ),
            );

          if (fe !== undefined)
            entriesWithForms.push(
              ...fe.filter(
                (ent: JaWiktionaryEntry) =>
                  ent.forms !== undefined &&
                  ent.forms.some(
                    (form: string) =>
                      (rkf.kanjiForms !== undefined &&
                        rkf.kanjiForms.has(form)) ||
                      rkf.readings.has(form),
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

        if (te !== undefined)
          entriesWithTitles.push(
            ...te.filter(
              (ent: JaWiktionaryEntry) =>
                ent.forms !== undefined &&
                ent.forms.some(
                  (form: string) =>
                    (rkf.kanjiForms !== undefined &&
                      rkf.kanjiForms.has(form)) ||
                    rkf.readings.has(form),
                ),
            ),
          );

        if (fe !== undefined)
          entriesWithForms.push(
            ...fe.filter(
              (ent: JaWiktionaryEntry) =>
                ent.forms !== undefined &&
                ent.forms.some(
                  (form: string) =>
                    (rkf.kanjiForms !== undefined &&
                      rkf.kanjiForms.has(form)) ||
                    rkf.readings.has(form),
                ),
            ),
          );

        if (fte !== undefined) entriesWithFormTitles.push(...fte);
      }
    }

    if (
      entriesWithTitles.length > 0 &&
      (entriesWithFormTitles.length > 0 || entriesWithForms.length > 0)
    )
      wordEntriesPairs.push({
        word: word,
        readings: rkf.readings,
        ...(rkf.kanjiForms !== undefined ? { kanjiForms: rkf.kanjiForms } : {}),
        forms:
          rkf.kanjiForms !== undefined
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
      const hasValidFormOf: boolean = validFormOfEntries.has(ent.word);
      const hasValidForms: boolean = validFormsEntries.has(ent.word);

      const hasForms: boolean =
        ent.forms !== undefined &&
        ent.forms.some((form: string) => pair.forms.has(form));

      if (pair.kanjiForms !== undefined && pair.kanjiForms.has(ent.word)) {
        kanjiFormEntries.push(ent);

        if (ent.senses !== undefined)
          for (const sense of ent.senses) {
            if (hasValidFormOf && sense.form_of !== undefined)
              for (const form of sense.form_of)
                if (pair.forms.has(form)) {
                  const elem: Set<string> | undefined = titleFormMap.get(form);

                  if (elem === undefined)
                    titleFormMap.set(form, new Set<string>([ent.word]));
                  else elem.add(ent.word);
                }

            for (const gloss of sense.glosses)
              for (const f of pair.forms)
                if (gloss.includes(f)) {
                  const elem: Set<string> | undefined = refsMap.get(f);

                  if (elem === undefined)
                    refsMap.set(f, new Set<string>([ent.word]));
                  else elem.add(ent.word);
                }
          }

        if (hasValidForms && ent.forms !== undefined)
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
        elem !== undefined &&
        entry.forms !== undefined &&
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

      if (ft !== undefined && !ft.isDisjointFrom(pair.forms))
        entriesWithForms.push(entry);
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
        wordForms: pair.forms.union(
          new Set<string>(
            pair.forms
              .values()
              .toArray()
              .flatMap((form: string) => [
                hiraganaToKatakana(form),
                katakanaToHiragana(form),
              ]),
          ),
        ),
      });
  }

  for (let i: number = 0; i < japaneseDefinitions.length; i++) {
    const pair: WordDefinitionPair = japaneseDefinitions[i]!;

    for (let j: number = 0; j < pair.definitions.length; j++) {
      const defCount: { count: number } | undefined = definitionMap.get(
        pair.definitions[j]!.definition,
      );

      if (defCount !== undefined && defCount.count > 1) {
        let mnba: boolean = true;

        for (const f of pair.wordForms!)
          if (pair.definitions[j]!.definition.includes(f)) {
            mnba = false;
            break;
          }

        pair.definitions[j]!.mayNotBeAccurate = mnba ? 2 : 1;
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
      pair.definitions[j]!.furigana = await generateFurigana(
        pair.definitions[j]!.definition,
        convert,
      );

    japaneseDefinitions[i] = pair;
  }

  return japaneseDefinitions;
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

  if (info === undefined) {
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
) => void = (arr: string[] | undefined, cb: (v: string) => void): void => {
  if (arr === undefined) return;

  for (const v of arr) cb(v);
};

/**
 * Transforms a converted `KANJIDIC` entry into a more readable format, by providing either the kanji or the {@link DictKanji} object directly.
 * @param searchedKanji The kanji character (requires {@link dict}) or a {@link DictKanji} object
 * @param dict An array of converted `KANJIDIC` entries or a {@link KanjiEntryMap} (not needed if {@link searchedKanji} is a {@link DictKanji} object)
 * @param jmDict An array of converted `JMdict` entries or a {@link KanjiWordsMap}
 * @param svgList An array of SVG file names or a {@link KanjiSVGMap}
 * @param noteTypeName The Anki note type name
 * @param deckPath The full Anki deck path
 * @returns The transformed {@link DictKanji} object or `undefined` if entry is not found
 */
export function getKanji(
  searchedKanji: string | DictKanji,
  dict?: readonly DictKanji[] | KanjiEntryMap,
  jmDict?: readonly DictWord[] | KanjiWordsMap,
  svgList?: readonly string[] | KanjiSVGMap,
  noteTypeName?: string,
  deckPath?: string,
): Kanji | undefined {
  let dictKanji: DictKanji | undefined = undefined;

  if (typeof searchedKanji === "string" && dict !== undefined)
    dictKanji =
      dict instanceof Map
        ? dict.get(searchedKanji)
        : dict.find((entry: DictKanji) => entry.kanji === searchedKanji);
  else if (typeof searchedKanji === "object") dictKanji = searchedKanji;

  if (dictKanji !== undefined) {
    const kanji: Kanji = {
      kanji: dictKanji.kanji,
      strokes: dictKanji.misc!.strokeNumber,
      ...(dictKanji.misc?.grade !== undefined
        ? { grade: dictKanji.misc.grade }
        : {}),
      ...(dictKanji.misc?.frequency !== undefined
        ? { frequency: dictKanji.misc.frequency }
        : {}),
      ...(dictKanji.misc?.jlpt !== undefined
        ? { jlpt: dictKanji.misc.jlpt }
        : {}),
      noteID: `kanji_${dictKanji.kanji}`,
      ...(noteTypeName !== undefined ? { noteTypeName: noteTypeName } : {}),
      ...(deckPath !== undefined ? { deckPath: deckPath } : {}),
      tags: [],
    };

    if (
      dictKanji.readingMeaning !== undefined &&
      dictKanji.readingMeaning.length > 0
    ) {
      const meanings: string[] = [];
      const nanori: string[] = [];
      const onyomi: string[] = [];
      const kunyomi: string[] = [];

      for (const rm of dictKanji.readingMeaning) {
        if (rm.nanori !== undefined && rm.nanori.length > 0)
          nanori.push(...rm.nanori);

        for (const group of rm.groups!) {
          if (group.readings !== undefined) {
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

          if (group.meanings !== undefined && group.meanings.length > 0)
            meanings.push(...group.meanings);
        }
      }

      if (meanings.length > 0) kanji.meanings = meanings;
      if (nanori.length > 0) kanji.nanori = nanori;
      if (onyomi.length > 0) kanji.onyomi = onyomi;
      if (kunyomi.length > 0) kanji.kunyomi = kunyomi;
    }

    if (jmDict !== undefined) {
      let kanjiWords: readonly DictWord[] | Word[] | undefined =
        jmDict instanceof Map ? jmDict.get(kanji.kanji) : jmDict;

      const firstKfWords: readonly DictWord[] | undefined = kanjiWords?.filter(
        (word: DictWord) =>
          word.kanjiForms !== undefined &&
          word.kanjiForms[0]!.form.includes(kanji.kanji),
      );

      if (firstKfWords !== undefined && firstKfWords.length > 0)
        kanjiWords = firstKfWords;

      if (kanjiWords !== undefined) {
        const validWords: Word[] = [];

        for (const word of kanjiWords) {
          const kanjiForm: string | undefined = (
            firstKfWords !== undefined && firstKfWords.length > 0
              ? word.kanjiForms![0]
              : word.kanjiForms!.find((kf: DictKanjiForm) =>
                  kf.form.includes(kanji.kanji),
                )
          )?.form;

          if (kanjiForm !== undefined) {
            const reading: string | undefined = (
              firstKfWords !== undefined && firstKfWords.length > 0
                ? word.readings[0]
                : word.readings.find(
                    (r: DictReading) =>
                      r.kanjiFormRestrictions !== undefined &&
                      r.kanjiFormRestrictions.includes(kanjiForm),
                  )
            )?.reading;
            if (reading === undefined) continue;

            const translation: DictTranslation | undefined = (
              firstKfWords !== undefined && firstKfWords.length > 0
                ? word.meanings[0]
                : word.meanings.find(
                    (m: DictMeaning) =>
                      m.kanjiFormRestrictions !== undefined &&
                      m.kanjiFormRestrictions.includes(kanjiForm),
                  )
            )?.translations!.map((t: DictTranslation) =>
              typeof t === "string" ? t : t.translation,
            )[0];
            if (translation === undefined) continue;

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

    if (svgList !== undefined) {
      const codePoint: string = kanji.kanji
        .codePointAt(0)!
        .toString(16)
        .toLowerCase();

      const svg: string | undefined =
        svgList instanceof Map
          ? svgList.get(kanji.kanji)
          : svgList.find((svgFile: string) =>
              [`${codePoint}.svg`, `0${codePoint}.svg`].includes(
                svgFile.toLowerCase(),
              ),
            );

      if (svg !== undefined) kanji.svg = svg;
    }

    if (dictKanji.isKokuji === true) {
      kanji.kokuji = true;
      kanji.tags!.push("kanji::kokuji");
    }

    kanji.tags!.push(
      `kanji::strokes::${kanji.strokes}`,
      ...(kanji.frequency !== undefined
        ? [`kanji::frequency::${kanji.frequency}`]
        : []),
      ...(kanji.grade !== undefined ? [`kanji::grade::${kanji.grade}`] : []),
      ...(kanji.jlpt !== undefined
        ? [`kanji::pre-2010_jlpt::${kanji.jlpt.toLowerCase()}`]
        : []),
      `kanji::onyomi::${kanji.onyomi?.length ?? 0}`,
      `kanji::kunyomi::${kanji.kunyomi?.length ?? 0}`,
      `kanji::nanori::${kanji.nanori?.length ?? 0}`,
      `kanji::words::${kanji.words?.length ?? 0}`,
      ...(kanji.svg !== undefined ? ["kanji::has_svg"] : []),
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

  if (kanjiObj !== undefined) {
    let usedInfo: boolean = false;

    if (info.components !== undefined) {
      kanjiObj.components = info.components;
      kanjiObj.tags!.push(`kanji::components::${kanjiObj.components.length}`);

      usedInfo = true;
    }
    if (info.mnemonic !== undefined && info.mnemonic.length > 0) {
      kanjiObj.mnemonic = info.mnemonic;
      kanjiObj.tags!.push("kanji::has_mnemonic");

      usedInfo = true;
    }
    if (
      useWords === true &&
      info.words !== undefined &&
      info.words.length > 0
    ) {
      kanjiObj.words = info.words;
      kanjiObj.tags!.forEach((tag: string, index: number) => {
        if (tag.startsWith("kanji::words::") && kanjiObj.words !== undefined)
          kanjiObj.tags!.splice(
            index,
            1,
            `kanji::words::${kanjiObj.words.length}`,
          );
      });

      usedInfo = true;
    }

    if (sourceURL !== undefined && info.externalInfo === true && usedInfo)
      kanjiObj.source = sourceURL;

    return kanjiObj;
  } else return undefined;
}

/**
 * Transforms a converted `JMdict` entry into a more readable format, by providing either its JMdict entry ID or the {@link DictWord} object directly.
 * @param searchedWord The ID of the `JMdict` entry (requires {@link dict}) or a {@link DictWord} object
 * @param dict An array converted `JMdict` entries or a {@link WordIDEntryMap} *(not needed if {@link searchedWord} is a {@link DictWord} object)*
 * @param kanjiDic An array of converted `KANJIDIC` entries or a {@link KanjiEntryMap}
 * @param examples An array of converted `Tanaka Corpus` examples or a {@link EntryExamplesMap}
 * @param definitions An array of `ja.wiktionary.org` word-definitions pairs or a {@link WordDefinitionsMap}
 * @param noteTypeName The Anki note type name
 * @param deckPath The full Anki deck path
 * @returns The transformed {@link DictWord} object or `undefined` if entry is not found
 */
export function getWord(
  searchedWord: StringNumber | DictWord,
  dict?: readonly DictWord[] | WordIDEntryMap,
  kanjiDic?: readonly DictKanji[] | KanjiEntryMap,
  examples?: readonly TanakaExample[] | EntryExamplesMap,
  definitions?: readonly WordDefinitionPair[] | WordDefinitionsMap,
  noteTypeName?: string,
  deckPath?: string,
): Word | undefined {
  let dictWord: DictWord | undefined = undefined;

  if (typeof searchedWord === "string" && dict !== undefined) {
    if (Array.isArray(dict))
      dictWord = (dict as readonly DictWord[]).find(
        (entry: DictWord) => entry.id === searchedWord,
      );

    if (dict instanceof Map) dictWord = dict.get(searchedWord);
  }

  if (typeof searchedWord === "object") dictWord = searchedWord;

  if (dictWord !== undefined) {
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

    if (dictWord.kanjiForms !== undefined)
      word.kanjiForms = dictWord.kanjiForms.map(
        (dictKanjiForm: DictKanjiForm) => ({
          kanjiForm: dictKanjiForm.form,
          ...(dictKanjiForm.notes !== undefined
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
          ...(dictKanjiForm.commonness !== undefined &&
          dictKanjiForm.commonness.length > 0
            ? { common: true }
            : {}),
        }),
      );

    word.readings = dictWord.readings.map((dictReading: DictReading) => ({
      reading: dictReading.reading,
      ...(dictReading.kanjiFormRestrictions !== undefined ||
      dictReading.notes !== undefined
        ? {
            notes: [
              ...(dictReading.kanjiFormRestrictions !== undefined
                ? dictReading.kanjiFormRestrictions.map(
                    (restriction: string) =>
                      `Reading restricted to ${restriction}`,
                  )
                : []),
              ...(dictReading.notes !== undefined
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
      ...(dictReading.commonness !== undefined &&
      dictReading.commonness.length > 0
        ? { common: true }
        : {}),
    }));

    word.translations = [];

    const meanings: string[] | undefined =
      dictWord.hasPhrases === true && examples !== undefined ? [] : undefined;
    const seenPhrases: Set<string> = new Set<string>();

    for (const dictMeaning of dictWord.meanings) {
      const translationTypes: string[] = [];
      const translations: string[] = dictMeaning.translations.map(
        (translation: string | { translation: string; type: string }) => {
          if (typeof translation === "string") {
            if (meanings !== undefined) {
              const cleanTranslation: string = translation
                .replaceAll(/\([^)]*\)|\[[^\]]*\]|\{[^}]*\}/g, "")
                .trim();

              if (!seenPhrases.has(cleanTranslation)) {
                seenPhrases.add(cleanTranslation);
                meanings.push(cleanTranslation);
              }
            }

            return translation;
          } else {
            const translationNoteAndTag:
              | readonly [string, string]
              | readonly [string, string, POS | readonly POS[]] = noteMap.get(
              translation.type,
            )!;

            translationTypes.push(translationNoteAndTag[1]);
            word.tags!.push(`word::${translationNoteAndTag[0]}`);

            if (meanings !== undefined) {
              const cleanTranslation: string = translation.translation
                .replaceAll(/\([^)]*\)|\[[^\]]*\]|\{[^}]*\}/g, "")
                .trim();

              if (!seenPhrases.has(cleanTranslation)) {
                seenPhrases.add(cleanTranslation);
                meanings.push(cleanTranslation);
              }
            }

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

    seenPhrases.clear();

    if (kanjiDic !== undefined && word.kanjiForms !== undefined) {
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
            !(kanjiDic instanceof Map) ? kanjiDic : undefined,
          );

          if (kanjiObj !== undefined)
            kanji.push({
              kanji: kanjiObj.kanji,
              ...(kanjiObj.meanings !== undefined &&
              kanjiObj.meanings.length > 0
                ? { meanings: kanjiObj.meanings }
                : {}),
            });
        }

      if (kanji.length > 0) word.kanji = kanji;
    }

    if (meanings !== undefined) {
      const exampleList: readonly TanakaExample[] =
        examples instanceof Map ? (examples.get(dictWord.id) ?? []) : examples!;

      const rkf: ReadingsKanjiFormsPair = getValidForms(
        dictWord.readings,
        dictWord.kanjiForms,
        dictWord.isCommon,
      );

      const readings: Set<string> = new Set<string>(
        rkf.readings.map((r: DictReading) => r.reading),
      );
      const kanjiForms: Set<string> | undefined =
        rkf.kanjiForms !== undefined
          ? new Set<string>(rkf.kanjiForms.map((kf: DictKanjiForm) => kf.form))
          : undefined;

      const readingMatchingKanjiFormExamples: {
        ex: TanakaExample;
        partIndex: number;
      }[] = [];
      let kanjiFormExamples: {
        ex: TanakaExample;
        partIndex: number;
        includesTranslation?: true | undefined;
      }[] = [];

      let readingExamples: {
        ex: TanakaExample;
        partIndex: number;
        referenceIDMatch?: true | undefined;
        includesTranslation?: true | undefined;
      }[] = [];

      let hasKanjiFormExamplesWithTranslation: boolean = false;
      let hasReadingExamplesWithTranslation: boolean = false;

      for (const example of exampleList)
        for (let i: number = 0; i < example.parts.length; i++) {
          if (seenPhrases.has(example.phrase)) break;

          const part: ExamplePart = example.parts[i]!;

          const readingAsReadingMatch: boolean =
            part.reading !== undefined && readings.has(part.reading);

          const referenceIDMatch: boolean = part.referenceID === dictWord.id;

          if (kanjiForms !== undefined && kanjiForms.has(part.baseForm)) {
            if (readingAsReadingMatch || referenceIDMatch)
              readingMatchingKanjiFormExamples.push({
                ex: example,
                partIndex: i,
              });
            else {
              const includesTranslation: boolean = meanings.some((m: string) =>
                example.translation.includes(m),
              );

              if (!hasKanjiFormExamplesWithTranslation && includesTranslation)
                hasKanjiFormExamplesWithTranslation = true;

              kanjiFormExamples.push({
                ex: example,
                partIndex: i,
                ...(includesTranslation ? { includesTranslation: true } : {}),
              });
            }

            seenPhrases.add(example.phrase);

            break;
          }

          const readingAsBaseFormMatch: boolean = readings.has(part.baseForm);

          if (
            (readingAsBaseFormMatch || referenceIDMatch) &&
            kanjiForms === undefined
          ) {
            const includesTranslation: boolean = meanings.some((m: string) =>
              example.translation.includes(m),
            );

            if (!hasReadingExamplesWithTranslation && includesTranslation)
              hasReadingExamplesWithTranslation = true;

            readingExamples.push({
              ex: example,
              partIndex: i,
              ...(referenceIDMatch ? { referenceIDMatch: true } : {}),
              ...(includesTranslation ? { includesTranslation: true } : {}),
            });

            seenPhrases.add(example.phrase);

            break;
          }
        }

      if (kanjiFormExamples.length > 0 && hasKanjiFormExamplesWithTranslation)
        kanjiFormExamples = kanjiFormExamples.filter(
          (ex: {
            ex: TanakaExample;
            partIndex: number;
            includesTranslation?: true | undefined;
          }) => ex.includesTranslation === true,
        );
      else if (
        kanjiFormExamples.length > 0 &&
        readingMatchingKanjiFormExamples.length > 0
      )
        kanjiFormExamples.length = 0;

      if (readingExamples.length > 0 && hasReadingExamplesWithTranslation)
        readingExamples = readingExamples.filter(
          (ex: {
            ex: TanakaExample;
            partIndex: number;
            referenceIDMatch?: true | undefined;
            includesTranslation?: true | undefined;
          }) => ex.includesTranslation === true || ex.referenceIDMatch === true,
        );

      let wordExamples: {
        ex: TanakaExample;
        partIndex: number;
        referenceIDMatch?: true | undefined;
        includesTranslation?: true | undefined;
      }[] = [
        ...(word.kanjiForms !== undefined
          ? [...readingMatchingKanjiFormExamples, ...kanjiFormExamples]
          : readingExamples),
      ];

      seenPhrases.clear();

      const glossSpecificExamples: {
        ex: TanakaExample;
        partIndex: number;
      }[] = [];

      for (let i: number = 0; i < word.translations.length; i++)
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

      if (glossSpecificExamples.length > 0) {
        if (glossSpecificExamples.length < 5) {
          wordExamples = wordExamples.filter(
            (ex: {
              ex: TanakaExample;
              partIndex: number;
              referenceIDMatch?: true | undefined;
              includesTranslation?: true | undefined;
            }) => !seenPhrases.has(ex.ex.phrase),
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
        ).map(
          (ex: {
            ex: TanakaExample;
            partIndex: number;
            referenceIDMatch?: true | undefined;
            includesTranslation?: true | undefined;
          }) => ({
            phrase: ex.ex.furigana ?? ex.ex.phrase,
            translation: ex.ex.translation,
            originalPhrase: ex.ex.phrase,
            ...(ex.ex.glossNumber !== undefined
              ? { glossNumber: ex.ex.glossNumber }
              : {}),
          }),
        );

        word.tags!.push("word::has_phrases");
        if (glossSpecificExamples.length > 0)
          word.tags!.push("word::has_meaning-specific_phrases");
      }
    }

    if (definitions !== undefined) {
      const defs: readonly Definition[] | undefined =
        definitions instanceof Map
          ? definitions.get(word.id!)
          : definitions.find(
              (wdp: WordDefinitionPair) => wdp.wordID === word.id!,
            )?.definitions;

      if (defs !== undefined)
        word.definitions = [
          ...defs.toSorted(
            (a: Definition, b: Definition) =>
              (a.mayNotBeAccurate ?? 0) - (b.mayNotBeAccurate ?? 0),
          ),
        ];
    }

    return word;
  } else return undefined;
}

/**
 * Transforms a converted `JMnedict` entry into a more readable format, by providing either its JMnedict entry ID or the {@link DictName} object directly.
 * @param searchedName The ID of the `JMnedict` entry (requires {@link dict}) or a {@link DictName} object
 * @param dict An array converted `JMnedict` entries or a {@link NameIDEntryMap} *(not needed if {@link searchedName} is a {@link DictName} object)*
 * @param kanjiDic An array of converted `KANJIDIC` entries or a {@link KanjiEntryMap}
 * @param examples An array of converted `Tanaka Corpus` examples or a {@link EntryExamplesMap}
 * @param noteTypeName The Anki note type name
 * @param deckPath The full Anki deck path
 * @returns The transformed {@link DictName} object or `undefined` if entry is not found
 */
export function getName(
  searchedName: StringNumber | DictName,
  dict?: readonly DictName[] | NameIDEntryMap,
  kanjiDic?: readonly DictKanji[] | KanjiEntryMap,
  examples?: readonly TanakaExample[] | EntryExamplesMap,
  noteTypeName?: string,
  deckPath?: string,
): Name | undefined {
  let dictName: DictName | undefined = undefined;

  if (typeof searchedName === "string" && dict !== undefined) {
    if (Array.isArray(dict))
      dictName = (dict as readonly DictName[]).find(
        (entry: DictName) => entry.id === searchedName,
      );

    if (dict instanceof Map) dictName = dict.get(searchedName);
  }

  if (typeof searchedName === "object") dictName = searchedName;

  if (dictName !== undefined) {
    const name: Name = {
      id: dictName.id,
      nameReadings: [],
      translations: [],
      noteID: `name_${dictName.id}`,
      noteTypeName: noteTypeName,
      deckPath: deckPath,
      tags: [],
    };

    if (dictName.isCommon === true) {
      name.common = true;
      name.tags!.push("name::common");
    }

    if (dictName.kanjiForms !== undefined)
      name.kanjiForms = dictName.kanjiForms.map(
        (dictKanjiForm: DictKanjiForm) => ({
          kanjiForm: dictKanjiForm.form,
        }),
      );

    name.nameReadings = dictName.nameReadings.map(
      (dictReading: DictReading) => ({
        reading: dictReading.reading,
        ...(dictReading.kanjiFormRestrictions !== undefined
          ? {
              notes: dictReading.kanjiFormRestrictions.map(
                (restriction: string) => `Reading restricted to ${restriction}`,
              ),
            }
          : {}),
        ...(dictReading.commonness !== undefined &&
        dictReading.commonness.length > 0
          ? { common: true }
          : {}),
      }),
    );

    name.translations = [];

    const meanings: string[] | undefined =
      dictName.hasPhrases === true && examples !== undefined ? [] : undefined;
    const seenPhrases: Set<string> = new Set<string>();
    let hasNameTypes: boolean = false;

    for (const dictMeaning of dictName.meanings) {
      if (!hasNameTypes && dictMeaning.nameTypes !== undefined)
        hasNameTypes = true;

      name.translations.push({
        translation: dictMeaning.translations
          .map((translation: string) => {
            if (meanings !== undefined) {
              const cleanTranslation: string = translation
                .replaceAll(/\([^)]*\)|\[[^\]]*\]|\{[^}]*\}/g, "")
                .trim();

              if (!seenPhrases.has(cleanTranslation)) {
                seenPhrases.add(cleanTranslation);
                meanings.push(cleanTranslation);
              }
            }

            return translation;
          })
          .join("; "),
        ...(dictMeaning.nameTypes !== undefined
          ? {
              notes: dictMeaning.nameTypes.map((type: string) => {
                const noteAndTag: NoteAndTag = lookupWordNote(
                  type,
                  [],
                  name.tags!,
                );

                return capitalizeString(noteAndTag.note);
              }),
            }
          : {}),
      });
    }

    if (!hasNameTypes) name.tags!.push("name::no_name_types");

    seenPhrases.clear();

    if (kanjiDic !== undefined && name.kanjiForms !== undefined) {
      const kanji: Kanji[] = [];
      const seenChars: Set<string> = new Set<string>();

      for (const kanjiForm of name.kanjiForms)
        for (const char of kanjiForm.kanjiForm
          .split("")
          .filter((c: string) => regexps.kanji.test(c))) {
          if (seenChars.has(char)) continue;
          seenChars.add(char);

          const kanjiEntry: DictKanji | undefined =
            kanjiDic instanceof Map ? kanjiDic.get(char) : undefined;

          const kanjiObj: Kanji | undefined = getKanji(
            kanjiEntry ?? char,
            !(kanjiDic instanceof Map) ? kanjiDic : undefined,
          );

          if (kanjiObj !== undefined)
            kanji.push({
              kanji: kanjiObj.kanji,
              ...(kanjiObj.meanings !== undefined &&
              kanjiObj.meanings.length > 0
                ? { meanings: kanjiObj.meanings }
                : {}),
            });
        }

      if (kanji.length > 0) name.kanji = kanji;
    }

    if (meanings !== undefined) {
      const exampleList: readonly TanakaExample[] =
        examples instanceof Map ? (examples.get(dictName.id) ?? []) : examples!;

      const rkf: ReadingsKanjiFormsPair = getValidForms(
        dictName.nameReadings,
        dictName.kanjiForms,
        dictName.isCommon,
      );

      const readings: Set<string> = new Set<string>(
        rkf.readings.map((r: DictReading) => r.reading),
      );
      const kanjiForms: Set<string> | undefined =
        rkf.kanjiForms !== undefined
          ? new Set<string>(rkf.kanjiForms.map((kf: DictKanjiForm) => kf.form))
          : undefined;

      let readingMatchingKanjiFormExamples: {
        ex: TanakaExample;
        includesTranslation?: true | undefined;
      }[] = [];

      let readingExamples: {
        ex: TanakaExample;
        includesTranslation?: true | undefined;
      }[] = [];

      let hasReadingMatchingKanjiFormWithTranslation: boolean = false;
      let hasReadingWithTranslation: boolean = false;

      for (const example of exampleList)
        for (let i: number = 0; i < example.parts.length; i++) {
          if (seenPhrases.has(example.phrase)) break;

          const part: ExamplePart = example.parts[i]!;

          const readingAsReadingMatch: boolean =
            part.reading !== undefined && readings.has(part.reading);

          if (
            kanjiForms !== undefined &&
            kanjiForms.has(part.baseForm) &&
            readingAsReadingMatch
          ) {
            const includesTranslation: boolean = meanings.some((m: string) =>
              example.translation.includes(m),
            );

            if (
              !hasReadingMatchingKanjiFormWithTranslation &&
              includesTranslation
            )
              hasReadingMatchingKanjiFormWithTranslation = true;

            readingMatchingKanjiFormExamples.push({
              ex: example,
              ...(includesTranslation ? { includesTranslation: true } : {}),
            });

            seenPhrases.add(example.phrase);

            break;
          }

          const readingAsBaseFormMatch: boolean = readings.has(part.baseForm);

          if (readingAsBaseFormMatch && kanjiForms === undefined) {
            const includesTranslation: boolean = meanings.some((m: string) =>
              example.translation.includes(m),
            );

            if (!hasReadingWithTranslation && includesTranslation)
              hasReadingWithTranslation = true;

            readingExamples.push({
              ex: example,
              ...(includesTranslation ? { includesTranslation: true } : {}),
            });

            seenPhrases.add(example.phrase);

            break;
          }
        }

      if (readingMatchingKanjiFormExamples.length > 0)
        if (hasReadingMatchingKanjiFormWithTranslation)
          readingMatchingKanjiFormExamples =
            readingMatchingKanjiFormExamples.filter(
              (ex: {
                ex: TanakaExample;
                includesTranslation?: true | undefined;
              }) => ex.includesTranslation === true,
            );

      if (readingExamples.length > 0 && hasReadingWithTranslation)
        readingExamples = readingExamples.filter(
          (ex: { ex: TanakaExample; includesTranslation?: true | undefined }) =>
            ex.includesTranslation === true,
        );

      const wordExamples: {
        ex: TanakaExample;
        includesTranslation?: true | undefined;
      }[] = [
        ...(name.kanjiForms !== undefined
          ? readingMatchingKanjiFormExamples
          : readingExamples),
      ];

      if (wordExamples.length > 0) {
        name.phrases = wordExamples
          .slice(0, 5)
          .map(
            (ex: {
              ex: TanakaExample;
              includesTranslation?: true | undefined;
            }) => ({
              phrase: ex.ex.furigana ?? ex.ex.phrase,
              translation: ex.ex.translation,
              originalPhrase: ex.ex.phrase,
            }),
          );

        name.tags!.push("name::has_phrases");
      }
    }

    return name;
  } else return undefined;
}

export function isWord(entry: Result): entry is Word {
  return (
    isObjectArray(Object.getOwnPropertyDescriptor(entry, "readings")?.value) &&
    isObjectArray(Object.getOwnPropertyDescriptor(entry, "translations")?.value)
  );
}

export function isName(entry: Result): entry is Name {
  return (
    isObjectArray(
      Object.getOwnPropertyDescriptor(entry, "nameReadings")?.value,
    ) &&
    isObjectArray(Object.getOwnPropertyDescriptor(entry, "translations")?.value)
  );
}

export function isRadical(entry: Result): entry is Radical {
  return (
    typeof Object.getOwnPropertyDescriptor(entry, "radical")?.value === "string"
  );
}

export function isKanji(entry: Result): entry is Kanji {
  return (
    !Object.hasOwn(entry, "translations") &&
    !Object.hasOwn(entry, "readings") &&
    !Object.hasOwn(entry, "radical") &&
    typeof Object.getOwnPropertyDescriptor(entry, "kanji")?.value === "string"
  );
}

export function isKana(entry: Result): entry is Kana {
  return (
    typeof Object.getOwnPropertyDescriptor(entry, "kana")?.value === "string"
  );
}

export function isGrammar(entry: Result): entry is Grammar {
  return (
    typeof Object.getOwnPropertyDescriptor(entry, "point")?.value === "string"
  );
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
  `<div class="entry${glossSpecific === true ? " gloss-specific" : ""}">${entry}${notes !== undefined && notes.length > 0 ? createNotes(notes, phrase) : ""}</div>`;

/**
 * Generates an array where each field holds an entry’s info wrapped in HTML tags.
 * @param entry Any type of mapped entry ({@link Word}, {@link Name}, {@link Kanji}, {@link Radical}, {@link Kana}, {@link Grammar})
 * @param customData An additional string that will be added on the first field of any note type, as a `data-custom` attribute inside an invisible `div`
 * @param additionalTags Additional tags that will be added alongside the existing entry tags
 * @returns An array of fields, each corresponding to an Anki note type field
 */
export function generateAnkiNote(
  entry: Result,
  customData?: string,
  additionalTags?: string[],
): string[] {
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

    let readingsFieldWithoutAudio: string =
      '<div id="no-r-audio" style="display: none"></div>';
    let hasAudio: boolean = false;

    if (entry.readings.some((r: Reading) => r.audio !== undefined)) {
      const firstReadingWithoutAudio: string = createEntry(
        `<span class="word word-reading">${entry.readings[0]!.reading}</span>`,
        entry.readings[0]!.notes,
      );
      const otherReadingsWithoutAudio: string =
        entry.readings.length > 1
          ? `<details><summary>Show other readings</summary>${entry.readings
              .slice(1)
              .map((readingEntry: Reading) =>
                createEntry(
                  `<span class="word word-reading">${readingEntry.reading}</span>`,
                  readingEntry.notes,
                ),
              )
              .join("")}</details>`
          : "";
      readingsFieldWithoutAudio = `${firstReadingWithoutAudio}${otherReadingsWithoutAudio}`;
      hasAudio = true;
    }

    const firstKanjiForm: string | undefined =
      entry.kanjiForms !== undefined
        ? createEntry(
            `<span class="word word-kanjiform"><ruby><rb>${entry.kanjiForms[0]!.kanjiForm}</rb><rt>${entry.readings[0]!.reading}</rt></ruby></span>`,
            entry.kanjiForms[0]!.notes,
          )
        : undefined;
    const otherKanjiForms: string =
      entry.kanjiForms !== undefined && entry.kanjiForms.length > 1
        ? `<details><summary>Show other kanji forms</summary>${entry.kanjiForms
            .slice(1)
            .map((kanjiFormEntry: KanjiForm) => {
              const restrictedReading: Reading | undefined =
                entry.readings.find(
                  (r: Reading) =>
                    r.notes !== undefined &&
                    r.notes.includes(
                      `Reading restricted to ${kanjiFormEntry.kanjiForm}`,
                    ),
                );

              return createEntry(
                `<span class="word word-kanjiform">${restrictedReading !== undefined ? "<ruby><rb>" : ""}${kanjiFormEntry.kanjiForm}${restrictedReading !== undefined ? `</rb><rt>${restrictedReading.reading}</rt></ruby>` : ""}</span>`,
                kanjiFormEntry.notes,
              );
            })
            .join("")}</details>`
        : "";

    const kanjiFormsField: string =
      firstKanjiForm !== undefined
        ? `${firstKanjiForm}${otherKanjiForms}`
        : '<span class="word word-kanjiform" id="no-kanjiforms">(no kanji forms)</span>';

    const firstThreeTranslations: string = entry.translations
      .slice(0, 3)
      .map((translationEntry: Translation, index: number) =>
        createEntry(
          `<span class="word word-translation">${translationEntry.translation}</span>`,
          translationEntry.notes,
          undefined,
          entry.phrases !== undefined
            ? entry.phrases.some(
                (phrase: Phrase, index2: number) =>
                  index === index2 &&
                  phrase.glossNumber !== undefined &&
                  phrase.glossNumber.wordId === entry.id &&
                  phrase.glossNumber.glossNumber === index + 1,
              )
              ? true
              : undefined
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
                entry.phrases !== undefined
                  ? entry.phrases.some(
                      (phrase: Phrase, index2: number) =>
                        index === index2 &&
                        phrase.glossNumber !== undefined &&
                        phrase.glossNumber.wordId === entry.id &&
                        phrase.glossNumber.glossNumber === index + 1,
                    )
                    ? true
                    : undefined
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
              phraseEntry.glossNumber !== undefined &&
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
                    phraseEntry.glossNumber !== undefined &&
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

    const phrasesField: string =
      firstFivePhrases !== undefined
        ? `${firstFivePhrases}${otherPhrases}`
        : '<span class="word word-phrase" id="no-phrases">(no phrases)</span>';

    const firstThreeDefinitions: string | undefined = entry.definitions
      ?.slice(0, 3)
      .map((definitionEntry: Definition) =>
        createEntry(
          `<span class="word word-definition${definitionEntry.mayNotBeAccurate === 2 ? " mnba2" : definitionEntry.mayNotBeAccurate === 1 ? " mnba1" : ""}"><span class="word word-definition-original">${definitionEntry.definition}</span><span class="word word-definition-furigana">${definitionEntry.furigana ?? definitionEntry.definition}</span></span>`,
        ),
      )
      .join("");

    const otherDefinitions: string =
      entry.definitions !== undefined && entry.definitions.length > 3
        ? `<details><summary>Show other definitions</summary>${entry.definitions
            .map((definitionEntry: Definition, index: number) =>
              index > 2
                ? createEntry(
                    `<span class="word word-definition${definitionEntry.mayNotBeAccurate === 2 ? " mnba2" : definitionEntry.mayNotBeAccurate === 1 ? " mnba1" : ""}"><span class="word word-definition-original">${definitionEntry.definition}</span><span class="word word-definition-furigana">${definitionEntry.furigana ?? definitionEntry.definition}</span></span>`,
                  )
                : "null",
            )
            .filter((definition: string) => definition !== "null")
            .join("")}</details>`
        : "";

    const definitionsField: string =
      firstThreeDefinitions !== undefined
        ? `${firstThreeDefinitions}${otherDefinitions}`
        : '<span class="word word-definition" id="no-definitions">(no definitions)</span>';

    const searchField: string = `${entry.readings.map((r: Reading) => r.reading).join(" ")}${entry.kanjiForms !== undefined ? ` ${entry.kanjiForms.map((kf: KanjiForm) => kf.kanjiForm).join(" ")}` : ""} ${entry.id}`;

    fields.push(
      ...(entry.kanjiForms !== undefined && !entry.usuallyInKana
        ? [
            `${customData !== undefined ? `<div id="custom-data" style="display: none" data-custom="${customData}"></div>` : ""}${kanjiFormsField}<div id="kf-pos" style="display: none" data-pos="1"></div>`,
            `${hasAudio ? readingsFieldWithoutAudio : readingsField}<div id="r-pos" style="display: none" data-pos="2"></div>`,
          ]
        : [
            `${customData !== undefined ? `<div id="custom-data" style="display: none" data-custom="${customData}"></div>` : ""}${kanjiFormsField}<div id="kf-pos" style="display: none" data-pos="2"></div>`,
            `${hasAudio ? readingsFieldWithoutAudio : readingsField}<div id="r-pos" style="display: none" data-pos="1"></div>`,
          ]),
      `${hasAudio ? readingsField : readingsFieldWithoutAudio}<div id="r-pos" style="display: none" data-pos="${entry.kanjiForms !== undefined && !entry.usuallyInKana ? "2" : "1"}"></div>`,
      translationsField,
      phrasesField,
      definitionsField,
      entry.kanji !== undefined
        ? entry.kanji
            .map((kanjiEntry: Kanji) =>
              createEntry(
                `<span class="word word-kanji">${kanjiEntry.kanji}${kanjiEntry.meanings === undefined ? " (no meanings)" : ""}</span>`,
                kanjiEntry.meanings,
              ),
            )
            .join("")
        : '<span class="word word-kanji" id="no-kanji">(no kanji)</span>',
      searchField,
    );
  }

  if (isName(entry)) {
    const firstReading: string = createEntry(
      `<span class="name name-reading">${entry.nameReadings[0]!.reading}${entry.nameReadings[0]!.audio !== undefined ? `<br>[sound:${entry.nameReadings[0]!.audio}]` : ""}</span>`,
      entry.nameReadings[0]!.notes,
    );
    const otherReadings: string =
      entry.nameReadings.length > 1
        ? `<details><summary>Show other readings</summary>${entry.nameReadings
            .slice(1)
            .map((readingEntry: Reading) =>
              createEntry(
                `<span class="name name-reading">${readingEntry.reading}${readingEntry.audio !== undefined ? `<br>[sound:${readingEntry.audio}]` : ""}</span>`,
                readingEntry.notes,
              ),
            )
            .join("")}</details>`
        : "";
    const readingsField: string = `${firstReading}${otherReadings}`;

    let readingsFieldWithoutAudio: string =
      '<div id="no-r-audio" style="display: none"></div>';
    let hasAudio: boolean = false;

    if (entry.nameReadings.some((r: Reading) => r.audio !== undefined)) {
      const firstReadingWithoutAudio: string = createEntry(
        `<span class="name name-reading">${entry.nameReadings[0]!.reading}</span>`,
        entry.nameReadings[0]!.notes,
      );
      const otherReadingsWithoutAudio: string =
        entry.nameReadings.length > 1
          ? `<details><summary>Show other readings</summary>${entry.nameReadings
              .slice(1)
              .map((readingEntry: Reading) =>
                createEntry(
                  `<span class="name name-reading">${readingEntry.reading}</span>`,
                  readingEntry.notes,
                ),
              )
              .join("")}</details>`
          : "";
      readingsFieldWithoutAudio = `${firstReadingWithoutAudio}${otherReadingsWithoutAudio}`;
      hasAudio = true;
    }

    const firstKanjiForm: string | undefined =
      entry.kanjiForms !== undefined
        ? createEntry(
            `<span class="name name-kanjiform"><ruby><rb>${entry.kanjiForms[0]!.kanjiForm}</rb><rt>${entry.nameReadings[0]!.reading}</rt></ruby></span>`,
            entry.kanjiForms[0]!.notes,
          )
        : undefined;
    const otherKanjiForms: string =
      entry.kanjiForms !== undefined && entry.kanjiForms.length > 1
        ? `<details><summary>Show other kanji forms</summary>${entry.kanjiForms
            .slice(1)
            .map((kanjiFormEntry: KanjiForm) => {
              const restrictedReading: Reading | undefined =
                entry.nameReadings.find(
                  (r: Reading) =>
                    r.notes !== undefined &&
                    r.notes.includes(
                      `Reading restricted to ${kanjiFormEntry.kanjiForm}`,
                    ),
                );

              return createEntry(
                `<span class="name name-kanjiform">${restrictedReading !== undefined ? "<ruby><rb>" : ""}${kanjiFormEntry.kanjiForm}${restrictedReading !== undefined ? `</rb><rt>${restrictedReading.reading}</rt></ruby>` : ""}</span>`,
                kanjiFormEntry.notes,
              );
            })
            .join("")}</details>`
        : "";

    const kanjiFormsField: string =
      firstKanjiForm !== undefined
        ? `${firstKanjiForm}${otherKanjiForms}`
        : '<span class="name name-kanjiform" id="no-kanjiforms">(no kanji forms)</span>';

    const firstThreeTranslations: string = entry.translations
      .slice(0, 3)
      .map((translationEntry: Translation) =>
        createEntry(
          `<span class="name name-translation">${translationEntry.translation}</span>`,
          translationEntry.notes,
        ),
      )
      .join("");

    const otherTranslations: string =
      entry.translations.length > 3
        ? `<details><summary>Show other translations</summary>${entry.translations
            .map((translationEntry: Translation, index: number) => {
              if (index < 3) return "null";

              return createEntry(
                `<span class="name name-translation">${translationEntry.translation}</span>`,
                translationEntry.notes,
              );
            })
            .filter((translation: string) => translation !== "null")
            .join("")}</details>`
        : "";

    const translationsField: string = `${firstThreeTranslations}${otherTranslations}`;

    const phrasesField: string | undefined =
      entry.phrases !== undefined
        ? entry.phrases
            .map((phraseEntry: Phrase) =>
              createEntry(
                `<span class="name name-phrase"><span class="name name-phrase-original">${phraseEntry.originalPhrase}</span><span class="name name-phrase-furigana">${phraseEntry.phrase}</span></span>`,
                [phraseEntry.translation],
                true,
              ),
            )
            .join("")
        : '<span class="name name-phrase" id="no-phrases">(no phrases)</span>';

    const searchField: string = `${entry.nameReadings.map((r: Reading) => r.reading).join(" ")}${entry.kanjiForms !== undefined ? ` ${entry.kanjiForms.map((kf: KanjiForm) => kf.kanjiForm).join(" ")}` : ""} ${entry.id}`;

    fields.push(
      ...(entry.kanjiForms !== undefined
        ? [
            `${customData !== undefined ? `<div id="custom-data" style="display: none" data-custom="${customData}"></div>` : ""}${kanjiFormsField}<div id="kf-pos" style="display: none" data-pos="1"></div>`,
            `${hasAudio ? readingsFieldWithoutAudio : readingsField}<div id="r-pos" style="display: none" data-pos="2"></div>`,
          ]
        : [
            `${customData !== undefined ? `<div id="custom-data" style="display: none" data-custom="${customData}"></div>` : ""}${kanjiFormsField}<div id="kf-pos" style="display: none" data-pos="2"></div>`,
            `${hasAudio ? readingsFieldWithoutAudio : readingsField}<div id="r-pos" style="display: none" data-pos="1"></div>`,
          ]),
      `${hasAudio ? readingsField : readingsFieldWithoutAudio}<div id="r-pos" style="display: none" data-pos="${entry.kanjiForms !== undefined ? "2" : "1"}"></div>`,
      translationsField,
      phrasesField,
      entry.kanji !== undefined
        ? entry.kanji
            .map((kanjiEntry: Kanji) =>
              createEntry(
                `<span class="name name-kanji">${kanjiEntry.kanji}${kanjiEntry.meanings === undefined ? " (no meanings)" : ""}</span>`,
                kanjiEntry.meanings,
              ),
            )
            .join("")
        : '<span class="name name-kanji" id="no-kanji">(no kanji)</span>',
      searchField,
    );
  }

  if (isRadical(entry))
    fields.push(
      `${customData !== undefined ? `<div id="custom-data" style="display: none" data-custom="${customData}"></div>` : ""}${createEntry(
        `<span class="radical radical-character">${entry.radical}</span>`,
      )}`,
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
      entry.mnemonic !== undefined
        ? createEntry(
            `<span class="radical radical-mnemonic">${entry.mnemonic}</span>`,
          )
        : '<span class="radical radical-mnemonic" id="no-mnemonic">(no mnemonic)</span>',
      entry.kanji !== undefined
        ? entry.kanji
            .map((kanji: Kanji) =>
              createEntry(
                `<span class="radical radical-kanji">${kanji.kanji}${kanji.meanings !== undefined && kanji.meanings.length > 0 ? ` - ${kanji.meanings[0]}` : ""}</span>`,
              ),
            )
            .join("")
        : '<span class="radical radical-kanji" id="no-kanji">(no "used-in" kanji)</span>',
      entry.strokes !== undefined
        ? createEntry(
            `<span class="radical radical-strokes">${entry.strokes}<br>${entry.svg !== undefined ? `<img class="radical radical-stroke-order" src="${entry.svg}" alt="${entry.radical} stroke order SVG">` : "(no stroke order SVG available)"}</span>`,
          )
        : '<span class="radical radical-strokes" id="no-strokes">(no stroke number)</span>',
      entry.sources !== undefined
        ? `<span class="radical radical-source">${entry.sources.map((source: string, index: number) => `<a href="${source}" target="_blank">Source ${index + 1}</a>`).join("<br>")}</span>`
        : '<span class="radical radical-source" id="no-sources">(no sources)</span>',
    );

  if (isKanji(entry))
    fields.push(
      `${customData !== undefined ? `<div id="custom-data" style="display: none" data-custom="${customData}"></div>` : ""}${createEntry(`<span class="kanji kanji-character">${entry.kanji}</span>`)}`,
      entry.meanings !== undefined
        ? entry.meanings
            .map((meaningEntry: string) =>
              createEntry(
                `<span class="kanji kanji-meaning">${meaningEntry}</span>`,
              ),
            )
            .join("")
        : '<span class="kanji kanji-meaning" id="no-meanings">(no meanings)</span>',
      entry.onyomi !== undefined
        ? entry.onyomi
            .map((onyomiEntry: string) =>
              createEntry(
                `<span class="kanji kanji-onyomi">${onyomiEntry}</span>`,
              ),
            )
            .join("")
        : `<span class="kanji kanji-onyomi" id="no-onyomi">(no onyomi) ${entry.kokuji === true ? "(kokuji)" : ""}</span>`,
      entry.kunyomi !== undefined
        ? entry.kunyomi
            .map((kunyomiEntry: string) =>
              createEntry(
                `<span class="kanji kanji-kunyomi">${kunyomiEntry}</span>`,
              ),
            )
            .join("")
        : `<span class="kanji kanji-kunyomi" id="no-kunyomi">(no kunyomi) ${entry.kokuji === true ? "(kokuji)" : ""}</span>`,
      entry.nanori !== undefined
        ? entry.nanori
            .map((nanoriEntry: string) =>
              createEntry(
                `<span class="kanji kanji-nanori">${nanoriEntry}</span>`,
              ),
            )
            .join("")
        : '<span class="kanji kanji-nanori" id="no-nanori">(no nanori)</span>',
      entry.components !== undefined
        ? entry.components
            .map((componentEntry: KanjiComponent) =>
              createEntry(
                `<span class="kanji kanji-component">${componentEntry.component}${componentEntry.meaning !== undefined ? ` - ${componentEntry.meaning}` : ""}</span>`,
              ),
            )
            .join("")
        : '<span class="kanji kanji-component" id="no-components">(no components)</span>',
      entry.mnemonic !== undefined
        ? createEntry(
            `<span class="kanji kanji-mnemonic">${entry.mnemonic}</span>`,
          )
        : '<span class="kanji kanji-mnemonic" id="no-mnemonic">(no mnemonic)</span>',
      entry.words !== undefined
        ? entry.words
            .map((word: Word) =>
              createEntry(
                `<span class="kanji kanji-words">${word.kanjiForms!.find((kf: KanjiForm) => kf.kanjiForm.includes(entry.kanji))!.kanjiForm} / ${word.readings[0]!.reading} - ${word.translations[0]!.translation}</span>`,
              ),
            )
            .join("")
        : '<span class="kanji kanji-words" id="no-words">(no words)</span>',
      entry.strokes !== undefined
        ? createEntry(
            `<span class="kanji kanji-strokes">${entry.strokes}<br>${entry.svg !== undefined ? `<img class="kanji kanji-stroke-order" src="${entry.svg}" alt="${entry.kanji} stroke order SVG">` : "(no stroke order SVG available)"}</span>`,
          )
        : '<span class="kanji kanji-strokes" id="no-strokes">(no stroke number)</span>',
      entry.source !== undefined
        ? `<span class="kanji kanji-source"><a href="${entry.source}" target="_blank">Source</a></span>`
        : '<span class="kanji kanji-source" id="no-source">(no components/mnemonic source)</span>',
    );

  if (isKana(entry))
    fields.push(
      `${customData !== undefined ? `<div id="custom-data" style="display: none" data-custom="${customData}"></div>` : ""}${createEntry(`<span class="kana kana-character">${entry.kana}</span>`)}`,
      createEntry(
        `<span class="kana kana-reading">${entry.reading}${entry.audio !== undefined ? `<br>[sound:${entry.audio}]` : ""}</span>`,
      ),
      entry.svg !== undefined
        ? createEntry(
            `<img class="kana kana-stroke-order" src="${entry.svg}" alt="${entry.kana} stroke order SVG">`,
          )
        : "(no stroke order SVG available)",
    );

  if (isGrammar(entry))
    fields.push(
      `${customData !== undefined ? `<div id="custom-data" style="display: none" data-custom="${customData}"></div>` : ""}${createEntry(`<span class="grammar grammar-point">${entry.point}</span>`)}`,
      entry.readings !== undefined
        ? entry.readings
            .map((readingEntry: Reading) =>
              createEntry(
                `<span class="grammar grammar-reading">${readingEntry.reading}</span>`,
              ),
            )
            .join("")
        : '<span class="grammar grammar-reading" id="no-readings">(no additional readings)</span>',
      createEntry(
        `<span class="grammar grammar-meaning">${entry.meaning.meaning}${entry.meaning.example !== undefined && entry.meaning.example.length > 0 ? `<br><span class="grammar grammar-meaning-example">${entry.meaning.example}</span>` : ""}</span>`,
      ),
      entry.usages !== undefined
        ? entry.usages
            .map((usage: string) =>
              createEntry(
                `<span class="grammar grammar-usage">${usage}</span>`,
              ),
            )
            .join("")
        : '<span class="grammar grammar-usage" id="no-usages">(no usages)</span>',
      entry.phrases !== undefined
        ? entry.phrases
            .map((phraseEntry: Phrase) =>
              createEntry(
                `<span class="grammar grammar-phrase"><span class="grammar grammar-phrase-original">${phraseEntry.originalPhrase}</span><span class="grammar grammar-phrase-furigana">${phraseEntry.phrase}</span></span>`,
                [phraseEntry.translation],
                true,
              ),
            )
            .join("")
        : '<span class="grammar grammar-phrase" id="no-phrases">(no phrases)</span>',
      entry.source !== undefined
        ? `<span class="grammar grammar-source"><a href="${entry.source}" target="_blank">Source</a></span>`
        : '<span class="grammar grammar-source" id="no-source">(no source)</span>',
    );

  if (
    (entry.tags !== undefined && entry.tags.length > 0) ||
    (additionalTags !== undefined && additionalTags.length > 0)
  )
    fields.push(
      [...(entry.tags ?? []), ...(additionalTags ?? [])]
        .map((tag: string) => tag.trim().toLowerCase().replaceAll(" ", "::"))
        .join(" "),
    );

  return fields.map((field: string) => field.replaceAll("\n", "<br>"));
}

/**
 * Generates an Anki notes file with each entry’s info organized into fields, either in HTML or plain text.
 * @param list An array containing any type of transformed entries ({@link Word}, {@link Kanji}, {@link Radical}, {@link Kana}, {@link Grammar})
 * @param defaultNoteInfo An object with options regarding default values of some note information
 * @param customData An additional string that will be added on the first field of any note type, as a `data-custom` attribute inside an invisible `div`
 * @param additionalTags Additional tags that will be added alongside the existing entry tags
 * @returns The resulting Anki notes file's content
 */
export function generateAnkiNotesFile(
  list: readonly Result[],
  defaultNoteInfo?: DefaultNoteInfo,
  customData?: string,
  additionalTags?: string[],
): string {
  const headers: string[] = [noteHeaderKeys.separator, noteHeaderKeys.html];
  let ankiNotes: string = "";

  if (list.length > 0) {
    let noteInfo: DefaultNoteInfo = {};

    if (defaultNoteInfo !== undefined) noteInfo = { ...defaultNoteInfo };

    const infoValues: any[] = Object.values(noteInfo);

    let invalidList: boolean = false;

    const firstEntry: Result = list[0]!;
    const firstEntryInfo: {
      readonly guid:
        | "string"
        | "number"
        | "bigint"
        | "boolean"
        | "symbol"
        | "undefined"
        | "object"
        | "function";
      readonly noteType:
        | "string"
        | "number"
        | "bigint"
        | "boolean"
        | "symbol"
        | "undefined"
        | "object"
        | "function";
      readonly deckPath:
        | "string"
        | "number"
        | "bigint"
        | "boolean"
        | "symbol"
        | "undefined"
        | "object"
        | "function";
    } = {
      guid: typeof firstEntry.noteID,
      noteType: typeof firstEntry.noteTypeName,
      deckPath: typeof firstEntry.deckPath,
    };

    if (
      infoValues.length === 0 ||
      infoValues.some((value: any) => value === true || value === undefined)
    )
      for (const res of list)
        if (
          (noteInfo.guid === true && res.noteID === undefined) ||
          (noteInfo.noteType === true && res.noteTypeName === undefined) ||
          (noteInfo.deckPath === true && res.deckPath === undefined) ||
          (noteInfo.guid === undefined &&
            typeof res.noteID !== firstEntryInfo.guid) ||
          (noteInfo.noteType === undefined &&
            typeof res.noteTypeName !== firstEntryInfo.noteType) ||
          (noteInfo.deckPath === undefined &&
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
        if (typeof noteInfo.guid === "string" && result.noteID === undefined) {
          if (isWord(result) && result.id !== undefined)
            result.noteID = result.id;

          if (isKanji(result)) result.noteID = result.kanji;
          if (isRadical(result)) result.noteID = result.radical;
          if (isKana(result)) result.noteID = result.kana;
          if (isGrammar(result) && result.id !== undefined)
            result.noteID = result.id;
        }

        if (
          typeof noteInfo.noteType === "string" &&
          result.noteTypeName === undefined
        )
          result.noteTypeName = noteInfo.noteType;

        if (
          typeof noteInfo.deckPath === "string" &&
          result.deckPath === undefined
        )
          result.deckPath = noteInfo.deckPath;

        if (!hasHeader.guid && result.noteID !== undefined) {
          headers.push(`${noteHeaderKeys.guid}${++headerCount}`);
          hasHeader.guid = true;
        }
        if (!hasHeader.noteType && result.noteTypeName !== undefined) {
          headers.push(`${noteHeaderKeys.notetype}${++headerCount}`);
          hasHeader.noteType = true;
        }
        if (!hasHeader.deckPath && result.deckPath !== undefined) {
          headers.push(`${noteHeaderKeys.deck}${++headerCount}`);
          hasHeader.deckPath = true;
        }

        const note: string[] = generateAnkiNote(
          result,
          customData,
          additionalTags,
        );

        if (!hasHeader.tags) {
          headers.push(`${noteHeaderKeys.tags}${note.length + headerCount}`);
          hasHeader.tags = true;
        }

        return `${result.noteID !== undefined ? `${result.noteID}\t` : ""}${result.noteTypeName !== undefined ? `${result.noteTypeName}\t` : ""}${result.deckPath !== undefined ? `${result.deckPath}\t` : ""}${note.join("\t")}`;
      })
      .join("\n")
      .trim();
  }

  return `${headers.join("\n")}\n\n${ankiNotes}`;
}
