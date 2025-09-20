import libxml from "libxmljs2";
import xml from "xml2js";
import iconv from "iconv-lite";
import {
  noteMap,
  notSearchedForms,
  numberMap,
  regexps,
  romajiMap,
  symbolMap,
} from "./constants";
import {
  PollyClient,
  SynthesizeSpeechCommand,
  SynthesizeSpeechCommandInput,
  SynthesizeSpeechCommandOutput,
} from "@aws-sdk/client-polly";
import {
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
  Kana,
  Kanji,
  KanjiComponent,
  KanjiForm,
  Phrase,
  Radical,
  Reading,
  Result,
  TanakaExample,
  Translation,
  Word,
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
 * Converts a JMdict `JMdict_e.xml`/`JMdict_e` file into an array of {@link DictWord} objects.
 * @param xmlString The raw `JMdict_e.xml`/`JMdict_e` file contents
 * @returns An array of converted {@link DictWord} objects
 */
export function convertJMdict(xmlString: string): DictWord[] {
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
              if (isStringArray(kanjiForm.ke_pri))
                form.commonness = kanjiForm.ke_pri;

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
              if (isStringArray(reading.re_pri))
                readingObj.commonness = reading.re_pri;
              if (isStringArray(reading.re_restr))
                readingObj.kanjiFormRestrictions = reading.re_restr;

              if (readingObj.reading.length > 0)
                entryObj.readings.push(readingObj);
            }

          if (isValidArray(meanings))
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
              if (isStringArray(meaning.misc)) meaningObj.misc = meaning.misc;
              if (isStringArray(meaning.dial))
                meaningObj.dialects = meaning.dial;

              if (
                (meaningObj.partOfSpeech &&
                  meaningObj.partOfSpeech.length > 0) ||
                (meaningObj.translations && meaningObj.translations.length > 0)
              )
                entryObj.meanings.push(meaningObj);
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
              typeof misc.jlpt[0] === "string"
            )
              kanjiObj.misc.jlpt = misc.jlpt[0];
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
                      if (typeof meaning === "string")
                        groupObj.meanings.push(meaning);

                  if (
                    groupObj.readings.length > 0 ||
                    groupObj.meanings.length > 0
                  )
                    rmObj.groups.push(groupObj);
                }

              if (isStringArray(rm.nanori)) rmObj.nanori = rm.nanori;

              if (rmObj.groups.length > 0) kanjiObj.readingMeaning.push(rmObj);
            }

          if (kanjiObj.kanji.length > 0) dict.push(kanjiObj);
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
 * @param generateFurigana Whether or not to generate furigana for the phrase
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
            a = a.replace("A: ", "").replace(regexps.tanakaID, "");
            b = b.replace("B: ", "");

            const aParts: string[] = a.split("\t");
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
                    if (!referenceID)
                      throw new Error(`Invalid reference ID: ${reading}`);

                    examplePart.referenceID = referenceID[0];
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
                phrase: phrase,
                translation: translation,
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
 * Converts a `radkfile2` file into an array of {@link DictRadical} objects.
 * @param radkBuffer A raw `radkfile2` buffer
 * @param kanjiDic An array of converted `KANJIDIC` entries
 * @returns An array of converted {@link DictRadical} objects
 */
