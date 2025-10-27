import { PollyClient, SynthesizeSpeechCommandInput } from "@aws-sdk/client-polly";
import { DictKanji, DictKanjiWithRadicals, DictRadical, DictWord, Grammar, Kana, Kanji, Radical, Result, TanakaExample, Word } from "./types";
/**
 * Capitalizes a string.
 * @param value The string to capitalize
 * @returns The capitalized string
 */
export declare function capitalizeString(value: string): string;
/**
 * Checks if the argument is an array.
 * @param arg The argument
 * @returns Whether or not {@link arg} is an array
 */
export declare function isValidArray(arg: any): arg is any[];
/**
 * Checks if the argument is an array and has at least one element.
 * @param arg The argument
 * @returns Whether or not {@link arg} is an array and has at least one element
 */
export declare function isValidArrayWithFirstElement(arg: any): arg is any[];
/**
 * Checks if the argument is an array of strings.
 * @param arg The argument
 * @returns Whether or not {@link arg} is an array of strings
 */
export declare function isStringArray(arg: any): arg is string[];
/**
 * Shuffles an array using the `Fisher–Yates shuffle` algorithm
 * @param arr The array to be shuffled
 * @returns The shuffled array
 */
export declare function shuffleArray<T>(arr: T[]): T[];
/**
 * Converts a JMdict `JMdict_e.xml`/`JMdict_e` file into an array of {@link DictWord} objects.
 * @param xmlString The raw `JMdict_e.xml`/`JMdict_e` file contents
 * @param examples An array of converted `Tanaka Corpus` examples
 * @returns An array of converted {@link DictWord} objects
 */
export declare function convertJMdict(xmlString: string, examples?: TanakaExample[] | undefined): DictWord[];
/**
 * Converts a KANJIDIC `kanjidic2.xml` file into an array of {@link DictKanji} objects.
 * @param xmlString The raw `kanjidic2.xml` file contents
 * @returns An array of converted {@link DictKanji} objects
 */
export declare function convertKanjiDic(xmlString: string): DictKanji[];
/**
 * Converts a Tanaka Corpus `examples.utf` file into an array of {@link TanakaExample} objects.
 * @param tanakaString The raw contents of a `examples.utf` file
 * @param generateFurigana Whether or not to generate furigana for the phrase
 * @returns A promise resolving with an array of converted {@link TanakaExample} objects
 */
export declare function convertTanakaCorpus(tanakaString: string, generateFurigana?: true): Promise<TanakaExample[]>;
/**
 * Converts a `radkfile2` file into an array of {@link DictRadical} objects.
 * @param radkBuffer A raw `radkfile2` buffer
 * @param kanjiDic An array of converted `KANJIDIC` entries
 * @returns An array of converted {@link DictRadical} objects
 */
export declare function convertRadkFile(radkBuffer: NonSharedBuffer, kanjiDic: DictKanji[]): DictRadical[];
/**
 * Converts a `kradfile2` file into an array of {@link DictKanjiWithRadicals} objects.
 * @param kradBuffer A raw `kradfile2` buffer
 * @param kanjiDic An array of converted `KANJIDIC` entries
 * @param katakanaList An array of katakana {@link Kana} objects
 * @returns An array of converted {@link DictKanjiWithRadicals} objects
 */
export declare function convertKradFile(kradBuffer: NonSharedBuffer, kanjiDic: DictKanji[], katakanaList: Kana[]): DictKanjiWithRadicals[];
/**
 * Transforms a converted `JMdict` entry into a more readable format, by providing either its {@link id} or the {@link dictWord} object directly.
 * @param dict An array of converted `JMdict` entries
 * @param id The ID of the `JMdict` entry
 * @param kanjiDic An array of converted `KANJIDIC` entries
 * @param examples An array of converted `Tanaka Corpus` examples
 * @param dictWord The converted `JMdict` entry
 * @param noteTypeName The Anki note type name
 * @param deckPath The full Anki deck path
 * @returns The transformed {@link Word} object
 */
export declare function getWord(dict?: DictWord[], id?: string, kanjiDic?: DictKanji[], examples?: TanakaExample[], dictWord?: DictWord, noteTypeName?: string, deckPath?: string): Word;
/**
 * Transforms a converted `KANJIDIC` entry into a more readable format
 * @param kanjiChar The kanji character
 * @param dict An array of converted `KANJIDIC` entries
 * @param jmDict An array of converted `JMdict` entries
 * @param svgList An array of SVG file names
 * @param noteTypeName The Anki note type name
 * @param deckPath The full Anki deck path
 * @returns The transformed {@link Kanji} object
 */
export declare function getKanji(kanjiChar: string, dict: DictKanji[], jmDict?: DictWord[], svgList?: string[], noteTypeName?: string, deckPath?: string): Kanji;
/**
 * Same as {@link getKanji}, but with possible extra info.
 * @param kanjiChar The kanji character
 * @param info Additional info from `jpdb.io` for the kanji (mnemonic, components, words)
 * @param dict An array of converted `KANJIDIC` entries
 * @param useJpdbWords Whether or not to use the `jpdb.io` provided words (if present) instead of other words from `JMdict`
 * @param jmDict An array of converted `JMdict` entries
 * @param svgList An array of SVG file names
 * @param noteTypeName The Anki note type name
 * @param deckPath The full Anki deck path
 * @returns The transformed {@link Kanji} object
 */
export declare function getKanjiExtended(kanjiChar: string, info: Kanji, dict: DictKanji[], useJpdbWords?: true, jmDict?: DictWord[], svgList?: string[], noteTypeName?: string, deckPath?: string): Kanji;
/**
 * Builds SSML text for Japanese words
 * @param formText The normal form of the word (usually kanji form)
 * @param fullReading The reading of the word (hiragana or katakana)
 * @returns The SSML text
 */
export declare function makeSSML(formText: string, fullReading: string): string;
/**
 * Synthesizes text to speech audio using {@link [Amazon Polly](https://aws.amazon.com/polly/)}.
 * @param client An Amazon Polly Client instance
 * @param ssmlText The text to be spoken, in SSML format
 * @param options Other speech generation settings
 * @returns A promise resolving with an audio stream buffer or with `null` if the generation failed
 */
export declare function synthesizeSpeech(client: PollyClient, ssmlText: string, options: Omit<SynthesizeSpeechCommandInput, "Text" | "TextType">): Promise<Buffer<ArrayBuffer> | null>;
export declare function isWord(entry: Result): entry is Word;
export declare function isRadical(entry: Result): entry is Radical;
export declare function isKanji(entry: Result): entry is Kanji;
export declare function isKana(entry: Result): entry is Kana;
export declare function isGrammar(entry: Result): entry is Grammar;
/**
 * Generates an array where each field holds an entry’s info wrapped in HTML tags.
 * @param entry Any type of mapped entry ({@link Word}, {@link Kanji}, {@link Radical}, {@link Kana}, {@link Grammar})
 * @returns An array of fields, each corresponding to an Anki note type field
 */
export declare function generateAnkiNote(entry: Result): string[];
/**
 * Generates an Anki notes file with each entry’s info organized into fields, either in HTML or plain text.
 * @param list An array containing any type of transformed entries ({@link Word}, {@link Kanji}, {@link Radical}, {@link Kana}, {@link Grammar})
 * @returns The resulting Anki notes file's content or `undefined` if `list` is empty
 */
export declare function generateAnkiNotesFile(list: Result[]): string | undefined;
//# sourceMappingURL=utils.d.ts.map