/**
 * JLPT levels
 */
export type JLPT = "N5" | "N4" | "N3" | "N2" | "N1";

/**
 * Standardized dictionary names
 */
export type DictName = "JMDict" | "Kanjidic" | "tanaka" | "radk" | "krad";

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
  partOfSpeech?: string[] | undefined;
  /**
   * Word glosses
   */
  translations?:
    | (string | { translation: string; type: "lit" | "expl" | "tm" })[]
    | undefined;
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
 * Equivalent to the `entry` JMdict element
 */
export interface DictWord {
  /**
   * The entry sequence number
   */
  readonly id: string;
  /**
   * The word's kanji forms
   */
  kanjiForms?: DictKanjiForm[] | undefined;
  /**
   * The word's readings
   */
  readings: DictReading[];
  /**
   * The word's meanings/senses
   */
  meanings: DictMeaning[];
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
  readonly strokeNumber: string;
  /**
   * The kanji grade level
   *
   * 1-6 -> {@link [Kyōiku kanji](https://en.wikipedia.org/wiki/Ky%C5%8Diku_kanji)}
   *
   * 7-8 -> {@link [Jōyō kanji](https://en.wikipedia.org/wiki/J%C5%8Dy%C5%8D_kanji)} (excluding Kyōiku kanji)
   *
   * 9-10 -> {@link [Jinmeiyō kanji](https://en.wikipedia.org/wiki/Jinmeiy%C5%8D_kanji)}
   */
  grade?: string | undefined;
  /**
   * The frequency-of-use ranking
   *
   * A number from `1` to `2500`
   */
  frequency?: string | undefined;
  /**
   * The {@link [pre-2010 JLPT](https://en.wikipedia.org/wiki/Japanese-Language_Proficiency_Test#Previous_format_(1984%E2%80%932009))} level
   */
  jlpt?: string | undefined;
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
  readings: DictKanjiReading[];
  /**
   * The kanji meanings
   */
  meanings: string[];
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
  groups: DictKanjiReadingMeaningGroup[];
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
  readingMeaning: DictKanjiReadingMeaning[];
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
   * The kanji that include the radical
   */
  kanji: DictKanji[];
  /**
   * The stroke count of the radical
   */
  strokes: string;
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
   * Can be {@link DictKanji} objects if the component is a kanji found in KANJIDIC and/or {@link Kana.kana} if the component is a katakana character that does not use (or have) its (or a) kanji variant.
   */
  radicals: (DictKanji | string)[];
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
  referenceID?: string | undefined;
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
 * Tanaka Corpus `examples.utf` examples
 */
export interface TanakaExample {
  /**
   * The Japanese phrase (found in the `A` section, **before** the tab)
   */
  phrase: string;
  /**
   * The English translation of the phrase (found in the `A` section, **after** the tab)
   */
  translation: string;
  /**
   * The `B` section, split into parts
   */
  parts: ExamplePart[];
  /**
   * The Japanese phrase, with furigana attached
   */
  furigana?: string | undefined;
}

/**
 * Any type of entry list
 */
export type Dict =
  | DictWord[]
  | DictKanji[]
  | TanakaExample[]
  | DictRadical[]
  | DictKanjiWithRadicals[];

/**
 * Names of entry types used for the Anki note IDs
 */
export type EntryType = "word" | "kanji" | "radical" | "kana" | "grammar";

/**
 * Basic Anki note information
 */
export interface ResultEntry<EntryType extends string> {
  /**
   * ID used for the resulting Anki note
   */
  readonly noteID?: `${EntryType}_${string}` | undefined;
  /**
   * ID used for the Anki note ID
   */
  readonly id?: string | undefined;
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
   * The source (besides KANJIDIC) from which data for this kanji has been extracted
   */
  source?: string | undefined;
  /**
   * Whether or not this kanji object contains information **only** from `jpdb.io`
   */
  fromJpdb?: true | undefined;
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
   * Whether or not this radical/component object contains information **only** from `jpdb.io`
   */
  fromJpdb?: true | undefined;
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
  translations?: Translation[];
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
   * Whether or not the word is common
   *
   * A word is considered *common* if the {@link DictWord.readings} and/or the {@link DictWord.kanjiForms} array(s) include(s) at least one element with the {@link DictReading.commonness} or {@link DictKanjiForm.commonness} property defined.
   */
  common?: true | undefined;
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
   * The {@link [post-2010 JLPT](https://en.wikipedia.org/wiki/Japanese-Language_Proficiency_Test#Test_format)} level
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
   * Matches and splits Japanese expressions into different scripts
   *
   * Used when creating a SSML
   */
  readonly scriptSplit: RegExp;
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
