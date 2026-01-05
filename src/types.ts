/**
 * JLPT levels
 */
export type JLPT = `N${number}`;

/**
 * Japanese parts of speech (from the `pos_title` field of `ja.wiktionary.org` pages)
 */
export type POS =
  | "名詞"
  | "和語の漢字表記"
  | "動詞"
  | "成句"
  | "副詞"
  | "形容動詞"
  | "助詞"
  | "感動詞"
  | "代名詞"
  | "接尾辞"
  | "接頭語"
  | "造語成分"
  | "略語"
  | "固有名詞"
  | "人称代名詞"
  | "接頭辞"
  | "接続助詞"
  | "間投詞"
  | "助動詞"
  | "形容詞"
  | "縮約形"
  | "接辞"
  | "接続詞"
  | "連体詞"
  | "人名"
  | "記号"
  | "数詞"
  | "慣用句"
  | "ことわざ"
  | "助数詞"
  | "英数字混合表記"
  | "動詞句"
  | "成語"
  | "意義"
  | "頭字語"
  | "接尾語";

/**
 * Standardized dictionary names
 */
export type DictName = "JMDict" | "Kanjidic" | "tanaka" | "radk" | "krad";

/**
 * A number written as a string
 */
export type StringNumber = `${number}`;

/**
 * Word kanji form information
 *
 * Equivalent to the `k_ele` JMdict element
 */
export interface DictKanjiForm {
  /**
   * The kanji form of the word
   */
  readonly form: string;
  /**
   * Other information about the kanji form
   *
   * @see {@link https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_kinf}
   */
  notes?: string[] | undefined;
  /**
   * Priority codes
   *
   * @see {@link https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_freq}
   */
  commonness?: string[] | undefined;
}

/**
 * Word reading information
 *
 * Equivalent to the `r_ele` JMdict element
 */
export interface DictReading {
  /**
   * The reading of the word
   */
  readonly reading: string;
  /**
   * Other information about the reading
   *
   * @see {@link https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_rinf}
   */
  notes?: string[] | undefined;
  /**
   * Priority codes
   *
   * @see {@link https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_freq}
   */
  commonness?: string[] | undefined;
  /**
   * Kanji forms the reading is restricted to
   */
  kanjiFormRestrictions?: string[] | undefined;
}

/**
 * A word's readings-kanji forms pair
 */
export interface ReadingsKanjiFormsPair {
  /**
   * The readings
   */
  readings: DictReading[];
  /**
   * The kanji forms
   */
  kanjiForms?: DictKanjiForm[] | undefined;
}

/**
 * A JMdict sense translation
 */
export type DictTranslation = string | { translation: string; type: string };

/**
 * Word meaning/sense information
 *
 * Equivalent to the `sense` JMdict element
 */
export interface DictMeaning {
  /**
   * Part of speech information
   *
   * @see {@link https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_pos}
   */
  partOfSpeech: string[];
  /**
   * Word glosses
   */
  translations: DictTranslation[];
  /**
   * Cross-references to other similar/related words *(when used with this meaning)*
   */
  references?: string[] | undefined;
  /**
   * Kanji forms the meaning is restricted to
   */
  kanjiFormRestrictions?: string[] | undefined;
  /**
   * Readings the meaning is restricted to
   */
  readingRestrictions?: string[] | undefined;
  /**
   * References to antonyms of the word *(when used with this meaning)*
   */
  antonyms?: string[] | undefined;
  /**
   * Field of application of the word *(when used with this meaning)*
   *
   * @see {@link https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_fld}
   */
  fields?: string[] | undefined;
  /**
   * Additional information about the meaning
   */
  info?: string[] | undefined;
  /**
   * Other relevant information about the meaning
   *
   * @see {@link https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_misc}
   */
  misc?: string[] | undefined;
  /**
   * Regional dialects the meaning is restricted to
   *
   * @see {@link https://www.edrdg.org/jmwsgi/edhelp.py?svc=jmdict#kw_dial}
   */
  dialects?: string[] | undefined;
}

/**
 * JMdict entry (word)
 *
 * Equivalent to the `entry` JMdict element + miscellaneous info
 */
