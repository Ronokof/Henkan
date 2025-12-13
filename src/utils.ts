import libxml from "libxmljs2";
import xml from "xml2js";
import iconv from "iconv-lite";
import {
  PollyClient,
  SynthesizeSpeechCommand,
  SynthesizeSpeechCommandInput,
  SynthesizeSpeechCommandOutput,
} from "@aws-sdk/client-polly";
import { noteMap, notSearchedForms, regexps } from "./constants";
import {
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
  DictWord,
  ExamplePart,
  Grammar,
  JaWiktionaryEntry,
  JLPT,
  Kana,
  Kanji,
  KanjiComponent,
  KanjiForm,
  NoteAndTag,
  Phrase,
  POS,
  Radical,
  Reading,
  Result,
  TanakaExample,
  Translation,
  Word,
  WordDefinitionPair,
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
 * Checks if the argument is an array.
 * @param arg The argument
 * @returns Whether or not {@link arg} is an array
 */
export function isValidArray(arg: any): arg is any[] {
  return arg !== null && arg !== undefined && Array.isArray(arg);
}

/**
 * Checks if the argument is an array and has at least one element.
 * @param arg The argument
 * @returns Whether or not {@link arg} is an array and has at least one element
 */
export function isValidArrayWithFirstElement(arg: any): arg is any[] {
  return (
    arg !== null &&
    arg !== undefined &&
    Array.isArray(arg) &&
    arg[0] !== null &&
    arg[0] !== undefined
  );
}

/**
 * Checks if the argument is an array of strings.
 * @param arg The argument
 * @returns Whether or not {@link arg} is an array of strings
 */
export function isStringArray(arg: any): arg is string[] {
  return (
    arg !== null &&
    arg !== undefined &&
    Array.isArray(arg) &&
    arg.every((element: any) => typeof element === "string")
  );
}

/**
 * Shuffles an array using the `Fisher–Yates shuffle` algorithm
 * @param arr The array to be shuffled
 * @returns The shuffled array
 */
export function shuffleArray<T>(arr: T[]): T[] {
  if (arr.length < 2) return arr;

  const a: T[] = arr.slice();

  for (let i: number = a.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    const tmp: T | undefined = a[i];
    const tmp2: T | undefined = a[j];

    if (!tmp || !tmp2) throw new Error("Invalid array");

    a[i] = tmp2;
    a[j] = tmp;
  }

  return a;
}

/**
 * Converts a JMdict `JMdict_e` file into an array of {@link DictWord} objects.
 * @param xmlString The raw `JMdict_e` file contents
 * @param examples An array of converted `Tanaka Corpus` examples
 * @returns An array of converted {@link DictWord} objects
 */
export function convertJMdict(
  xmlString: string,
  examples?: TanakaExample[] | undefined,
): DictWord[] {
  try {
    const dictParsed: libxml.Document = libxml.parseXml(xmlString, {
      dtdvalid: true,
      nonet: false,
      noent: true,
      recover: false,
    });
    const dict: DictWord[] = [];

    xml.parseString(dictParsed, (err: Error | null, result: any) => {
      if (err) throw err;

      const tanakaParts: Set<string> | undefined =
        examples && examples.length > 0
          ? new Set<string>(
              examples
                .map((example: TanakaExample) =>
                  example.parts.map((part: ExamplePart) => [
                    part.baseForm,
                    ...(part.reading ? [part.reading] : []),
                    ...(part.referenceID ? [part.referenceID] : []),
                  ]),
                )
                .flat(2),
            )
          : undefined;

      if (
        result.JMdict &&
        typeof result.JMdict === "object" &&
        isValidArray(result.JMdict.entry)
      )
        for (const entry of result.JMdict.entry) {
          const entryObj: DictWord = {
            ...(isValidArray(entry.ent_seq) &&
            entry.ent_seq[0] &&
            typeof entry.ent_seq[0] === "string"
              ? { id: entry.ent_seq[0] }
              : { id: "" }),
            readings: [],
            meanings: [],
          };

          if (entryObj.id.length === 0) throw new Error("Invalid JMdict entry");

          const kanjiForms: any = entry.k_ele;
          const readings: any = entry.r_ele;
          const meanings: any = entry.sense;

          if (isValidArray(kanjiForms)) {
            entryObj.kanjiForms = [];

            for (const kanjiForm of kanjiForms) {
              const form: DictKanjiForm = {
                ...(isValidArrayWithFirstElement(kanjiForm.keb) &&
                typeof kanjiForm.keb[0] === "string"
                  ? { form: kanjiForm.keb[0] }
                  : { form: "" }),
              };
              if (form.form.length === 0)
                throw new Error(
                  `Invalid JMdict entry kanji form: ${entryObj.id}`,
                );

              if (isStringArray(kanjiForm.ke_inf))
                form.notes = kanjiForm.ke_inf;
              if (isStringArray(kanjiForm.ke_pri)) {
                form.commonness = kanjiForm.ke_pri;

                if (entryObj.isCommon === undefined) entryObj.isCommon = true;
              }

              if (form.form.length > 0) entryObj.kanjiForms.push(form);
            }
          }

          if (isValidArray(readings))
            for (const reading of readings) {
              const readingObj: DictReading = {
                ...(isValidArrayWithFirstElement(reading.reb) &&
                typeof reading.reb[0] === "string"
                  ? { reading: reading.reb[0] }
                  : { reading: "" }),
              };
              if (readingObj.reading.length === 0)
                throw new Error(`Invalid JMdict entry reading: ${entryObj.id}`);

              if (isStringArray(reading.re_inf))
                readingObj.notes = reading.re_inf;
              if (isStringArray(reading.re_restr))
                readingObj.kanjiFormRestrictions = reading.re_restr;
              if (isStringArray(reading.re_pri)) {
                readingObj.commonness = reading.re_pri;

                if (entryObj.isCommon === undefined) entryObj.isCommon = true;
              }

              if (readingObj.reading.length > 0)
                entryObj.readings.push(readingObj);
            }

          if (isValidArray(meanings)) {
            let usuallyInKanaMeanings: number = 0;

            for (const meaning of meanings) {
              const meaningObj: DictMeaning = {};

              if (isStringArray(meaning.pos))
                meaningObj.partOfSpeech = meaning.pos;
              if (isValidArray(meaning.gloss)) {
                meaningObj.translations = [];

                for (const gloss of meaning.gloss)
                  if (typeof gloss === "string")
                    meaningObj.translations.push(gloss);
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
              }

              if (isStringArray(meaning.xref))
                meaningObj.references = meaning.xref;
              if (isStringArray(meaning.stagk))
                meaningObj.kanjiFormRestrictions = meaning.stagk;
              if (isStringArray(meaning.stagr))
                meaningObj.readingRestrictions = meaning.stagr;
              if (isStringArray(meaning.ant)) meaningObj.antonyms = meaning.ant;
              if (isStringArray(meaning.field))
                meaningObj.fields = meaning.field;
              if (isStringArray(meaning.s_inf)) meaningObj.info = meaning.s_inf;
              if (isStringArray(meaning.misc)) {
                meaningObj.misc = meaning.misc;

                if (
                  meaningObj.misc &&
                  meaningObj.misc.includes(
                    "word usually written using kana alone",
                  )
                )
                  usuallyInKanaMeanings++;
              }
              if (isStringArray(meaning.dial))
                meaningObj.dialects = meaning.dial;

              if (
                (meaningObj.partOfSpeech &&
                  meaningObj.partOfSpeech.length > 0) ||
                meaningObj.translations
              )
                entryObj.meanings.push(meaningObj);
            }

            if (entryObj.meanings.length === usuallyInKanaMeanings)
              entryObj.usuallyInKana = true;
          }

          if (examples) {
            const readings: Set<string> = new Set<string>(
              entryObj.readings
                .filter(
                  (reading: DictReading) =>
                    reading.notes === undefined ||
                    !reading.notes.some((note: string) =>
                      notSearchedForms.has(note),
                    ) ||
                    reading.commonness,
                )
                .map((reading: DictReading) => reading.reading),
            );
            const kanjiForms: Set<string> | undefined = entryObj.kanjiForms
              ? new Set<string>(
                  entryObj.kanjiForms.map(
                    (kanjiForm: DictKanjiForm) => kanjiForm.form,
                  ),
                )
              : undefined;

            let existsExample: boolean = false;

            if (kanjiForms && kanjiForms.size > 0 && tanakaParts)
              for (const kf of kanjiForms)
                if (tanakaParts.has(kf)) {
                  existsExample = true;
                  break;
                }
            if (!existsExample && readings.size > 0 && tanakaParts)
              for (const r of readings)
                if (tanakaParts.has(r)) {
                  existsExample = true;
                  break;
                }

            if (!existsExample && tanakaParts && tanakaParts.has(entryObj.id))
              existsExample = true;

            if (existsExample) entryObj.hasPhrases = true;
          }

          if (
            entryObj.id.length > 0 &&
            entryObj.readings.length > 0 &&
            entryObj.meanings.length > 0
          )
            dict.push(entryObj);
        }
    });

    return dict;
  } catch (err: unknown) {
    throw err;
  }
}

/**
 * Converts a KANJIDIC `kanjidic2.xml` file into an array of {@link DictKanji} objects.
 * @param xmlString The raw `kanjidic2.xml` file contents
 * @returns An array of converted {@link DictKanji} objects
 */
export function convertKanjiDic(xmlString: string): DictKanji[] {
  try {
    const dictParsed: libxml.Document = libxml.parseXml(xmlString, {
      dtdvalid: true,
      nonet: false,
      noent: true,
      recover: false,
    });
    const dict: DictKanji[] = [];

    xml.parseString(dictParsed, (err: Error | null, result: any) => {
      if (err) throw err;

      if (
        result.kanjidic2 &&
        typeof result.kanjidic2 === "object" &&
        isValidArray(result.kanjidic2.character)
      )
        for (const entry of result.kanjidic2.character) {
          const kanjiObj: DictKanji = {
            ...(isValidArrayWithFirstElement(entry.literal) &&
            typeof entry.literal[0] === "string"
              ? { kanji: entry.literal[0] }
              : { kanji: "" }),
            misc: {
              strokeNumber: "",
            },
            readingMeaning: [],
          };

          if (kanjiObj.kanji.length === 0)
            throw new Error("Invalid KANJIDIC entry");

          if (
            isValidArrayWithFirstElement(entry.misc) &&
            typeof entry.misc[0] === "object"
          ) {
            const misc: any = entry.misc[0];

            kanjiObj.misc = {
              ...(isValidArrayWithFirstElement(misc.stroke_count) &&
              typeof misc.stroke_count[0] === "string"
                ? { strokeNumber: misc.stroke_count[0] }
                : { strokeNumber: "" }),
            };

            if (kanjiObj.misc.strokeNumber.length === 0)
              throw new Error(`Invalid KANJIDIC entry: ${kanjiObj.kanji}`);

            if (
              isValidArrayWithFirstElement(misc.grade) &&
              typeof misc.grade[0] === "string"
            )
              kanjiObj.misc.grade = misc.grade[0];
            if (
              isValidArrayWithFirstElement(misc.freq) &&
              typeof misc.freq[0] === "string"
            )
              kanjiObj.misc.frequency = misc.freq[0];
            if (
              isValidArrayWithFirstElement(misc.jlpt) &&
              typeof misc.jlpt[0] === "string" &&
              ["5", "4", "3", "2", "1"].includes(misc.jlpt[0])
            )
              kanjiObj.misc.jlpt = `N${misc.jlpt[0]}` as JLPT;
          }

          if (isValidArray(entry.reading_meaning))
            for (const rm of entry.reading_meaning) {
              const rmObj: DictKanjiReadingMeaning = { groups: [] };

              if (isValidArray(rm.rmgroup))
                for (const group of rm.rmgroup) {
                  const groupObj: DictKanjiReadingMeaningGroup = {
                    readings: [],
                    meanings: [],
                  };

                  if (isValidArray(group.reading))
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
                        groupObj.readings.push({
                          reading: reading._,
                          type: reading.$.r_type,
                        });

                  if (isValidArray(group.meaning))
                    for (const meaning of group.meaning)
                      if (typeof meaning === "string") {
                        if (
                          kanjiObj.isKokuji === undefined &&
                          meaning === "(kokuji)"
                        )
                          kanjiObj.isKokuji = true;

                        groupObj.meanings.push(meaning);
                      }
                  if (
                    groupObj.readings.length > 0 ||
                    groupObj.meanings.length > 0
                  )
                    rmObj.groups.push(groupObj);
                }

              if (isStringArray(rm.nanori)) rmObj.nanori = rm.nanori;

              if (rmObj.groups.length > 0 && kanjiObj.readingMeaning)
                kanjiObj.readingMeaning.push(rmObj);
            }

          if (kanjiObj.readingMeaning && kanjiObj.readingMeaning.length === 0)
            delete kanjiObj.readingMeaning;

          if (
            kanjiObj.kanji.length === 1 &&
            kanjiObj.misc &&
            kanjiObj.misc.strokeNumber.length > 0
          )
            dict.push(kanjiObj);
        }
    });

    return dict;
  } catch (err: unknown) {
    throw err;
  }
}

/**
 * Converts a Tanaka Corpus `examples.utf` file into an array of {@link TanakaExample} objects.
 * @param tanakaString The raw contents of a `examples.utf` file
 * @param generateFurigana Whether or not to generate furigana for the phrases
 * @returns A promise resolving with an array of converted {@link TanakaExample} objects
 */
export async function convertTanakaCorpus(
  tanakaString: string,
  generateFurigana?: true,
): Promise<TanakaExample[]> {
  return await new Promise<TanakaExample[]>(
    async (
      resolve: (value: TanakaExample[] | PromiseLike<TanakaExample[]>) => void,
      reject: (reason?: any) => void,
    ) => {
      try {
        const tanakaArray: TanakaExample[] = [];

        const tanakaParsed: string[] = tanakaString.split("\n");

        const kuroshiro: any =
          generateFurigana === true ? new Kuroshiro.default() : null;
        if (kuroshiro !== null) await kuroshiro.init(new KuromojiAnalyzer());

        const convert: any =
          kuroshiro !== null ? kuroshiro.convert.bind(kuroshiro) : null;

        for (let i: number = 0; i <= tanakaParsed.length; i += 2) {
          let a: string | undefined = tanakaParsed[i];
          let b: string | undefined = tanakaParsed[i + 1];

          if (a && b && a.startsWith("A: ") && b.startsWith("B: ")) {
            a = a.replace("A: ", "");
            b = b.replace("B: ", "");

            const idMatch: RegExpExecArray | null = regexps.tanakaID.exec(a);
            if (!idMatch || !idMatch.groups || !idMatch.groups["id"])
              throw new Error(`Invalid phrase ID for ${a}`);

            const aParts: string[] = a
              .replace(regexps.tanakaID, "")
              .split("\t");
            const bParts: ExamplePart[] = b
              .split(" ")
              .filter((part: string) => part.trim().length !== 0)
              .map((part: string) => {
                const partMatches: RegExpExecArray | null =
                  regexps.tanakaPart.exec(part);
                if (
                  !partMatches ||
                  !partMatches.groups ||
                  partMatches.length === 0
                )
                  throw new Error(`Invalid B part: ${part}`);

                const baseForm: string | undefined = partMatches.groups["base"];
                if (!baseForm)
                  throw new Error(`Invalid base form of B part: ${part}`);

                const examplePart: ExamplePart = { baseForm: baseForm };

                const reading: string | undefined =
                  partMatches.groups["reading"];
                const glossNumber: string | undefined =
                  partMatches.groups["glossnum"];
                const inflectedForm: string | undefined =
                  partMatches.groups["inflection"];

                if (reading)
                  if (regexps.tanakaReferenceID.test(reading)) {
                    const referenceID: RegExpExecArray | null =
                      regexps.tanakaReferenceID.exec(reading);
                    if (
                      !referenceID ||
                      !referenceID.groups ||
                      !referenceID.groups["entryid"]
                    )
                      throw new Error(`Invalid reference ID: ${reading}`);

                    examplePart.referenceID = referenceID.groups["entryid"];
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

                return examplePart;
              });

            const phrase: string | undefined = aParts[0];
            const translation: string | undefined = aParts[1];

            if (phrase && translation) {
              let furigana: string | undefined = undefined;

              if (convert !== null && !phrase.includes("・"))
                furigana = (await convert(phrase, {
                  to: "hiragana",
                  mode: "furigana",
                })) as string;

              tanakaArray.push({
                id: idMatch.groups["id"].trim() as `${number}_${number}`,
                phrase: phrase.trim(),
                translation: translation.trim(),
                parts: bParts,
                ...(furigana ? { furigana: furigana } : {}),
              });
            }
          }
        }

        tanakaParsed.length = 0;

        resolve(tanakaArray);
      } catch (err: unknown) {
        reject(err);
      }
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
  kanjiDic: DictKanji[],
): DictRadical[] {
  try {
    const fileParsed: string[] = iconv
      .decode(radkBuffer, "euc-jp")
      .split("\n")
      .filter((line: string) => !line.startsWith("#"));
    const radicals: DictRadical[] = [];

    for (let i = 0; i < fileParsed.length; i++) {
      const line: string | undefined = fileParsed[i];
      if (!line) continue;

      if (line.startsWith("$ ")) {
        const radical: DictRadical = {
          radical: line.charAt(2).trim(),
          strokes: line.substring(4).trim(),
        };

        let j: number = i + 1;
        let kanjiLine: string | undefined = fileParsed[j];
        if (!kanjiLine) continue;

        const kanjiList: DictKanji[] = [];

        while (kanjiLine && !kanjiLine.startsWith("$ ")) {
          const kanjis: string[] = kanjiLine.split("");

          for (const kanji of kanjis) {
            const foundKanji: DictKanji | undefined = kanjiDic.find(
              (dictKanji: DictKanji) => dictKanji.kanji === kanji,
            );

            if (foundKanji) kanjiList.push(foundKanji);
            else kanjiList.push({ kanji: kanji });
          }

          j++;
          kanjiLine = fileParsed[j];
          if (!kanjiLine) continue;

          if (kanjiLine.startsWith("$ ")) i = j - 1;
        }

        if (kanjiList.length > 0) radical.kanji = kanjiList;

        if (radical.radical.length === 1 && radical.strokes.length > 0)
          radicals.push(radical);
      }
    }

    fileParsed.length = 0;

    return radicals;
  } catch (err: unknown) {
    throw err;
  }
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
  kanjiDic: DictKanji[],
  katakanaList: Kana[],
): DictKanjiWithRadicals[] {
  try {
    const fileParsed: string[] = iconv
      .decode(kradBuffer, "euc-jp")
      .split("\n")
      .filter((line: string) => !line.startsWith("#"));
    const kanjiWithRadicals: DictKanjiWithRadicals[] = [];

    for (const line of fileParsed) {
      if (line.length === 0) continue;

      const split: string[] = line.split(" : ");

      const kanjiChar: string | undefined = split[0];
      const radicalsRow: string | undefined = split[1];

      if (!kanjiChar || !radicalsRow) continue;

      const kanji: DictKanjiWithRadicals = {
        ...(kanjiChar &&
        radicalsRow &&
        kanjiChar.length === 1 &&
        radicalsRow.length > 0
          ? { kanji: kanjiChar }
          : { kanji: "" }),
        radicals: [],
      };

      if (kanji.kanji.length === 1) {
        const radicals: string[] = radicalsRow.split(" ");

        for (const radical of radicals) {
          let foundRadical: DictKanji | undefined = kanjiDic.find(
            (dictKanji: DictKanji) => dictKanji.kanji === radical,
          );

          if (!foundRadical) {
            const katakanaChar: Kana | undefined = katakanaList.find(
              (kana: Kana) => kana.kana === radical,
            );
            if (!katakanaChar) continue;

            foundRadical = {
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

          kanji.radicals.push(foundRadical ? foundRadical : radical);
        }
      }

      if (kanji.kanji.length === 1 && kanji.radicals.length > 0)
        kanjiWithRadicals.push(kanji);
    }

    fileParsed.length = 0;

    return kanjiWithRadicals;
  } catch (err: unknown) {
    throw err;
  }
}

/**
 * Converts and filters a `ja.wiktionary.org` JSONL dump
 *
 * The dump file needs to be converted from a `jawiktionary-latest-pages-articles.xml.bz2` file from {@link https://dumps.wikimedia.org/jawiktionary/latest/} using {@link https://github.com/tatuylonen/wiktextract | wiktextract}.
 * @param stream The stream of a JSONL dump file
 * @returns An array containing only Japanese entries
 */
export async function convertJawiktionary(stream: ReadStream): Promise<any[]> {
  const rl: Interface = createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  let lineNumber: number = 0;

  return await new Promise<any[]>(
    async (
      resolve: (value: any[] | PromiseLike<any[]>) => void,
      reject: (reason?: any) => void,
    ) => {
      try {
        const entries: any[] = [];

        for await (const line of rl) {
          lineNumber++;

          let obj: any = undefined;

          try {
            obj = JSON.parse(line.trim());
          } catch (err: unknown) {
            rl.close();
            throw new Error(
              `Invalid JSONL at line ${lineNumber}: ${(err as Error).message}`,
            );
          }

          if (
            obj !== undefined &&
            obj !== null &&
            typeof obj === "object" &&
            obj.lang_code === "ja" &&
            obj.lang === "日本語"
          )
            entries.push(obj);
        }

        rl.close();
        stream.close();
        stream.destroy();

        resolve(entries);
      } catch (err: unknown) {
        reject(err);
      }
    },
  );
}

function mapEntry(entry: any): JaWiktionaryEntry {
  if (entry.word === undefined || typeof entry.word !== "string")
    throw new Error("Invalid ja.wiktionary entry");

  return {
    word: entry.word,
    ...(entry.pos_title && typeof entry.pos_title === "string"
      ? { pos_title: entry.pos_title }
      : {}),
    ...(isValidArray(entry.senses)
      ? {
          senses: entry.senses
            .filter(
              (sense: any) =>
                (isValidArray(sense.form_of) &&
                  sense.form_of.every(
                    (form: any) => form.word && typeof form.word === "string",
                  )) ||
                isStringArray(sense.glosses),
            )
            .map((sense: any) => ({
              ...(sense.form_of
                ? {
                    form_of: sense.form_of.map((form: any) => ({
                      word: form.word,
                    })),
                  }
                : {}),
              ...(sense.glosses ? { glosses: sense.glosses } : {}),
            })),
        }
      : {}),
    ...(isValidArray(entry.forms) &&
    entry.forms.every((form: any) => typeof form.form === "string")
      ? { forms: entry.forms.map((form: any) => ({ form: form.form })) }
      : {}),
  };
}

function parseEntry(
  entry: any,
  definitions: Definition[],
  definitionMap: Map<string, { count: number }>,
): void {
  if (isValidArray(entry.senses))
    for (const sense of entry.senses)
      if (isStringArray(sense.glosses)) {
        let definition: string = "";

        for (let i: number = 0; i < sense.glosses.length; i += 2) {
          if (i !== 0) {
            let prev: string | undefined = sense.glosses[i - 1];
            let cur: string | undefined = sense.glosses[i];

            if (prev && cur)
              definition += `${prev}${!prev.endsWith("。") ? "。" : ""}${cur}`;
          } else definition += sense.glosses[i];
        }

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
 * @param entryList An array containing `ja.wiktionary.org` Japanese entries (converted using {@link convertJawiktionary})
 * @param jmDict An array of converted `JMdict` entries
 * @param generateFurigana Whether or not to generate furigana for the definitions
 * @returns A promise resolving with an array of {@link WordDefinitionPair} objects
 */
export async function getWordDefinitions(
  entryList: any[],
  jmDict: DictWord[],
  generateFurigana?: true,
): Promise<WordDefinitionPair[]> {
  return await new Promise<WordDefinitionPair[]>(async (resolve, reject) => {
    try {
      const entries: Map<string, JaWiktionaryEntry[]> = new Map<
        string,
        JaWiktionaryEntry[]
      >();

      for (const entry of entryList) {
        const ent: JaWiktionaryEntry[] | undefined = entries.get(entry.word);

        if (ent) ent.push(mapEntry(entry));
        else entries.set(entry.word, [mapEntry(entry)]);
      }

      const japaneseDefinitions: WordDefinitionPair[] = [];
      const definitionMap: Map<string, { count: number }> = new Map<
        string,
        { count: number }
      >();

      const validWords: DictWord[] = [];
      const validReadings: Set<string> = new Set<string>();
      const validKanjiForms: Set<string> = new Set<string>();

      for (const word of jmDict) {
        let valid: boolean = false;

        for (const r of word.readings)
          if (
            (r.notes === undefined ||
              !r.notes.some((note: string) => notSearchedForms.has(note)) ||
              r.commonness !== undefined) &&
            !validReadings.has(r.reading)
          ) {
            validReadings.add(r.reading);
            if (!valid) valid = true;
          }
        if (word.kanjiForms)
          for (const kf of word.kanjiForms)
            if (
              (kf.notes === undefined ||
                !kf.notes.some((note: string) => notSearchedForms.has(note)) ||
                kf.commonness !== undefined) &&
              !validKanjiForms.has(kf.form)
            ) {
              validKanjiForms.add(kf.form);
              if (!valid) valid = true;
            }

        if (valid) validWords.push(word);
      }

      const validTitleEntries: Map<string, JaWiktionaryEntry[]> = new Map<
        string,
        JaWiktionaryEntry[]
      >();
      const entriesWithFormTitlesGlobal: Map<string, JaWiktionaryEntry[]> =
        new Map<string, JaWiktionaryEntry[]>();
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

          if (isValidArray(entry.senses))
            for (const sense of entry.senses) {
              if (
                isValidArray(sense.form_of) &&
                sense.form_of.some(
                  (form: any) =>
                    form.word &&
                    typeof form.word === "string" &&
                    validReadings.has(form.word),
                )
              )
                validFormOfEntries.add(entry.word);
              else if (isStringArray(sense.glosses)) {
                for (const gloss of sense.glosses) {
                  let reading: string | undefined = undefined;

                  if (gloss !== undefined)
                    if (
                      gloss.trim().includes("の漢字表記。") ||
                      gloss.trim().includes("を参照。")
                    )
                      for (const r of validReadings)
                        if (gloss.trim().includes(r)) {
                          reading = r;
                          break;
                        }

                  if (reading) validGlossesEntries.add(entry.word);
                }
              }
            }

          if (isValidArray(entry.forms))
            for (const form of entry.forms)
              if (
                form.form &&
                typeof form.form === "string" &&
                validReadings.has(form.form)
              )
                validFormsEntries.add(entry.word);
        } else if (validReadings.has(entry.word)) {
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
          isValidArray(entry.forms) &&
          (validKanjiForms.has(entry.word) || validReadings.has(entry.word)) &&
          entry.forms.some(
            (form: any) =>
              validKanjiForms.has(form.form) || validReadings.has(form.form),
          )
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
        for (const te of vte)
          if (te.pos_title === pos || te.pos_title === "和語の漢字表記") {
            if (!posMap.has(pos as POS)) posMap.set(pos as POS, {});

            const posEntries: {
              title?: Map<string, JaWiktionaryEntry[]>;
              formTitle?: Map<string, JaWiktionaryEntry[]>;
              form?: Map<string, JaWiktionaryEntry[]>;
            } = posMap.get(pos as POS)!;

            if (posEntries.title === undefined)
              posEntries.title = new Map<string, JaWiktionaryEntry[]>();

            const entryList: JaWiktionaryEntry[] | undefined =
              posEntries.title.get(te.word);

            if (entryList) entryList.push(te);
            else posEntries.title.set(te.word, [te]);
          }

        for (const ft of fge)
          if (ft.pos_title === pos) {
            if (!posMap.has(pos as POS)) posMap.set(pos as POS, {});

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
            if (!posMap.has(pos as POS)) posMap.set(pos as POS, {});

            const posEntries: {
              title?: Map<string, JaWiktionaryEntry[]>;
              formTitle?: Map<string, JaWiktionaryEntry[]>;
              form?: Map<string, JaWiktionaryEntry[]>;
            } = posMap.get(pos as POS)!;

            if (posEntries.form === undefined)
              posEntries.form = new Map<string, JaWiktionaryEntry[]>();

            const entryList: JaWiktionaryEntry[] | undefined =
              posEntries.form.get(wf.word);

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
        entriesWithTitles: any[];
        entriesWithFormTitles: any[];
        entriesWithForms: any[];
      }[] = [];

      for (const word of validWords) {
        const poses: Set<POS> = new Set<POS>();

        for (const m of word.meanings) {
          if (m.partOfSpeech)
            for (const note of m.partOfSpeech) {
              const noteEntry:
                | readonly [string, string]
                | readonly [string, string, POS | POS[]]
                | undefined = noteMap.get(note);

              if (noteEntry && noteEntry.length === 3) {
                const notePos: POS | POS[] = noteEntry[2];

                if (Array.isArray(notePos))
                  for (const pos of notePos) {
                    if (!poses.has(pos)) poses.add(pos);
                  }
                else if (typeof notePos === "string" && !poses.has(notePos))
                  poses.add(notePos);
              }
            }
        }

        const validWordReadings = new Set<string>(
          word.readings
            .filter(
              (r: DictReading) =>
                r.notes === undefined ||
                !r.notes.some((note: string) => notSearchedForms.has(note)) ||
                r.commonness !== undefined,
            )
            .map((r: Reading) => r.reading),
        );
        const validWordKanjiForms: Set<string> | undefined = word.kanjiForms
          ? new Set<string>(
              word.kanjiForms
                .filter(
                  (kf: DictKanjiForm) =>
                    kf.notes === undefined ||
                    !kf.notes.some((note: string) =>
                      notSearchedForms.has(note),
                    ) ||
                    kf.commonness !== undefined,
                )
                .map((kf: DictKanjiForm) => kf.form),
            )
          : undefined;

        const entriesWithTitles: JaWiktionaryEntry[] = [];
        const entriesWithFormTitles: JaWiktionaryEntry[] = [];
        const entriesWithForms: JaWiktionaryEntry[] = [];

        if (poses.size > 0)
          for (const pos of poses) {
            const posEntries:
              | {
                  title?: Map<string, JaWiktionaryEntry[]>;
                  formTitle?: Map<string, JaWiktionaryEntry[]>;
                  form?: Map<string, JaWiktionaryEntry[]>;
                }
              | undefined = posMap.get(pos);

            if (posEntries) {
              if (validWordKanjiForms && (posEntries.title || posEntries.form))
                for (const kf of validWordKanjiForms) {
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
                            (form: { form: string }) =>
                              validWordKanjiForms.has(form.form) ||
                              validWordReadings.has(form.form),
                          ),
                      ),
                    );
                }

              if (posEntries.title || posEntries.formTitle || posEntries.form)
                for (const r of validWordReadings) {
                  const te: JaWiktionaryEntry[] | undefined =
                    posEntries.title?.get(r);
                  const fe: JaWiktionaryEntry[] | undefined =
                    posEntries.form?.get(r);
                  const fte: JaWiktionaryEntry[] | undefined =
                    posEntries.formTitle?.get(r);

                  if (te)
                    entriesWithTitles.push(
                      ...te.filter(
                        (ent: JaWiktionaryEntry) =>
                          (ent.forms &&
                            validWordKanjiForms &&
                            ent.forms.some((form: any) =>
                              validWordKanjiForms.has(form.form),
                            )) ||
                          validWordKanjiForms === undefined,
                      ),
                    );
                  if (fe)
                    entriesWithForms.push(
                      ...fe.filter(
                        (ent: JaWiktionaryEntry) =>
                          ent.forms &&
                          ent.forms.some(
                            (form: { form: string }) =>
                              (validWordKanjiForms &&
                                validWordKanjiForms.has(form.form)) ||
                              validWordReadings.has(form.form),
                          ),
                      ),
                    );
                  if (fte) entriesWithFormTitles.push(...fte);
                }
            }
          }

        if (
          entriesWithTitles.length === 0 &&
          entriesWithFormTitles.length === 0 &&
          entriesWithForms.length === 0
        ) {
          if (validWordKanjiForms)
            for (const kf of validWordKanjiForms) {
              const te: JaWiktionaryEntry[] | undefined =
                validTitleEntries.get(kf);
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
                        (form: { form: string }) =>
                          validWordKanjiForms.has(form.form) ||
                          validWordReadings.has(form.form),
                      ),
                  ),
                );
            }

          for (const r of validWordReadings) {
            const te: JaWiktionaryEntry[] | undefined =
              validTitleEntries.get(r);
            const fe: JaWiktionaryEntry[] | undefined =
              entriesWithFormsGlobal.get(r);
            const fte: JaWiktionaryEntry[] | undefined =
              entriesWithFormTitlesGlobal.get(r);

            if (te)
              entriesWithTitles.push(
                ...te.filter(
                  (ent: JaWiktionaryEntry) =>
                    (ent.forms &&
                      validWordKanjiForms &&
                      ent.forms.some((form: any) =>
                        validWordKanjiForms.has(form.form),
                      )) ||
                    validWordKanjiForms === undefined,
                ),
              );
            if (fe)
              entriesWithForms.push(
                ...fe.filter(
                  (ent: JaWiktionaryEntry) =>
                    ent.forms &&
                    ent.forms.some(
                      (form: { form: string }) =>
                        (validWordKanjiForms &&
                          validWordKanjiForms.has(form.form)) ||
                        validWordReadings.has(form.form),
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
            readings: validWordReadings,
            ...(validWordKanjiForms ? { kanjiForms: validWordKanjiForms } : {}),
            entriesWithTitles: entriesWithTitles,
            entriesWithFormTitles: entriesWithFormTitles,
            entriesWithForms: entriesWithForms,
          });
      }

      for (const pair of wordEntriesPairs) {
        const definitions: Definition[] = [];

        const kanjiFormEntries: any[] = [];
        const readingWithFormsEntries: any[] = [];
        const readingEntries: any[] = [];

        const titleFormMap: Map<string, Set<string>> = new Map<
          string,
          Set<string>
        >();
        const refsMap: Map<string, Set<string>> = new Map<
          string,
          Set<string>
        >();
        const readingForms: Set<string> = new Set<string>();

        for (const ent of pair.entriesWithTitles) {
          const validFormOf: boolean = validFormOfEntries.has(ent.word);
          const validGlosses: boolean = validGlossesEntries.has(ent.word);
          const validForms: boolean = validFormsEntries.has(ent.word);

          if (
            pair.kanjiForms &&
            pair.kanjiForms.has(ent.word) &&
            (validFormOf || validGlosses || validForms)
          ) {
            kanjiFormEntries.push(ent);

            if ((validFormOf || validGlosses) && isValidArray(ent.senses))
              for (const sense of ent.senses) {
                if (validFormOf && isValidArray(sense.form_of)) {
                  for (const form of sense.form_of)
                    if (
                      form.word &&
                      typeof form.word === "string" &&
                      pair.readings.has(form.word)
                    ) {
                      const elem: Set<string> | undefined = titleFormMap.get(
                        form.word,
                      );

                      if (!elem)
                        titleFormMap.set(
                          form.word,
                          new Set<string>([ent.word]),
                        );
                      else elem.add(ent.word);
                    }
                } else if (validGlosses && isStringArray(sense.glosses)) {
                  for (const gloss of sense.glosses) {
                    let reading: string | undefined = undefined;

                    if (gloss !== undefined)
                      if (
                        gloss.trim().includes("の漢字表記。") ||
                        gloss.trim().includes("を参照。")
                      )
                        for (const r of pair.readings)
                          if (gloss.trim().includes(r)) {
                            reading = r;
                            break;
                          }

                    if (reading) {
                      const elem: Set<string> | undefined =
                        refsMap.get(reading);

                      if (!elem)
                        refsMap.set(reading, new Set<string>([ent.word]));
                      else elem.add(ent.word);
                    }
                  }
                }
              }

            if (validForms && isValidArray(ent.forms))
              for (const form of ent.forms)
                if (
                  form.form &&
                  typeof form.form === "string" &&
                  pair.readings.has(form.form)
                )
                  readingForms.add(form.form);
          } else if (
            pair.readings.has(ent.word) &&
            isValidArray(ent.forms) &&
            pair.kanjiForms &&
            ent.forms.some((form: any) => pair.kanjiForms!.has(form.form))
          )
            readingWithFormsEntries.push(ent);
          else if (pair.kanjiForms === undefined && pair.readings.has(ent.word))
            readingEntries.push(ent);
        }

        for (const entry of pair.entriesWithForms) {
          const elem: Set<string> | undefined = titleFormMap.get(entry.word);

          if (elem && entry.forms.some((form: any) => elem.has(form.form)))
            readingWithFormsEntries.push(entry);
        }

        for (const entry of pair.entriesWithFormTitles) {
          if (readingForms.has(entry.word)) {
            readingWithFormsEntries.push(entry);
            continue;
          }

          if (pair.kanjiForms) {
            const ft: Set<string> | undefined = refsMap.get(entry.word);

            if (ft && ft.intersection(pair.kanjiForms).size > 0)
              readingWithFormsEntries.push(entry);
          }
        }

        let parsedReadingWithFormsEntries: boolean = false;

        for (const entry of kanjiFormEntries)
          if (
            entry.pos_title === "和語の漢字表記" &&
            readingWithFormsEntries.length > 0
          ) {
            if (!parsedReadingWithFormsEntries)
              parsedReadingWithFormsEntries = true;

            for (const ref of readingWithFormsEntries)
              parseEntry(ref, definitions, definitionMap);
          } else parseEntry(entry, definitions, definitionMap);

        if (
          !parsedReadingWithFormsEntries &&
          readingWithFormsEntries.length > 0
        ) {
          parsedReadingWithFormsEntries = true;

          for (const ref of readingWithFormsEntries)
            parseEntry(ref, definitions, definitionMap);
        }

        if (readingEntries.length > 0)
          for (const readingEntry of readingEntries)
            parseEntry(readingEntry, definitions, definitionMap);

        if (definitions.length > 0)
          japaneseDefinitions.push({
            wordID: pair.word.id,
            definitions: definitions,
          });
      }

      const kuroshiro: any =
        generateFurigana === true ? new Kuroshiro.default() : null;
      if (kuroshiro !== null) await kuroshiro.init(new KuromojiAnalyzer());

      const convert: any =
        kuroshiro !== null ? kuroshiro.convert.bind(kuroshiro) : null;

      for (let i: number = 0; i < japaneseDefinitions.length; i++) {
        const pair: WordDefinitionPair = japaneseDefinitions[i]!;

        for (let j: number = 0; j < pair.definitions.length; j++) {
          const defCount: { count: number } | undefined = definitionMap.get(
            pair.definitions[j]!.definition,
          );

          if (defCount && defCount.count > 1)
            pair.definitions[j]!.mayNotBeAccurate = true;

          if (
            convert !== null &&
            !pair.definitions[j]!.definition.includes("・")
          )
            pair.definitions[j]!.furigana = (await convert(
              pair.definitions[j]!.definition,
              {
                to: "hiragana",
                mode: "furigana",
              },
            )) as string;
        }

        japaneseDefinitions[i] = pair;
      }

      resolve(japaneseDefinitions);
    } catch (err: unknown) {
      reject(err);
    }
  });
}

function lookupWordNote(
  key: string,
  notes?: string[] | undefined,
  tags?: string[] | undefined,
  required?: boolean | undefined,
  fallback?: string | undefined,
): NoteAndTag {
  const info:
    | readonly [string, string]
    | readonly [string, string, POS | POS[]]
    | undefined = noteMap.get(key.toLowerCase());

  if (!info) {
    if (required) throw new Error(`Invalid note info for ${key}`);

    if (notes) notes.push(fallback ?? key);

    return { note: fallback ?? key };
  }

  const tag: string = `word::${info[0]}`;

  if (tags && !tags.includes(tag)) tags.push(tag);
  if (notes) notes.push(info[1]);

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
 * Transforms a converted `JMdict` entry into a more readable format, by providing either its {@link id} or the {@link dictWord} object directly.
 * @param dict An array of converted `JMdict` entries
 * @param id The ID of the `JMdict` entry
 * @param kanjiDic An array of converted `KANJIDIC` entries
 * @param examples An array of converted `Tanaka Corpus` examples
 * @param definitions An array of `ja.wiktionary.org` word definitions
 * @param dictWord The converted `JMdict` entry
 * @param noteTypeName The Anki note type name
 * @param deckPath The full Anki deck path
 * @returns The transformed {@link Word} object
 */
export function getWord(
  dict?: DictWord[],
  id?: string,
  kanjiDic?: DictKanji[],
  examples?: TanakaExample[],
  definitions?: WordDefinitionPair[],
  dictWord?: DictWord,
  noteTypeName?: string,
  deckPath?: string,
): Word {
  try {
    if (!dictWord && id && dict)
      dictWord = dict.find((entry) => entry.id === id);

    if (dictWord) {
      const word: Word = {
        id: dictWord.id,
        readings: [],
        translations: [],
        noteID: `word_${dictWord.id}`,
        ...(noteTypeName ? { noteTypeName: noteTypeName } : {}),
        ...(deckPath ? { deckPath: deckPath } : {}),
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
                      undefined,
                      word.tags!,
                      false,
                      note,
                    );

                    return capitalizeString(noteAndTag.note ?? note);
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
                        undefined,
                        word.tags!,
                        false,
                        note,
                      );

                      return capitalizeString(noteAndTag.note ?? note);
                    })
                  : []),
              ],
            }
          : {}),
        ...(dictReading.commonness && dictReading.commonness.length > 0
          ? { common: true }
          : {}),
      }));

      word.translations = dictWord.meanings.map((dictMeaning: DictMeaning) => {
        if (!dictMeaning.translations)
          throw new Error(`No translations for ${dictWord!.id}`);

        const translationTypes: string[] = [];
        const translations: string[] = dictMeaning.translations.map(
          (
            translation:
              | string
              | { translation: string; type: "lit" | "expl" | "tm" },
          ) => {
            if (typeof translation === "string") return translation;
            else {
              if (translation.type === "lit") {
                translationTypes.push("Literal meaning");
                word.tags!.push("word::literal_meaning");
              } else if (translation.type === "expl") {
                translationTypes.push("Explanation");
                word.tags!.push("word::explanation");
              } else if (translation.type === "tm") {
                translationTypes.push("Trademark");
                word.tags!.push("word::trademark");
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
        wordAddNoteArray(
          dictMeaning.readingRestrictions,
          (restriction: string) =>
            notes.push(`Meaning restricted to ${restriction}`),
        );
        for (const t of translationTypes) notes.push(t);
        wordAddNoteArray(dictMeaning.partOfSpeech, (pos: string) =>
          lookupWordNote(pos, notes, word.tags!, true),
        );
        wordAddNoteArray(dictMeaning.fields, (field: string) =>
          lookupWordNote(field, notes, word.tags!, false, field),
        );
        wordAddNoteArray(dictMeaning.dialects, (dialect: string) =>
          lookupWordNote(dialect, notes, word.tags!, true),
        );
        wordAddNoteArray(dictMeaning.antonyms, (antonym: string) =>
          notes.push(`Antonym: ${antonym}`),
        );
        wordAddNoteArray(dictMeaning.references, (reference: string) =>
          notes.push(`Related: ${reference}`),
        );
        wordAddNoteArray(dictMeaning.info, (info: string) =>
          lookupWordNote(info, notes, word.tags!, false, info),
        );
        wordAddNoteArray(dictMeaning.misc, (misc: string) =>
          lookupWordNote(misc, notes, word.tags!, false, misc),
        );

        for (let i: number = 0; i < notes.length; i++)
          notes[i] = capitalizeString(notes[i]!);

        return {
          translation: translations.join("; "),
          notes: notes,
        };
      });

      if (dictWord.usuallyInKana === true) {
        word.usuallyInKana = true;
        word.tags!.push("word::usually_in_kana_for_all_senses");
      }

      if (kanjiDic && word.kanjiForms) {
        word.kanji = [];

        for (const kanjiForm of word.kanjiForms)
          for (const char of kanjiForm.kanjiForm) {
            if (word.kanji.some((kanji: Kanji) => kanji.kanji === char))
              continue;

            const dictKanji: DictKanji | undefined = kanjiDic.find(
              (kanji: DictKanji) => kanji.kanji === char,
            );

            if (dictKanji) {
              const kanjiObj: Kanji = getKanji(kanjiDic, undefined, dictKanji);

              word.kanji.push({
                kanji: kanjiObj.kanji,
                ...(kanjiObj.meanings ? { meanings: kanjiObj.meanings } : {}),
              });
            }
          }

        if (word.kanji.length === 0) {
          delete word.kanji;
          word.tags!.push("word::no_kanji");
        }
      }

      if (dictWord.hasPhrases === true && examples) {
        const readings: Set<string> = new Set<string>(
          word.readings
            .filter(
              (reading: Reading) =>
                (reading.notes === undefined ||
                  !reading.notes.some((note: string) =>
                    notSearchedForms.has(note),
                  )) &&
                (word.common === undefined || reading.common === true),
            )
            .map((reading: Reading) => reading.reading),
        );

        const existValidKf: boolean | undefined =
          word.kanjiForms && word.kanjiForms.length > 0
            ? word.kanjiForms.some(
                (kf: KanjiForm) =>
                  (kf.notes === undefined ||
                    !kf.notes.some((note: string) =>
                      notSearchedForms.has(note),
                    )) &&
                  (word.common === undefined || kf.common === true),
              )
            : undefined;

        const kanjiForms: Set<string> | undefined =
          word.kanjiForms && word.kanjiForms.length > 0
            ? new Set<string>(
                word.kanjiForms
                  .filter((kanjiForm: KanjiForm) => {
                    if (existValidKf === true)
                      return (
                        (kanjiForm.notes === undefined ||
                          !kanjiForm.notes.some((note: string) =>
                            notSearchedForms.has(note),
                          )) &&
                        (word.common === undefined || kanjiForm.common === true)
                      );
                    else return true;
                  })
                  .map((kanjiForm: KanjiForm) => kanjiForm.kanjiForm),
              )
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

        for (const example of examples)
          for (let i: number = 0; i < example.parts.length; i++) {
            const part: ExamplePart = example.parts[i]!;

            const readingAsReadingMatch: boolean =
              part.reading !== undefined && readings.has(part.reading);
            const readingAsInflectedFormMatch: boolean =
              part.inflectedForm !== undefined &&
              readings.has(part.inflectedForm);

            const referenceIDMatch: boolean =
              part.referenceID !== undefined &&
              word.id !== undefined &&
              part.referenceID === word.id;

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
            : []),
          ...(!includeKanjiFormExamples ? readingExamples : []),
        ];

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

          if (glossSpecificExamples.length === 5) break;
        }

        if (glossSpecificExamples.length === 5)
          wordExamples = [...glossSpecificExamples];
        else if (glossSpecificExamples.length > 0)
          wordExamples = [
            ...glossSpecificExamples,
            ...wordExamples
              .filter(
                (ex: { ex: TanakaExample; partIndex: number }) =>
                  !seenPhrases.has(ex.ex.phrase),
              )
              .slice(0, 5 - glossSpecificExamples.length),
          ];

        if (wordExamples.length > 0) {
          word.phrases = (
            wordExamples.length > 5 ? wordExamples.slice(0, 5) : wordExamples
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
        const pair: WordDefinitionPair | undefined = definitions.find(
          (wdp: WordDefinitionPair) => wdp.wordID === word.id!,
        );

        if (pair) word.definitions = pair.definitions;
      }

      return word;
    } else throw new Error(`Word${id ? ` ${id}` : ""} not found`);
  } catch (err: unknown) {
    throw err;
  }
}

/**
 * Transforms a converted `KANJIDIC` entry into a more readable format
 * @param dict An array of converted `KANJIDIC` entries
 * @param kanjiChar The kanji character
 * @param dictKanji A {@link DictKanji} object
 * @param jmDict An array of converted `JMdict` entries
 * @param svgList An array of SVG file names
 * @param noteTypeName The Anki note type name
 * @param deckPath The full Anki deck path
 * @returns The transformed {@link Kanji} object
 */
export function getKanji(
  dict: DictKanji[],
  kanjiChar?: string,
  dictKanji?: DictKanji,
  jmDict?: DictWord[],
  svgList?: string[],
  noteTypeName?: string,
  deckPath?: string,
): Kanji {
  try {
    if (!dictKanji && kanjiChar)
      dictKanji = dict.find((entry: DictKanji) => entry.kanji === kanjiChar);

    if (dictKanji) {
      const kanji: Kanji = {
        kanji: dictKanji.kanji,
        ...(dictKanji.misc ? { strokes: dictKanji.misc.strokeNumber } : {}),
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
      };

      if (dictKanji.readingMeaning) {
        kanji.meanings = [];
        kanji.nanori = [];
        kanji.onyomi = [];
        kanji.kunyomi = [];

        for (const rm of dictKanji.readingMeaning) {
          if (rm.nanori && rm.nanori.length > 0)
            kanji.nanori.push(...rm.nanori);

          for (const group of rm.groups) {
            kanji.onyomi.push(
              ...group.readings
                .filter((reading: DictKanjiReading) => reading.type === "ja_on")
                .map((reading: DictKanjiReading) => reading.reading),
            );
            kanji.kunyomi.push(
              ...group.readings
                .filter(
                  (reading: DictKanjiReading) => reading.type === "ja_kun",
                )
                .map((reading: DictKanjiReading) => reading.reading),
            );

            kanji.meanings.push(...group.meanings);
          }
        }

        if (kanji.meanings && kanji.meanings.length === 0)
          delete kanji.meanings;
        if (kanji.nanori && kanji.nanori.length === 0) delete kanji.nanori;
        if (kanji.onyomi && kanji.onyomi.length === 0) delete kanji.onyomi;
        if (kanji.kunyomi && kanji.kunyomi.length === 0) delete kanji.kunyomi;
      }

      if (jmDict) {
        let kanjiWords: DictWord[] | Word[] = jmDict.filter(
          (word: DictWord) =>
            word.kanjiForms && word.kanjiForms[0]!.form.includes(kanji.kanji),
        );

        if (kanjiWords.length > 3) kanjiWords = kanjiWords.slice(0, 2);

        if (kanjiWords.length > 0)
          kanji.words = kanjiWords.map((word: DictWord) => {
            const wordObj: Word = getWord(
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              word,
              undefined,
            );

            if (!wordObj.translations)
              throw new Error(`Invalid word: ${word.id}`);

            const kanjiForm: KanjiForm = wordObj.kanjiForms![0]!;
            let reading: Reading | undefined = wordObj.readings.find(
              (reading: Reading) =>
                reading.notes &&
                reading.notes.some(
                  (note: string) =>
                    note.toLowerCase().startsWith("reading restricted to ") &&
                    note.endsWith(kanjiForm.kanjiForm),
                ),
            );
            let translation: Translation | undefined =
              wordObj.translations.find(
                (translation: Translation) =>
                  translation.notes &&
                  translation.notes.some(
                    (note: string) =>
                      note.toLowerCase().startsWith("meaning restricted to ") &&
                      (note.endsWith(kanjiForm.kanjiForm) ||
                        (reading && note.endsWith(reading.reading))),
                  ),
              );

            if (!reading) reading = wordObj.readings[0]!;
            if (!translation) translation = wordObj.translations[0]!;

            return {
              kanjiForms: [kanjiForm],
              readings: [reading],
              translations: [translation],
            };
          });

        if (kanjiWords.length !== 3) {
          const wordNumber: number = 3 - kanjiWords.length;

          kanjiWords = jmDict
            .filter(
              (word: DictWord) =>
                word.kanjiForms &&
                word.kanjiForms.some((kanjiForm: DictKanjiForm) =>
                  kanjiForm.form.includes(kanji.kanji),
                ),
            )
            .map((word: DictWord) => {
              const wordObj: Word = getWord(
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                word,
                undefined,
              );

              if (!wordObj.translations)
                throw new Error(`Invalid word: ${word.id}`);

              const kanjiForm: KanjiForm | undefined = wordObj.kanjiForms!.find(
                (kanjiForm: KanjiForm) =>
                  kanjiForm.kanjiForm.includes(kanji.kanji),
              );
              if (!kanjiForm) throw new Error("Invalid kanji form");

              let reading: Reading | undefined = wordObj.readings.find(
                (reading: Reading) =>
                  reading.notes &&
                  reading.notes.some(
                    (note: string) =>
                      note.toLowerCase().startsWith("reading restricted to ") &&
                      note.endsWith(kanjiForm.kanjiForm),
                  ),
              );
              let translation: Translation | undefined =
                wordObj.translations.find(
                  (translation: Translation) =>
                    translation.notes &&
                    translation.notes.some(
                      (note: string) =>
                        note
                          .toLowerCase()
                          .startsWith("meaning restricted to ") &&
                        (note.endsWith(kanjiForm.kanjiForm) ||
                          (reading && note.endsWith(reading.reading))),
                    ),
                );

              if (!reading) reading = wordObj.readings[0]!;
              if (!translation) translation = wordObj.translations[0]!;

              return {
                kanjiForms: [kanjiForm],
                readings: [reading],
                translations: [translation],
              };
            });

          if (kanjiWords.length > wordNumber)
            kanjiWords = kanjiWords.slice(0, wordNumber - 1);

          if (kanjiWords.length > 0)
            if (kanji.words) kanji.words.push(...kanjiWords);
            else kanji.words = kanjiWords;
        }
      }

      if (svgList) {
        let codePoint: number | string | undefined = kanji.kanji.codePointAt(0);

        if (codePoint !== undefined) {
          codePoint = codePoint.toString(16);

          const fileNames: [string, string] = [
            `0${codePoint}.svg`,
            `${codePoint}.svg`,
          ];

          const svg: string | undefined = svgList.find((svgFile: string) =>
            fileNames.includes(svgFile.toLowerCase()),
          );

          if (svg) kanji.svg = svg;
        }
      }

      kanji.tags = [];

      if (dictKanji.isKokuji === true) {
        kanji.kokuji = true;
        kanji.tags.push("kanji::kokuji");

        if (kanji.meanings)
          kanji.meanings.splice(
            kanji.meanings.findIndex(
              (meaning: string) => meaning === "(kokuji)",
            ),
            1,
          );
      }

      kanji.tags.push(
        `kanji::strokes::${kanji.strokes ?? "unknown"}`,
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
    } else
      throw new Error(`Kanji not found${kanjiChar ? `: ${kanjiChar}` : ""}`);
  } catch (err: unknown) {
    throw err;
  }
}

/**
 * Same as {@link getKanji}, but with possible extra info.
 * @param info Additional info for the kanji (mnemonic, components, words)
 * @param dict An array of converted `KANJIDIC` entries
 * @param kanjiChar The kanji character
 * @param dictKanji A {@link DictKanji} object
 * @param useWords Whether or not to use the words provided in the `info` object (if present) instead of other words from `JMdict`
 * @param jmDict An array of converted `JMdict` entries
 * @param svgList An array of SVG file names
 * @param noteTypeName The Anki note type name
 * @param deckPath The full Anki deck path
 * @returns The transformed {@link Kanji} object
 */
export function getKanjiExtended(
  info: Kanji,
  dict: DictKanji[],
  kanjiChar?: string,
  dictKanji?: DictKanji,
  useWords?: true,
  jmDict?: DictWord[],
  svgList?: string[],
  noteTypeName?: string,
  deckPath?: string,
): Kanji {
  try {
    const kanji: Kanji = getKanji(
      dict,
      kanjiChar,
      dictKanji,
      jmDict,
      svgList,
      noteTypeName,
      deckPath,
    );

    if (info.components && info.components.length > 0)
      kanji.components = info.components;
    if (info.mnemonic && info.mnemonic.length > 0)
      kanji.mnemonic = info.mnemonic;
    if (useWords === true && info.words && info.words.length > 0)
      kanji.words = info.words;

    if (kanji.tags) {
      kanji.tags.push(`kanji::components::${kanji.components?.length ?? 0}`);

      if (kanji.mnemonic && kanji.mnemonic.length > 0)
        kanji.tags.push("kanji::has_mnemonic");

      if (useWords === true && kanji.words)
        if (
          !kanji.tags.some((tag: string, index: number) => {
            if (tag.startsWith("kanji::words::")) {
              kanji.tags!.splice(
                index,
                1,
                `kanji::words::${kanji.words?.length ?? 0}`,
              );
              return true;
            } else return false;
          })
        )
          kanji.tags.push(`kanji::words::${kanji.words?.length ?? 0}`);
    }

    if (
      info.fromJpdb === true &&
      (kanji.mnemonic || kanji.components || (kanji.words && useWords === true))
    )
      kanji.source = `https://jpdb.io/kanji/${kanji.kanji}`;

    return kanji;
  } catch (err: unknown) {
    throw err;
  }
}

/**
 * Synthesizes text to speech audio using {@link https://aws.amazon.com/polly/ | Amazon Polly}.
 * @param client An Amazon Polly Client instance
 * @param input The input in SSML format or plain text (adjust `TextType` property in `options`)
 * @param options Speech generation settings
 * @returns A promise resolving with an audio stream buffer or with `null` if the generation failed
 */
export async function synthesizeSpeech(
  client: PollyClient,
  input: string,
  options: Omit<SynthesizeSpeechCommandInput, "Text">,
): Promise<Buffer<ArrayBuffer> | null> {
  return await new Promise<Buffer<ArrayBuffer> | null>(
    async (
      resolve: (
        value:
          | Buffer<ArrayBuffer>
          | null
          | PromiseLike<Buffer<ArrayBuffer> | null>,
      ) => void,
      reject: (reason?: any) => void,
    ) => {
      try {
        const command: SynthesizeSpeechCommand = new SynthesizeSpeechCommand({
          Text: input,
          ...options,
        });
        const response: SynthesizeSpeechCommandOutput =
          await client.send(command);
        const stream: Buffer<ArrayBuffer> | null = response.AudioStream
          ? Buffer.from(await response.AudioStream.transformToByteArray())
          : null;

        resolve(stream);
      } catch (err: unknown) {
        reject(err);
      }
    },
  );
}

export function isWord(entry: Result): entry is Word {
  return (
    (entry as Word).translations !== undefined &&
    (entry as Word).readings !== undefined
  );
}

export function isRadical(entry: Result): entry is Radical {
  return (
    (entry as Radical).radical !== undefined &&
    (entry as Radical).reading !== undefined &&
    (entry as Radical).meanings !== undefined
  );
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
  return (
    (entry as Kana).kana !== undefined && (entry as Kana).reading !== undefined
  );
}

export function isGrammar(entry: Result): entry is Grammar {
  return (
    (entry as Grammar).point !== undefined &&
    (entry as Grammar).meaning !== undefined
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
  `<div class="entry${glossSpecific ? " gloss-specific" : ""}">${entry}${notes && notes.length > 0 ? createNotes(notes, phrase) : ""}</div>`;
const noKanjiForms: string =
  '<span class="word word-kanjiform">(no kanji forms)</span>';

/**
 * Generates an array where each field holds an entry’s info wrapped in HTML tags.
 * @param entry Any type of mapped entry ({@link Word}, {@link Kanji}, {@link Radical}, {@link Kana}, {@link Grammar})
 * @returns An array of fields, each corresponding to an Anki note type field
 */
export function generateAnkiNote(entry: Result): string[] {
  if (!entry.noteID) throw new Error("Invalid note ID");

  const fields: string[] = [];

  if (isWord(entry)) {
    if (!entry.translations || entry.readings.length === 0)
      throw new Error(`Invalid word: ${entry.noteID}`);

    const firstReading: string = createEntry(
      `<span class="word word-reading">${entry.readings[0]!.reading}${entry.readings[0]!.audio !== undefined ? `<br>[sound:${entry.readings[0]!.audio}]` : ""}</span>`,
      entry.readings[0]!.notes,
    );
    const otherReadings: string | undefined =
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
        : undefined;
    const readingsField: string = [firstReading, ...(otherReadings ?? [])].join(
      "",
    );

    const firstKanjiForm: string | undefined = entry.kanjiForms
      ? createEntry(
          `<span class="word word-kanjiform"><ruby><rb>${entry.kanjiForms[0]!.kanjiForm}</rb><rt>${entry.readings[0]!.reading}</rt></ruby></span>`,
          entry.kanjiForms[0]!.notes,
        )
      : undefined;
    const otherKanjiForms: string | undefined =
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
        : undefined;

    const kanjiFormsField: string | undefined = firstKanjiForm
      ? [firstKanjiForm, ...(otherKanjiForms ?? [])].join("")
      : undefined;

    const firstThreeTranslations: string = entry.translations
      .slice(0, 3)
      .map(
        (translationEntry: Translation, index: number) =>
          `${createEntry(`<span class="word word-translation">${translationEntry.translation}</span>`, translationEntry.notes, undefined, entry.phrases && entry.phrases.some((phrase: Phrase, index2: number) => index === index2 && phrase.glossNumber && phrase.glossNumber.wordId === entry.id && phrase.glossNumber.glossNumber === index + 1) ? true : undefined)}`,
      )
      .join("");

    const otherTranslations: string | undefined =
      entry.translations.length > 3
        ? `<details><summary>Show other translations</summary>${entry.translations
            .map((translationEntry: Translation, index: number) =>
              index > 2
                ? `${createEntry(`<span class="word word-translation">${translationEntry.translation}</span>`, translationEntry.notes, undefined, entry.phrases && entry.phrases.some((phrase: Phrase, index2: number) => index === index2 && phrase.glossNumber && phrase.glossNumber.wordId === entry.id && phrase.glossNumber.glossNumber === index + 1) ? true : undefined)}`
                : "null",
            )
            .filter((translation: string) => translation !== "null")
            .join("")}</details>`
        : undefined;

    const translationsField: string = [
      firstThreeTranslations,
      ...(otherTranslations ?? []),
    ].join("");

    fields.push(
      ...(entry.kanjiForms && kanjiFormsField && !entry.usuallyInKana
        ? [kanjiFormsField, readingsField]
        : [
            readingsField,
            entry.kanjiForms && kanjiFormsField
              ? kanjiFormsField
              : noKanjiForms,
          ]),
      translationsField,
      entry.phrases
        ? entry.phrases
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
            .join("")
        : '<span class="word word-phrase">(no phrases) (Search on dictionaries!)</span>',
      entry.definitions
        ? entry.definitions
            .map((definitionEntry: Definition) =>
              createEntry(
                `<span class="word word-definition${definitionEntry.mayNotBeAccurate === true ? " mnba" : ""}>"<span class="word word-definition-original">${definitionEntry.definition}</span><span class="word word-definition-furigana">${definitionEntry.furigana ?? definitionEntry.definition}</span></span>`,
              ),
            )
            .join("")
        : '<span class="word word-definition">(no definitions)</span>',
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
        : '<span class="kanji kanji-source">(no sources)</span>',
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
        : `<span class="kanji kanji-onyomi">(no onyomi) ${entry.kokuji === true ? "(kokuji)" : ""}</span`,
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
            .filter(
              (word: Word) => word.translations && word.translations.length > 0,
            )
            .map((word: Word) =>
              createEntry(
                `<span class="kanji kanji-words">${word.kanjiForms && word.kanjiForms.length > 0 ? word.kanjiForms[0]!.kanjiForm : "(no kanji form)"} / ${word.readings[0]!.reading} - ${word.translations![0]!.translation}</span>`,
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

  if (fields.length > 0)
    return fields.map((field: string) => field.replaceAll("\n", "<br>"));
  else throw new Error("Invalid entry");
}

/**
 * Generates an Anki notes file with each entry’s info organized into fields, either in HTML or plain text.
 * @param list An array containing any type of transformed entries ({@link Word}, {@link Kanji}, {@link Radical}, {@link Kana}, {@link Grammar})
 * @returns The resulting Anki notes file's content
 */
export function generateAnkiNotesFile(list: Result[]): string {
  if (list.length > 0) {
    const headers: string[] = [
      "#separator:tab",
      "#html:true",
      "#guid column:1",
      "#notetype column:2",
      "#deck column:3",
    ];

    const ankiNotes: string = list
      .filter((result: Result) => result.doNotCreateNote === undefined)
      .map((result: Result) => {
        if (!result.noteID || !result.noteTypeName || !result.deckPath)
          throw new Error("Invalid result");

        const note: string[] = generateAnkiNote(result);
        if (headers.length === 5)
          headers.push(`#tags column:${note.length + 3}\n`);

        return `${result.noteID}\t${result.noteTypeName}\t${result.deckPath}\t${note.join("\t")}`;
      })
      .join("\n")
      .trim();

    if (ankiNotes.length === 0) throw new Error("Invalid list");

    return `${headers.join("\n")}\n${ankiNotes}`;
  } else throw new Error("No entries available for Anki notes creation");
}
