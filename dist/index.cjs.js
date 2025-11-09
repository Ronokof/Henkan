"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  capitalizeString: () => capitalizeString,
  convertJMdict: () => convertJMdict,
  convertKanjiDic: () => convertKanjiDic,
  convertKradFile: () => convertKradFile,
  convertRadkFile: () => convertRadkFile,
  convertTanakaCorpus: () => convertTanakaCorpus,
  generateAnkiNote: () => generateAnkiNote,
  generateAnkiNotesFile: () => generateAnkiNotesFile,
  getKanji: () => getKanji,
  getKanjiExtended: () => getKanjiExtended,
  getWord: () => getWord,
  isGrammar: () => isGrammar,
  isKana: () => isKana,
  isKanji: () => isKanji,
  isRadical: () => isRadical,
  isStringArray: () => isStringArray,
  isValidArray: () => isValidArray,
  isValidArrayWithFirstElement: () => isValidArrayWithFirstElement,
  isWord: () => isWord,
  makeSSML: () => makeSSML,
  notSearchedForms: () => notSearchedForms,
  noteMap: () => noteMap,
  numberMap: () => numberMap,
  regexps: () => regexps,
  romajiMap: () => romajiMap,
  shuffleArray: () => shuffleArray,
  symbolMap: () => symbolMap,
  synthesizeSpeech: () => synthesizeSpeech
});
module.exports = __toCommonJS(index_exports);