export interface DictWord {
  /**
   * The entry sequence number
   */
  readonly id: StringNumber;
  /**
   * The word's readings
   */
  readings: DictReading[];
  /**
   * The word's meanings/senses
   */
  meanings: DictMeaning[];
  /**
   * The word's kanji forms
   */
  kanjiForms?: DictKanjiForm[] | undefined;
  /**
   * Whether or not the entry has a priority tag (`k_pri` or `r_pri`)
   */
  isCommon?: true | undefined;
  /**
   * Whether or not the word is typically written in kana alone
   *
   * Set to `true` only if the word is usually written in kana for all word senses.
   */
  usuallyInKana?: true | undefined;
  /**
   * Whether or not the entry has at least one Tanaka Corpus phrase associated with it
   *
   * **May not always be accurate**
   */
  hasPhrases?: true | undefined;
}

/**
 * Miscellaneous information about the kanji
 *
 * Equivalent to the `misc` KANJIDIC2 element *(excluding some subelements)*
 */
export interface DictKanjiMisc {
  /**
   * The stroke count of the kanji, including the radical
   */
  strokeNumber?: string | undefined;
  /**
   * The kanji grade level
   *
   * 1-6 -> {@link https://en.wikipedia.org/wiki/Ky%C5%8Diku_kanji | Kyōiku kanji}
   *
   * 7-8 -> {@link https://en.wikipedia.org/wiki/J%C5%8Dy%C5%8D_kanji | Jōyō kanji} (excluding Kyōiku kanji)
   *
   * 9-10 -> {@link https://en.wikipedia.org/wiki/Jinmeiy%C5%8D_kanji | Jinmeiyō kanji}
   */
  grade?: string | undefined;
  /**
   * The frequency-of-use ranking
   *
   * A number from `1` to `2500`
   */
  frequency?: string | undefined;
  /**
   * The {@link https://en.wikipedia.org/wiki/Japanese-Language_Proficiency_Test#Previous_format_(1984%E2%80%932009) | pre-2010 JLPT} level
   */
  jlpt?: JLPT | undefined;
}

/**
 * Kanji reading information
 */
export interface DictKanjiReading {
  /**
   * The kanji reading (hiragana or katakana)
   */
  readonly reading: string;
  /**
   * The type of reading (onyomi or kunyomi)
   */
  type: "ja_on" | "ja_kun";
}

/**
 * Kanji "readings-meanings" pair
 *
 * Equivalent to the `rmgroup` KANJIDIC2 element
 */
export interface DictKanjiReadingMeaningGroup {
  /**
   * The kanji readings
   */
  readings?: DictKanjiReading[] | undefined;
  /**
   * The kanji meanings
   */
  meanings?: string[] | undefined;
}

/**
 * Kanji "readings-meanings" groups and nanori readings
 *
 * Equivalent to the `reading_meaning` KANJIDIC2 element
 */
export interface DictKanjiReadingMeaning {
  /**
   * The Kanji "readings-meanings" pairs
   */
  groups?: DictKanjiReadingMeaningGroup[] | undefined;
  /**
   * The kanji nanori readings
   */
  nanori?: string[] | undefined;
}

/**
 * KANJIDIC2 entry (kanji)
 *
 * Equivalent to the `character` KANJIDIC2 element *(excluding some subelements)*
 */
export interface DictKanji {
  /**
   * The kanji character
   */
  readonly kanji: string;
  /**
   * The miscellaneous information about the kanji
   */
  misc?: DictKanjiMisc | undefined;
  /**
   * The "readings-meanings" groups and nanori readings of the kanji
   */
  readingMeaning?: DictKanjiReadingMeaning[] | undefined;
  /**
   * Whether or not the kanji is kokuji
   */
  isKokuji?: true | undefined;
}

/**
 * RADKFILE2 entry (radical)
 */
export interface DictRadical {
  /**
   * The radical character
   */
  readonly radical: string;
  /**
   * The stroke count of the radical
   */
  readonly strokes: string;
  /**
   * The kanji that include the radical
   */
  kanji?: DictKanji[] | undefined;
}

/**
 * KRADFILE2 entry (kanji with its radicals/components)
 */
