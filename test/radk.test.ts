import { describe, it, expect, beforeAll, afterAll } from "vitest";
import loadDict from "./utils/loadDict";
import { DictKanji, DictRadical } from "../src/types";
import { convertKanjiDic, convertRadkFile } from "../src/utils";

let radkfile2: Buffer<ArrayBuffer>;
let convertedKanjiDic: DictKanji[];

beforeAll(async () => {
  radkfile2 = (await loadDict("radkfile2")) as Buffer<ArrayBuffer>;
  const kanjidic: string = (await loadDict("kanjidic2.xml")) as string;

  convertedKanjiDic = convertKanjiDic(kanjidic);
});

afterAll(() => {
  radkfile2 = Buffer.alloc(0);
  convertedKanjiDic.length = 0;
});

describe("radkfile2 conversion", () => {
  it("conversion", () => {
    const convertedRadkfile2: DictRadical[] = convertRadkFile(
      radkfile2,
      convertedKanjiDic,
    );

    expect(
      convertedRadkfile2.every(
        (rad: DictRadical) =>
          rad.radical != undefined &&
          rad.radical.length === 1 &&
          rad.strokes != undefined &&
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
