import { describe, it, expect, beforeAll, afterAll } from "vitest";
import loadDict from "./utils/loadDict";
import {
  DictKanji,
  DictKanjiReadingMeaning,
  DictKanjiReadingMeaningGroup,
} from "../src/types";
import { convertKanjiDic } from "../src/utils";
import { regexps } from "../src/constants";

let kanjidic: string;

beforeAll(async () => (kanjidic = (await loadDict("kanjidic2.xml")) as string));
afterAll(() => (kanjidic = ""));

describe("KANJIDIC conversion", () => {
  it("conversion", () => {
    const convertedKanjidic: DictKanji[] = convertKanjiDic(kanjidic);

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
          kanji.misc.jlpt.length > 0 &&
          Number.isSafeInteger(Number.parseInt(kanji.misc.jlpt)),
      ),
    ).toBeTruthy();

    expect(
      convertedKanjidic.some((kanji: DictKanji) => kanji.isKokuji === true),
    ).toBeTruthy();
  });
});