export interface DictKanjiWithRadicals {
  /**
   * The kanji character
   */
  readonly kanji: string;
  /**
   * The radicals/components that make up the kanji
   *
   * Can be {@link DictKanji} objects with either an actual kanji or a katakana character (which takes the place of the missing kanji)
   */
  radicals: DictKanji[];
}

/**
 * A word/part from the `B` section of a Tanaka Corpus `examples.utf` entry
 */
export interface ExamplePart {
  /**
   * The common form in which the word is found in JMdict
   */
  baseForm: string;
  /**
   * The reading (in kana) of the word
   */
  reading?: string | undefined;
  /**
   * The JMdict sense number corresponding to the word’s usage in the phrase
   */
  glossNumber?: number | undefined;
  /**
   * The actual form in which the word is used in the phrase
   */
  inflectedForm?: string | undefined;
  /**
   * A sequence number that references a JMdict entry associated with the word
   */
  referenceID?: StringNumber | undefined;
  /**
   * Whether or not the word is part of an entry that has been edited and adapted
   *
   * {@link https://www.edrdg.org/wiki/Tanaka_Corpus.html#Subset}
   *
   * {@link https://www.edrdg.org/wiki/Tanaka_Corpus.html#Initial_Modifications_to_the_Corpus}
   */
  edited?: true | undefined;
}

/**
 * A pair of a word ID and a number associated with a gloss number
 */
export interface GlossSpecificNumber {
  /**
   * The entry ID
   */
  readonly wordId: StringNumber;
  /**
   * The entry's gloss number
   */
  readonly glossNumber: number;
}

export type TanakaID = `${number}_${number}`;

/**
 * Tanaka Corpus `examples.utf` examples
 */
export interface TanakaExample {
  /**
   * The ID of the example
   */
  readonly id: TanakaID;
  /**
   * The Japanese phrase (found in the `A` section, **before** the tab)
   */
  readonly phrase: string;
  /**
   * The English translation of the phrase (found in the `A` section, **after** the tab)
   */
  readonly translation: string;
  /**
   * The `B` section, split into parts
   */
  readonly parts: ExamplePart[];
  /**
   * The Japanese phrase, with furigana attached
   */
  furigana?: string | undefined;
  /**
   * The word-gloss pair
   */
  glossNumber?: GlossSpecificNumber | undefined;
}

/**
 * A `JMdict entry ID` ---> {@link DictWord} `object` map
 */
export type WordIDEntryMap = Map<StringNumber, DictWord>;
/**
 * A `KANJIDIC kanji character` ---> {@link DictKanji} `object` map
 */
export type KanjiEntryMap = Map<string, DictKanji>;
/**
 * A `KANJIDIC kanji character` ---> `SVG filename` map
 */
export type KanjiSVGMap = Map<string, string>;
/**
 * A `KANJIDIC kanji character` ---> `JMdict entries with kanji forms that include the kanji` map
 */
export type KanjiWordsMap = Map<string, DictWord[]>;
/**
 * A `JMdict entry ID` ---> `Tanaka examples associated with the JMdict entry` map
 */
export type WordExamplesMap = Map<StringNumber, TanakaExample[]>;
/**
 * A `JMdict entry ID` ---> `Japanese definitions associated with the JMdict entry` map
 */
export type WordDefinitionsMap = Map<StringNumber, Definition[]>;

/**
 * Maps with various entry associations
 */
export interface EntryMaps {
  /**
   * @see {@link WordIDEntryMap}
   */
  wordIDEntryMap?: WordIDEntryMap | undefined;
  /**
   * @see {@link KanjiWordsMap}
   */
  kanjiWordsMap?: KanjiWordsMap | undefined;
  /**
   * @see {@link KanjiEntryMap}
   */
  kanjiEntryMap?: KanjiEntryMap | undefined;
  /**
   * @see {@link WordExamplesMap}
   */
  wordExamplesMap?: WordExamplesMap | undefined;
  /**
   * @see {@link WordDefinitionsMap}
   */
  wordDefinitionsMap?: WordDefinitionsMap | undefined;
  /**
   * @see {@link KanjiSVGMap}
   */
  kanjiSVGMap?: KanjiSVGMap | undefined;
}