// src/constants.ts
var regexps = {
  hiragana: /[\u{3040}-\u{309F}]/u,
  katakana: /[\u{30A0}-\u{30FF}]/u,
  kanji: new RegExp("\\p{Script=Han}+", "u"),
  scriptSplit: /([\p{sc=Han}]+|[\p{sc=Hiragana}]+|[\p{sc=Katakana}]+|[^\p{sc=Han}\p{sc=Hiragana}\p{sc=Katakana}]+)/u,
  regExChars: /[-\/\\^$*+?.()|[\]{}]/,
  tanakaID: /#ID=\d+_\d+$/,
  tanakaPart: /(?<base>[^()\[\]\{\}\s]+)(?:\((?<reading>[\S]+)\))?(?:\[(?<glossnum>[\S]+)\])?(?:\{(?<inflection>[\S]+)\})?/,
  tanakaReferenceID: /#([\d]+)/
};
var romajiMap = {
  A: "\u30A8\u30FC",
  B: "\u30D3\u30FC",
  C: "\u30B7\u30FC",
  D: "\u30C7\u30A3\u30FC",
  E: "\u30A4\u30FC",
  F: "\u30A8\u30D5",
  G: "\u30B8\u30FC",
  H: "\u30A8\u30A4\u30C1",
  I: "\u30A2\u30A4",
  J: "\u30B8\u30A7\u30FC",
  K: "\u30B1\u30FC",
  L: "\u30A8\u30EB",
  M: "\u30A8\u30E0",
  N: "\u30A8\u30CC",
  O: "\u30AA\u30FC",
  P: "\u30D4\u30FC",
  Q: "\u30AD\u30E5\u30FC",
  R: "\u30A2\u30FC\u30EB",
  S: "\u30A8\u30B9",
  T: "\u30C6\u30A3\u30FC",
  U: "\u30E6\u30FC",
  V: "\u30D6\u30A4",
  W: "\u30C0\u30D6\u30EA\u30E5\u30FC",
  X: "\u30A8\u30C3\u30AF\u30B9",
  Y: "\u30EF\u30A4",
  Z: "\u30BC\u30C3\u30C8"
};
var numberMap = {
  "0": "\u30BC\u30ED",
  "1": "\u30A4\u30C1",
  "2": "\u30CB",
  "3": "\u30B5\u30F3",
  "4": "\u30E8\u30F3",
  "5": "\u30B4",
  "6": "\u30ED\u30AF",
  "7": "\u30CA\u30CA",
  "8": "\u30CF\u30C1",
  "9": "\u30AD\u30E5\u30A6"
};
var symbolMap = {
  "\uFF04": "\u30C9\u30EB",
  "%": "\u30D1\u30FC\u30BB\u30F3\u30C8",
  "\xA5": "\u30A8\u30F3",
  "#": "\u30B7\u30E3\u30FC\u30D7",
  "@": "\u30A2\u30C3\u30C8",
  "&": "\u30A2\u30F3\u30C9"
};
var notSearchedForms = /* @__PURE__ */ new Set([
  "search-only kana form",
  "Search-only kana form",
  "rarely used kana form",
  "Rarely used kana form",
  "out-dated or obsolete kana usage",
  "Out-dated or obsolete kana usage",
  "search-only kanji form",
  "Search-only kanji form",
  "rarely-used kanji form",
  "Rarely-used kanji form",
  "out-dated kanji",
  "Out-dated kanji form",
  "out-dated kanji or kanji usage",
  "word containing out-dated kanji or kanji usage",
  "Out-dated kanji or kanji usage"
]);
var noteMap = /* @__PURE__ */ new Map([
  ["brazilian", ["dialect::brazilian", "Dialect: Brazilian"]],
  ["hokkaido-ben", ["dialect::hokkaido-ben", "Dialect: Hokkaid\u014D-ben"]],
  ["kansai-ben", ["dialect::kansai-ben", "Dialect: Kansai-ben"]],
  ["kantou-ben", ["dialect::kantou-ben", "Dialect: Kant\u014D-ben"]],
  ["kyoto-ben", ["dialect::kyoto-ben", "Dialect: Ky\u014Dto-ben"]],
  ["kyuushuu-ben", ["dialect::kyuushuu-ben", "Dialect: Ky\u016Bsh\u016B-ben"]],
  ["nagano-ben", ["dialect::nagano-ben", "Dialect: Nagano-ben"]],
  ["ryuukyuu-ben", ["dialect::ryuukyuu-ben", "Dialect: Ry\u016Bky\u016B-ben"]],
  ["osaka-ben", ["dialect::osaka-ben", "Dialect: \u014Csaka-ben"]],
  ["touhoku-ben", ["dialect::touhoku-ben", "Dialect: T\u014Dhoku-ben"]],
  ["tosa-ben", ["dialect::tosa-ben", "Dialect: Tosa-ben"]],
  ["tsugaru-ben", ["dialect::tsugaru-ben", "Dialect: Tsugaru-ben"]],
  ["aichi dialect", ["dialect::aichi", "Dialect: Aichi"]],
  ["tochigi dialect", ["dialect::tochigi", "Dialect: Tochigi"]],
  ["adjective (keiyoushi)", ["adjective::i", "\u3044-adjective"]],
  ["'taru' adjective", ["adjective::taru", "\u305F\u308B-adjective"]],
  ["noun (common) (futsuumeishi)", ["common_noun", "Common noun"]],
  [
    "pre-noun adjectival (rentaishi)",
    ["pre-noun_adjectival", "Pre-noun adjectival"]
  ],
  [
    "noun or verb acting prenominally",
    ["noun_or_verb_acting_prenominally", "Noun or verb acting prenominally"]
  ],
  ["pronoun", ["pronoun", "Pronoun"]],
  ["adverb (fukushi)", ["adverb", "Adverb"]],
  [
    "adverb taking the 'to' particle",
    ["takes::to", "Adverb taking the '\u3068' particle"]
  ],
  [
    "onomatopoeic or mimetic word",
    ["onomatopoeic_or_mimetic", "Onomatopoeic or mimetic word"]
  ],
  [
    "nouns which may take the genitive case particle 'no'",
    ["takes::no", "May take the '\u306E' particle"]
  ],
  [
    "noun or participle which takes the aux. verb suru",
    ["takes::suru", "Takes the aux. verb '\u3059\u308B'"]
  ],
  ["suru verb - irregular", ["suru_verb", "Irregular \u3059\u308B-verb"]],
  ["suru verb - special class", ["suru_verb", "Special \u3059\u308B-verb"]],
  ["ichidan verb", ["ichidan_verb", "Ichidan verb"]],
  [
    "godan verb with 'ku' ending",
    ["godan::ku::verb", "Godan verb with '\u304F' ending"]
  ],
  [
    "godan verb with 'gu' ending",
    ["godan::gu::verb", "Godan verb with '\u3050' ending"]
  ],
  [
    "godan verb with 'u' ending",
    ["godan::u::verb", "Godan verb with '\u3046' ending"]
  ],
  [
    "godan verb with 'tsu' ending",
    ["godan::tsu::verb", "Godan verb with '\u3064' ending"]
  ],
  [
    "godan verb with 'ru' ending",
    ["godan::ru::verb", "Godan verb with '\u308B' ending"]
  ],
  [
    "godan verb with 'nu' ending",
    ["godan::nu::verb", "Godan verb with '\u306C' ending"]
  ],
  [
    "godan verb with 'mu' ending",
    ["godan::mu::verb", "Godan verb with '\u3080' ending"]
  ],
  [
    "godan verb with 'bu' ending",
    ["godan::bu::verb", "Godan verb with '\u3076' ending"]
  ],
  [
    "godan verb with 'su' ending",
    ["godan::su::verb", "Godan verb with '\u3059' ending"]
  ],
  [
    "godan verb with 'u' ending (special class)",
    ["godan::u::irregular_verb", "Irregular godan verb with '\u3046' ending"]
  ],
  [
    "godan verb with 'ru' ending (irregular verb)",
    ["godan::ru::irregular_verb", "Irregular godan verb with '\u308B' ending"]
  ],
  [
    "godan verb - -aru special class",
    ["godan::aru::irregular_verb", "Irregular godan verb with '-\u3042\u308B' ending"]
  ],
  [
    "godan verb - iku/yuku special class",
    [
      "godan::iku_yuku::irregular_verb",
      "Irregular godan verb with '\u3044\u304F' or '\u3086\u304F' ending"
    ]
  ],
  [
    "irregular nu verb",
    ["godan::nu::irregular_verb", "Irregular godan verb with '\u306C' ending"]
  ],
  ["kuru verb - special class", ["kuru_verb", "Special '\u304F\u308B' verb"]],
  ["transitive verb", ["transitive_verb", "Transitive verb"]],
  ["intransitive verb", ["intransitive_verb", "Intransitive verb"]],
  ["auxiliary verb", ["auxiliary_verb", "Auxiliary verb"]],
  ["auxiliary adjective", ["adjective::auxiliary", "Auxiliary adjective"]],
  ["auxiliary", ["auxiliary", "Auxiliary"]],
  ["after a verb", ["after::verb", "After a verb"]],
  [
    "after the -te form of a verb",
    ["after::te_form", "After the '\u3066' form of a verb"]
  ],
  [
    "after te-form of verbs and adj.",
    [
      "after::verb_or_adjective_te_form",
      "After the '\u3066' form of a verb or an adjective"
    ]
  ],
  [
    "after the -masu stem of a verb",
    ["after::masu_stem", "After the '-\u307E\u3059' stem of a verb"]
  ],
  [
    "after -masu stem of verb",
    ["after::masu_stem", "After the '-\u307E\u3059' stem of a verb"]
  ],
  [
    "after masu stem of verb",
    ["after::masu_stem", "After the '-\u307E\u3059' stem of a verb"]
  ],
  [
    "after -masu stem or adj. stem",
    [
      "after::masu_or_adjective_stem",
      "After the '-\u307E\u3059' stem of a verb or an adjective stem"
    ]
  ],
  [
    "after a noun or the -masu stem of a verb",
    ["after::noun_or_masu_stem", "After a noun or the '-\u307E\u3059' stem of a verb"]
  ],
  [
    "after the plain past form of a verb",
    ["after::past_verb_form", "After the '\u305F' form of a verb"]
  ],
  [
    "after present form of a verb",
    ["after::plain_verb_form", "After present form of a verb"]
  ],
  [
    "after the dictionary form of a verb",
    ["after::plain_verb_form", "After present form of a verb"]
  ],
  [
    "after past form of a verb",
    ["after::past_verb_form", "After the '\u305F' form of a verb"]
  ],
  [
    "after volitional form of verb",
    ["after::volitional_verb_form", "After volitional form of verb"]
  ],
  [
    "after the past tense form of a verb",
    ["after::past_verb_form", "After the '\u305F' form of a verb"]
  ],
  ["after adjective stem", ["after::adjective_stem", "After adjective stem"]],
  ["with neg. sentence", ["with::negative_verb", "With negative verb"]],
  ["with neg. verb", ["with::negative_verb", "With negative verb"]],
  ["with. neg. verb", ["with::negative_verb", "With negative verb"]],
  [
    "with a verb in negative form",
    ["with::negative_verb", "With negative verb"]
  ],
  ["with verb in the negative", ["with::negative_verb", "With negative verb"]],
  ["with negative verb", ["with::negative_verb", "With negative verb"]],
  [
    "after negative base of verb",
    ["after::negative_verb_base", "After the base of a verb"]
  ],
  [
    'follows a verb in "-te" form',
    ["after::te_form", "After the '\u3066' form of a verb"]
  ],
  [
    "before a verb in negative form",
    ["before::negative_verb", "Before a verb in negative form"]
  ],
  [
    "before a negative form",
    ["before::negative_verb", "Before a verb in negative form"]
  ],
  [
    "before a neg. form",
    ["before::negative_verb", "Before a verb in negative form"]
  ],
  [
    "before a noun or a verb",
    ["before::noun_or_verb", "Before a noun or a verb"]
  ],
  ["before an adjective", ["before::adjective", "Before an adjective"]],
  ["after a noun", ["after::noun", "After a noun"]],
  ["prefix", ["prefix", "Prefix"]],
  ["noun, used as a prefix", ["prefix_noun", "Noun, used as a prefix"]],
  ["suffix", ["suffix", "Suffix"]],
  ["noun, used as a suffix", ["suffix_noun", "Noun, used as a suffix"]],
  ["counter", ["counter", "Counter"]],
  ["numeric", ["numeric", "Numeric"]],
  ["particle", ["particle", "Particle"]],
  ["conjunction", ["conjunction", "Conjunction"]],
  ["expression", ["expression", "Expression"]],
  ["idiomatic expression", ["idiomatic_expression", "Idiomatic expression"]],
  ["interjection (kandoushi)", ["interjection", "Interjection"]],
  ["proverb", ["proverb", "Proverb"]],
  ["yojijukugo", ["yojijukugo", "Yojijukugo"]],
  ["archaism", ["archaism", "Archaism"]],
  ["obsolete term", ["obsolete", "Obsolete"]],
  ["dated term", ["dated", "Dated"]],
  ["rare", ["rare", "Rare"]],
  ["colloquialism", ["colloquialism", "Colloquialism"]],
  ["slang", ["slang", "Slang"]],
  ["internet slang", ["internet_slang", "Internet slang"]],
  ["jocular, humorous term", ["jocular_humorous", "Jocular or humorous"]],
  ["vulgar expression or word", ["vulgar", "Vulgar"]],
  ["derogatory", ["derogatory", "Derogatory"]],
  ["sensitive", ["sensitive", "Sensitive"]],
  ["euphemistic", ["euphemistic", "Euphemistic"]],
  ["abbreviation", ["abbreviation", "Abbreviation"]],
  ["male term or language", ["male_language", "Male language"]],
  ["female term or language", ["female_language", "Female language"]],
  [
    "honorific or respectful (sonkeigo) language",
    ["sonkeigo", "Honorific or respectful (sonkeigo) language"]
  ],
  ["polite (teineigo) language", ["teineigo", "Polite (teineigo) language"]],
  ["humble (kenjougo) language", ["kenjougo", "Humble (kenjougo) language"]],
  ["familiar language", ["familiar_language", "Familiar language"]],
  [
    "familiar or derogatory",
    ["familiar_or_derogatory", "Familiar or derogatory"]
  ],
  [
    "derogatory or familiar",
    ["familiar_or_derogatory", "Familiar or derogatory"]
  ],
  ["children's language", ["children_language", "Children language"]],
  [
    "formal or literary term",
    ["formal_or_literary", "Formal or literary term"]
  ],
  [
    "usually written using kana alone",
    ["usually_in_kana", "Usually written using kana alone"]
  ],
  ["ateji (phonetic) reading", ["ateji", "Ateji (phonetic) reading"]],
  ["rarely-used kanji form", ["rare_kanji_form", "Rarely-used kanji form"]],
  ["out-dated kanji", ["out-dated_kanji_form", "Out-dated kanji form"]],
  [
    "gikun (meaning as reading) or jukujikun (special kanji reading)",
    [
      "gikun_or_jukujikun",
      "Gikun (meaning as reading) or jukujikun (special kanji reading)"
    ]
  ],
  [
    "irregular okurigana usage",
    ["irregular::okurigana", "Irregular okurigana usage"]
  ],
  ["irregular kana usage", ["irregular::kana", "Irregular kana usage"]],
  [
    "word containing irregular kana usage",
    ["irregular::kana", "Irregular kana usage"]
  ],
  [
    "out-dated or obsolete kana usage",
    ["out-dated_or_obsolete_kana", "Out-dated or obsolete kana usage"]
  ],
  ["irregular kanji", ["irregular::kanji_form", "Irregular kanji form"]],
  ["irreg. kanji form", ["irregular::kanji_form", "Irregular kanji form"]],
  ["mathematics term", ["mathematics", "Mathematics term"]],
  ["computer terminology", ["computer_terminology", "Computer terminology"]],
  ["buddhist term", ["buddhism", "Buddhist term"]],
  ["physics terminology", ["physics", "Physics terminology"]],
  ["food term", ["food", "Food term"]],
  ["chemistry term", ["chemistry", "Chemistry term"]],
  ["historical term", ["historical", "Historical term"]],
  ["grammar", ["grammar", "Grammar"]],
  ["martial arts term", ["martial_arts", "Martial arts term"]],
  ["linguistics terminology", ["linguistics", "Linguistics terminology"]],
  ["sports term", ["sports", "Sports term"]],
  ["sumo term", ["sumo", "Sumo term"]],
  ["astronomy term", ["astronomy", "Astronomy term"]],
  ["baseball term", ["baseball", "Baseball term"]],
  ["biology term", ["biology", "Biology term"]],
  ["shogi term", ["shogi", "Shogi term"]],
  ["logic", ["logic", "Logic"]],
  ["medicine term", ["medicine", "Medicine term"]],
  ["music", ["music", "Music term"]],
  ["music term", ["music", "Music term"]],
  ["geology", ["geology", "Geology term"]],
  ["geology term", ["geology", "Geology term"]],
  ["meteorology", ["meteorology", "Meteorology term"]],
  ["shinto term", ["shinto", "Shinto term"]],
  ["christianity", ["christianity", "Christianity"]],
  ["finance term", ["finance", "Finance term"]],
  ["economics term", ["economics", "Economics term"]],
  ["business term", ["business", "Business term"]],
  ["statistics", ["statistics", "Statistics term"]],
  ["anatomical term", ["anatomical", "Anatomical term"]],
  ["genetics", ["genetics", "Genetics term"]],
  ["engineering term", ["engineering", "Engineering term"]],
  ["architecture term", ["architecture", "Architecture term"]],
  ["paleography term", ["paleography", "Paleography term"]],
  ["psychiatry", ["psychiatry", "Psychiatry term"]],
  ["law term", ["law", "Law term"]],
  ["military term", ["military", "Military term"]],
  ["mahjong term", ["mahjong", "Mahjong term"]],
  ["philosophy", ["philosophy", "Philosophy term"]],
  ["physiology", ["physiology", "Physiology term"]],
  ["zoology term", ["zoology", "Zoology term"]],
  ["card games", ["card_games", "Card games term"]],
  ["hanafuda", ["hanafuda", "Hanafuda term"]],
  ["go (game)", ["go", "Go (game) term"]],
  ["golf", ["golf", "Golf term"]],
  ["fishing", ["fishing", "Fishing term"]],
  ["on-yomi, go", ["on-yomi::go", "On-yomi go-on reading"]],
  ["on-yomi, kan", ["on-yomi::kan", "On-yomi kan-on reading"]],
  ["on-yomi, kan\\'you", ["on-yomi::kanyou", "On-yomi kan 'y\u014D-on reading"]],
  ["kun-yomi", ["kun-yomi", "Kun-yomi reading"]],
  [
    "reading used only in names (nanori)",
    ["nanori", "Reading used only in names (nanori)"]
  ],
  ["on-yomi", ["on-yomi", "On-yomi reading"]],
  [
    "reading used as name of radical",
    ["radical_reading", "Reading used as name of radical"]
  ],
  ["rarely used kana form", ["rare_kana_form", "Rarely used kana form"]],
  ["search-only kana form", ["search-only_kana_form", "Search-only kana form"]],
  ["on-yomi, tou", ["on-yomi::tou", "On-yomi t\u014D-on reading"]],
  ["irregular kanji usage", ["irregular::kanji_form", "Irregular kanji usage"]],
  [
    "word containing irregular kanji usage",
    ["irregular::kanji_form", "Irregular kanji usage"]
  ],
  [
    "out-dated kanji or kanji usage",
    ["out-dated_kanji_form", "Out-dated kanji or kanji usage"]
  ],
  [
    "word containing out-dated kanji or kanji usage",
    ["out-dated_kanji_form", "Out-dated kanji or kanji usage"]
  ],
  ["rarely used kanji form", ["rare_kanji_form", "Rarely used kanji form"]],
  [
    "search-only kanji form",
    ["search-only_kanji_form", "Search-only kanji form"]
  ],
  ["aphorism (pithy saying)", ["aphorism", "Aphorism"]],
  ["archaic", ["archaism", "Archaism"]],
  ["character", ["character", "Character"]],
  ["colloquial", ["colloquialism", "Colloquialism"]],
  ["company name", ["company_name", "Company name"]],
  ["creature", ["creature", "Creature"]],
  ["deity", ["deity", "Deity"]],
  ["document", ["document", "Document"]],
  ["event", ["event", "Event"]],
  ["female term, language, or name", ["female_language", "Female language"]],
  ["fiction", ["fiction", "Fiction"]],
  [
    "given name or forename, gender not specified",
    ["given_name_or_forename", "Given name or forename, gender not specified"]
  ],
  ["group", ["group", "Group"]],
  ["legend", ["legend", "Legend"]],
  ["manga slang", ["manga_slang", "Manga slang"]],
  ["male term, language, or name", ["male_language", "Male language"]],
  ["mythology", ["mythology", "Mythology"]],
  ["object", ["object", "Object"]],
  ["organization name", ["organization_name", "Organization name"]],
  ["other", ["other", "Other"]],
  [
    "full name of a particular person",
    ["full_name_or_particular_person", "Full name of a particular person"]
  ],
  ["place name", ["place_name", "Place name"]],
  ["poetical term", ["poetical", "Poetical"]],
  ["product name", ["product_name", "Product name"]],
  ["quotation", ["quotation", "Quotation"]],
  ["rare term", ["rare", "Rare"]],
  ["religion", ["religion", "Religion"]],
  ["service", ["service", "Service"]],
  ["ship name", ["ship_name", "Ship name"]],
  ["railway station", ["railway_station", "Railway station"]],
  ["family or surname", ["family_or_surname", "Family or surname"]],
  [
    "word usually written using kana alone",
    ["usually_in_kana", "Usually written using kana alone"]
  ],
  ["unclassified name", ["unclassified", "Unclassified name"]],
  [
    "work of art, literature, music, etc. name",
    ["work_of_art", "Work of art, literature, music, etc. name"]
  ],
  [
    "rude or x-rated term (not displayed in educational software)",
    ["rude_or_x-rated", "Rude or X-rated term"]
  ],
  [
    "adjective (keiyoushi) - yoi/ii class",
    ["adjective::yoi/ii", "\u3044-adjective - \u3088\u3044/\u3044\u3044 class"]
  ],
  [
    "'kari' adjective (archaic)",
    ["adjective::kari", "'\u304B\u308A' adjective (archaic)"]
  ],
  ["'ku' adjective (archaic)", ["adjective::ku", "'\u304F' adjective (archaic)"]],
  [
    "adjectival nouns or quasi-adjectives (keiyodoshi)",
    ["na-adjective", "\u306A-adjective"]
  ],
  [
    "archaic/formal form of na-adjective",
    ["na-adjective_archaic_or_formal", "archaic/formal form of \u306A-adjective"]
  ],
  [
    "'shiku' adjective (archaic)",
    ["adjective::shiku", "'\u3057\u304F' adjective (archaic)"]
  ],
  ["copula", ["copula", "Copula"]],
  [
    "expressions (phrases, clauses, etc.)",
    ["expression", "Expression (phrase, clause, etc.)"]
  ],
  ["adverbial noun (fukushitekimeishi)", ["adverbial_noun", "Adverbial noun"]],
  ["proper noun", ["proper_noun", "Proper noun"]],
  ["noun (temporal) (jisoumeishi)", ["temporal_noun", "Temporal noun"]],
  ["unclassified", ["unclassified", "Unclassified"]],
  ["verb unspecified", ["unspecified_verb", "Unspecified verb"]],
  [
    "ichidan verb - kureru special class",
    ["ichidan_verb::kureru", "Ichidan verb - \u304F\u308C\u308B special class"]
  ],
  [
    "nidan verb with 'u' ending (archaic)",
    ["nidan_verb::u", "Nidan verb with '\u3046' ending (archaic)"]
  ],
  [
    "nidan verb (upper class) with 'bu' ending (archaic)",
    [
      "nidan_verb::bu::upper_class",
      "Nidan verb (upper class) with '\u3076' ending (archaic)"
    ]
  ],
  [
    "nidan verb (lower class) with 'bu' ending (archaic)",
    [
      "nidan_verb::bu::lower_class",
      "Nidan verb (lower class) with '\u3076' ending (archaic)"
    ]
  ],
  [
    "nidan verb (upper class) with 'dzu' ending (archaic)",
    [
      "nidan_verb::dzu::upper_class",
      "Nidan verb (upper class) with '\u3065' ending (archaic)"
    ]
  ],
  [
    "nidan verb (lower class) with 'dzu' ending (archaic)",
    [
      "nidan_verb::dzu::lower_class",
      "Nidan verb (lower class) with '\u3065' ending (archaic)"
    ]
  ],
  [
    "nidan verb (upper class) with 'gu' ending (archaic)",
    [
      "nidan_verb::gu::upper_class",
      "Nidan verb (upper class) with '\u3050' ending (archaic)"
    ]
  ],
  [
    "nidan verb (lower class) with 'gu' ending (archaic)",
    [
      "nidan_verb::gu::lower_class",
      "Nidan verb (lower class) with '\u3050' ending (archaic)"
    ]
  ],
  [
    "nidan verb (upper class) with 'hu/fu' ending (archaic)",
    [
      "nidan_verb::hu/fu::upper_class",
      "Nidan verb (upper class) with '\u3075' ending (archaic)"
    ]
  ],
  [
    "nidan verb (lower class) with 'hu/fu' ending (archaic)",
    [
      "nidan_verb::hu/fu::lower_class",
      "Nidan verb (lower class) with '\u3075' ending (archaic)"
    ]
  ],
  [
    "nidan verb (upper class) with 'ku' ending (archaic)",
    [
      "nidan_verb::ku::upper_class",
      "Nidan verb (upper class) with '\u304F' ending (archaic)"
    ]
  ],
  [
    "nidan verb (lower class) with 'ku' ending (archaic)",
    [
      "nidan_verb::ku::lower_class",
      "Nidan verb (lower class) with '\u304F' ending (archaic)"
    ]
  ],
  [
    "nidan verb (upper class) with 'mu' ending (archaic)",
    [
      "nidan_verb::mu::upper_class",
      "Nidan verb (upper class) with '\u3080' ending (archaic)"
    ]
  ],
  [
    "nidan verb (lower class) with 'mu' ending (archaic)",
    [
      "nidan_verb::mu::lower_class",
      "Nidan verb (lower class) with '\u3080' ending (archaic)"
    ]
  ],
  [
    "nidan verb (lower class) with 'nu' ending (archaic)",
    [
      "nidan_verb::nu::lower_class",
      "Nidan verb (lower class) with '\u306C' ending (archaic)"
    ]
  ],
  [
    "nidan verb (upper class) with 'ru' ending (archaic)",
    [
      "nidan_verb::ru::upper_class",
      "Nidan verb (upper class) with '\u308B' ending (archaic)"
    ]
  ],
  [
    "nidan verb (lower class) with 'ru' ending (archaic)",
    [
      "nidan_verb::ru::lower_class",
      "Nidan verb (lower class) with '\u308B' ending (archaic)"
    ]
  ],
  [
    "nidan verb (lower class) with 'su' ending (archaic)",
    [
      "nidan_verb::su::lower_class",
      "Nidan verb (lower class) with '\u3059' ending (archaic)"
    ]
  ],
  [
    "nidan verb (upper class) with 'tsu' ending (archaic)",
    [
      "nidan_verb::tsu::upper_class",
      "Nidan verb (upper class) with '\u3064' ending (archaic)"
    ]
  ],
  [
    "nidan verb (lower class) with 'tsu' ending (archaic)",
    [
      "nidan_verb::tsu::lower_class",
      "Nidan verb (lower class) with '\u3064' ending (archaic)"
    ]
  ],
  [
    "nidan verb (lower class) with 'u' ending and 'we' conjugation (archaic)",
    [
      "nidan_verb::u_with_we_conjugation::lower_class",
      "Nidan verb (lower class) with '\u3046' ending and '\u3091' conjugation (archaic)"
    ]
  ],
  [
    "nidan verb (upper class) with 'yu' ending (archaic)",
    [
      "nidan_verb::yu::upper_class",
      "Nidan verb (upper class) with '\u3086' ending (archaic)"
    ]
  ],
  [
    "nidan verb (lower class) with 'yu' ending (archaic)",
    [
      "nidan_verb::yu::lower_class",
      "Nidan verb (lower class) with '\u3086' ending (archaic)"
    ]
  ],
  [
    "nidan verb (lower class) with 'zu' ending (archaic)",
    [
      "nidan_verb::zu::lower_class",
      "Nidan verb (lower class) with '\u305A' ending (archaic)"
    ]
  ],
  [
    "yodan verb with 'bu' ending (archaic)",
    ["yodan_verb::bu", "Yodan verb with '\u3076' ending (archaic)"]
  ],
  [
    "yodan verb with 'gu' ending (archaic)",
    ["yodan_verb::gu", "Yodan verb with '\u3050' ending (archaic)"]
  ],
  [
    "yodan verb with 'hu/fu' ending (archaic)",
    ["yodan_verb::hu/fu", "Yodan verb with '\u3075' ending (archaic)"]
  ],
  [
    "yodan verb with 'ku' ending (archaic)",
    ["yodan_verb::ku", "Yodan verb with '\u304F' ending (archaic)"]
  ],
  [
    "yodan verb with 'mu' ending (archaic)",
    ["yodan_verb::mu", "Yodan verb with '\u3080' ending (archaic)"]
  ],
  [
    "yodan verb with 'nu' ending (archaic)",
    ["yodan_verb::nu", "Yodan verb with '\u306C' ending (archaic)"]
  ],
  [
    "yodan verb with 'ru' ending (archaic)",
    ["yodan_verb::ru", "Yodan verb with '\u308B' ending (archaic)"]
  ],
  [
    "yodan verb with 'su' ending (archaic)",
    ["yodan_verb::su", "Yodan verb with '\u3059' ending (archaic)"]
  ],
  [
    "yodan verb with 'tsu' ending (archaic)",
    ["yodan_verb::tsu", "Yodan verb with '\u3064' ending (archaic)"]
  ],
  [
    "godan verb - uru old class verb (old form of eru)",
    [
      "godan::uru::irregular_verb",
      "Godan verb - '\u3046\u308B' old class verb (old form of \u3048\u308B)"
    ]
  ],
  [
    "irregular ru verb, plain form ends with -ri",
    [
      "irregular_ru_verb_plain_form_ending_with_ri",
      "irregular '\u308B' verb, plain form ends with '-\u308A'"
    ]
  ],
  [
    "su verb - precursor to the modern suru",
    ["su_verb", "'\u3059' verb - precursor to the modern \u3059\u308B"]
  ],
  ["suru verb - included", ["suru_verb", "'\u3059\u308B' verb - included"]],
  [
    "ichidan verb - zuru verb (alternative form of -jiru verbs)",
    [
      "ichidan_verb::zuru",
      "Ichidan verb - '\u305A\u308B' verb (alternative form of '-\u3058\u308B' verbs)"
    ]
  ],
  ["agriculture", ["agriculture", "Agriculture term"]],
  ["anatomy", ["anatomical", "Anatomical term"]],
  ["archeology", ["archeology", "Archeology term"]],
  ["architecture", ["architecture", "Architecture term"]],
  ["art, aesthetics", ["art/aesthetics", "Art, aesthetics"]],
  ["astronomy", ["astronomy", "Astronomy term"]],
  ["audiovisual", ["audiovisual", "Audiovisual"]],
  ["aviation", ["aviation", "Aviation"]],
  ["baseball", ["baseball", "Baseball term"]],
  ["biochemistry", ["biochemistry", "Biochemistry term"]],
  ["biology", ["biology", "Biology term"]],
  ["botany", ["botany", "Botany term"]],
  ["botany term", ["botany", "Botany term"]],
  ["boxing", ["boxing", "Boxing term"]],
  ["buddhism", ["buddhism", "Buddhist term"]],
  ["business", ["business", "Business term"]],
  ["chemistry", ["chemistry", "Chemistry term"]],
  ["chinese mythology", ["mythology::chinese", "Chinese mythology"]],
  ["civil engineering", ["civil_engineering", "Civil engineering"]],
  ["clothing", ["clothing", "Clothing"]],
  ["computing", ["computing", "Computing"]],
  ["crystallography", ["crystallography", "Crystallography"]],
  ["dentistry", ["dentistry", "Dentistry"]],
  ["ecology", ["ecology", "Ecology"]],
  ["economics", ["economics", "Economics term"]],
  [
    "electricity, elec. eng.",
    ["electrical_engineering", "Electrical engineering"]
  ],
  ["electronics", ["electronics", "Electronics"]],
  ["embryology", ["embryology", "Embryology"]],
  ["engineering", ["engineering", "Engineering term"]],
  ["entomology", ["entomology", "Entomology"]],
  ["figure skating", ["figure_skating", "Figure skating"]],
  ["film", ["film", "Film"]],
  ["finance", ["finance", "Finance term"]],
  ["food, cooking", ["food", "Food term"]],
  ["gardening, horticulture", ["gardening", "Gardening"]],
  ["geography", ["geography", "Geography term"]],
  ["geometry", ["geometry", "Geometry term"]],
  ["geometry term", ["geometry", "Geometry term"]],
  ["greek mythology", ["mythology::greek", "Greek mythology"]],
  ["horse racing", ["horse_racing", "Horse racing"]],
  ["internet", ["internet", "Internet"]],
  ["japanese mythology", ["mythology::japanese", "Japanese mythology"]],
  ["kabuki", ["kabuki", "Kabuki"]],
  ["law", ["law", "Law term"]],
  ["linguistics", ["linguistics", "Linguistics terminology"]],
  ["martial arts", ["martial_arts", "Martial arts term"]],
  ["mahjong", ["mahjong", "Mahjong term"]],
  ["manga", ["manga", "Manga term"]],
  ["mathematics", ["mathematics", "Mathematics term"]],
  [
    "mechanical engineering",
    ["mechanical_engineering", "Mechanical engineering"]
  ],
  ["medicine", ["medicine", "Medicine term"]],
  ["military", ["military", "Military term"]],
  ["mineralogy", ["mineralogy", "Mineralogy term"]],
  ["mining", ["mining", "Mining term"]],
  ["motorsport", ["motorsport", "Motorsport"]],
  ["noh", ["noh", "Noh term"]],
  ["ornithology", ["ornithology", "Ornithology"]],
  ["paleontology", ["paleontology", "Paleontology"]],
  ["pathology", ["pathology", "Pathology"]],
  ["pharmacology", ["pharmacology", "Pharmacology"]],
  ["photography", ["photography", "Photography"]],
  ["physics", ["physics", "Physics terminology"]],
  ["politics", ["politics", "Politics term"]],
  ["printing", ["printing", "Printing term"]],
  [
    "professional wrestling",
    ["professional_wrestling", "Professional wrestling term"]
  ],
  ["psychoanalysis", ["psychoanalysis", "Psychoanalysis term"]],
  ["psychology", ["psychology", "Psychology term"]],
  ["railway", ["railway_station", "Railway station"]],
  ["roman mythology", ["mythology::roman", "Roman mythology"]],
  ["shinto", ["shinto", "Shinto term"]],
  ["shogi", ["shogi", "Shogi term"]],
  ["skiing", ["skiing", "Skiing"]],
  ["sports", ["sports", "Sports term"]],
  ["stock market", ["stock_market", "Stock market"]],
  ["sumo", ["sumo", "Sumo term"]],
  ["surgery", ["surgery", "Surgery"]],
  ["telecommunications", ["telecommunications", "Telecommunications"]],
  ["television", ["television", "Television"]],
  ["veterinary terms", ["veterinary", "Veterinary term"]],
  ["video games", ["video_games", "Video games term"]],
  ["zoology", ["zoology", "Zoology term"]],
  ["equivalent", ["equivalent", "Equivalent"]],
  ["edo-period term", ["edo-period", "Edo-period term"]],
  ["heian-period term", ["heian-period", "Heian-period term"]],
  [
    "imperial japanese army jargon",
    ["imperial_japanese_army_jargon", "Imperial Japanese army jargon"]
  ],
  [
    "meiji and taish\u014D-era term",
    ["meiji_and_taishou_era", "Meiji and Taish\u014D-era term"]
  ],
  [
    "after -masu base of verb; indicates contempt or disdain for another's actions",
    [
      "after::masu_stem",
      "After '-\u307E\u3059' base of verb; indicates contempt or disdain for another's actions"
    ]
  ],
  [
    "after -masu stem of verb; indicates an action is being directed to someone",
    [
      "after::masu_stem",
      "After '-\u307E\u3059' stem of verb; indicates an action is being directed to someone"
    ]
  ],
  [
    "after -masu stem of verb; often \u3050\u308B\u3057\u3044",
    ["after::masu_stem", "After '-\u307E\u3059' stem of verb; often \u3050\u308B\u3057\u3044"]
  ],
  [
    "after -masu stems, onomatopoeic and mimetic words",
    ["after::masu_stem", "After '-\u307E\u3059' stems, onomatopoeic and mimetic words"]
  ],
  [
    "after a -masu stem, esp. of a suru verb",
    ["after::masu_stem", "After a '-\u307E\u3059' stem, esp. of a \u3059\u308B verb"]
  ],
  ["after a -nai stem", ["after::nai_stem", "After a '-\u306A\u3044' stem"]],
  ["after a name", ["after::name", "After a name"]],
  ["after a noun (+ \u306E)", ["after::noun", "After a noun (+ \u306E)"]],
  [
    "after a noun at the end of an interjection",
    ["after::noun", "After a noun at the end of an interjection"]
  ],
  [
    "after a noun indicating a person",
    ["after::noun", "After a noun indicating a person"]
  ],
  [
    "after a noun or -masu stem",
    ["after::noun_or_masu_stem", "After a noun or '-\u307E\u3059' stem"]
  ],
  [
    "after a noun or counter",
    ["after::noun_or_counter", "After a noun or counter"]
  ],
  [
    "after a noun or na-adjective; in conditional clauses",
    [
      "after::noun_or_na-adjective",
      "After a noun or \u306A-adjective; in conditional clauses"
    ]
  ],
  [
    "after a noun or pronoun",
    ["after::noun_or_pronoun", "After a noun or pronoun"]
  ],
  [
    "after a noun, adverb or adj. stem",
    [
      "after::noun_adverb_or_adjective_stem",
      "After a noun, adverb or adjective stem"
    ]
  ],
  ["after a number n", ["after::number", "After a number"]],
  [
    "after a number of people",
    ["after::number_of_people", "After a number of people"]
  ],
  [
    "after a number or counter",
    ["after::number_or_counter", "After a number or counter"]
  ],
  ["after a quantity", ["after::quantity", "After a quantity"]],
  [
    "after a quantity, age, time, etc.",
    ["after::quantity", "After a quantity, age, time, etc."]
  ],
  ["after a surname", ["after::surname", "After a surname"]],
  [
    "after a time, date, etc.",
    ["after::time_date", "After a time, date, etc."]
  ],
  [
    "after a verb in the past tense",
    ["after::past_verb_form", "After the '\u305F' form of a verb"]
  ],
  [
    "after a volitional form",
    ["after::volitional_verb_form", "After volitional form of verb"]
  ],
  [
    "after an adjective, verb, or noun",
    ["after::adjective_verb_or_noun", "After an adjective, verb, or noun"]
  ],
  ["after an adverb", ["after::adverb", "After an adverb"]],
  ["after an age", ["after::age", "After an age"]],
  [
    "after an interrogative",
    ["after::interrogative", "After an interrogative"]
  ],
  [
    "after conditional -ba form of verb",
    ["after::conditional_ba_verb_form", "After conditional '-\u3070' form of verb"]
  ],
  [
    "after dictionary form verb",
    ["after::plain_verb_form", "After present form of a verb"]
  ],
  ["after neg. verb", ["with::negative_verb", "With negative verb"]],
  ["after negative verb", ["with::negative_verb", "With negative verb"]],
  [
    "after past tense verb",
    ["after::past_verb_form", "After the '\u305F' form of a verb"]
  ],
  [
    "after plain form of a verb or adjective",
    [
      "after::plain_verb_or_adjective_form",
      "After present form of a verb or an adjective stem"
    ]
  ],
  [
    "after the -nai stem of a verb",
    ["after::nai_stem", "After a '-\u306A\u3044' stem"]
  ],
  [
    "after the -ta form of a verb",
    ["after::past_verb_form", "After the '\u305F' form of a verb"]
  ],
  [
    "after the -te form of a verb or adjective",
    [
      "after::te_verb_or_adjective_form",
      "After the '\u3066' form of a verb or adjective"
    ]
  ],
  [
    "after the dictionary form of verb",
    ["after::plain_verb_form", "After present form of a verb"]
  ],
  [
    "after the stem of an adjective",
    ["after::adjective_stem", "After adjective stem"]
  ],
  [
    "after the volitional form of verb",
    ["after::volitional_verb_form", "After volitional form of verb"]
  ],
  ["at sentence end", ["at_sentence_end", "At sentence end"]],
  [
    "at sentence end after the -masu form of a verb",
    ["at_sentence_end", "At sentence end after the '-\u307E\u3059' form of a verb"]
  ],
  [
    "at sentence end after the question marker \u304B",
    ["at_sentence_end", "At sentence end after the question marker \u304B"]
  ],
  [
    "at sentence end; adds emphasis; usu. \u3063\u305F\u3089",
    ["at_sentence_end", "At sentence end; adds emphasis; usu. \u3063\u305F\u3089"]
  ],
  [
    "at sentence end; expresses depth of feeling or emphasis",
    [
      "at_sentence_end",
      "At sentence end; expresses depth of feeling or emphasis"
    ]
  ],
  [
    "at sentence end; gives reason for an unstated but deducible conclusion",
    [
      "at_sentence_end",
      "At sentence end; gives reason for an unstated but deducible conclusion"
    ]
  ],
  [
    "at sentence end; used as a request for confirmation or agreement",
    [
      "at_sentence_end",
      "At sentence end; used as a request for confirmation or agreement"
    ]
  ],
  [
    "at sentence end; used to express one's thoughts or feelings",
    [
      "at_sentence_end",
      "At sentence end; used to express one's thoughts or feelings"
    ]
  ],
  [
    "at sentence end; used to make a sentence threatening or ironic",
    [
      "at_sentence_end",
      "At sentence end; used to make a sentence threatening or ironic"
    ]
  ],
  [
    "at sentence end; used to make an informal request",
    ["at_sentence_end", "At sentence end; used to make an informal request"]
  ],
  [
    "at sentence end; with a negative",
    ["at_sentence_end", "At sentence end; with a negative"]
  ],
  ["at sentence-end", ["at_sentence_end", "At sentence end"]],
  [
    "at sentence-end; indicates certainty, emphasis, contempt, request, warning, etc.",
    [
      "at_sentence_end",
      "At sentence end; indicates certainty, emphasis, contempt, request, warning, etc."
    ]
  ],
  [
    "at sentence-end; indicates certainty, emphasis, etc.",
    ["at_sentence_end", "At sentence end; indicates certainty, emphasis, etc."]
  ],
  [
    "sentence end, mainly masc.",
    ["at_sentence_end", "At sentence end, mainly masculine"]
  ],
  ["sentence final", ["at_sentence_end", "At sentence end"]],
  ["at start of sentence", ["at_sentence_start", "At sentence start"]],
  ["at the start of a sentence", ["at_sentence_start", "At sentence start"]],
  ["before a noun", ["before::noun", "Before a noun"]],
  ["before a verb", ["before::verb", "Before a verb"]],
  ["emphatic", ["emphatic", "Emphatic"]],
  ["fig.", ["figurative", "Figurative"]],
  ["figurative", ["figurative", "Figurative"]],
  ["followed by a counter", ["after::counter", "Followed by a counter"]],
  [
    "followed by a counter and \u304B",
    ["after::counter", "Followed by a counter and \u304B"]
  ],
  [
    "followed by a verb in negative form",
    ["after::negative_verb", "Followed by a verb in negative form"]
  ],
  ["following adj. stem", ["after::adjective_stem", "After adjective stem"]],
  [
    "following adj. stem or noun",
    ["after::adjective_stem_or_noun", "After adjective stem or noun"]
  ],
  [
    "following the te-form of a verb",
    ["after::te_form", "After the '\u3066' form of a verb"]
  ],
  [
    "follows verbs, adjectives",
    ["after::verb_or_adjective", "After a verb or an adjective"]
  ],
  [
    "formal or literary polite copula",
    ["formal_or_literary_polite_copula", "Formal or literary polite copula"]
  ],
  ["general term", ["general", "General term"]],
  ["in a negative sentence", ["with::negative_verb", "With negative verb"]],
  ["non-standard", ["non-standard", "Non-standard usage"]],
  ["non-standard usage", ["non-standard", "Non-standard usage"]],
  ["orig. meaning", ["original_meaning", "Original meaning"]],
  ["original meaning", ["original_meaning", "Original meaning"]],
  ["plain copula", ["plain_copula", "Plain copula"]],
  ["vocative", ["vocative", "Vocative"]],
  [
    "with a verb in the negative",
    ["with::negative_verb", "With negative verb"]
  ],
  [
    "with an interrogative word",
    ["with::interrogative", "With an interrogative"]
  ],
  [
    "with neg. verb or adjective",
    ["with::negative_verb_or_adjective", "With negative verb or adjective"]
  ]
]);

