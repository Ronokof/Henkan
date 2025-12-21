import { describe, it, expect, beforeAll, inject } from "vitest";
import { DictKanji, DictKanjiWithRadicals, Kana } from "../src/types";
import { convertKanjiDic, convertKradFile } from "../src/utils";

let convertedKanjiDic: DictKanji[];

beforeAll(() => (convertedKanjiDic = convertKanjiDic(inject("kanjidic2.xml"))));

describe("kradfile2 conversion", () =>
  it("conversion", () => {
    const convertedKradfile2: DictKanjiWithRadicals[] = convertKradFile(
      inject("kradfile2"),
      convertedKanjiDic,
      inject("katakana.json"),
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

    expect(
      convertedKradfile2.some((kanji: DictKanjiWithRadicals) =>
        kanji.radicals.some(
          (radical: string | DictKanji) =>
            typeof radical === "object" &&
            inject("katakana.json").some(
              (kana: Kana) => kana.kana === radical.kanji,
            ),
        ),
      ),
    ).toBeTruthy();
  }));