export interface JaWiktionaryEntrySense {
  /**
   * The sense's glosses
   */
  glosses: string[];
  /**
   * The readings associated with the sense
   */
  form_of?: string[] | undefined;
}

/**
 * Useful information from a `ja.wiktionary.org` entry
 */
export interface JaWiktionaryEntry {
  /**
   * The "title" (word) of the page
   */
  word: string;
  /**
   * The part of speech (in Japanese)
   */
  pos_title: POS;
  /**
   * The word senses
   */
  senses?: JaWiktionaryEntrySense[] | undefined;
  /**
   * Other forms (as kanji form or kana) of the word
   */
  forms?: string[] | undefined;
}

/**
 * A word definition
 */
export interface Definition {
  /**
   * The definition
   */
  definition: string;
  /**
   * The definition with furigana attached
   */
  furigana?: string | undefined;
  /**
   * Whether or not the definition is associated with other words
   *
   * - `undefined` - accurate
   * - `1` - maybe inaccurate
   * - `2` - most likely inaccurate
   */
  mayNotBeAccurate?: 1 | 2 | undefined;
}

/**
 * A word paired with its definitions
 */
export interface WordDefinitionPair {
  /**
   * The word's JMdict entry ID
   */
  wordID: StringNumber;
  /**
   * The word definitions
   */
  definitions: Definition[];
  /**
   * The word's readings and/or kanji forms used when searching definitions.
   *
   * **Used for final checks in case of inaccurate definitions; always deleted afterwards**
   */
  wordForms?: Set<string> | undefined;
}

/**
 * Types of converted dictionary entries
 */
export type Dict =
  | DictWord[]
  | DictKanji[]
  | TanakaExample[]
  | DictRadical[]
  | DictKanjiWithRadicals[]
  | WordDefinitionPair[];

/**
 * Names of entry types used for the Anki note IDs
 */
export type EntryType = "word" | "kanji" | "radical" | "kana" | "grammar";

/**
 * Basic Anki note information
 */
export interface ResultEntry<E extends EntryType> {
  /**
   * ID used for the resulting Anki note
   */
  noteID?: `${`${E}_` | ""}${string}` | undefined;
  /**
   * ID used for the Anki note ID
   */
  id?: StringNumber | undefined;
  /**
   * Anki note type name
   */
  noteTypeName?: string | undefined;
  /**
   * The full path of the Anki deck
   */
  deckPath?: string | undefined;
  /**
   * Tags generated based on the entry's information
   */
  tags?: string[] | undefined;
  /**
   * Whether or not this entry should be converted into an Anki note
   */
  doNotCreateNote?: true | undefined;
}

/**
 * A pair of a "kanji form"/"reading"/"sense" note and its associated tag
 */
export interface NoteAndTag {
  /**
   * The note
   */
  readonly note: string;
  /**
   * The tag
   */
  readonly tag?: string | undefined;
}

/**
 * A kanji form of the word
 *
 * Converted from a {@link DictKanjiForm}
 */
export interface KanjiForm {
  /**
   * The kanji form
   */
  readonly kanjiForm: string;
  /**
   * Optional notes for the kanji form
   */
  notes?: string[] | undefined;
  /**
   * Whether or not the kanji form is common
   */
  common?: true | undefined;
}

/**
 * A reading of the word
 *
 * Converted from {@link DictReading}
 */
export interface Reading {
  /**
   * The reading (in kana)
   */
  readonly reading: string;
  /**
   * Optional notes for the reading
   */
  notes?: string[] | undefined;
  /**
   * Whether or not the reading is common
   */
  common?: true | undefined;
  /**
   * The filename of an audio file for the reading
   */
  audio?: string | undefined;
}

/**
 * A translation of the word
 *
 * Converted from {@link DictMeaning}
 */
export interface Translation {
  /**
   * The translation
   */
  readonly translation: string;
  /**
   * Information about the translation
   */
  notes?: string[] | undefined;
}

/**
 * Kanji component information
 */
export interface KanjiComponent {
  /**
   * The component character
   */
  readonly component: string;
  /**
   * The meaning of the component
   */
  meaning?: string | undefined;
}

/**
 * Kanji information
 *
 * Converted from {@link DictKanji} and extra info added
 */
