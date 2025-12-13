import { describe, it, expect, beforeAll, afterAll } from "vitest";
import loadDict from "./utils/loadDict";
import { Definition, DictWord, WordDefinitionPair } from "../src/types";
import {
  convertJawiktionary,
  convertJMdict,
  getWordDefinitions,
} from "../src/utils";
import { createReadStream, promises } from "fs";
import path from "path";

let convertedJmdict: DictWord[];

const jawiktionaryTemp: string = path.resolve(
  `./test/files/jawiktionary_${crypto.randomUUID()}.jsonl`,
);

beforeAll(async () => {
  const jmdict: string = (await loadDict("JMdict_e")) as string;
  const jaWiktionary: Buffer<ArrayBuffer> = (await loadDict(
    "raw-wiktextract-data",
  )) as Buffer<ArrayBuffer>;

  await promises.writeFile(jawiktionaryTemp, jaWiktionary, "utf-8");

  convertedJmdict = convertJMdict(jmdict);
});

afterAll(async () => {
  convertedJmdict.length = 0;

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
