import { describe, it, expect, inject } from "vitest";
import {
  DictKanji,
  DictKanjiReadingMeaning,
  DictKanjiReadingMeaningGroup,
} from "../src/types";
import { convertKanjiDic } from "../src/utils";
import { regexps } from "../src/constants";

describe("KANJIDIC conversion", () => {
  it("conversion", () => {
    const convertedKanjidic: DictKanji[] = convertKanjiDic(
      inject("kanjidic2.xml"),
    );

    expect(
      convertedKanjidic.every(
        (kanji: DictKanji) =>
          kanji.kanji != undefined &&
          kanji.kanji.length === 1 &&
          regexps.kanji.test(kanji.kanji) &&
          kanji.misc !== undefined &&
          kanji.misc.strokeNumber != undefined &&
          kanji.misc.strokeNumber.length > 0 &&
          Number.isSafeInteger(Number.parseInt(kanji.misc.strokeNumber)),
      ),
    ).toBeTruthy();

    expect(
      convertedKanjidic.some(
        (kanji: DictKanji) =>
          kanji.readingMeaning !== undefined &&
          kanji.readingMeaning.some(
            (rm: DictKanjiReadingMeaning) =>
              rm.nanori !== undefined &&
              rm.nanori.length > 0 &&
              rm.groups !== undefined &&
              rm.groups.some(
                (group: DictKanjiReadingMeaningGroup) =>
                  group.meanings != undefined &&
                  group.meanings.length > 0 &&
                  group.readings != undefined &&
                  group.readings.length > 0,
              ),
          ),
      ),
    ).toBeTruthy();
    expect(
      convertedKanjidic.some(
        (kanji: DictKanji) =>
          kanji.misc !== undefined &&
          kanji.misc.strokeNumber != undefined &&
          kanji.misc.strokeNumber.length > 0 &&
          Number.isSafeInteger(Number.parseInt(kanji.misc.strokeNumber)) &&
          kanji.misc.frequency !== undefined &&
          kanji.misc.frequency.length > 0 &&
          Number.isSafeInteger(Number.parseInt(kanji.misc.frequency)) &&
          kanji.misc.grade !== undefined &&
          kanji.misc.grade.length > 0 &&
          Number.isSafeInteger(Number.parseInt(kanji.misc.grade)) &&
          kanji.misc.jlpt !== undefined &&
          kanji.misc.jlpt.length === 2 &&
          kanji.misc.jlpt.charAt(0) === "N" &&
          ["5", "4", "3", "2", "1"].includes(kanji.misc.jlpt.charAt(1)),
      ),
    ).toBeTruthy();

    expect(
      convertedKanjidic.some((kanji: DictKanji) => kanji.isKokuji === true),
    ).toBeTruthy();
  });

  it("XML conversion error", () => {
    expect(() => convertKanjiDic("NOTKANJIDIC")).toThrowError();
  });
});