export interface Kanji extends ResultEntry<"kanji"> {
  /**
   * @see {@link DictKanji.kanji}
   */
  readonly kanji: string;
  /**
   * @see {@link DictKanjiMisc.strokeNumber}
   */
  strokes?: string | undefined;
  /**
   * @see {@link DictKanjiReadingMeaningGroup.meanings}
   */
  meanings?: string[] | undefined;
  /**
   * The kanji onyomi readings
   */
  onyomi?: string[] | undefined;
  /**
   * The kanji kunyomi readings
   */
  kunyomi?: string[] | undefined;
  /**
   * @see {@link DictKanjiReadingMeaning.nanori}
   */
  nanori?: string[] | undefined;
  /**
   * The kanji SVG filename
   */
  svg?: string | undefined;
  /**
   * The kanji radicals/components
   */
  components?: KanjiComponent[] | undefined;
  /**
   * The kanji mnemonic
   */
  mnemonic?: string | undefined;
  /**
   * Words that use the kanji
   */
  words?: Word[] | undefined;
  /**
   * @see {@link DictKanjiMisc.grade}
   */
  grade?: string | undefined;
  /**
   * @see {@link DictKanjiMisc.frequency}
   */
  frequency?: string | undefined;
  /**
   * @see {@link DictKanjiMisc.jlpt}
   */
  jlpt?: JLPT | undefined;
  /**
   * Whether or not the kanji is a kokuji
   */
  kokuji?: true | undefined;
  /**
   * The source (besides KANJIDIC) from which data for this kanji has been extracted
   */
  source?: string | undefined;
  /**
   * Whether or not this kanji object contains information extracted from {@link source}
   */
  externalInfo?: true | undefined;
}

/**
 * Kanji radical/component information
 */
export interface Radical extends ResultEntry<"radical"> {
  /**
   * The radical/component character
   */
  readonly radical: string;
  /**
   * The radical/component reading (in kana)
   */
  reading: string;
  /**
   * The radical/component meanings
   */
  meanings: string[];
  /**
   * The stroke count of the radical/component
   */
  strokes?: string | undefined;
  /**
   * The radical/component SVG filename
   */
  svg?: string | undefined;
  /**
   * The radical/component mnemonic
   */
  mnemonic?: string | undefined;
  /**
   * Kanji that include the radical/component
   */
  kanji?: Kanji[] | undefined;
  /**
   * The sources from which data for this radical/component has been extracted
   */
  sources?: string[] | undefined;
  /**
   * Whether or not this radical/component object contains information extracted from {@link sources}
   */
  externalInfo?: true | undefined;
}

/**
 * Phrase information
 *
 * Converted from {@link TanakaExample}
 */
export interface Phrase {
  /**
   * The Japanese phrase, either with furigana attached or not
   */
  readonly phrase: string;
  /**
   * @see {@link TanakaExample.translation}
   */
  readonly translation: string;
  /**
   * @see {@link TanakaExample.phrase}
   */
  readonly originalPhrase: string;
  /**
   * @see {@link TanakaExample.glossNumber}
   */
  readonly glossNumber?: GlossSpecificNumber | undefined;
}

/**
 * Word information
 *
 * Converted from {@link DictWord}
 */
export interface Word extends ResultEntry<"word"> {
  /**
   * The word readings (in kana)
   */
  readings: Reading[];
  /**
   * The word translations/senses
   */
  translations: Translation[];
  /**
   * The word kanji forms
   */
  kanjiForms?: KanjiForm[] | undefined;
  /**
   * A list of kanji used in the kanji forms
   */
  kanji?: Kanji[] | undefined;
  /**
   * Phrases associated to the word
   */
  phrases?: Phrase[] | undefined;
  /**
   * Japanese definitions associated with the word
   */
  definitions?: Definition[] | undefined;
  /**
   * @see {@link DictWord.isCommon}
   */
  common?: true | undefined;
  /**
   * @see {@link DictWord.usuallyInKana}
   */
  usuallyInKana?: true | undefined;
}

/**
 * Kana information
 */
export interface Kana extends ResultEntry<"kana"> {
  /**
   * The kana character
   */
  readonly kana: string;
  /**
   * The romaji reading of the kana
   */
  reading: string;
  /**
   * The filename of an audio file for the kana reading
   */
  audio?: string | undefined;
  /**
   * The kana SVG filename
   */
  svg?: string | undefined;
}