export function convertRadkFile(
  radkBuffer: NonSharedBuffer,
  kanjiDic: DictKanji[],
): DictRadical[] {
  try {
    const fileParsed: string[] = iconv
      .decode(radkBuffer, "euc-jp")
      .split("\n")
      .filter((line: string) => !line.startsWith("#"));
    const radicals: DictRadical[] = [];

    for (let i = 0; i <= fileParsed.length; i++) {
      const line: string | undefined = fileParsed[i];
      if (!line) continue;

      if (line.startsWith("$ ")) {
        const radical: DictRadical = {
          radical: line.charAt(2),
          kanji: [],
          strokes: line.substring(4),
        };

        let j: number = i + 1;
        let kanjiLine: string | undefined = fileParsed[j];
        if (!kanjiLine) continue;

        while (kanjiLine && !kanjiLine.startsWith("$ ")) {
          const kanjis: string[] = kanjiLine.split("");

          for (const kanji of kanjis) {
            const foundKanji: DictKanji | undefined = kanjiDic.find(
              (dictKanji: DictKanji) => dictKanji.kanji === kanji,
            );
            if (!foundKanji) throw new Error("Kanji not found");

            radical.kanji.push(foundKanji);
          }

          j++;
          kanjiLine = fileParsed[j];
          if (!kanjiLine) continue;

          if (kanjiLine.startsWith("$ ")) i = j - 1;
        }

        if (
          radical.radical.length > 0 &&
          radical.strokes.length > 0 &&
          radical.kanji.length > 0
        )
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
 * Converts a `kradfile2` file into an array of {@link DictKanjiWithRadicals} objects.
 * @param kradBuffer A raw `kradfile2` buffer
 * @param kanjiDic An array of converted `KANJIDIC` entries
 * @param katakanaList An array of katakana {@link Kana} objects
 * @returns An array of converted {@link DictKanjiWithRadicals} objects
 */
export function convertKradFile(
  kradBuffer: NonSharedBuffer,
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

      if (!kanjiChar || !radicalsRow) throw new Error("Invalid KRAD entry");

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

function lookupWordNote(
  key: string,
  notes: string[],
  tags: string[],
  required?: boolean,
  fallback?: string,
) {
  const info: readonly [string, string] | undefined = noteMap.get(
    key.toLowerCase(),
  );

  if (!info) {
    if (required) throw new Error(`Invalid note info for ${key}`);
    notes.push(fallback ?? key);
    return;
  }

  tags.push(info[0]);
  notes.push(info[1]);
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
      };

      if (dictWord.kanjiForms)
        word.kanjiForms = dictWord.kanjiForms.map(
          (dictKanjiForm: DictKanjiForm) => {
            if (
              dictKanjiForm.commonness &&
              dictKanjiForm.commonness.length > 0 &&
              word.common === undefined
            )
              word.common = true;

            return {
              kanjiForm: dictKanjiForm.form,
              ...(dictKanjiForm.notes
                ? {
                    notes: dictKanjiForm.notes.map((note: string) =>
                      capitalizeString(note),
                    ),
                  }
                : {}),
            };
          },
        );

      word.readings = dictWord.readings.map((dictReading: DictReading) => {
        if (
          dictReading.commonness &&
          dictReading.commonness.length > 0 &&
          word.common === undefined
        )
          word.common = true;

        return {
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
                    ? dictReading.notes.map((note: string) =>
                        capitalizeString(note),
                      )
                    : []),
                ],
              }
            : {}),
        };
      });

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
              if (translation.type === "lit")
                translationTypes.push("Literal meaning");
              else if (translation.type === "expl")
                translationTypes.push("Explanation");
              else if (translation.type === "tm")
                translationTypes.push("Trademark");

              return translation.translation;
            }
          },
        );

        const notes: string[] = [];
        word.tags = [];

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
              const kanjiObj: Kanji = getKanji(
                dictKanji.kanji,
                kanjiDic,
                undefined,
              );

              word.kanji.push({
                kanji: kanjiObj.kanji,
                ...(kanjiObj.meanings ? { meanings: kanjiObj.meanings } : {}),
              });
            }
          }

        if (word.kanji.length === 0) delete word.kanji;
      }

      if (examples) {
        const readings: Set<string> = new Set<string>(
          word.readings
            .filter(
              (reading: Reading) =>
                !reading.notes ||
                (reading.notes &&
                  !reading.notes.some((note: string) =>
                    notSearchedForms.has(note),
                  )),
            )
            .map((reading: Reading) => reading.reading),
        );
        const kanjiForms: Set<string> | undefined = word.kanjiForms
          ? new Set<string>(
              word.kanjiForms.map(
                (kanjiForm: KanjiForm) => kanjiForm.kanjiForm,
              ),
            )
          : undefined;

        const kanjiFormExamples: TanakaExample[] = [];
        const readingExamples: TanakaExample[] = [];

        if (kanjiForms)
          for (const example of examples)
            for (const part of example.parts)
              if (kanjiForms.has(part.baseForm))
                kanjiFormExamples.push(example);

        if (kanjiFormExamples.length === 0)
          for (const example of examples)
            for (const part of example.parts)
              if (readings.has(part.baseForm)) readingExamples.push(example);

        examples = [...kanjiFormExamples, ...readingExamples];

        if (word.translations) {
          const glossSpecificExamples: TanakaExample[] = [];

          for (let i: number = 0; i < word.translations.length; i++) {
            outer: for (const example of examples)
              for (const part of example.parts)
                if (part.glossNumber === i + 1) {
                  glossSpecificExamples.push(example);
                  break outer;
                }

            if (glossSpecificExamples.length === 5) break;
          }

          if (glossSpecificExamples.length === 5)
            examples = glossSpecificExamples;
          else if (glossSpecificExamples.length > 0) {
            const seenPhrases: Set<string> = new Set<string>(
              glossSpecificExamples.map((ex: TanakaExample) => ex.phrase),
            );

            examples = [
              ...glossSpecificExamples,
              ...examples
                .filter((ex: TanakaExample) => !seenPhrases.has(ex.phrase))
                .slice(0, 5 - glossSpecificExamples.length),
            ];
          }
        }

        word.phrases = (
          examples.length > 5 ? examples.slice(0, 5) : examples
        ).map((ex: TanakaExample) => ({
          phrase: ex.furigana ?? ex.phrase,
          translation: ex.translation,
          originalPhrase: ex.phrase,
        }));
      }

      return word;
    } else throw new Error(`Word${id ? ` ${id}` : ""} not found`);
  } catch (err: unknown) {
    throw err;
  }
}

