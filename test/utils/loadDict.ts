import { readFileSync } from "fs";
import path from "path";
import { Kana, WordDefinitionPair } from "../../src/types";

import { gunzip as _gunzip, InputType, ZlibOptions } from "zlib";
import { unzipSync, UnzipFileInfo, Unzipped } from "fflate";
import { promisify } from "util";

const gunzip: (
  buffer: InputType,
  options?: ZlibOptions,
) => Promise<Buffer<ArrayBuffer>> = promisify(_gunzip);

type DictNames =
  | "JMdict_e"
  | "kanjidic2.xml"
  | "examples.utf"
  | "radkfile2"
  | "kradfile2"
  | "raw-wiktextract-data"
  | "katakana.json"
  | "svg_list";
type DictTypes =
  | string
  | string[]
  | Buffer<ArrayBuffer>
  | Kana[]
  | WordDefinitionPair[];

const dicts: Map<DictNames, DictTypes> = new Map<DictNames, DictTypes>();

export default async (dict: DictNames) => {
  if (!dicts.has(dict)) {
    let url: string = "";

    switch (dict) {
      case "JMdict_e":
        url = "http://ftp.edrdg.org/pub/Nihongo/JMdict_e.gz";

        break;
      case "kanjidic2.xml":
        url = "http://www.edrdg.org/kanjidic/kanjidic2.xml.gz";

        break;
      case "examples.utf":
        url = "http://ftp.edrdg.org/pub/Nihongo/examples.utf.gz";

        break;
      case "kradfile2":
      case "radkfile2":
        url = "http://ftp.edrdg.org/pub/Nihongo/kradzip.zip";

        break;
      case "raw-wiktextract-data":
        url = "https://kaikki.org/jawiktionary/raw-wiktextract-data.jsonl";

        break;
      case "svg_list":
        url =
          "https://github.com/KanjiVG/kanjivg/releases/download/r20250816/kanjivg-20250816-all.zip";

        break;
    }

    if (url.length > 0) {
      const urlSplit: string[] = url.split("/");
      let filename: string = urlSplit[urlSplit.length - 1]!;

      if (url.endsWith(".gz")) filename = filename.replace(".gz", "");
      else if (url.endsWith(".zip")) filename = filename.replace(".zip", "");

      const buf: Buffer<ArrayBuffer> = Buffer.from(
        await (await fetch(url)).arrayBuffer(),
      );

      if (url.endsWith(".gz")) {
        const file: string = (await gunzip(buf)).toString("utf-8");

        dicts.set(filename as DictNames, file);
      } else if (url.endsWith(".zip")) {
        const files: Unzipped = unzipSync(buf, {
          filter: (file: UnzipFileInfo) =>
            ["kradfile2", "radkfile2"].includes(file.name) ||
            file.name.endsWith(".svg"),
        });

        if (filename === "kanjivg-20250816-all") {
          const svgs: string[] = [];

          for (const key of Object.keys(files))
            svgs.push(key.replace("kanji/", ""));

          dicts.set("svg_list", svgs);
        } else if (filename === "kradzip") {
          const krad: Uint8Array<ArrayBufferLike> | undefined =
            files["kradfile2"];
          const radk: Uint8Array<ArrayBufferLike> | undefined =
            files["radkfile2"];

          if (krad && radk) {
            dicts.set("kradfile2", Buffer.from(krad));
            dicts.set("radkfile2", Buffer.from(radk));
          }
        }
      } else if (url.endsWith(".jsonl")) dicts.set("raw-wiktextract-data", buf);
    }

    if (dict === "katakana.json")
      dicts.set(
        "katakana.json",
        JSON.parse(
          readFileSync(path.resolve("./test/files/katakana.json"), "utf-8"),
        ),
      );
  }

  return dicts.get(dict)!;
};