/**
 * Grammar point meaning
 */
export interface GrammarMeaning {
  /**
   * The meaning of the grammar point
   */
  meaning: string;
  /**
   * An example phrase using the grammar point
   */
  example?: string | undefined;
}

/**
 * Grammar point information
 */
export interface Grammar extends ResultEntry<"grammar"> {
  /**
   * The most common form in which the grammar point written in
   */
  readonly point: string;
  /**
   * The English meaning/translation of the grammar point
   */
  meaning: GrammarMeaning;
  /**
   * The readings of the grammar point
   */
  readings?: Reading[] | undefined;
  /**
   * Ways in which the grammar point is used in Japanese
   */
  usages?: string[] | undefined;
  /**
   * Example phrase using the grammar point
   */
  phrases?: Phrase[] | undefined;
  /**
   * The {@link https://en.wikipedia.org/wiki/Japanese-Language_Proficiency_Test#Test_format | post-2010 JLPT} level
   */
  jlpt?: JLPT | undefined;
  /**
   * The source from which data for this grammar point has been extracted
   */
  source?: string | undefined;
  /**
   * The filename of an audio file for the grammar point
   */
  audio?: string | undefined;
}

/**
 * Any type of converted entry from a {@link Dict} array + others not from a dictionary
 */
export type Result = Word | Kanji | Radical | Kana | Grammar;

/**
 * Default note ID, note type and deck name of a note
 *
 * Setting any of the properties to:
 *
 * - a `string` will make that string the default note ID/note type/deck name of the note in case {@link Result.noteID}/{@link Result.noteTypeName}/{@link Result.deckPath} is `undefined`.
 *
 * - `true` will require all {@link Result} objects to have {@link Result.noteID}/{@link Result.noteTypeName}/{@link Result.deckPath} set (*no default values*).
 *
 * - `undefined` (*or not set*) will require all {@link Result} objects to either have {@link Result.noteID}/{@link Result.noteTypeName}/{@link Result.deckPath} set or not set (*no default values*).
 *
 */
export interface DefaultNoteInfo {
  /**
   * A default for {@link Result.noteID}
   *
   * `main_information` will make either the ID or kana/kanji/radical character the default note ID of the note.
   */
  guid?: "main_information" | true | undefined;
  /**
   * A default for {@link Result.noteTypeName}
   */
  noteType?: string | true | undefined;
  /**
   * A default for {@link Result.deckPath}
   */
  deckPath?: string | true | undefined;
}

/**
 * Anki note file headers keys
 *
 * @see {@link https://docs.ankiweb.net/importing/text-files.html#file-headers}
 */
export interface NoteHeaderKeys {
  /**
   * Field separator
   */
  readonly separator: `${string}:${string}`;
  /**
   * HTML treatment
   */
  readonly html: `${string}:${boolean}`;
  /**
   * GUID column header
   */
  readonly guid: `${string}:`;
  /**
   * Note type column header
   */
  readonly notetype: `${string}:`;
  /**
   * Deck name column header
   */
  readonly deck: `${string}:`;
  /**
   * Tags column header (*must be completed with a number after `:`*)
   */
  readonly tags: `${string}:`;
}

/**
 * Some useful regular expressions
 */
export interface UsefulRegExps {
  /**
   * Matches any *hiragana* character(s)
   */
  readonly hiragana: RegExp;
  /**
   * Matches any *katakana* character(s)
   */
  readonly katakana: RegExp;
  /**
   * Matches any *kanji* character(s)
   */
  readonly kanji: RegExp;
  /**
   * Matches any character that is part of the regex syntax
   */
  readonly regExChars: RegExp;
  /**
   * Matches the `#ID=` part in a Tanaka Corpus `examples.utf` file
   */
  readonly tanakaID: RegExp;
  /**
   * Matches and splits a part found in the `B` section of a Tanaka Corpus `examples.utf` file
   */
  readonly tanakaPart: RegExp;
  /**
   * Matches the reference ID element of a Tanaka example part
   */
  readonly tanakaReferenceID: RegExp;
}
