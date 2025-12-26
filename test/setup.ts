import type { TestProject } from "vitest/node";
import { Grammar, Kana, Radical } from "../src/types";

import { gunzip as _gunzip, InputType, ZlibOptions } from "zlib";
import { unzipSync, UnzipFileInfo, Unzipped } from "fflate";
import { promisify } from "util";

const gunzip: (
  buffer: InputType,
  options?: ZlibOptions,
) => Promise<Buffer<ArrayBuffer>> = promisify(_gunzip);

export type DictNames =
  | "JMdict_e"
  | "kanjidic2.xml"
  | "examples.utf"
  | "radkfile2"
  | "kradfile2"
  | "radicals.json"
  | "hiragana.json"
  | "hiragana_extended.json"
  | "katakana.json"
  | "katakana_extended.json"
  | "grammar_n5.json"
  | "grammar_n4.json"
  | "grammar_n3.json"
  | "grammar_n2.json"
  | "grammar_n1.json"
  | "grammar_additional.json"
  | "raw-wiktextract-data"
  | "svg_list";
export type DictTypes =
  | readonly string[]
  | readonly Radical[]
  | readonly Kana[]
  | readonly Grammar[]
  | Buffer<ArrayBuffer>
  | string;

const dictURLs: Map<DictNames, string> = new Map<DictNames, string>([
  ["JMdict_e", "http://ftp.edrdg.org/pub/Nihongo/JMdict_e.gz"],
  ["kanjidic2.xml", "http://www.edrdg.org/kanjidic/kanjidic2.xml.gz"],
  ["examples.utf", "http://ftp.edrdg.org/pub/Nihongo/examples.utf.gz"],
  ["kradfile2", "http://ftp.edrdg.org/pub/Nihongo/kradzip.zip"],
  ["radkfile2", "http://ftp.edrdg.org/pub/Nihongo/kradzip.zip"],
  [
    "radicals.json",
    "https://raw.githubusercontent.com/Ronokof/Full-Japanese-Study-Deck/refs/heads/main/results/radicals/json/radicals.json",
  ],
  [
    "hiragana.json",
    "https://raw.githubusercontent.com/Ronokof/Full-Japanese-Study-Deck/refs/heads/main/results/kana/json/hiragana.json",
  ],
  [
    "hiragana_extended.json",
    "https://raw.githubusercontent.com/Ronokof/Full-Japanese-Study-Deck/refs/heads/main/results/kana/json/hiragana_extended.json",
  ],
  [
    "katakana.json",
    "https://raw.githubusercontent.com/Ronokof/Full-Japanese-Study-Deck/refs/heads/main/results/kana/json/katakana.json",
  ],
  [
    "katakana_extended.json",
    "https://raw.githubusercontent.com/Ronokof/Full-Japanese-Study-Deck/refs/heads/main/results/kana/json/katakana_extended.json",
  ],
  [
    "grammar_n5.json",
    "https://raw.githubusercontent.com/Ronokof/Full-Japanese-Study-Deck/refs/heads/main/results/grammar/json/grammar_n5.json",
  ],
  [
    "grammar_n4.json",
    "https://raw.githubusercontent.com/Ronokof/Full-Japanese-Study-Deck/refs/heads/main/results/grammar/json/grammar_n4.json",
  ],
  [
    "grammar_n3.json",
    "https://raw.githubusercontent.com/Ronokof/Full-Japanese-Study-Deck/refs/heads/main/results/grammar/json/grammar_n3.json",
  ],
  [
    "grammar_n2.json",
    "https://raw.githubusercontent.com/Ronokof/Full-Japanese-Study-Deck/refs/heads/main/results/grammar/json/grammar_n2.json",
  ],
  [
    "grammar_n1.json",
    "https://raw.githubusercontent.com/Ronokof/Full-Japanese-Study-Deck/refs/heads/main/results/grammar/json/grammar_n1.json",
  ],
  [
    "grammar_additional.json",
    "https://raw.githubusercontent.com/Ronokof/Full-Japanese-Study-Deck/refs/heads/main/results/grammar/json/grammar_additional.json",
  ],
  [
    "raw-wiktextract-data",
    "https://kaikki.org/jawiktionary/raw-wiktextract-data.jsonl",
  ],
  [
    "svg_list",
    "https://github.com/KanjiVG/kanjivg/releases/download/r20250816/kanjivg-20250816-all.zip",
  ],
]);

declare module "vitest" {
  export interface ProvidedContext {
    JMdict_e: string;
    "kanjidic2.xml": string;
    "examples.utf": string;
    kradfile2: Buffer<ArrayBuffer>;
    radkfile2: Buffer<ArrayBuffer>;
    "radicals.json": readonly Radical[];
    "hiragana.json": readonly Kana[];
    "hiragana_extended.json": readonly Kana[];
    "katakana.json": readonly Kana[];
    "katakana_extended.json": readonly Kana[];
    "grammar_n5.json": readonly Grammar[];
    "grammar_n4.json": readonly Grammar[];
    "grammar_n3.json": readonly Grammar[];
    "grammar_n2.json": readonly Grammar[];
    "grammar_n1.json": readonly Grammar[];
    "grammar_additional.json": readonly Grammar[];
    "raw-wiktextract-data": Buffer<ArrayBuffer>;
    svg_list: readonly string[];
  }
}

export default async function setup(project: TestProject) {
  for await (const [dict, url] of dictURLs.entries()) {
    if (url) {
      const urlSplit: string[] = url.split("/");
      let filename: string | undefined = urlSplit[urlSplit.length - 1];
      if (!filename) throw new Error("Invalid filename");

      if (url.endsWith(".gz")) filename = filename.replace(".gz", "");
      else if (url.endsWith(".zip")) filename = filename.replace(".zip", "");

      const res: Response = await fetch(url);
      const res2: Response | undefined = url.endsWith(".json")
        ? res.clone()
        : undefined;

      const buf = Buffer.from(await res.arrayBuffer());

      if (url.endsWith(".gz")) {
        const file: string = (await gunzip(buf)).toString("utf-8");

        project.provide(dict, file);
      } else if (url.endsWith(".zip")) {
        const files: Unzipped = unzipSync(buf, {
          filter: (file: UnzipFileInfo) =>
            ["kradfile2", "radkfile2"].includes(file.name) ||
            file.name.endsWith(".svg"),
        });

        if (filename === "kanjivg-20250816-all") {
          const list: string[] = [];

          for (const key of Object.keys(files))
            list.push(key.replace("kanji/", ""));

          const svgs: readonly string[] = [...list];

          project.provide(dict, svgs);
        } else if (filename === "kradzip") {
          const krad: Uint8Array<ArrayBufferLike> | undefined =
            files["kradfile2"];
          const radk: Uint8Array<ArrayBufferLike> | undefined =
            files["radkfile2"];

          if (krad && radk) {
            project.provide("kradfile2", Buffer.from(krad));
            project.provide("radkfile2", Buffer.from(radk));
          }
        }
      } else if (url.endsWith(".json") && res2) {
        const json: readonly any[] = await res2.json();
        project.provide(dict, json);
      } else if (url.endsWith(".jsonl")) project.provide(dict, buf);
    }
  }
}