/**
 * Transforms a converted `KANJIDIC` entry into a more readable format
 * @param kanjiChar The kanji character
 * @param dict An array of converted `KANJIDIC` entries
 * @param jmDict An array of converted `JMdict` entries
 * @param svgList An array of SVG file names
 * @param noteTypeName The Anki note type name
 * @param deckPath The full Anki deck path
 * @returns The transformed {@link Kanji} object
 */
export function getKanji(
  kanjiChar: string,
  dict: DictKanji[],
  jmDict?: DictWord[],
  svgList?: string[],
  noteTypeName?: string,
  deckPath?: string,
): Kanji {
  try {
    const dictKanji: DictKanji | undefined = dict.find(
      (entry: DictKanji) => entry.kanji === kanjiChar,
    );

    if (dictKanji) {
      const kanji: Kanji = {
        kanji: dictKanji.kanji,
        ...(dictKanji.misc ? { strokes: dictKanji.misc.strokeNumber } : {}),
        ...(dictKanji.misc && dictKanji.misc.grade
          ? { grade: dictKanji.misc.grade }
          : {}),
        ...(dictKanji.misc && dictKanji.misc.frequency
          ? { grade: dictKanji.misc.frequency }
          : {}),
        noteID: `kanji_${dictKanji.kanji}`,
        ...(noteTypeName ? { noteTypeName: noteTypeName } : {}),
        ...(deckPath ? { deckPath: deckPath } : {}),
      };

      for (const rm of dictKanji.readingMeaning) {
        if (rm.nanori && rm.nanori.length > 0) {
          if (kanji.nanori === undefined) kanji.nanori = [];
          kanji.nanori.push(...rm.nanori);
        }

        for (const group of rm.groups) {
          kanji.onyomi = group.readings
            .filter((reading: DictKanjiReading) => reading.type === "ja_on")
            .map((reading: DictKanjiReading) => reading.reading);
          kanji.kunyomi = group.readings
            .filter((reading: DictKanjiReading) => reading.type === "ja_kun")
            .map((reading: DictKanjiReading) => reading.reading);

          if (kanji.onyomi.length === 0) delete kanji.onyomi;
          if (kanji.kunyomi.length === 0) delete kanji.kunyomi;

          kanji.meanings = group.meanings;

          if (kanji.meanings.length === 0) delete kanji.meanings;
        }
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

          const svg: string | undefined = svgList.find(
            (svgFile: string) =>
              svgFile.toLowerCase() === `0${codePoint}.svg` ||
              svgFile.toLowerCase() === `${codePoint}.svg`,
          );

          if (svg) kanji.svg = svg;
        }
      }

      kanji.tags = [];

      if (
        kanji.meanings &&
        kanji.meanings.some((meaning: string) => meaning === "(kokuji)")
      ) {
        kanji.tags.push("kokuji");
        kanji.meanings = kanji.meanings.filter(
          (meaning: string) => meaning !== "(kokuji)",
        );
      }

      kanji.tags.push(
        ...(!kanji.onyomi ? ["no::onyomi"] : []),
        ...(!kanji.kunyomi ? ["no::kunyomi"] : []),
        ...(kanji.nanori ? ["has::nanori"] : []),
        ...(kanji.svg ? ["has::svg"] : []),
        ...(kanji.strokes && kanji.strokes.length > 0
          ? [`strokes::${kanji.strokes}`]
          : []),
        ...(kanji.words ? ["has::words"] : []),
      );

      return kanji;
    } else throw new Error(`Kanji ${kanjiChar} not found`);
  } catch (err: unknown) {
    throw err;
  }
}

