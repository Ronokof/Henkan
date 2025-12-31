import { describe, it, expect, beforeAll, inject } from "vitest";
import { DictKanji, DictRadical } from "../src/types";
import { convertKanjiDic, convertRadkFile } from "../src/utils";

let convertedKanjiDic: DictKanji[];

beforeAll(() => (convertedKanjiDic = convertKanjiDic(inject("kanjidic2.xml"))));

describe("radkfile2 conversion", () => {
  it("conversion", () => {
    const convertedRadkfile2: DictRadical[] = convertRadkFile(
      inject("radkfile2"),
      convertedKanjiDic,
    );

    expect(
      convertedRadkfile2.every(
        (rad: DictRadical) =>
          rad.radical.length === 1 &&
          rad.strokes.length > 0 &&
          Number.isSafeInteger(Number.parseInt(rad.strokes)),
      ),
    ).toBeTruthy();
    expect(
      convertedRadkfile2.some(
        (rad: DictRadical) =>
          rad.kanji !== undefined &&
          rad.kanji.some(
            (kanji: DictKanji) =>
              kanji.readingMeaning !== undefined &&
              kanji.readingMeaning.length > 0,
          ),
      ),
    ).toBeTruthy();
  });
});
