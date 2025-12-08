import { describe, it, expect, beforeAll, afterAll } from "vitest";
import loadDict from "./utils/loadDict";
import { DictWord, TanakaExample } from "../src/types";
import { convertJMdict, convertTanakaCorpus } from "../src/utils";

function checkDict(arr: DictWord[], checkPhrases?: true | undefined): void {
  expect(arr.length).toBeGreaterThan(0);
  expect(
    arr.every(
      (word: DictWord) =>
        word.id != undefined &&
        word.meanings != undefined &&
        word.meanings.length > 0 &&
        word.readings != undefined &&
        word.readings.length > 0,
    ),
  ).toBeTruthy();
  expect(
    arr.some(
      (word: DictWord) =>
        word.kanjiForms != undefined && word.kanjiForms.length > 0,
    ),
  ).toBeTruthy();
  expect(arr.some((word: DictWord) => word.isCommon === true)).toBeTruthy();
  expect(
    arr.some((word: DictWord) => word.usuallyInKana === true),
  ).toBeTruthy();

  if (checkPhrases === true)
    expect(arr.some((word: DictWord) => word.hasPhrases === true)).toBeTruthy();
}

let jmdict: string;
let examples: string;

beforeAll(async () => {
  jmdict = (await loadDict("JMdict_e")) as string;
  examples = (await loadDict("examples.utf")) as string;
});

afterAll(() => {
  jmdict = "";
  examples = "";
});

describe("JMdict conversion", () => {
  it("conversion without Tanaka examples", () => {
    const convertedJMdict: DictWord[] = convertJMdict(jmdict);

    checkDict(convertedJMdict);
  });

  it("conversion with Tanaka examples", async () => {
    const convertedTanakaCorpus: TanakaExample[] =
      await convertTanakaCorpus(examples);
    const convertedJMdictWithExamples: DictWord[] = convertJMdict(
      jmdict,
      convertedTanakaCorpus,
    );

    checkDict(convertedJMdictWithExamples, true);
  });
});