/**
 * Same as {@link getKanji}, but with possible extra info.
 * @param kanjiChar The kanji character
 * @param info Additional info from `jpdb.io` for the kanji (mnemonic, components, words)
 * @param dict An array of converted `KANJIDIC` entries
 * @param useJpdbWords Whether or not to use the `jpdb.io` provided words (if present) instead of other words from `JMdict`
 * @param jmDict An array of converted `JMdict` entries
 * @param svgList An array of SVG file names
 * @param noteTypeName The Anki note type name
 * @param deckPath The full Anki deck path
 * @returns The transformed {@link Kanji} object
 */
export function getKanjiExtended(
  kanjiChar: string,
  info: Kanji,
  dict: DictKanji[],
  useJpdbWords?: true,
  jmDict?: DictWord[],
  svgList?: string[],
  noteTypeName?: string,
  deckPath?: string,
): Kanji {
  try {
    const kanji: Kanji = getKanji(
      kanjiChar,
      dict,
      jmDict,
      svgList,
      noteTypeName,
      deckPath,
    );

    if (info.components && info.components.length > 0)
      kanji.components = info.components;
    if (info.mnemonic && info.mnemonic.length > 0)
      kanji.mnemonic = info.mnemonic;
    if (useJpdbWords === true && info.words && info.words.length > 0)
      kanji.words = info.words;

    if (kanji.mnemonic && kanji.mnemonic.length > 0 && kanji.tags)
      kanji.tags.push("has::mnemonic");
    if (kanji.components && kanji.components.length > 0 && kanji.tags)
      kanji.tags.push(`components::${kanji.components.length}`);
    if (kanji.words && kanji.tags && !kanji.tags.includes("has::words"))
      kanji.tags.push("has::words");

    if (
      kanji.fromJpdb === true &&
      (kanji.mnemonic ||
        (kanji.components && kanji.components.length > 0) ||
        kanji.words)
    )
      kanji.source = `https://jpdb.io/kanji/${kanji.kanji}#a`;

    return kanji;
  } catch (err: unknown) {
    throw err;
  }
}

const getCharType: (
  char: string,
) => "kanji" | "hiragana" | "katakana" | "other" = (
  char: string,
): "kanji" | "hiragana" | "katakana" | "other" => {
  if (regexps.kanji.test(char)) return "kanji";
  if (regexps.hiragana.test(char)) return "hiragana";
  if (regexps.katakana.test(char)) return "katakana";
  return "other";
};

const splitByScript: (text: string) => string[] = (text: string): string[] =>
  text.match(regexps.scriptSplit) || [];

const convertToHiragana: (str: string) => string = (str: string): string =>
  str.replace(regexps.katakana, (c: string) =>
    String.fromCharCode(c.charCodeAt(0) - 0x60),
  );

