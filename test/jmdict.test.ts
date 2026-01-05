import { describe, it, expect, beforeAll, inject } from "vitest";
import { DictMeaning, DictWord, TanakaExample } from "../src/types";
import { convertJMdict, convertTanakaCorpus } from "../src/utils";

function checkDict(arr: DictWord[], checkPhrases?: true): void {
  expect(arr.length).toBeGreaterThan(0);
  expect(
    arr.every(
      (word: DictWord) =>
        word.id.length > 0 &&
        word.meanings.length > 0 &&
        word.readings.length > 0 &&
        word.meanings.every(
          (m: DictMeaning) =>
            m.translations.length > 0 && m.partOfSpeech.length > 0,
        ),
    ),
  ).toBeTruthy();
  expect(
    arr.some(
      (word: DictWord) =>
        word.kanjiForms !== undefined && word.kanjiForms.length > 0,
    ),
  ).toBeTruthy();
  expect(
    arr.some((word: DictWord) => word.kanjiForms === undefined),
  ).toBeTruthy();
  expect(arr.some((word: DictWord) => word.isCommon === true)).toBeTruthy();
  expect(
    arr.some((word: DictWord) => word.isCommon === undefined),
  ).toBeTruthy();
  expect(
    arr.some((word: DictWord) => word.usuallyInKana === true),
  ).toBeTruthy();
  expect(
    arr.some((word: DictWord) => word.usuallyInKana === undefined),
  ).toBeTruthy();

  if (checkPhrases === true) {
    expect(
      arr.some((word: DictWord) => word.hasPhrases === undefined),
    ).toBeTruthy();
    expect(arr.some((word: DictWord) => word.hasPhrases === true)).toBeTruthy();
  }
}

let convertedTanakaCorpus: TanakaExample[];

beforeAll(
  () => (convertedTanakaCorpus = convertTanakaCorpus(inject("examples.utf"))),
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

  it("XML conversion error", () => {
    expect(() => convertJMdict("NOTJMDICT")).toThrowError();
  });
});
