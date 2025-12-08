import { describe, it, expect, beforeAll, afterAll } from "vitest";
import loadDict from "./utils/loadDict";
import {
  Definition,
  DictKanji,
  DictKanjiForm,
  DictReading,
  DictWord,
  WordDefinitionPair,
} from "../src/types";
import {
  convertJawiktionary,
  convertJMdict,
  convertKanjiDic,
  getWordDefinitions,
  shuffleArray,
} from "../src/utils";
import { createReadStream, promises } from "fs";
import path from "path";

let convertedJmdict: DictWord[];
let convertedKanjiDic: DictKanji[];
let wordDefs: WordDefinitionPair[];

const jawiktionaryTemp: string = path.resolve(
  `./test/files/jawiktionary_${crypto.randomUUID()}.jsonl`,
);

beforeAll(async () => {
  const jmdict: string = (await loadDict("JMdict_e")) as string;
  const kanjiDic: string = (await loadDict("kanjidic2.xml")) as string;
  const jaWiktionary: Buffer<ArrayBuffer> = (await loadDict(
    "raw-wiktextract-data",
  )) as Buffer<ArrayBuffer>;
  wordDefs = (await loadDict("word_defs.json")) as WordDefinitionPair[];

  await promises.writeFile(jawiktionaryTemp, jaWiktionary, "utf-8");

  const defsForTesting: Set<string> = new Set<string>();

  for (const pair of wordDefs)
    if (
      !defsForTesting.has(pair.wordID) &&
      pair.definitions.some((def: Definition) => def.mayNotBeAccurate === true)
    )
      defsForTesting.add(pair.wordID);

  convertedJmdict = shuffleArray<DictWord>(convertJMdict(jmdict));

  convertedJmdict = [
    ...convertedJmdict.filter((entry: DictWord) =>
      defsForTesting.has(entry.id),
    ),
    ...convertedJmdict
      .filter(
        (entry: DictWord) =>
          !defsForTesting.has(entry.id) &&
          entry.isCommon === true &&
          ((entry.kanjiForms &&
            entry.kanjiForms.some(
              (kf: DictKanjiForm) => kf.commonness !== undefined,
            )) ||
            (entry.kanjiForms === undefined &&
              entry.readings.some(
                (r: DictReading) => r.commonness !== undefined,
              ))),
      )
      .slice(0, 301),
  ];

  convertedKanjiDic = convertKanjiDic(kanjiDic).filter((kanji: DictKanji) =>
    convertedJmdict.some(
      (word: DictWord) =>
        word.kanjiForms &&
        word.kanjiForms.some((kf: DictKanjiForm) =>
          kf.form.includes(kanji.kanji),
        ),
    ),
  );
});

afterAll(async () => {
  convertedJmdict.length = 0;
  convertedKanjiDic.length = 0;
  wordDefs.length = 0;

  await promises.rm(jawiktionaryTemp, { force: true });
});

describe("Jawiktionary conversion", () => {
  it("conversion", async () => {
    const entries: any[] = await convertJawiktionary(
      createReadStream(jawiktionaryTemp, "utf-8"),
    );

    expect(entries.length).toBeGreaterThan(0);
    expect(
      entries.every(
        (entry: any) =>
          entry !== undefined &&
          entry !== null &&
          typeof entry === "object" &&
          entry.lang_code === "ja" &&
          entry.lang === "日本語",
      ),
    ).toBeTruthy();

    entries.length = 0;
  });

  it("conversion with word pairing", async () => {
    const entries: any[] | null = await convertJawiktionary(
      createReadStream(jawiktionaryTemp, "utf-8"),
    );

    expect(entries.length).toBeGreaterThan(0);
    expect(
      entries.every(
        (entry: any) =>
          entry !== undefined &&
          entry !== null &&
          typeof entry === "object" &&
          entry.lang_code === "ja" &&
          entry.lang === "日本語",
      ),
    ).toBeTruthy();

    const pairs: WordDefinitionPair[] | null = await getWordDefinitions(
      entries,
      convertedJmdict,
      convertedKanjiDic,
      true,
    );

    entries.length = 0;

    expect(pairs.length).toBeGreaterThan(0);
    expect(
      pairs.every(
        (pair: WordDefinitionPair) =>
          pair.wordID != undefined &&
          pair.wordID.length > 0 &&
          Number.isSafeInteger(Number.parseInt(pair.wordID)) &&
          pair.definitions != undefined &&
          pair.definitions.length > 0 &&
          pair.definitions.every(
            (def: Definition) =>
              typeof def.definition === "string" && def.definition.length > 0,
          ),
      ),
    ).toBeTruthy();
    expect(
      pairs.some((pair: WordDefinitionPair) =>
        pair.definitions.some(
          (def: Definition) => def.mayNotBeAccurate === true,
        ),
      ),
    ).toBeTruthy();
    expect(
      pairs.some((pair: WordDefinitionPair) =>
        pair.definitions.some(
          (def: Definition) =>
            def.furigana !== undefined && def.furigana.length > 0,
        ),
      ),
    ).toBeTruthy();

    pairs.length = 0;
  });
});
