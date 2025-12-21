import { describe, it, expect, inject } from "vitest";
import { ExamplePart, TanakaExample } from "../src/types";
import {
  convertTanakaCorpus,
  convertTanakaCorpusWithFurigana,
} from "../src/utils";

function checkCorpus(
  convertedTanakaCorpus: TanakaExample[],
  withFurigana?: true | undefined,
): void {
  expect(
    convertedTanakaCorpus.every(
      (ex: TanakaExample) =>
        ex.glossNumber === undefined &&
        ex.id != undefined &&
        ex.parts != undefined &&
        ex.parts.length > 0 &&
        ex.phrase != undefined &&
        ex.translation != undefined &&
        ex.parts.every((part: ExamplePart) => part.baseForm != undefined),
    ),
  ).toBeTruthy();

  if (withFurigana === true)
    expect(
      convertedTanakaCorpus.some(
        (ex: TanakaExample) =>
          ex.furigana !== undefined && ex.furigana.length > 0,
      ),
    ).toBeTruthy();

  let edited: boolean = false;
  let glossNumber: boolean = false;
  let inflectedForm: boolean = false;
  let reading: boolean = false;
  let referenceID: boolean = false;

  let validPart: boolean = false;

  for (const ex of convertedTanakaCorpus) {
    if (validPart) break;

    for (const part of ex.parts) {
      if (part.edited === true) edited = true;
      if (part.glossNumber && Number.isSafeInteger(part.glossNumber))
        glossNumber = true;
      if (part.inflectedForm && part.inflectedForm.length > 0)
        inflectedForm = true;
      if (part.reading && part.reading.length > 0) reading = true;
      if (
        part.referenceID &&
        Number.isSafeInteger(Number.parseInt(part.referenceID))
      )
        referenceID = true;

      if (edited && glossNumber && inflectedForm && reading && referenceID) {
        validPart = true;
        break;
      }
    }
  }

  expect(validPart).toBeTruthy();
}

describe("Tanaka Corpus conversion", () => {
  it("conversion without furigana", () =>
    checkCorpus(convertTanakaCorpus(inject("examples.utf"))));
  it("conversion with furigana", async () =>
    checkCorpus(
      await convertTanakaCorpusWithFurigana(inject("examples.utf")),
      true,
    ));
});
