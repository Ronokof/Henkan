import { describe, it, expect, beforeAll, afterAll } from "vitest";
import loadDict from "./utils/loadDict";
import { DictKanji, DictKanjiWithRadicals, Kana } from "../src/types";
import { convertKanjiDic, convertKradFile } from "../src/utils";

let convertedKanjiDic: DictKanji[];
let kradfile2: Buffer<ArrayBuffer>;
let katakanaList: Kana[];

beforeAll(async () => {
  kradfile2 = (await loadDict("kradfile2")) as Buffer<ArrayBuffer>;
  katakanaList = (await loadDict("katakana.json")) as Kana[];

  const kanjidic: string = (await loadDict("kanjidic2.xml")) as string;
  convertedKanjiDic = convertKanjiDic(kanjidic);
});

afterAll(() => {
  convertedKanjiDic.length = 0;
  kradfile2 = Buffer.alloc(0);
  katakanaList.length = 0;
});

describe("kradfile2 conversion", () =>
  it("conversion", () => {
    const convertedKradfile2: DictKanjiWithRadicals[] = convertKradFile(
      kradfile2,
      convertedKanjiDic,
      katakanaList,
    );

    expect(
      convertedKradfile2.every(
        (kanji: DictKanjiWithRadicals) =>
          kanji.kanji != undefined &&
          kanji.kanji.length === 1 &&
          kanji.radicals != undefined &&
          (kanji.radicals.some(
            (rad: string | DictKanji) => typeof rad === "string",
          ) ||
            kanji.radicals.some(
              (rad: string | DictKanji) =>
                typeof rad === "object" &&
                rad.kanji != undefined &&
                rad.kanji.length === 1 &&
                rad.readingMeaning != undefined &&
                rad.readingMeaning.length > 0,
            )),
      ),
    ).toBeTruthy();
  }));
