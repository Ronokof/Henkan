import { describe, it, expect, beforeAll, afterAll, inject } from "vitest";
import {
  Definition,
  DictWord,
  JaWiktionaryEntry,
  WordDefinitionPair,
} from "../src/types";
import {
  convertJawiktionaryAsync,
  convertJawiktionarySync,
  convertJMdict,
  getWordDefinitions,
  getWordDefinitionsWithFurigana,
} from "../src/utils";
import {
  createReadStream,
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync,
} from "fs";
import path from "path";

let convertedJmdict: DictWord[];

const filesDir: string = path.resolve(`./test/temp_files-${process.pid}`);
const jawiktionaryTemp: string = path.resolve(
  `${filesDir}/jawiktionary_${new Date().getTime()}-${process.pid}.jsonl`,
);

beforeAll(() => {
  if (!existsSync(filesDir)) mkdirSync(filesDir);

  writeFileSync(jawiktionaryTemp, inject("raw-wiktextract-data"), "utf-8");

  convertedJmdict = convertJMdict(inject("JMdict_e"));
});

afterAll(() => rmSync(filesDir, { force: true, recursive: true }));

describe("Jawiktionary conversion", () => {
  it("sync conversion", () => {
    const entries: JaWiktionaryEntry[] = convertJawiktionarySync(
      inject("raw-wiktextract-data"),
    );

    expect(entries.length).toBeGreaterThan(0);
    expect(
      entries.every(
        (entry: JaWiktionaryEntry) =>
          typeof entry === "object" && typeof entry.word === "string",
      ),
    ).toBeTruthy();
    expect(
      entries.some(
        (entry: JaWiktionaryEntry) => typeof entry.forms === "object",
      ),
    ).toBeTruthy();
    expect(
      entries.some(
        (entry: JaWiktionaryEntry) => typeof entry.pos_title === "string",
      ),
    ).toBeTruthy();
    expect(
      entries.some(
        (entry: JaWiktionaryEntry) => typeof entry.senses === "object",
      ),
    ).toBeTruthy();

    entries.length = 0;
  });

  it("async conversion", async () => {
    const entries: JaWiktionaryEntry[] = await convertJawiktionaryAsync(
      createReadStream(jawiktionaryTemp, "utf-8"),
    );

    expect(entries.length).toBeGreaterThan(0);
    expect(
      entries.every(
        (entry: JaWiktionaryEntry) =>
          typeof entry === "object" && typeof entry.word === "string",
      ),
    ).toBeTruthy();
    expect(
      entries.some(
        (entry: JaWiktionaryEntry) => typeof entry.forms === "object",
      ),
    ).toBeTruthy();
    expect(
      entries.some(
        (entry: JaWiktionaryEntry) => typeof entry.pos_title === "string",
      ),
    ).toBeTruthy();
    expect(
      entries.some(
        (entry: JaWiktionaryEntry) => typeof entry.senses === "object",
      ),
    ).toBeTruthy();

    entries.length = 0;
  });

  it("word-definitions pairing", async () => {
    const entries: JaWiktionaryEntry[] = await convertJawiktionaryAsync(
      createReadStream(jawiktionaryTemp, "utf-8"),
    );

    expect(entries.length).toBeGreaterThan(0);

    const pairs: WordDefinitionPair[] = await getWordDefinitionsWithFurigana(
      entries,
      convertedJmdict,
    );
    const pairsWithoutFurigana: WordDefinitionPair[] = getWordDefinitions(
      entries,
      convertedJmdict,
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

    expect(
      pairsWithoutFurigana.every((pair: WordDefinitionPair) =>
        pair.definitions.every((def: Definition) => def.furigana === undefined),
      ),
    ).toBeTruthy();

    pairs.length = 0;
    pairsWithoutFurigana.length = 0;
  });
});
