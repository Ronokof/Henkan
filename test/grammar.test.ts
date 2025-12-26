import { describe, it, expect, inject } from "vitest";
import { Grammar } from "../src/types";
import { generateAnkiNote, generateAnkiNotesFile } from "../src/utils";

describe("grammar note generation", () =>
  it("note generation", () => {
    const grammarPoints: readonly Grammar[] = [
      ...inject("grammar_n5.json"),
      ...inject("grammar_n4.json"),
      ...inject("grammar_n3.json"),
      ...inject("grammar_n2.json"),
      ...inject("grammar_n1.json"),
      ...inject("grammar_additional.json"),
    ];

    const randomIndex: number = Math.floor(
      Math.random() * grammarPoints.length,
    );

    for (let i: number = 0; i < grammarPoints.length; i++) {
      const point: Grammar = grammarPoints[i]!;

      if (i === randomIndex) {
        point.source = undefined;
        point.tags = undefined;
      }

      expect(generateAnkiNote(point).length).toBe(i === randomIndex ? 6 : 7);
    }

    expect(generateAnkiNotesFile(grammarPoints).split("\n").length).toBe(
      grammarPoints.length + 7,
    );

    const noteID: string = grammarPoints[randomIndex]!.noteID!;
    const noteTypeName: string = grammarPoints[randomIndex]!.noteTypeName!;
    const deckPath: string = grammarPoints[randomIndex]!.deckPath!;

    grammarPoints[randomIndex]!.noteID = undefined;

    expect(() =>
      generateAnkiNotesFile(grammarPoints, {
        guid: true,
        noteType: true,
        deckPath: true,
      }),
    ).toThrowError("Invalid result list");

    grammarPoints[randomIndex]!.noteTypeName = noteTypeName;
    grammarPoints[randomIndex]!.deckPath = undefined;

    expect(() =>
      generateAnkiNotesFile(grammarPoints, {
        guid: true,
        noteType: true,
        deckPath: true,
      }),
    ).toThrowError("Invalid result list");

    grammarPoints[randomIndex]!.deckPath = deckPath;
    grammarPoints[randomIndex]!.noteID = undefined;

    expect(() => generateAnkiNotesFile(grammarPoints)).toThrowError(
      "Invalid result list",
    );

    grammarPoints[randomIndex]!.noteID = noteID;
    grammarPoints[randomIndex]!.noteTypeName = undefined;

    expect(() => generateAnkiNotesFile(grammarPoints)).toThrowError(
      "Invalid result list",
    );

    grammarPoints[randomIndex]!.noteTypeName = noteTypeName;
    grammarPoints[randomIndex]!.deckPath = undefined;

    expect(() => generateAnkiNotesFile(grammarPoints)).toThrowError(
      "Invalid result list",
    );

    grammarPoints[randomIndex]!.noteID = undefined;
    grammarPoints[randomIndex]!.noteTypeName = undefined;
    grammarPoints[randomIndex]!.deckPath = undefined;

    expect(
      generateAnkiNotesFile(grammarPoints, {
        guid: "main_information",
        noteType: "Basic",
        deckPath: "Test::Test 2",
      }).split("\n").length,
    ).toBe(grammarPoints.length + 7);

    expect(
      generateAnkiNotesFile(
        grammarPoints.map((point: Grammar) => {
          point.noteID = undefined;
          point.noteTypeName = undefined;
          point.deckPath = undefined;
          return point;
        }),
      ).split("\n").length,
    ).toBe(grammarPoints.length + 4);
  }));
