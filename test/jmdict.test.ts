import { describe, it, expect, beforeAll, inject } from "vitest";
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

let convertedTanakaCorpus: TanakaExample[];

beforeAll(
  async () =>
    (convertedTanakaCorpus = await convertTanakaCorpus(inject("examples.utf"))),
);

describe("JMdict conversion", () => {
  it("conversion without Tanaka examples", () => {
    const convertedJMdict: DictWord[] = convertJMdict(inject("JMdict_e"));

    checkDict(convertedJMdict);
  });

  it("conversion with Tanaka examples", () => {
    const convertedJMdictWithExamples: DictWord[] = convertJMdict(
      inject("JMdict_e"),
      convertedTanakaCorpus,
    );

    checkDict(convertedJMdictWithExamples, true);
  });
});
