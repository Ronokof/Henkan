import { describe, it, expect, beforeAll, inject } from "vitest";
import { Radical } from "../src/types";
import { generateAnkiNote, generateAnkiNotesFile } from "../src/utils";

let radicals: readonly Radical[];

beforeAll(() => (radicals = inject("radicals.json")));

describe("radicals note generation", () => {
  it("note generation", () => {
    const randomIndex: number = Math.floor(Math.random() * radicals.length);

    for (let i: number = 0; i < radicals.length; i++) {
      const char: Radical = radicals[i]!;

      if (i === randomIndex) {
        char.strokes = undefined;
        char.sources = undefined;
        char.tags = undefined;
      }

      expect(generateAnkiNote(char).length).toBe(i === randomIndex ? 7 : 8);
    }

    expect(
      generateAnkiNotesFile(radicals, undefined, "Test", ["test_tag"]).split(
        "\n",
      ).length,
    ).toBe(radicals.length + 7);

    const noteID: string = radicals[randomIndex]!.noteID!;
    const noteTypeName: string = radicals[randomIndex]!.noteTypeName!;
    const deckPath: string = radicals[randomIndex]!.deckPath!;

    radicals[randomIndex]!.noteID = undefined;

    expect(() =>
      generateAnkiNotesFile(radicals, {
        guid: true,
        noteType: true,
        deckPath: true,
      }),
    ).toThrowError("Invalid result list");

    radicals[randomIndex]!.noteTypeName = noteTypeName;
    radicals[randomIndex]!.deckPath = undefined;

    expect(() =>
      generateAnkiNotesFile(radicals, {
        guid: true,
        noteType: true,
        deckPath: true,
      }),
    ).toThrowError("Invalid result list");

    radicals[randomIndex]!.deckPath = deckPath;
    radicals[randomIndex]!.noteID = undefined;

    expect(() => generateAnkiNotesFile(radicals)).toThrowError(
      "Invalid result list",
    );

    radicals[randomIndex]!.noteID = noteID;
    radicals[randomIndex]!.noteTypeName = undefined;

    expect(() => generateAnkiNotesFile(radicals)).toThrowError(
      "Invalid result list",
    );

    radicals[randomIndex]!.noteTypeName = noteTypeName;
    radicals[randomIndex]!.deckPath = undefined;

    expect(() => generateAnkiNotesFile(radicals)).toThrowError(
      "Invalid result list",
    );

    radicals[randomIndex]!.noteID = undefined;
    radicals[randomIndex]!.noteTypeName = undefined;
    radicals[randomIndex]!.deckPath = undefined;

    expect(
      generateAnkiNotesFile(radicals, {
        guid: "main_information",
        noteType: "Basic",
        deckPath: "Test::Test 2",
      }).split("\n").length,
    ).toBe(radicals.length + 7);

    expect(
      generateAnkiNotesFile(
        radicals.map((radical: Radical) => {
          radical.noteID = undefined;
          radical.noteTypeName = undefined;
          radical.deckPath = undefined;
          radical.tags = undefined;
          return radical;
        }),
      ).split("\n").length,
    ).toBe(radicals.length + 4);
  });
});