const convertOtherToKatakana: (str: string) => string = (str: string): string =>
  str
    .split("")
    .map((c: string) => {
      if (romajiMap[c.toUpperCase()]) return romajiMap[c.toUpperCase()];
      if (numberMap[c]) return numberMap[c];
      if (symbolMap[c]) return symbolMap[c];
      return c;
    })
    .join("");

/**
 * Builds SSML text for Japanese words
 * @param formText The normal form of the word (usually kanji form)
 * @param fullReading The reading of the word (hiragana or katakana)
 * @returns The SSML text
 */
export function makeSSML(formText: string, fullReading: string): string {
  let ssml: string = "";

  const allTypes: ("kanji" | "hiragana" | "katakana" | "other")[] = Array.from(
    formText,
  ).map((c: string) => getCharType(c));
  const uniqueTypes: ("kanji" | "hiragana" | "katakana" | "other")[] =
    Array.from(new Set(allTypes));

  if (uniqueTypes.length === 1)
    switch (uniqueTypes[0]) {
      case "kanji":
        ssml = `<speak><phoneme alphabet="x-amazon-yomigana" ph="${fullReading}">${formText}</phoneme></speak>`;

        break;
      case "katakana":
        ssml = `<speak><phoneme alphabet="x-amazon-pron-kana" ph="${formText}">${formText}</phoneme></speak>`;

        break;
      case "hiragana":
      default:
        ssml = `<speak>${formText}</speak>`;
    }
  else {
    const segments: string[] = splitByScript(formText);
    let pureKanjiReading: string = convertToHiragana(fullReading);

    segments.forEach((seg: string) => {
      const type: "kanji" | "hiragana" | "katakana" | "other" = getCharType(
        seg[0]!,
      );

      if (type !== "kanji") {
        const converted: string =
          type === "other"
            ? convertToHiragana(convertOtherToKatakana(seg))
            : convertToHiragana(seg);

        pureKanjiReading = pureKanjiReading.replace(converted, "");
      }
    });

    const kanjiSegments: string[] = segments.filter(
      (seg: string) => getCharType(seg[0]!) === "kanji",
    );
    let readingPointer: number = 0;

    const ssmlSegments: string[] = segments.map((seg: string) => {
      const type: "kanji" | "hiragana" | "katakana" | "other" = getCharType(
        seg[0]!,
      );

      if (type === "kanji") {
        const expectedLength: number =
          pureKanjiReading.length / kanjiSegments.length;
        const allocated: string = pureKanjiReading.slice(
          readingPointer,
          readingPointer + Math.ceil(expectedLength),
        );

        readingPointer += allocated.length;

        return `<phoneme alphabet="x-amazon-yomigana" ph="${allocated}">${seg}</phoneme>`;
      } else if (type === "katakana")
        return `<phoneme alphabet="x-amazon-pron-kana" ph="${seg}">${seg}</phoneme>`;
      else if (type === "other") {
        const katakanaReading: string = convertOtherToKatakana(seg);

        return `<phoneme alphabet="x-amazon-pron-kana" ph="${katakanaReading}">${seg}</phoneme>`;
      } else return seg;
    });

    ssml = `<speak>${ssmlSegments.join("")}</speak>`;
  }

  return ssml;
}

/**
 * Synthesizes text to speech audio using {@link [Amazon Polly](https://aws.amazon.com/polly/)}.
 * @param client An Amazon Polly Client instance
 * @param ssmlText The text to be spoken, in SSML format
 * @param options Other speech generation settings
 * @returns A promise resolving with an audio stream buffer or with `null` if the generation failed
 */
