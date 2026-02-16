import { describe, it, expect, beforeAll, inject } from "vitest";
import { DictName, NeDictMeaning, TanakaExample } from "../src/types";
import { convertJMnedict, convertTanakaCorpus } from "../src/utils";

function checkDict(arr: DictName[], checkPhrases?: true): void {
  expect(arr.length).toBeGreaterThan(0);
  expect(
    arr.every(
      (name: DictName) =>
        name.id.length > 0 &&
        name.meanings.length > 0 &&
        name.nameReadings.length > 0 &&
        name.meanings.every((m: NeDictMeaning) => m.translations.length > 0),
    ),
  ).toBeTruthy();
  expect(
    arr.some((name: DictName) =>
      name.meanings.some(
        (m: NeDictMeaning) =>
          m.nameTypes !== undefined && m.nameTypes.length > 0,
      ),
    ),
  );
  expect(
    arr.some(
      (name: DictName) =>
        name.kanjiForms !== undefined && name.kanjiForms.length > 0,
    ),
  ).toBeTruthy();
  expect(
    arr.some((name: DictName) => name.kanjiForms === undefined),
  ).toBeTruthy();
  expect(arr.some((name: DictName) => name.isCommon === true)).toBeTruthy();
  expect(
    arr.some((name: DictName) => name.isCommon === undefined),
  ).toBeTruthy();

  if (checkPhrases === true) {
    expect(
      arr.some((name: DictName) => name.hasPhrases === undefined),
    ).toBeTruthy();
    expect(arr.some((name: DictName) => name.hasPhrases === true)).toBeTruthy();
  }
}

let convertedTanakaCorpus: TanakaExample[];

beforeAll(
  () => (convertedTanakaCorpus = convertTanakaCorpus(inject("examples.utf"))),
);

describe("JMnedict conversion", () => {
  it("conversion without Tanaka examples", () => {
    const convertedJMnedict: DictName[] = convertJMnedict(
      inject("JMnedict.xml"),
    );

    checkDict(convertedJMnedict);
  });

  it("conversion with Tanaka examples", () => {
    const convertedJMnedictWithExamples: DictName[] = convertJMnedict(
      inject("JMnedict.xml"),
      convertedTanakaCorpus,
    );

    checkDict(convertedJMnedictWithExamples, true);
  });

  it("XML conversion error", () => {
    expect(() => convertJMnedict("NOTJMNEDICT")).toThrowError();
  });
});