// src/utils.ts
var import_libxmljs2 = __toESM(require("libxmljs2"));
var import_xml2js = __toESM(require("xml2js"));
var import_iconv_lite = __toESM(require("iconv-lite"));
var import_client_polly = require("@aws-sdk/client-polly");
var Kuroshiro = require("kuroshiro");
var KuromojiAnalyzer = require("kuroshiro-analyzer-kuromoji");
function capitalizeString(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
function isValidArray(arg) {
  return arg !== null && arg !== void 0 && Array.isArray(arg);
}
function isValidArrayWithFirstElement(arg) {
  return arg !== null && arg !== void 0 && Array.isArray(arg) && arg[0] !== null && arg[0] !== void 0;
}
function isStringArray(arg) {
  return arg !== null && arg !== void 0 && Array.isArray(arg) && arg.every((element) => typeof element === "string");
}
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    const tmp2 = a[j];
    if (!tmp || !tmp2) throw new Error("Invalid array");
    a[i] = tmp2;
    a[j] = tmp;
  }
  return a;
}
function convertJMdict(xmlString, examples) {
  try {
    const dictParsed = import_libxmljs2.default.parseXml(xmlString, {
      dtdvalid: true,
      nonet: false,
      noent: true,
      recover: false
    });
    const dict = [];
    import_xml2js.default.parseString(dictParsed, (err, result) => {
      if (err) throw err;
      const tanakaParts = examples && examples.length > 0 ? new Set(
        examples.map(
          (example) => example.parts.map((part) => [
            part.baseForm,
            ...part.reading ? [part.reading] : [],
            ...part.referenceID ? [part.referenceID] : []
          ])
        ).flat(2)
      ) : void 0;
      if (result.JMdict && typeof result.JMdict === "object" && isValidArray(result.JMdict.entry))
        for (const entry of result.JMdict.entry) {
          const entryObj = {
            ...isValidArray(entry.ent_seq) && entry.ent_seq[0] && typeof entry.ent_seq[0] === "string" ? { id: entry.ent_seq[0] } : { id: "" },
            readings: [],
            meanings: []
          };
          if (entryObj.id.length === 0) throw new Error("Invalid JMdict entry");
          const kanjiForms = entry.k_ele;
          const readings = entry.r_ele;
          const meanings = entry.sense;
          if (isValidArray(kanjiForms)) {
            entryObj.kanjiForms = [];
            for (const kanjiForm of kanjiForms) {
              const form = {
                ...isValidArrayWithFirstElement(kanjiForm.keb) && typeof kanjiForm.keb[0] === "string" ? { form: kanjiForm.keb[0] } : { form: "" }
              };
              if (form.form.length === 0)
                throw new Error(
                  `Invalid JMdict entry kanji form: ${entryObj.id}`
                );
              if (isStringArray(kanjiForm.ke_inf))
                form.notes = kanjiForm.ke_inf;
              if (isStringArray(kanjiForm.ke_pri)) {
                form.commonness = kanjiForm.ke_pri;
                if (entryObj.isCommon === void 0) entryObj.isCommon = true;
              }
              if (form.form.length > 0) entryObj.kanjiForms.push(form);
            }
          }
          if (isValidArray(readings))
            for (const reading of readings) {
              const readingObj = {
                ...isValidArrayWithFirstElement(reading.reb) && typeof reading.reb[0] === "string" ? { reading: reading.reb[0] } : { reading: "" }
              };
              if (readingObj.reading.length === 0)
                throw new Error(`Invalid JMdict entry reading: ${entryObj.id}`);
              if (isStringArray(reading.re_inf))
                readingObj.notes = reading.re_inf;
              if (isStringArray(reading.re_restr))
                readingObj.kanjiFormRestrictions = reading.re_restr;
              if (isStringArray(reading.re_pri)) {
                readingObj.commonness = reading.re_pri;
                if (entryObj.isCommon === void 0) entryObj.isCommon = true;
              }
              if (readingObj.reading.length > 0)
                entryObj.readings.push(readingObj);
            }
          if (isValidArray(meanings))
            for (const meaning of meanings) {
              const meaningObj = {};
              if (isStringArray(meaning.pos))
                meaningObj.partOfSpeech = meaning.pos;
              if (isValidArray(meaning.gloss)) {
                meaningObj.translations = [];
                for (const gloss of meaning.gloss)
                  if (typeof gloss === "string")
                    meaningObj.translations.push(gloss);
                  else if (typeof gloss === "object" && gloss._ && typeof gloss._ === "string" && gloss.$ && typeof gloss.$ === "object" && gloss.$.g_type && (gloss.$.g_type === "lit" || gloss.$.g_type === "expl" || gloss.$.g_type === "tm"))
                    meaningObj.translations.push({
                      translation: gloss._,
                      type: gloss.$.g_type
                    });
              }
              if (isStringArray(meaning.xref))
                meaningObj.references = meaning.xref;
              if (isStringArray(meaning.stagk))
                meaningObj.kanjiFormRestrictions = meaning.stagk;
              if (isStringArray(meaning.stagr))
                meaningObj.readingRestrictions = meaning.stagr;
              if (isStringArray(meaning.ant)) meaningObj.antonyms = meaning.ant;
              if (isStringArray(meaning.field))
                meaningObj.fields = meaning.field;
              if (isStringArray(meaning.s_inf)) meaningObj.info = meaning.s_inf;
              if (isStringArray(meaning.misc)) meaningObj.misc = meaning.misc;
              if (isStringArray(meaning.dial))
                meaningObj.dialects = meaning.dial;
              if (meaningObj.partOfSpeech && meaningObj.partOfSpeech.length > 0 || meaningObj.translations && meaningObj.translations.length > 0)
                entryObj.meanings.push(meaningObj);
            }
          if (examples) {
            const readings2 = new Set(
              entryObj.readings.filter(
                (reading) => (!reading.notes || !reading.notes.some(
                  (note) => notSearchedForms.has(note)
                )) && (entryObj.isCommon === void 0 || reading.commonness && reading.commonness.length > 0)
              ).map((reading) => reading.reading)
            );
            const kanjiForms2 = entryObj.kanjiForms ? new Set(
              entryObj.kanjiForms.filter(
                (kanjiForm) => (!kanjiForm.notes || !kanjiForm.notes.some(
                  (note) => notSearchedForms.has(note)
                )) && (entryObj.isCommon === void 0 || kanjiForm.commonness && kanjiForm.commonness.length > 0)
              ).map((kanjiForm) => kanjiForm.form)
            ) : void 0;
            let existsExample = false;
            if (kanjiForms2 && kanjiForms2.size > 0 && tanakaParts) {
              for (const kf of kanjiForms2)
                if (tanakaParts.has(kf)) {
                  existsExample = true;
                  break;
                }
            }
            if (!existsExample && readings2.size > 0 && tanakaParts) {
              for (const r of readings2)
                if (tanakaParts.has(r)) {
                  existsExample = true;
                  break;
                }
            }
            if (!existsExample && tanakaParts && tanakaParts.has(entryObj.id))
              existsExample = true;
            if (existsExample) entryObj.hasPhrases = true;
          }
          if (entryObj.id.length > 0 && entryObj.readings.length > 0 && entryObj.meanings.length > 0)
            dict.push(entryObj);
        }
    });
    return dict;
  } catch (err) {
    throw err;
  }
}
function convertKanjiDic(xmlString) {
  try {
    const dictParsed = import_libxmljs2.default.parseXml(xmlString, {
      dtdvalid: true,
      nonet: false,
      noent: true,
      recover: false
    });
    const dict = [];
    import_xml2js.default.parseString(dictParsed, (err, result) => {
      if (err) throw err;
      if (result.kanjidic2 && typeof result.kanjidic2 === "object" && isValidArray(result.kanjidic2.character))
        for (const entry of result.kanjidic2.character) {
          const kanjiObj = {
            ...isValidArrayWithFirstElement(entry.literal) && typeof entry.literal[0] === "string" ? { kanji: entry.literal[0] } : { kanji: "" },
            misc: {
              strokeNumber: ""
            },
            readingMeaning: []
          };
          if (kanjiObj.kanji.length === 0)
            throw new Error("Invalid KANJIDIC entry");
          if (isValidArrayWithFirstElement(entry.misc) && typeof entry.misc[0] === "object") {
            const misc = entry.misc[0];
            kanjiObj.misc = {
              ...isValidArrayWithFirstElement(misc.stroke_count) && typeof misc.stroke_count[0] === "string" ? { strokeNumber: misc.stroke_count[0] } : { strokeNumber: "" }
            };
            if (kanjiObj.misc.strokeNumber.length === 0)
              throw new Error(`Invalid KANJIDIC entry: ${kanjiObj.kanji}`);
            if (isValidArrayWithFirstElement(misc.grade) && typeof misc.grade[0] === "string")
              kanjiObj.misc.grade = misc.grade[0];
            if (isValidArrayWithFirstElement(misc.freq) && typeof misc.freq[0] === "string")
              kanjiObj.misc.frequency = misc.freq[0];
            if (isValidArrayWithFirstElement(misc.jlpt) && typeof misc.jlpt[0] === "string")
              kanjiObj.misc.jlpt = misc.jlpt[0];
          }
          if (isValidArray(entry.reading_meaning))
            for (const rm of entry.reading_meaning) {
              const rmObj = { groups: [] };
              if (isValidArray(rm.rmgroup))
                for (const group of rm.rmgroup) {
                  const groupObj = {
                    readings: [],
                    meanings: []
                  };
                  if (isValidArray(group.reading)) {
                    for (const reading of group.reading)
                      if (reading._ && typeof reading._ === "string" && reading.$ && typeof reading.$ === "object" && reading.$.r_type && (reading.$.r_type === "ja_on" || reading.$.r_type === "ja_kun"))
                        groupObj.readings.push({
                          reading: reading._,
                          type: reading.$.r_type
                        });
                  }
                  if (isValidArray(group.meaning)) {
                    for (const meaning of group.meaning)
                      if (typeof meaning === "string") {
                        if (kanjiObj.isKokuji === void 0 && meaning === "(kokuji)")
                          kanjiObj.isKokuji = true;
                        groupObj.meanings.push(meaning);
                      }
                  }
                  if (groupObj.readings.length > 0 || groupObj.meanings.length > 0)
                    rmObj.groups.push(groupObj);
                }
              if (isStringArray(rm.nanori)) rmObj.nanori = rm.nanori;
              if (rmObj.groups.length > 0) kanjiObj.readingMeaning.push(rmObj);
            }
          if (kanjiObj.kanji.length > 0) dict.push(kanjiObj);
        }
    });
    return dict;
  } catch (err) {
    throw err;
  }
}
async function convertTanakaCorpus(tanakaString, generateFurigana) {
  return await new Promise(
    async (resolve, reject) => {
      try {
        const tanakaArray = [];
        const tanakaParsed = tanakaString.split("\n");
        const kuroshiro = generateFurigana === true ? new Kuroshiro.default() : null;
        if (kuroshiro !== null) await kuroshiro.init(new KuromojiAnalyzer());
        const convert = kuroshiro !== null ? kuroshiro.convert.bind(kuroshiro) : null;
        for (let i = 0; i <= tanakaParsed.length; i += 2) {
          let a = tanakaParsed[i];
          let b = tanakaParsed[i + 1];
          if (a && b && a.startsWith("A: ") && b.startsWith("B: ")) {
            a = a.replace("A: ", "").replace(regexps.tanakaID, "");
            b = b.replace("B: ", "");
            const aParts = a.split("	");
            const bParts = b.split(" ").filter((part) => part.trim().length !== 0).map((part) => {
              const partMatches = regexps.tanakaPart.exec(part);
              if (!partMatches || !partMatches.groups || partMatches.length === 0)
                throw new Error(`Invalid B part: ${part}`);
              const baseForm = partMatches.groups["base"];
              if (!baseForm)
                throw new Error(`Invalid base form of B part: ${part}`);
              const examplePart = { baseForm };
              const reading = partMatches.groups["reading"];
              const glossNumber = partMatches.groups["glossnum"];
              const inflectedForm = partMatches.groups["inflection"];
              if (reading)
                if (regexps.tanakaReferenceID.test(reading)) {
                  const referenceID = regexps.tanakaReferenceID.exec(reading);
                  if (!referenceID)
                    throw new Error(`Invalid reference ID: ${reading}`);
                  examplePart.referenceID = referenceID[0];
                } else examplePart.reading = reading;
              if (glossNumber)
                examplePart.glossNumber = glossNumber.startsWith("0") ? Number.parseInt(glossNumber.substring(1)) : Number.parseInt(glossNumber);
              if (inflectedForm) examplePart.inflectedForm = inflectedForm;
              if (baseForm.endsWith("~")) {
                examplePart.edited = true;
                examplePart.baseForm = examplePart.baseForm.replace("~", "");
              }
              return examplePart;
            });
            const phrase = aParts[0];
            const translation = aParts[1];
            if (phrase && translation) {
              let furigana = void 0;
              if (convert !== null && !phrase.includes("\u30FB"))
                furigana = await convert(phrase, {
                  to: "hiragana",
                  mode: "furigana"
                });
              tanakaArray.push({
                phrase,
                translation,
                parts: bParts,
                ...furigana ? { furigana } : {}
              });
            }
          }
        }
        tanakaParsed.length = 0;
        resolve(tanakaArray);
      } catch (err) {
        reject(err);
      }
    }
  );
}
function convertRadkFile(radkBuffer, kanjiDic) {
  try {
    const fileParsed = import_iconv_lite.default.decode(radkBuffer, "euc-jp").split("\n").filter((line) => !line.startsWith("#"));
    const radicals = [];
    for (let i = 0; i <= fileParsed.length; i++) {
      const line = fileParsed[i];
      if (!line) continue;
      if (line.startsWith("$ ")) {
        const radical = {
          radical: line.charAt(2),
          kanji: [],
          strokes: line.substring(4)
        };
        let j = i + 1;
        let kanjiLine = fileParsed[j];
        if (!kanjiLine) continue;
        while (kanjiLine && !kanjiLine.startsWith("$ ")) {
          const kanjis = kanjiLine.split("");
          for (const kanji of kanjis) {
            const foundKanji = kanjiDic.find(
              (dictKanji) => dictKanji.kanji === kanji
            );
            if (!foundKanji) throw new Error("Kanji not found");
            radical.kanji.push(foundKanji);
          }
          j++;
          kanjiLine = fileParsed[j];
          if (!kanjiLine) continue;
          if (kanjiLine.startsWith("$ ")) i = j - 1;
        }
        if (radical.radical.length > 0 && radical.strokes.length > 0 && radical.kanji.length > 0)
          radicals.push(radical);
      }
    }
    fileParsed.length = 0;
    return radicals;
  } catch (err) {
    throw err;
  }
}
function convertKradFile(kradBuffer, kanjiDic, katakanaList) {
  try {
    const fileParsed = import_iconv_lite.default.decode(kradBuffer, "euc-jp").split("\n").filter((line) => !line.startsWith("#"));
    const kanjiWithRadicals = [];
    for (const line of fileParsed) {
      if (line.length === 0) continue;
      const split = line.split(" : ");
      const kanjiChar = split[0];
      const radicalsRow = split[1];
      if (!kanjiChar || !radicalsRow) throw new Error("Invalid KRAD entry");
      const kanji = {
        ...kanjiChar && radicalsRow && kanjiChar.length === 1 && radicalsRow.length > 0 ? { kanji: kanjiChar } : { kanji: "" },
        radicals: []
      };
      if (kanji.kanji.length === 1) {
        const radicals = radicalsRow.split(" ");
        for (const radical of radicals) {
          let foundRadical = kanjiDic.find(
            (dictKanji) => dictKanji.kanji === radical
          );
          if (!foundRadical) {
            const katakanaChar = katakanaList.find(
              (kana) => kana.kana === radical
            );
            if (!katakanaChar) continue;
            foundRadical = {
              kanji: katakanaChar.kana,
              readingMeaning: [
                {
                  groups: [
                    {
                      readings: [{ reading: katakanaChar.kana, type: "ja_on" }],
                      meanings: [katakanaChar.reading]
                    }
                  ]
                }
              ]
            };
          }
          kanji.radicals.push(foundRadical ? foundRadical : radical);
        }
      }
      if (kanji.kanji.length === 1 && kanji.radicals.length > 0)
        kanjiWithRadicals.push(kanji);
    }
    fileParsed.length = 0;
    return kanjiWithRadicals;
  } catch (err) {
    throw err;
  }
}
function lookupWordNote(key, notes, tags, required, fallback) {
  const info = noteMap.get(
    key.toLowerCase()
  );
  if (!info) {
    if (required) throw new Error(`Invalid note info for ${key}`);
    if (notes) notes.push(fallback != null ? fallback : key);
    return { note: fallback != null ? fallback : key };
  }
  const tag = `word::${info[0]}`;
  if (tags && !tags.includes(tag)) tags.push(tag);
  if (notes) notes.push(info[1]);
  return { note: info[1], tag };
}
var wordAddNoteArray = (arr, cb) => {
  if (!arr) return;
  for (const v of arr) cb(v);
};
function getWord(dict, id, kanjiDic, examples, dictWord, noteTypeName, deckPath) {
  try {
    if (!dictWord && id && dict)
      dictWord = dict.find((entry) => entry.id === id);
    if (dictWord) {
      const word = {
        id: dictWord.id,
        readings: [],
        translations: [],
        noteID: `word_${dictWord.id}`,
        ...noteTypeName ? { noteTypeName } : {},
        ...deckPath ? { deckPath } : {},
        tags: []
      };
      if (dictWord.isCommon === true) word.common = true;
      if (dictWord.kanjiForms)
        word.kanjiForms = dictWord.kanjiForms.map(
          (dictKanjiForm) => ({
            kanjiForm: dictKanjiForm.form,
            ...dictKanjiForm.notes ? {
              notes: dictKanjiForm.notes.map((note) => {
                var _a;
                const noteAndTag = lookupWordNote(
                  note,
                  void 0,
                  word.tags,
                  false,
                  note
                );
                return capitalizeString((_a = noteAndTag.note) != null ? _a : note);
              })
            } : {},
            ...dictKanjiForm.commonness && dictKanjiForm.commonness.length > 0 ? { common: true } : {}
          })
        );
      word.readings = dictWord.readings.map((dictReading) => ({
        reading: dictReading.reading,
        ...dictReading.kanjiFormRestrictions || dictReading.notes ? {
          notes: [
            ...dictReading.kanjiFormRestrictions ? dictReading.kanjiFormRestrictions.map(
              (restriction) => `Reading restricted to ${restriction}`
            ) : [],
            ...dictReading.notes ? dictReading.notes.map((note) => {
              var _a;
              const noteAndTag = lookupWordNote(
                note,
                void 0,
                word.tags,
                false,
                note
              );
              return capitalizeString((_a = noteAndTag.note) != null ? _a : note);
            }) : []
          ]
        } : {},
        ...dictReading.commonness && dictReading.commonness.length > 0 ? { common: true } : {}
      }));
      let usuallyInKanaMeanings = 0;
      word.translations = dictWord.meanings.map((dictMeaning) => {
        if (!dictMeaning.translations)
          throw new Error(`No translations for ${dictWord.id}`);
        const translationTypes = [];
        const translations = dictMeaning.translations.map(
          (translation) => {
            if (typeof translation === "string") return translation;
            else {
              if (translation.type === "lit")
                translationTypes.push("Literal meaning");
              else if (translation.type === "expl")
                translationTypes.push("Explanation");
              else if (translation.type === "tm")
                translationTypes.push("Trademark");
              return translation.translation;
            }
          }
        );
        const notes = [];
        wordAddNoteArray(
          dictMeaning.kanjiFormRestrictions,
          (restriction) => notes.push(`Meaning restricted to ${restriction}`)
        );
        wordAddNoteArray(
          dictMeaning.readingRestrictions,
          (restriction) => notes.push(`Meaning restricted to ${restriction}`)
        );
        for (const t of translationTypes) notes.push(t);
        wordAddNoteArray(
          dictMeaning.partOfSpeech,
          (pos) => lookupWordNote(pos, notes, word.tags, true)
        );
        wordAddNoteArray(
          dictMeaning.fields,
          (field) => lookupWordNote(field, notes, word.tags, false, field)
        );
        wordAddNoteArray(
          dictMeaning.dialects,
          (dialect) => lookupWordNote(dialect, notes, word.tags, true)
        );
        wordAddNoteArray(
          dictMeaning.antonyms,
          (antonym) => notes.push(`Antonym: ${antonym}`)
        );
        wordAddNoteArray(
          dictMeaning.references,
          (reference) => notes.push(`Related: ${reference}`)
        );
        wordAddNoteArray(
          dictMeaning.info,
          (info) => lookupWordNote(info, notes, word.tags, false, info)
        );
        wordAddNoteArray(dictMeaning.misc, (misc) => {
          lookupWordNote(misc, notes, word.tags, false, misc);
          if (misc.toLowerCase() === "word usually written using kana alone")
            usuallyInKanaMeanings++;
        });
        for (let i = 0; i < notes.length; i++)
          notes[i] = capitalizeString(notes[i]);
        return {
          translation: translations.join("; "),
          notes
        };
      });
      if (word.translations && word.translations.length === usuallyInKanaMeanings)
        word.usuallyInKana = true;
      if (kanjiDic && word.kanjiForms) {
        word.kanji = [];
        for (const kanjiForm of word.kanjiForms)
          for (const char of kanjiForm.kanjiForm) {
            if (word.kanji.some((kanji) => kanji.kanji === char))
              continue;
            const dictKanji = kanjiDic.find(
              (kanji) => kanji.kanji === char
            );
            if (dictKanji) {
              const kanjiObj = getKanji(
                dictKanji.kanji,
                kanjiDic,
                void 0
              );
              word.kanji.push({
                kanji: kanjiObj.kanji,
                ...kanjiObj.meanings ? { meanings: kanjiObj.meanings } : {}
              });
            }
          }
        if (word.kanji.length === 0) delete word.kanji;
      }
      if (examples && dictWord.hasPhrases === true) {
        let pushIfUnique2 = function(ex) {
          if (!seenPhrases.has(ex.phrase)) {
            wordExamples.push(ex);
            seenPhrases.add(ex.phrase);
          }
        };
        var pushIfUnique = pushIfUnique2;
        const readings = new Set(
          word.readings.filter(
            (reading) => (!reading.notes || !reading.notes.some(
              (note) => notSearchedForms.has(note)
            )) && (word.common === void 0 || reading.common === true)
          ).map((reading) => reading.reading)
        );
        const kanjiForms = word.kanjiForms ? new Set(
          word.kanjiForms.filter(
            (kanjiForm) => (!kanjiForm.notes || !kanjiForm.notes.some(
              (note) => notSearchedForms.has(note)
            )) && (word.common === void 0 || kanjiForm.common === true)
          ).map((kanjiForm) => kanjiForm.kanjiForm)
        ) : void 0;
        const kanjiFormExamples = [];
        const readingMatchingKanjiFormExamples = [];
        const readingExamples = [];
        for (const example of examples)
          for (const part of example.parts) {
            const readingMatch = part.reading && readings.has(part.reading) || readings.has(part.baseForm);
            if (kanjiForms && kanjiForms.size > 0 && kanjiForms.has(part.baseForm)) {
              if (readingMatch) readingMatchingKanjiFormExamples.push(example);
              else kanjiFormExamples.push(example);
              break;
            }
            if (readingMatch || part.referenceID && word.id && part.referenceID === word.id) {
              readingExamples.push(example);
              break;
            }
          }
        const exampleSize = (/* @__PURE__ */ new Set([
          ...readingMatchingKanjiFormExamples,
          ...kanjiFormExamples,
          ...readingExamples
        ])).size;
        const includeKanjiFormExamples = readingMatchingKanjiFormExamples.length < Math.max(2, Math.round(exampleSize * 0.05));
        const includeReadingExamples = word.usuallyInKana === void 0 && includeKanjiFormExamples && readingExamples.length >= Math.max(10, Math.round(exampleSize * 0.15)) || word.usuallyInKana === true && readingExamples.length >= Math.max(2, Math.round(exampleSize * 0.5));
        const seenPhrases = /* @__PURE__ */ new Set();
        let wordExamples = [];
        for (const ex of readingMatchingKanjiFormExamples) pushIfUnique2(ex);
        if (includeKanjiFormExamples)
          for (const ex of kanjiFormExamples) pushIfUnique2(ex);
        if (includeReadingExamples)
          for (const ex of readingExamples) pushIfUnique2(ex);
        if (word.translations) {
          const glossSpecificExamples = [];
          for (let i = 0; i < word.translations.length; i++) {
            outer: for (const example of wordExamples)
              for (const part of example.parts)
                if (part.glossNumber === i + 1) {
                  glossSpecificExamples.push(example);
                  break outer;
                }
            if (glossSpecificExamples.length === 5) break;
          }
          if (glossSpecificExamples.length === 5)
            wordExamples = glossSpecificExamples;
          else if (glossSpecificExamples.length > 0) {
            const seenPhrases2 = new Set(
              glossSpecificExamples.map((ex) => ex.phrase)
            );
            wordExamples = [
              ...glossSpecificExamples,
              ...wordExamples.filter((ex) => !seenPhrases2.has(ex.phrase)).slice(0, 5 - glossSpecificExamples.length)
            ];
          }
        }
        if (wordExamples.length > 0)
          word.phrases = (wordExamples.length > 5 ? wordExamples.slice(0, 5) : wordExamples).map((ex) => {
            var _a;
            return {
              phrase: (_a = ex.furigana) != null ? _a : ex.phrase,
              translation: ex.translation,
              originalPhrase: ex.phrase
            };
          });
      }
      return word;
    } else throw new Error(`Word${id ? ` ${id}` : ""} not found`);
  } catch (err) {
    throw err;
  }
}
function getKanji(kanjiChar, dict, jmDict, svgList, noteTypeName, deckPath) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  try {
    const dictKanji = dict.find(
      (entry) => entry.kanji === kanjiChar
    );
    if (dictKanji) {
      const kanji = {
        kanji: dictKanji.kanji,
        ...dictKanji.misc ? { strokes: dictKanji.misc.strokeNumber } : {},
        ...dictKanji.misc && dictKanji.misc.grade ? { grade: dictKanji.misc.grade } : {},
        ...dictKanji.misc && dictKanji.misc.frequency ? { grade: dictKanji.misc.frequency } : {},
        noteID: `kanji_${dictKanji.kanji}`,
        ...noteTypeName ? { noteTypeName } : {},
        ...deckPath ? { deckPath } : {}
      };
      for (const rm of dictKanji.readingMeaning) {
        if (rm.nanori && rm.nanori.length > 0) {
          if (kanji.nanori === void 0) kanji.nanori = [];
          kanji.nanori.push(...rm.nanori);
        }
        for (const group of rm.groups) {
          kanji.onyomi = group.readings.filter((reading) => reading.type === "ja_on").map((reading) => reading.reading);
          kanji.kunyomi = group.readings.filter((reading) => reading.type === "ja_kun").map((reading) => reading.reading);
          if (kanji.onyomi.length === 0) delete kanji.onyomi;
          if (kanji.kunyomi.length === 0) delete kanji.kunyomi;
          kanji.meanings = group.meanings;
          if (kanji.meanings.length === 0) delete kanji.meanings;
        }
      }
      if (jmDict) {
        let kanjiWords = jmDict.filter(
          (word) => word.kanjiForms && word.kanjiForms[0].form.includes(kanji.kanji)
        );
        if (kanjiWords.length > 3) kanjiWords = kanjiWords.slice(0, 2);
        if (kanjiWords.length > 0)
          kanji.words = kanjiWords.map((word) => {
            const wordObj = getWord(
              void 0,
              void 0,
              void 0,
              void 0,
              word,
              void 0
            );
            if (!wordObj.translations)
              throw new Error(`Invalid word: ${word.id}`);
            const kanjiForm = wordObj.kanjiForms[0];
            let reading = wordObj.readings.find(
              (reading2) => reading2.notes && reading2.notes.some(
                (note) => note.toLowerCase().startsWith("reading restricted to ") && note.endsWith(kanjiForm.kanjiForm)
              )
            );
            let translation = wordObj.translations.find(
              (translation2) => translation2.notes && translation2.notes.some(
                (note) => note.toLowerCase().startsWith("meaning restricted to ") && (note.endsWith(kanjiForm.kanjiForm) || reading && note.endsWith(reading.reading))
              )
            );
            if (!reading) reading = wordObj.readings[0];
            if (!translation) translation = wordObj.translations[0];
            return {
              kanjiForms: [kanjiForm],
              readings: [reading],
              translations: [translation]
            };
          });
        if (kanjiWords.length !== 3) {
          const wordNumber = 3 - kanjiWords.length;
          kanjiWords = jmDict.filter(
            (word) => word.kanjiForms && word.kanjiForms.some(
              (kanjiForm) => kanjiForm.form.includes(kanji.kanji)
            )
          ).map((word) => {
            const wordObj = getWord(
              void 0,
              void 0,
              void 0,
              void 0,
              word,
              void 0
            );
            if (!wordObj.translations)
              throw new Error(`Invalid word: ${word.id}`);
            const kanjiForm = wordObj.kanjiForms.find(
              (kanjiForm2) => kanjiForm2.kanjiForm.includes(kanji.kanji)
            );
            if (!kanjiForm) throw new Error("Invalid kanji form");
            let reading = wordObj.readings.find(
              (reading2) => reading2.notes && reading2.notes.some(
                (note) => note.toLowerCase().startsWith("reading restricted to ") && note.endsWith(kanjiForm.kanjiForm)
              )
            );
            let translation = wordObj.translations.find(
              (translation2) => translation2.notes && translation2.notes.some(
                (note) => note.toLowerCase().startsWith("meaning restricted to ") && (note.endsWith(kanjiForm.kanjiForm) || reading && note.endsWith(reading.reading))
              )
            );
            if (!reading) reading = wordObj.readings[0];
            if (!translation) translation = wordObj.translations[0];
            return {
              kanjiForms: [kanjiForm],
              readings: [reading],
              translations: [translation]
            };
          });
          if (kanjiWords.length > wordNumber)
            kanjiWords = kanjiWords.slice(0, wordNumber - 1);
          if (kanjiWords.length > 0)
            if (kanji.words) kanji.words.push(...kanjiWords);
            else kanji.words = kanjiWords;
        }
      }
      if (svgList) {
        let codePoint = kanji.kanji.codePointAt(0);
        if (codePoint !== void 0) {
          codePoint = codePoint.toString(16);
          const fileNames = [
            `0${codePoint}.svg`,
            `${codePoint}.svg`
          ];
          const svg = svgList.find(
            (svgFile) => fileNames.includes(svgFile.toLowerCase())
          );
          if (svg) kanji.svg = svg;
        }
      }
      kanji.tags = [];
      if (dictKanji.isKokuji === true) {
        kanji.kokuji = true;
        kanji.tags.push("kanji::kokuji");
        if (kanji.meanings)
          kanji.meanings.splice(
            kanji.meanings.findIndex(
              (meaning) => meaning === "(kokuji)"
            ),
            1
          );
      }
      kanji.tags.push(
        `kanji::onyomi::${(_b = (_a = kanji.onyomi) == null ? void 0 : _a.length) != null ? _b : 0}`,
        `kanji::kunyomi::${(_d = (_c = kanji.kunyomi) == null ? void 0 : _c.length) != null ? _d : 0}`,
        `kanji::nanori::${(_f = (_e = kanji.nanori) == null ? void 0 : _e.length) != null ? _f : 0}`,
        `kanji::strokes::${(_g = kanji.strokes) != null ? _g : "unknown"}`,
        `kanji::words::${(_i = (_h = kanji.words) == null ? void 0 : _h.length) != null ? _i : 0}`,
        ...kanji.svg ? ["kanji::has_svg"] : []
      );
      return kanji;
    } else throw new Error(`Kanji ${kanjiChar} not found`);
  } catch (err) {
    throw err;
  }
}
function getKanjiExtended(kanjiChar, info, dict, useJpdbWords, jmDict, svgList, noteTypeName, deckPath) {
  var _a, _b, _c, _d;
  try {
    const kanji = getKanji(
      kanjiChar,
      dict,
      jmDict,
      svgList,
      noteTypeName,
      deckPath
    );
    if (info.components && info.components.length > 0)
      kanji.components = info.components;
    if (info.mnemonic && info.mnemonic.length > 0)
      kanji.mnemonic = info.mnemonic;
    if (useJpdbWords === true && info.words && info.words.length > 0)
      kanji.words = info.words;
    if (kanji.tags) {
      kanji.tags.push(`kanji::components::${(_b = (_a = kanji.components) == null ? void 0 : _a.length) != null ? _b : 0}`);
      if (kanji.mnemonic && kanji.mnemonic.length > 0)
        kanji.tags.push("kanji::has_mnemonic");
      if (useJpdbWords === true && kanji.words) {
        if (!kanji.tags.some((tag, index) => {
          var _a2, _b2;
          if (tag.startsWith("kanji::words::")) {
            kanji.tags.splice(
              index,
              1,
              `kanji::words::${(_b2 = (_a2 = kanji.words) == null ? void 0 : _a2.length) != null ? _b2 : 0}`
            );
            return true;
          } else return false;
        }))
          kanji.tags.push(`kanji::words::${(_d = (_c = kanji.words) == null ? void 0 : _c.length) != null ? _d : 0}`);
      }
    }
    if (kanji.fromJpdb === true && (kanji.mnemonic || kanji.components && kanji.components.length > 0 || kanji.words))
      kanji.source = `https://jpdb.io/kanji/${kanji.kanji}#a`;
    return kanji;
  } catch (err) {
    throw err;
  }
}
var getCharType = (char) => {
  if (regexps.kanji.test(char)) return "kanji";
  if (regexps.hiragana.test(char)) return "hiragana";
  if (regexps.katakana.test(char)) return "katakana";
  return "other";
};
var splitByScript = (text) => text.match(regexps.scriptSplit) || [];
var convertToHiragana = (str) => str.replace(
  regexps.katakana,
  (c) => String.fromCharCode(c.charCodeAt(0) - 96)
);
var convertOtherToKatakana = (str) => str.split("").map((c) => {
  if (romajiMap[c.toUpperCase()]) return romajiMap[c.toUpperCase()];
  if (numberMap[c]) return numberMap[c];
  if (symbolMap[c]) return symbolMap[c];
  return c;
}).join("");
function makeSSML(formText, fullReading) {
  let ssml = "";
  const allTypes = Array.from(
    formText
  ).map((c) => getCharType(c));
  const uniqueTypes = Array.from(new Set(allTypes));
  if (uniqueTypes.length === 1)
    switch (uniqueTypes[0]) {
      case "kanji":
        ssml = `<speak><phoneme alphabet="x-amazon-yomigana" ph="${fullReading}">${formText}</phoneme></speak>`;
        break;
      case "katakana":
        ssml = `<speak><phoneme alphabet="x-amazon-pron-kana" ph="${formText}">${formText}</phoneme></speak>`;
        break;
      case "hiragana":
      default:
        ssml = `<speak>${formText}</speak>`;
    }
  else {
    const segments = splitByScript(formText);
    let pureKanjiReading = convertToHiragana(fullReading);
    segments.forEach((seg) => {
      const type = getCharType(
        seg[0]
      );
      if (type !== "kanji") {
        const converted = type === "other" ? convertToHiragana(convertOtherToKatakana(seg)) : convertToHiragana(seg);
        pureKanjiReading = pureKanjiReading.replace(converted, "");
      }
    });
    const kanjiSegments = segments.filter(
      (seg) => getCharType(seg[0]) === "kanji"
    );
    let readingPointer = 0;
    const ssmlSegments = segments.map((seg) => {
      const type = getCharType(
        seg[0]
      );
      if (type === "kanji") {
        const expectedLength = pureKanjiReading.length / kanjiSegments.length;
        const allocated = pureKanjiReading.slice(
          readingPointer,
          readingPointer + Math.ceil(expectedLength)
        );
        readingPointer += allocated.length;
        return `<phoneme alphabet="x-amazon-yomigana" ph="${allocated}">${seg}</phoneme>`;
      } else if (type === "katakana")
        return `<phoneme alphabet="x-amazon-pron-kana" ph="${seg}">${seg}</phoneme>`;
      else if (type === "other") {
        const katakanaReading = convertOtherToKatakana(seg);
        return `<phoneme alphabet="x-amazon-pron-kana" ph="${katakanaReading}">${seg}</phoneme>`;
      } else return seg;
    });
    ssml = `<speak>${ssmlSegments.join("")}</speak>`;
  }
  return ssml;
}
async function synthesizeSpeech(client, ssmlText, options) {
  return await new Promise(
    async (resolve, reject) => {
      try {
        const command = new import_client_polly.SynthesizeSpeechCommand({
          Text: ssmlText,
          TextType: "ssml",
          ...options
        });
        const response = await client.send(command);
        const stream = response.AudioStream ? Buffer.from(await response.AudioStream.transformToByteArray()) : null;
        resolve(stream);
      } catch (err) {
        reject(err);
      }
    }
  );
}
function isWord(entry) {
  return entry.translations !== void 0 && entry.readings !== void 0;
}
function isRadical(entry) {
  return entry.radical !== void 0 && entry.reading !== void 0 && entry.meanings !== void 0;
}
function isKanji(entry) {
  return entry.translations === void 0 && entry.readings === void 0 && entry.radical === void 0 && entry.kanji !== void 0;
}
function isKana(entry) {
  return entry.kana !== void 0 && entry.reading !== void 0;
}
function isGrammar(entry) {
  return entry.point !== void 0 && entry.meaning !== void 0;
}
var createNotes = (notes, phrase) => `${phrase === true ? "<details><summary>Show translation</summary>" : ""}<ul class="note-list">${notes.map((note) => `<li class="note">${note}</li>`).join("")}</ul>${phrase === true ? "</details>" : ""}`;
var createEntry = (entry, notes, phrase) => `<div class="entry">${entry}${notes && notes.length > 0 ? createNotes(notes, phrase) : ""}</div>`;
var noKanjiForms = '<span class="word word-kanjiform">(no kanji forms)</span>';
function generateAnkiNote(entry) {
  if (!entry.noteID) throw new Error("Invalid note ID");
  const fields = [];
  if (isWord(entry)) {
    if (!entry.translations) throw new Error(`Invalid word: ${entry.noteID}`);
    fields.push(
      ...entry.kanjiForms && !entry.usuallyInKana ? [
        entry.kanjiForms.map(
          (kanjiFormEntry, index) => `${index > 0 ? "<details><summary>Show kanji form</summary>" : ""}${createEntry(`<span class="word word-kanjiform">${index === 0 ? "<ruby><rb>" : ""}${kanjiFormEntry.kanjiForm}${index === 0 ? `</rb><rt>${entry.readings[0].reading}</rt></ruby>` : ""}</span>`, kanjiFormEntry.notes)}${index > 0 ? "</details>" : ""}`
        ).join(""),
        entry.readings.map(
          (readingEntry, index) => `${index > 0 ? "<details><summary>Show reading</summary>" : ""}${createEntry(`<span class="word word-reading">${readingEntry.reading}${readingEntry.audio !== void 0 ? `<br>[sound:${readingEntry.audio}]` : ""}</span>`, readingEntry.notes)}${index > 0 ? "</details>" : ""}`
        ).join("")
      ] : [
        entry.readings.map(
          (readingEntry, index) => `${index > 0 ? "<details><summary>Show reading</summary>" : ""}${createEntry(`<span class="word word-reading">${readingEntry.reading}${readingEntry.audio !== void 0 ? `<br>[sound:${readingEntry.audio}]` : ""}</span>`, readingEntry.notes)}${index > 0 ? "</details>" : ""}`
        ).join(""),
        entry.kanjiForms ? entry.kanjiForms.map(
          (kanjiFormEntry, index) => `${index > 0 ? "<details><summary>Show kanji form</summary>" : ""}${createEntry(`<span class="word word-kanjiform">${index === 0 ? "<ruby><rb>" : ""}${kanjiFormEntry.kanjiForm}${index === 0 ? `</rb><rt>${entry.readings[0].reading}</rt></ruby>` : ""}</span>`, kanjiFormEntry.notes)}${index > 0 ? "</details>" : ""}`
        ).join("") : noKanjiForms
      ],
      entry.translations.map(
        (translationEntry, index) => `${index > 2 ? "<details><summary>Show translation</summary>" : ""}${createEntry(`<span class="word word-translation">${translationEntry.translation}</span>`, translationEntry.notes)}${index > 2 ? "</details>" : ""}`
      ).join(""),
      entry.kanji ? entry.kanji.map(
        (kanjiEntry) => createEntry(
          `<span class="word word-kanji">${kanjiEntry.kanji}${kanjiEntry.meanings === void 0 ? " (no meanings)" : ""}</span>`,
          kanjiEntry.meanings
        )
      ).join("") : '<span class="word word-kanji">(no kanji)</span>',
      entry.phrases ? entry.phrases.map(
        (phraseEntry) => createEntry(
          `<span class="word word-phrase"><span class="word word-phrase-original">${phraseEntry.originalPhrase}</span><span class="word word-phrase-furigana">${phraseEntry.phrase}</span></span>`,
          [phraseEntry.translation],
          true
        )
      ).join("") : '<span class="word word-phrase">(no phrases) (Search on dictionaries!)</span>',
      ...entry.tags && entry.tags.length > 0 ? [
        entry.tags.map(
          (tag) => tag.trim().toLowerCase().replaceAll(" ", "::")
        ).join(" ")
      ] : []
    );
  }
  if (isRadical(entry))
    fields.push(
      createEntry(
        `<span class="radical radical-character">${entry.radical}</span>`
      ),
      createEntry(
        `<span class="radical radical-reading">${entry.reading}</span>`
      ),
      entry.meanings.map(
        (meaningEntry) => createEntry(
          `<span class="radical radical-meaning">${meaningEntry}</span>`
        )
      ).join(""),
      entry.mnemonic ? createEntry(
        `<span class="radical radical-mnemonic">${entry.mnemonic}</span>`
      ) : '<span class="radical radical-mnemonic">(no mnemonic) (Come up with your own!)</span>',
      entry.kanji ? entry.kanji.map(
        (kanji) => createEntry(
          `<span class="radical radical-kanji">${kanji.kanji}${kanji.meanings && kanji.meanings.length === 1 ? ` - ${kanji.meanings[0]}` : ""}</span>`
        )
      ).join("") : '<span class="radical radical-kanji">(no "used-in" kanji)</span>',
      entry.strokes ? createEntry(
        `<span class="radical radical-strokes">${entry.strokes}<br>${entry.svg ? `<img class="radical radical-stroke-order" src="${entry.svg}" alt="${entry.radical} stroke order SVG">` : "(no stroke order SVG available)"}</span>`
      ) : '<span class="radical radical-strokes">(no stroke number)</span>',
      entry.sources ? `<span class="radical radical-source">${entry.sources.map((source, index) => `<a href="${source}" target="_blank">Source ${index + 1}</a>`).join("<br>")}</span>` : '<span class="kanji kanji-source">(no sources)</span>',
      ...entry.tags && entry.tags.length > 0 ? [
        entry.tags.map(
          (tag) => tag.trim().toLowerCase().replaceAll(" ", "::")
        ).join(" ")
      ] : []
    );
  if (isKanji(entry))
    fields.push(
      createEntry(`<span class="kanji kanji-character">${entry.kanji}</span>`),
      entry.meanings ? entry.meanings.map(
        (meaningEntry) => createEntry(
          `<span class="kanji kanji-meaning">${meaningEntry}</span>`
        )
      ).join("") : '<span class="kanji kanji-meaning">(no meanings)</span>',
      entry.onyomi ? entry.onyomi.map(
        (onyomiEntry) => createEntry(
          `<span class="kanji kanji-onyomi">${onyomiEntry}</span>`
        )
      ).join("") : `<span class="kanji kanji-onyomi">(no onyomi) ${entry.kokuji === true ? "(kokuji)" : ""}</span`,
      entry.kunyomi ? entry.kunyomi.map(
        (kunyomiEntry) => createEntry(
          `<span class="kanji kanji-kunyomi">${kunyomiEntry}</span>`
        )
      ).join("") : `<span class="kanji kanji-kunyomi">(no kunyomi) ${entry.kokuji === true ? "(kokuji)" : ""}</span>`,
      entry.nanori ? entry.nanori.map(
        (nanoriEntry) => createEntry(
          `<span class="kanji kanji-nanori">${nanoriEntry}</span>`
        )
      ).join("") : '<span class="kanji kanji-nanori">(no nanori)</span>',
      entry.components ? entry.components.map(
        (componentEntry) => createEntry(
          `<span class="kanji kanji-component">${componentEntry.component}${componentEntry.meaning ? ` - ${componentEntry.meaning}` : ""}</span>`
        )
      ).join("") : '<span class="kanji kanji-component">(no components)</span>',
      entry.mnemonic ? createEntry(
        `<span class="kanji kanji-mnemonic">${entry.mnemonic}</span>`
      ) : '<span class="kanji kanji-mnemonic">(no mnemonic) (Come up with your own!)</span>',
      entry.words ? entry.words.filter(
        (word) => word.translations && word.translations.length > 0
      ).map(
        (word) => createEntry(
          `<span class="kanji kanji-words">${word.kanjiForms && word.kanjiForms.length > 0 ? word.kanjiForms[0].kanjiForm : "(no kanji form)"} / ${word.readings[0].reading} - ${word.translations[0].translation}</span>`
        )
      ).join("") : '<span class="kanji kanji-words">(no words) (Search on dictionaries!)</span>',
      entry.strokes ? createEntry(
        `<span class="kanji kanji-strokes">${entry.strokes}<br>${entry.svg ? `<img class="kanji kanji-stroke-order" src="${entry.svg}" alt="${entry.kanji} stroke order SVG">` : "(no stroke order SVG available)"}</span>`
      ) : '<span class="kanji kanji-strokes">(no stroke number)</span>',
      entry.source ? `<span class="kanji kanji-source"><a href="${entry.source}" target="_blank">Source</a></span>` : '<span class="kanji kanji-source">(no components/mnemonic source)</span>',
      ...entry.tags && entry.tags.length > 0 ? [
        entry.tags.map(
          (tag) => tag.trim().toLowerCase().replaceAll(" ", "::")
        ).join(" ")
      ] : []
    );
  if (isKana(entry))
    fields.push(
      createEntry(`<span class="kana kana-character">${entry.kana}</span>`),
      createEntry(
        `<span class="kana kana-reading">${entry.reading}${entry.audio !== void 0 ? `<br>[sound:${entry.audio}]` : ""}</span>`
      ),
      entry.svg ? createEntry(
        `<img class="kana kana-stroke-order" src="${entry.svg}" alt="${entry.kana} stroke order SVG">`
      ) : "(no stroke order SVG available)",
      ...entry.tags && entry.tags.length > 0 ? [
        entry.tags.map(
          (tag) => tag.trim().toLowerCase().replaceAll(" ", "::")
        ).join(" ")
      ] : []
    );
  if (isGrammar(entry))
    fields.push(
      createEntry(`<span class="grammar grammar-point">${entry.point}</span>`),
      entry.readings ? entry.readings.map(
        (readingEntry) => createEntry(
          `<span class="grammar grammar-reading">${readingEntry.reading}</span>`
        )
      ).join("") : '<span class="grammar grammar-reading">(no additional readings)</span>',
      createEntry(
        `<span class="grammar grammar-meaning">${entry.meaning.meaning}${entry.meaning.example && entry.meaning.example.length > 0 ? `<br><span class="grammar grammar-meaning-example">${entry.meaning.example}</span>` : ""}</span>`
      ),
      entry.usages ? entry.usages.map(
        (usage) => createEntry(
          `<span class="grammar grammar-usage">${usage}</span>`
        )
      ).join("") : '<span class="grammar grammar-usage">(no usages)</span>',
      entry.phrases ? entry.phrases.map(
        (phraseEntry) => createEntry(
          `<span class="grammar grammar-phrase"><span class="grammar grammar-phrase-original">${phraseEntry.originalPhrase}</span><span class="grammar grammar-phrase-furigana">${phraseEntry.phrase}</span></span>`,
          [phraseEntry.translation],
          true
        )
      ).join("") : '<span class="grammar grammar-phrase">(no phrases) (Search on dictionaries!)</span>',
      entry.source ? `<span class="grammar grammar-source"><a href="${entry.source}" target="_blank">Source</a></span>` : '<span class="grammar grammar-source">(no source)</span>',
      ...entry.tags && entry.tags.length > 0 ? [
        entry.tags.map(
          (tag) => tag.trim().toLowerCase().replaceAll(" ", "::")
        ).join(" ")
      ] : []
    );
  if (fields.length > 0)
    return fields.map((field) => field.replaceAll("\n", "<br>"));
  else throw new Error("Invalid entry");
}
function generateAnkiNotesFile(list) {
  if (list.length > 0) {
    const headers = [
      "#separator:tab",
      "#html:true",
      "#guid column:1",
      "#notetype column:2",
      "#deck column:3"
    ];
    const ankiNotes = list.filter((result) => result.doNotCreateNote === void 0).map((result) => {
      if (!result.noteID || !result.noteTypeName || !result.deckPath)
        throw new Error("Invalid result");
      const note = generateAnkiNote(result);
      if (headers.length === 5)
        headers.push(`#tags column:${note.length + 3}
`);
      return `${result.noteID}	${result.noteTypeName}	${result.deckPath}	${note.join("	")}`;
    }).join("\n").trim();
    if (ankiNotes.length === 0) throw new Error("Invalid list");
    return `${headers.join("\n")}
${ankiNotes}`;
  } else console.log("No entries available for Anki notes creation");
  return void 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  capitalizeString,
  convertJMdict,
  convertKanjiDic,
  convertKradFile,
  convertRadkFile,
  convertTanakaCorpus,
  generateAnkiNote,
  generateAnkiNotesFile,
  getKanji,
  getKanjiExtended,
  getWord,
  isGrammar,
  isKana,
  isKanji,
  isRadical,
  isStringArray,
  isValidArray,
  isValidArrayWithFirstElement,
  isWord,
  makeSSML,
  notSearchedForms,
  noteMap,
  numberMap,
  regexps,
  romajiMap,
  shuffleArray,
  symbolMap,
  synthesizeSpeech
});
//# sourceMappingURL=index.cjs.js.map