export async function synthesizeSpeech(
  client: PollyClient,
  ssmlText: string,
  options: Omit<SynthesizeSpeechCommandInput, "Text" | "TextType">,
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
          Text: ssmlText,
          TextType: "ssml",
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
) => string = (entry: string, notes?: string[], phrase?: true) =>
  `<div class="entry">${entry}${notes && notes.length > 0 ? createNotes(notes, phrase) : ""}</div>`;
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
    if (!entry.translations) throw new Error(`Invalid word: ${entry.noteID}`);

    const usuallyInKana: boolean = entry.translations.every(
      (translation) =>
        translation.notes &&
        translation.notes.includes("Word usually written using kana alone"),
    );

    fields.push(
      ...(entry.kanjiForms && !usuallyInKana
        ? [
            entry.kanjiForms
              .map(
                (kanjiFormEntry: KanjiForm, index: number) =>
                  `${index > 0 ? "<details><summary>Show kanji form</summary>" : ""}${createEntry(`<span class="word word-kanjiform">${index === 0 ? "<ruby><rb>" : ""}${kanjiFormEntry.kanjiForm}${index === 0 ? `</rb><rt>${entry.readings[0]!.reading}</rt></ruby>` : ""}</span>`, kanjiFormEntry.notes)}${index > 0 ? "</details>" : ""}`,
              )
              .join(""),
            entry.readings
              .map(
                (readingEntry: Reading, index: number) =>
                  `${index > 0 ? "<details><summary>Show reading</summary>" : ""}${createEntry(`<span class="word word-reading">${readingEntry.reading}${readingEntry.audio !== undefined ? `<br>[sound:${readingEntry.audio}]` : ""}</span>`, readingEntry.notes)}${index > 0 ? "</details>" : ""}`,
              )
              .join(""),
          ]
        : [
            entry.readings
              .map(
                (readingEntry: Reading, index: number) =>
                  `${index > 0 ? "<details><summary>Show reading</summary>" : ""}${createEntry(`<span class="word word-reading">${readingEntry.reading}${readingEntry.audio !== undefined ? `<br>[sound:${readingEntry.audio}]` : ""}</span>`, readingEntry.notes)}${index > 0 ? "</details>" : ""}`,
              )
              .join(""),
            entry.kanjiForms
              ? entry.kanjiForms
                  .map(
                    (kanjiFormEntry: KanjiForm, index: number) =>
                      `${index > 0 ? "<details><summary>Show kanji form</summary>" : ""}${createEntry(`<span class="word word-kanjiform">${index === 0 ? "<ruby><rb>" : ""}${kanjiFormEntry.kanjiForm}${index === 0 ? `</rb><rt>${entry.readings[0]!.reading}</rt></ruby>` : ""}</span>`, kanjiFormEntry.notes)}${index > 0 ? "</details>" : ""}`,
                  )
                  .join("")
              : noKanjiForms,
          ]),
      entry.translations
        .map(
          (translationEntry: Translation, index: number) =>
            `${index > 2 ? "<details><summary>Show translation</summary>" : ""}${createEntry(`<span class="word word-translation">${translationEntry.translation}</span>`, translationEntry.notes)}${index > 2 ? "</details>" : ""}`,
        )
        .join(""),
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
      entry.phrases
        ? entry.phrases
            .map((phraseEntry: Phrase) =>
              createEntry(
                `<span class="word word-phrase"><span class="word word-phrase-original">${phraseEntry.originalPhrase}</span><span class="word word-phrase-furigana">${phraseEntry.phrase}</span></span>`,
                [phraseEntry.translation],
                true,
              ),
            )
            .join("")
        : '<span class="word word-phrase">(no phrases) (Search on dictionaries!)</span>',
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
        : '<span class="kanji kanji-onyomi">(no onyomi) (kokuji)</span>',
      entry.kunyomi
        ? entry.kunyomi
            .map((kunyomiEntry: string) =>
              createEntry(
                `<span class="kanji kanji-kunyomi">${kunyomiEntry}</span>`,
              ),
            )
            .join("")
        : '<span class="kanji kanji-kunyomi">(no kunyomi)</span>',
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
 * @returns The resulting Anki notes file's content or `undefined` if `list` is empty
 */
export function generateAnkiNotesFile(list: Result[]): string | undefined {
  if (list.length > 0) {
    const headers: string[] = [
      "#separator:tab\n",
      "#html:true\n",
      "#guid column:1\n",
      "#notetype column:2\n",
      "#deck column:3\n",
    ];

    const ankiNotes: string = list
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

    return `${headers.join("")}${ankiNotes}`;
  } else console.log("No entries available for Anki notes creation");

  return undefined;
}
