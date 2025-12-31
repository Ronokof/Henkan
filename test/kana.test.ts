import { describe, it, expect, inject } from "vitest";
import { Kana } from "../src/types";
import { generateAnkiNote, generateAnkiNotesFile } from "../src/utils";

describe("kana note generation", () => {
  it("note generation", () => {
    const kana: readonly Kana[] = [
      ...inject("hiragana.json"),
      ...inject("katakana.json"),
      ...inject("hiragana_extended.json"),
      ...inject("katakana_extended.json"),
    ];

    const randomIndex: number = Math.floor(Math.random() * kana.length);

    for (let i: number = 0; i < kana.length; i++) {
      const char: Kana = kana[i]!;

      if (i === randomIndex) {
        char.audio = undefined;
        char.tags = undefined;
      }

      expect(generateAnkiNote(char).length).toBe(i === randomIndex ? 3 : 4);
    }

    expect(generateAnkiNotesFile(kana).split("\n").length).toBe(
      kana.length + 7,
    );

    const noteID: string = kana[randomIndex]!.noteID!;
    const noteTypeName: string = kana[randomIndex]!.noteTypeName!;
    const deckPath: string = kana[randomIndex]!.deckPath!;

    kana[randomIndex]!.noteID = undefined;

    expect(() =>
      generateAnkiNotesFile(kana, {
        guid: true,
        noteType: true,
        deckPath: true,
      }),
    ).toThrowError("Invalid result list");

    kana[randomIndex]!.noteTypeName = noteTypeName;
    kana[randomIndex]!.deckPath = undefined;

    expect(() =>
      generateAnkiNotesFile(kana, {
        guid: true,
        noteType: true,
        deckPath: true,
      }),
    ).toThrowError("Invalid result list");

    kana[randomIndex]!.deckPath = deckPath;
    kana[randomIndex]!.noteID = undefined;

    expect(() => generateAnkiNotesFile(kana)).toThrowError(
      "Invalid result list",
    );

    kana[randomIndex]!.noteID = noteID;
    kana[randomIndex]!.noteTypeName = undefined;

    expect(() => generateAnkiNotesFile(kana)).toThrowError(
      "Invalid result list",
    );

    kana[randomIndex]!.noteTypeName = noteTypeName;
    kana[randomIndex]!.deckPath = undefined;

    expect(() => generateAnkiNotesFile(kana)).toThrowError(
      "Invalid result list",
    );

    kana[randomIndex]!.noteID = undefined;
    kana[randomIndex]!.noteTypeName = undefined;
    kana[randomIndex]!.deckPath = undefined;

    expect(
      generateAnkiNotesFile(kana, {
        guid: "main_information",
        noteType: "Basic",
        deckPath: "Test::Test 2",
      }).split("\n").length,
    ).toBe(kana.length + 7);

    expect(
      generateAnkiNotesFile(
        kana.map((char: Kana) => {
          char.noteID = undefined;
          char.noteTypeName = undefined;
          char.deckPath = undefined;
          return char;
        }),
      ).split("\n").length,
    ).toBe(kana.length + 4);
  });
});
