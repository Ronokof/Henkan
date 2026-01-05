import {
  createReadStream,
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync,
} from "fs";
import path from "path";
import { describe, it, expect, beforeAll, afterAll, inject } from "vitest";
import {
  Definition,
  DictWord,
  JaWiktionaryEntry,
  JaWiktionaryEntrySense,
  WordDefinitionPair,
} from "../src/types";
import {
  convertJawiktionaryAsync,
  convertJawiktionarySync,
  convertJMdict,
  getWordDefinitions,
  getWordDefinitionsWithFurigana,
} from "../src/utils";

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

afterAll(() => {
  rmSync(filesDir, { force: true, recursive: true });
});

describe("Jawiktionary conversion", () => {
  it("sync conversion", () => {
    const entries: JaWiktionaryEntry[] = convertJawiktionarySync(
      inject("raw-wiktextract-data"),
    );

    expect(entries.length).toBeGreaterThan(0);
    expect(
      entries.every(
        (entry: JaWiktionaryEntry) =>
          entry.word.length > 0 && entry.pos_title.length > 0,
      ),
    ).toBeTruthy();
    expect(
      entries.some(
        (entry: JaWiktionaryEntry) =>
          entry.senses !== undefined &&
          entry.senses.every(
            (s: JaWiktionaryEntrySense) =>
              s.glosses.length > 0 &&
              s.glosses.every((g: string) => g.length > 0) &&
              (s.form_of === undefined ||
                (s.form_of.length > 0 &&
                  s.form_of.every((f: string) => f.length > 0))),
          ),
      ),
    ).toBeTruthy();
    expect(
      entries.some((entry: JaWiktionaryEntry) => entry.senses === undefined),
    ).toBeTruthy();
    expect(
      entries.some(
        (entry: JaWiktionaryEntry) =>
          entry.forms !== undefined &&
          entry.forms.length > 0 &&
          entry.forms.every((f: string) => f.length > 0),
      ),
    ).toBeTruthy();
    expect(
      entries.some((entry: JaWiktionaryEntry) => entry.forms === undefined),
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
          entry.word.length > 0 && entry.pos_title.length > 0,
      ),
    ).toBeTruthy();
    expect(
      entries.some(
        (entry: JaWiktionaryEntry) =>
          entry.senses !== undefined &&
          entry.senses.every(
            (s: JaWiktionaryEntrySense) =>
              s.glosses.length > 0 &&
              s.glosses.every((g: string) => g.length > 0) &&
              (s.form_of === undefined ||
                (s.form_of.length > 0 &&
                  s.form_of.every((f: string) => f.length > 0))),
          ),
      ),
    ).toBeTruthy();
    expect(
      entries.some((entry: JaWiktionaryEntry) => entry.senses === undefined),
    ).toBeTruthy();
    expect(
      entries.some(
        (entry: JaWiktionaryEntry) =>
          entry.forms !== undefined &&
          entry.forms.length > 0 &&
          entry.forms.every((f: string) => f.length > 0),
      ),
    ).toBeTruthy();
    expect(
      entries.some((entry: JaWiktionaryEntry) => entry.forms === undefined),
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
          pair.wordID.length > 0 &&
          Number.isSafeInteger(Number.parseInt(pair.wordID)) &&
          pair.definitions.length > 0 &&
          pair.definitions.every(
            (def: Definition) =>
              typeof def.definition === "string" && def.definition.length > 0,
          ),
      ),
    ).toBeTruthy();
    expect(
      pairs.some((pair: WordDefinitionPair) =>
        pair.definitions.some((def: Definition) => def.mayNotBeAccurate === 2),
      ),
    ).toBeTruthy();
    expect(
      pairs.some((pair: WordDefinitionPair) =>
        pair.definitions.some((def: Definition) => def.mayNotBeAccurate === 1),
      ),
    ).toBeTruthy();
    expect(
      pairs.some((pair: WordDefinitionPair) =>
        pair.definitions.some(
          (def: Definition) => def.mayNotBeAccurate === undefined,
        ),
      ),
    ).toBeTruthy();
    expect(
      pairs.every((pair: WordDefinitionPair) =>
        pair.definitions.every(
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
