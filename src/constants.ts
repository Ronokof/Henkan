import { UsefulRegExps } from "./types";

export const regexps: UsefulRegExps = {
  hiragana: /[\u{3040}-\u{309F}]/u,
  katakana: /[\u{30A0}-\u{30FF}]/u,
  kanji: /\p{Script=Han}+/u,
  scriptSplit:
    /([\p{sc=Han}]+|[\p{sc=Hiragana}]+|[\p{sc=Katakana}]+|[^\p{sc=Han}\p{sc=Hiragana}\p{sc=Katakana}]+)/u,
  regExChars: /[-\/\\^$*+?.()|[\]{}]/,
  tanakaID: /#ID=\d+_\d+$/,
  tanakaPart:
    /(?<base>[^()\[\]\{\}\s]+)(?:\((?<reading>[\S]+)\))?(?:\[(?<glossnum>[\S]+)\])?(?:\{(?<inflection>[\S]+)\})?/,
  tanakaReferenceID: /#([\d]+)/,
};

export const romajiMap: Record<string, string> = {
  A: "エー",
  B: "ビー",
  C: "シー",
  D: "ディー",
  E: "イー",
  F: "エフ",
  G: "ジー",
  H: "エイチ",
  I: "アイ",
  J: "ジェー",
  K: "ケー",
  L: "エル",
  M: "エム",
  N: "エヌ",
  O: "オー",
  P: "ピー",
  Q: "キュー",
  R: "アール",
  S: "エス",
  T: "ティー",
  U: "ユー",
  V: "ブイ",
  W: "ダブリュー",
  X: "エックス",
  Y: "ワイ",
  Z: "ゼット",
};

export const numberMap: Record<string, string> = {
  "0": "ゼロ",
  "1": "イチ",
  "2": "ニ",
  "3": "サン",
  "4": "ヨン",
  "5": "ゴ",
  "6": "ロク",
  "7": "ナナ",
  "8": "ハチ",
  "9": "キュウ",
};

export const symbolMap: Record<string, string> = {
  "＄": "ドル",
  "%": "パーセント",
  "¥": "エン",
  "#": "シャープ",
  "@": "アット",
  "&": "アンド",
};

export const notSearchedForms: Set<string> = new Set<string>([
  "Search-only kana form",
  "Rarely used kana form",
  "Out-dated or obsolete kana usage",
  "Word containing out-dated kanji or kanji usage",
]);

export const noteMap: Map<string, readonly [string, string]> = new Map<
  string,
  readonly [string, string]
>([
  ["brazilian", ["dialect::brazilian", "Dialect: Brazilian"]],
  ["hokkaido-ben", ["dialect::hokkaido-ben", "Dialect: Hokkaidō-ben"]],
  ["kansai-ben", ["dialect::kansai-ben", "Dialect: Kansai-ben"]],
  ["kantou-ben", ["dialect::kantou-ben", "Dialect: Kantō-ben"]],
  ["kyoto-ben", ["dialect::kyoto-ben", "Dialect: Kyōto-ben"]],
  ["kyuushuu-ben", ["dialect::kyuushuu-ben", "Dialect: Kyūshū-ben"]],
  ["nagano-ben", ["dialect::nagano-ben", "Dialect: Nagano-ben"]],
  ["ryuukyuu-ben", ["dialect::ryuukyuu-ben", "Dialect: Ryūkyū-ben"]],
  ["osaka-ben", ["dialect::osaka-ben", "Dialect: Ōsaka-ben"]],
  ["touhoku-ben", ["dialect::touhoku-ben", "Dialect: Tōhoku-ben"]],
  ["tosa-ben", ["dialect::tosa-ben", "Dialect: Tosa-ben"]],
  ["tsugaru-ben", ["dialect::tsugaru-ben", "Dialect: Tsugaru-ben"]],
  ["aichi dialect", ["dialect::aichi", "Dialect: Aichi"]],
  ["tochigi dialect", ["dialect::tochigi", "Dialect: Tochigi"]],
  ["adjective (keiyoushi)", ["adjective::i", "い-adjective"]],
  ["'taru' adjective", ["adjective::taru", "たる-adjective"]],
  ["noun (common) (futsuumeishi)", ["common_noun", "Common noun"]],
  [
    "pre-noun adjectival (rentaishi)",
    ["pre-noun_adjectival", "Pre-noun adjectival"],
  ],
  [
    "noun or verb acting prenominally",
    ["noun_or_verb_acting_prenominally", "Noun or verb acting prenominally"],
  ],
  ["pronoun", ["pronoun", "Pronoun"]],
  ["adverb (fukushi)", ["adverb", "Adverb"]],
  [
    "adverb taking the 'to' particle",
    ["takes::to", "Adverb taking the 'と' particle"],
  ],
  [
    "onomatopoeic or mimetic word",
    ["onomatopoeic_or_mimetic", "Onomatopoeic or mimetic word"],
  ],
  [
    "nouns which may take the genitive case particle 'no'",
    ["takes::no", "May take the 'の' particle"],
  ],
  [
    "noun or participle which takes the aux. verb suru",
    ["takes::suru", "Takes the aux. verb 'する'"],
  ],
  ["suru verb - irregular", ["suru_verb", "Irregular する-verb"]],
  ["suru verb - special class", ["suru_verb", "Special する-verb"]],
  ["ichidan verb", ["ichidan_verb", "Ichidan verb"]],
  [
    "godan verb with 'ku' ending",
    ["godan::ku::verb", "Godan verb with 'く' ending"],
  ],
  [
    "godan verb with 'gu' ending",
    ["godan::gu::verb", "Godan verb with 'ぐ' ending"],
  ],
  [
    "godan verb with 'u' ending",
    ["godan::u::verb", "Godan verb with 'う' ending"],
  ],
  [
    "godan verb with 'tsu' ending",
    ["godan::tsu::verb", "Godan verb with 'つ' ending"],
  ],
  [
    "godan verb with 'ru' ending",
    ["godan::ru::verb", "Godan verb with 'る' ending"],
  ],
  [
    "godan verb with 'nu' ending",
    ["godan::nu::verb", "Godan verb with 'ぬ' ending"],
  ],
  [
    "godan verb with 'mu' ending",
    ["godan::mu::verb", "Godan verb with 'む' ending"],
  ],
  [
    "godan verb with 'bu' ending",
    ["godan::bu::verb", "Godan verb with 'ぶ' ending"],
  ],
  [
    "godan verb with 'su' ending",
    ["godan::su::verb", "Godan verb with 'す' ending"],
  ],
  [
    "godan verb with 'u' ending (special class)",
    ["godan::u::irregular_verb", "Irregular godan verb with 'う' ending"],
  ],
  [
    "godan verb with 'ru' ending (irregular verb)",
    ["godan::ru::irregular_verb", "Irregular godan verb with 'る' ending"],
  ],
  [
    "godan verb - -aru special class",
    ["godan::aru::irregular_verb", "Irregular godan verb with '-ある' ending"],
  ],
  [
    "godan verb - iku/yuku special class",
    [
      "godan::iku_yuku::irregular_verb",
      "Irregular godan verb with 'いく' or 'ゆく' ending",
    ],
  ],
  [
    "irregular nu verb",
    ["godan::nu::irregular_verb", "Irregular godan verb with 'ぬ' ending"],
  ],
  ["kuru verb - special class", ["kuru_verb", "Special 'くる' verb"]],
  ["transitive verb", ["transitive_verb", "Transitive verb"]],
  ["intransitive verb", ["intransitive_verb", "Intransitive verb"]],
  ["auxiliary verb", ["auxiliary_verb", "Auxiliary verb"]],
  ["auxiliary adjective", ["adjective::auxiliary", "Auxiliary adjective"]],
  ["auxiliary", ["auxiliary", "Auxiliary"]],
  ["after a verb", ["after::verb", "After a verb"]],
  [
    "after the -te form of a verb",
    ["after::te_form", "After the 'て' form of a verb"],
  ],
  [
    "after te-form of verbs and adj.",
    [
      "after::verb_or_adjective_te_form",
      "After the 'て' form of a verb or an adjective",
    ],
  ],
  [
    "after the -masu stem of a verb",
    ["after::masu_stem", "After the '-ます' stem of a verb"],
  ],
  [
    "after -masu stem of verb",
    ["after::masu_stem", "After the '-ます' stem of a verb"],
  ],
  [
    "after masu stem of verb",
    ["after::masu_stem", "After the '-ます' stem of a verb"],
  ],
  [
    "after -masu stem or adj. stem",
    [
      "after::masu_or_adjective_stem",
      "After the '-ます' stem of a verb or an adjective stem",
    ],
  ],
  [
    "after a noun or the -masu stem of a verb",
    ["after::noun_or_masu_stem", "After a noun or the '-ます' stem of a verb"],
  ],
  [
    "after the plain past form of a verb",
    ["after::past_verb_form", "After the 'た' form of a verb"],
  ],
  [
    "after present form of a verb",
    ["after::plain_verb_form", "After present form of a verb"],
  ],
  [
    "after the dictionary form of a verb",
    ["after::plain_verb_form", "After present form of a verb"],
  ],
  [
    "after past form of a verb",
    ["after::past_verb_form", "After the 'た' form of a verb"],
  ],
  [
    "after volitional form of verb",
    ["after::volitional_verb_form", "After volitional form of verb"],
  ],
  [
    "after the past tense form of a verb",
    ["after::past_verb_form", "After the 'た' form of a verb"],
  ],
  ["after adjective stem", ["after::adjective_stem", "After adjective stem"]],
  ["with neg. sentence", ["with::negative_verb", "With negative verb"]],
  ["with neg. verb", ["with::negative_verb", "With negative verb"]],
  ["with. neg. verb", ["with::negative_verb", "With negative verb"]],
  [
    "with a verb in negative form",
    ["with::negative_verb", "With negative verb"],
  ],
  ["with verb in the negative", ["with::negative_verb", "With negative verb"]],
  ["with negative verb", ["with::negative_verb", "With negative verb"]],
  [
    "after negative base of verb",
    ["after::negative_verb_base", "After the base of a verb"],
  ],
  [
    'follows a verb in "-te" form',
    ["after::te_form", "After the 'て' form of a verb"],
  ],
  [
    "before a verb in negative form",
    ["before::negative_verb", "Before a verb in negative form"],
  ],
  [
    "before a negative form",
    ["before::negative_verb", "Before a verb in negative form"],
  ],
  [
    "before a neg. form",
    ["before::negative_verb", "Before a verb in negative form"],
  ],
  [
    "before a noun or a verb",
    ["before::noun_or_verb", "Before a noun or a verb"],
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
    ["sonkeigo", "Honorific or respectful (sonkeigo) language"],
  ],
  ["polite (teineigo) language", ["teineigo", "Polite (teineigo) language"]],
  ["humble (kenjougo) language", ["kenjougo", "Humble (kenjougo) language"]],
  ["familiar language", ["familiar_language", "Familiar language"]],
  [
    "familiar or derogatory",
    ["familiar_or_derogatory", "Familiar or derogatory"],
  ],
  [
    "derogatory or familiar",
    ["familiar_or_derogatory", "Familiar or derogatory"],
  ],
  ["children's language", ["children_language", "Children language"]],
  [
    "formal or literary term",
    ["formal_or_literary", "Formal or literary term"],
  ],
  [
    "usually written using kana alone",
    ["usually_in_kana", "Usually written using kana alone"],
  ],
  ["ateji (phonetic) reading", ["ateji", "Ateji (phonetic) reading"]],
  ["rarely-used kanji form", ["rare_kanji_form", "Rarely-used kanji form"]],
  ["out-dated kanji", ["out-dated_kanji_form", "Out-dated kanji form"]],
  [
    "gikun (meaning as reading) or jukujikun (special kanji reading)",
    [
      "gikun_or_jukujikun",
      "Gikun (meaning as reading) or jukujikun (special kanji reading)",
    ],
  ],
  [
    "irregular okurigana usage",
    ["irregular::okurigana", "Irregular okurigana usage"],
  ],
  ["irregular kana usage", ["irregular::kana", "Irregular kana usage"]],
  [
    "word containing irregular kana usage",
    ["irregular::kana", "Irregular kana usage"],
  ],
  [
    "out-dated or obsolete kana usage",
    ["out-dated_or_obsolete_kana", "Out-dated or obsolete kana usage"],
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
  ["on-yomi, kan\\'you", ["on-yomi::kanyou", "On-yomi kan 'yō-on reading"]],
  ["kun-yomi", ["kun-yomi", "Kun-yomi reading"]],
  [
    "reading used only in names (nanori)",
    ["nanori", "Reading used only in names (nanori)"],
  ],
  ["on-yomi", ["on-yomi", "On-yomi reading"]],
  [
    "reading used as name of radical",
    ["radical_reading", "Reading used as name of radical"],
  ],
  ["rarely used kana form", ["rare_kana_form", "Rarely used kana form"]],
  ["search-only kana form", ["search-only_kana_form", "Search-only kana form"]],
  ["on-yomi, tou", ["on-yomi::tou", "On-yomi tō-on reading"]],
  ["irregular kanji usage", ["irregular::kanji_form", "Irregular kanji usage"]],
  [
    "word containing irregular kanji usage",
    ["irregular::kanji_form", "Irregular kanji usage"],
  ],
  [
    "out-dated kanji or kanji usage",
    ["out-dated_kanji_form", "Out-dated kanji or kanji usage"],
  ],
  [
    "word containing out-dated kanji or kanji usage",
    ["out-dated_kanji_form", "Out-dated kanji or kanji usage"],
  ],
  ["rarely used kanji form", ["rare_kanji_form", "Rarely used kanji form"]],
  [
    "search-only kanji form",
    ["search-only_kanji_form", "Search-only kanji form"],
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
    ["given_name_or_forename", "Given name or forename, gender not specified"],
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
    ["full_name_or_particular_person", "Full name of a particular person"],
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
    ["usually_in_kana", "Usually written using kana alone"],
  ],
  ["unclassified name", ["unclassified", "Unclassified name"]],
  [
    "work of art, literature, music, etc. name",
    ["work_of_art", "Work of art, literature, music, etc. name"],
  ],
  [
    "rude or x-rated term (not displayed in educational software)",
    ["rude_or_x-rated", "Rude or X-rated term"],
  ],
  [
    "adjective (keiyoushi) - yoi/ii class",
    ["adjective::yoi/ii", "い-adjective - よい/いい class"],
  ],
  [
    "'kari' adjective (archaic)",
    ["adjective::kari", "'かり' adjective (archaic)"],
  ],
  ["'ku' adjective (archaic)", ["adjective::ku", "'く' adjective (archaic)"]],
  [
    "adjectival nouns or quasi-adjectives (keiyodoshi)",
    ["na-adjective", "な-adjective"],
  ],
  [
    "archaic/formal form of na-adjective",
    ["na-adjective_archaic_or_formal", "archaic/formal form of な-adjective"],
  ],
  [
    "'shiku' adjective (archaic)",
    ["adjective::shiku", "'しく' adjective (archaic)"],
  ],
  ["copula", ["copula", "Copula"]],
  [
    "expressions (phrases, clauses, etc.)",
    ["expression", "Expression (phrase, clause, etc.)"],
  ],
  ["adverbial noun (fukushitekimeishi)", ["adverbial_noun", "Adverbial noun"]],
  ["proper noun", ["proper_noun", "Proper noun"]],
  ["noun (temporal) (jisoumeishi)", ["temporal_noun", "Temporal noun"]],
  ["unclassified", ["unclassified", "Unclassified"]],
  ["verb unspecified", ["unspecified_verb", "Unspecified verb"]],
  [
    "ichidan verb - kureru special class",
    ["ichidan_verb::kureru", "Ichidan verb - くれる special class"],
  ],
  [
    "nidan verb with 'u' ending (archaic)",
    ["nidan_verb::u", "Nidan verb with 'う' ending (archaic)"],
  ],
  [
    "nidan verb (upper class) with 'bu' ending (archaic)",
    [
      "nidan_verb::bu::upper_class",
      "Nidan verb (upper class) with 'ぶ' ending (archaic)",
    ],
  ],
  [
    "nidan verb (lower class) with 'bu' ending (archaic)",
    [
      "nidan_verb::bu::lower_class",
      "Nidan verb (lower class) with 'ぶ' ending (archaic)",
    ],
  ],
  [
    "nidan verb (upper class) with 'dzu' ending (archaic)",
    [
      "nidan_verb::dzu::upper_class",
      "Nidan verb (upper class) with 'づ' ending (archaic)",
    ],
  ],
  [
    "nidan verb (lower class) with 'dzu' ending (archaic)",
    [
      "nidan_verb::dzu::lower_class",
      "Nidan verb (lower class) with 'づ' ending (archaic)",
    ],
  ],
  [
    "nidan verb (upper class) with 'gu' ending (archaic)",
    [
      "nidan_verb::gu::upper_class",
      "Nidan verb (upper class) with 'ぐ' ending (archaic)",
    ],
  ],
  [
    "nidan verb (lower class) with 'gu' ending (archaic)",
    [
      "nidan_verb::gu::lower_class",
      "Nidan verb (lower class) with 'ぐ' ending (archaic)",
    ],
  ],
  [
    "nidan verb (upper class) with 'hu/fu' ending (archaic)",
    [
      "nidan_verb::hu/fu::upper_class",
      "Nidan verb (upper class) with 'ふ' ending (archaic)",
    ],
  ],
  [
    "nidan verb (lower class) with 'hu/fu' ending (archaic)",
    [
      "nidan_verb::hu/fu::lower_class",
      "Nidan verb (lower class) with 'ふ' ending (archaic)",
    ],
  ],
  [
    "nidan verb (upper class) with 'ku' ending (archaic)",
    [
      "nidan_verb::ku::upper_class",
      "Nidan verb (upper class) with 'く' ending (archaic)",
    ],
  ],
  [
    "nidan verb (lower class) with 'ku' ending (archaic)",
    [
      "nidan_verb::ku::lower_class",
      "Nidan verb (lower class) with 'く' ending (archaic)",
    ],
  ],
  [
    "nidan verb (upper class) with 'mu' ending (archaic)",
    [
      "nidan_verb::mu::upper_class",
      "Nidan verb (upper class) with 'む' ending (archaic)",
    ],
  ],
  [
    "nidan verb (lower class) with 'mu' ending (archaic)",
    [
      "nidan_verb::mu::lower_class",
      "Nidan verb (lower class) with 'む' ending (archaic)",
    ],
  ],
  [
    "nidan verb (lower class) with 'nu' ending (archaic)",
    [
      "nidan_verb::nu::lower_class",
      "Nidan verb (lower class) with 'ぬ' ending (archaic)",
    ],
  ],
  [
    "nidan verb (upper class) with 'ru' ending (archaic)",
    [
      "nidan_verb::ru::upper_class",
      "Nidan verb (upper class) with 'る' ending (archaic)",
    ],
  ],
  [
    "nidan verb (lower class) with 'ru' ending (archaic)",
    [
      "nidan_verb::ru::lower_class",
      "Nidan verb (lower class) with 'る' ending (archaic)",
    ],
  ],
  [
    "nidan verb (lower class) with 'su' ending (archaic)",
    [
      "nidan_verb::su::lower_class",
      "Nidan verb (lower class) with 'す' ending (archaic)",
    ],
  ],
  [
    "nidan verb (upper class) with 'tsu' ending (archaic)",
    [
      "nidan_verb::tsu::upper_class",
      "Nidan verb (upper class) with 'つ' ending (archaic)",
    ],
  ],
  [
    "nidan verb (lower class) with 'tsu' ending (archaic)",
    [
      "nidan_verb::tsu::lower_class",
      "Nidan verb (lower class) with 'つ' ending (archaic)",
    ],
  ],
  [
    "nidan verb (lower class) with 'u' ending and 'we' conjugation (archaic)",
    [
      "nidan_verb::u_with_we_conjugation::lower_class",
      "Nidan verb (lower class) with 'う' ending and 'ゑ' conjugation (archaic)",
    ],
  ],
  [
    "nidan verb (upper class) with 'yu' ending (archaic)",
    [
      "nidan_verb::yu::upper_class",
      "Nidan verb (upper class) with 'ゆ' ending (archaic)",
    ],
  ],
  [
    "nidan verb (lower class) with 'yu' ending (archaic)",
    [
      "nidan_verb::yu::lower_class",
      "Nidan verb (lower class) with 'ゆ' ending (archaic)",
    ],
  ],
  [
    "nidan verb (lower class) with 'zu' ending (archaic)",
    [
      "nidan_verb::zu::lower_class",
      "Nidan verb (lower class) with 'ず' ending (archaic)",
    ],
  ],
  [
    "yodan verb with 'bu' ending (archaic)",
    ["yodan_verb::bu", "Yodan verb with 'ぶ' ending (archaic)"],
  ],
  [
    "yodan verb with 'gu' ending (archaic)",
    ["yodan_verb::gu", "Yodan verb with 'ぐ' ending (archaic)"],
  ],
  [
    "yodan verb with 'hu/fu' ending (archaic)",
    ["yodan_verb::hu/fu", "Yodan verb with 'ふ' ending (archaic)"],
  ],
  [
    "yodan verb with 'ku' ending (archaic)",
    ["yodan_verb::ku", "Yodan verb with 'く' ending (archaic)"],
  ],
  [
    "yodan verb with 'mu' ending (archaic)",
    ["yodan_verb::mu", "Yodan verb with 'む' ending (archaic)"],
  ],
  [
    "yodan verb with 'nu' ending (archaic)",
    ["yodan_verb::nu", "Yodan verb with 'ぬ' ending (archaic)"],
  ],
  [
    "yodan verb with 'ru' ending (archaic)",
    ["yodan_verb::ru", "Yodan verb with 'る' ending (archaic)"],
  ],
  [
    "yodan verb with 'su' ending (archaic)",
    ["yodan_verb::su", "Yodan verb with 'す' ending (archaic)"],
  ],
  [
    "yodan verb with 'tsu' ending (archaic)",
    ["yodan_verb::tsu", "Yodan verb with 'つ' ending (archaic)"],
  ],
  [
    "godan verb - uru old class verb (old form of eru)",
    [
      "godan::uru::irregular_verb",
      "Godan verb - 'うる' old class verb (old form of える)",
    ],
  ],
  [
    "irregular ru verb, plain form ends with -ri",
    [
      "irregular_ru_verb_plain_form_ending_with_ri",
      "irregular 'る' verb, plain form ends with '-り'",
    ],
  ],
  [
    "su verb - precursor to the modern suru",
    ["su_verb", "'す' verb - precursor to the modern する"],
  ],
  ["suru verb - included", ["suru_verb", "'する' verb - included"]],
  [
    "ichidan verb - zuru verb (alternative form of -jiru verbs)",
    [
      "ichidan_verb::zuru",
      "Ichidan verb - 'ずる' verb (alternative form of '-じる' verbs)",
    ],
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
    ["electrical_engineering", "Electrical engineering"],
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
    ["mechanical_engineering", "Mechanical engineering"],
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
    ["professional_wrestling", "Professional wrestling term"],
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
    ["imperial_japanese_army_jargon", "Imperial Japanese army jargon"],
  ],
  [
    "meiji and taishō-era term",
    ["meiji_and_taishou_era", "Meiji and Taishō-era term"],
  ],
  [
    "after -masu base of verb; indicates contempt or disdain for another's actions",
    [
      "after::masu_stem",
      "After '-ます' base of verb; indicates contempt or disdain for another's actions",
    ],
  ],
  [
    "after -masu stem of verb; indicates an action is being directed to someone",
    [
      "after::masu_stem",
      "After '-ます' stem of verb; indicates an action is being directed to someone",
    ],
  ],
  [
    "after -masu stem of verb; often ぐるしい",
    ["after::masu_stem", "After '-ます' stem of verb; often ぐるしい"],
  ],
  [
    "after -masu stems, onomatopoeic and mimetic words",
    ["after::masu_stem", "After '-ます' stems, onomatopoeic and mimetic words"],
  ],
  [
    "after a -masu stem, esp. of a suru verb",
    ["after::masu_stem", "After a '-ます' stem, esp. of a する verb"],
  ],
  ["after a -nai stem", ["after::nai_stem", "After a '-ない' stem"]],
  ["after a name", ["after::name", "After a name"]],
  ["after a noun (+ の)", ["after::noun", "After a noun (+ の)"]],
  [
    "after a noun at the end of an interjection",
    ["after::noun", "After a noun at the end of an interjection"],
  ],
  [
    "after a noun indicating a person",
    ["after::noun", "After a noun indicating a person"],
  ],
  [
    "after a noun or -masu stem",
    ["after::noun_or_masu_stem", "After a noun or '-ます' stem"],
  ],
  [
    "after a noun or counter",
    ["after::noun_or_counter", "After a noun or counter"],
  ],
  [
    "after a noun or na-adjective; in conditional clauses",
    [
      "after::noun_or_na-adjective",
      "After a noun or な-adjective; in conditional clauses",
    ],
  ],
  [
    "after a noun or pronoun",
    ["after::noun_or_pronoun", "After a noun or pronoun"],
  ],
  [
    "after a noun, adverb or adj. stem",
    [
      "after::noun_adverb_or_adjective_stem",
      "After a noun, adverb or adjective stem",
    ],
  ],
  ["after a number n", ["after::number", "After a number"]],
  [
    "after a number of people",
    ["after::number_of_people", "After a number of people"],
  ],
  [
    "after a number or counter",
    ["after::number_or_counter", "After a number or counter"],
  ],
  ["after a quantity", ["after::quantity", "After a quantity"]],
  [
    "after a quantity, age, time, etc.",
    ["after::quantity", "After a quantity, age, time, etc."],
  ],
  ["after a surname", ["after::surname", "After a surname"]],
  [
    "after a time, date, etc.",
    ["after::time_date", "After a time, date, etc."],
  ],
  [
    "after a verb in the past tense",
    ["after::past_verb_form", "After the 'た' form of a verb"],
  ],
  [
    "after a volitional form",
    ["after::volitional_verb_form", "After volitional form of verb"],
  ],
  [
    "after an adjective, verb, or noun",
    ["after::adjective_verb_or_noun", "After an adjective, verb, or noun"],
  ],
  ["after an adverb", ["after::adverb", "After an adverb"]],
  ["after an age", ["after::age", "After an age"]],
  [
    "after an interrogative",
    ["after::interrogative", "After an interrogative"],
  ],
  [
    "after conditional -ba form of verb",
    ["after::conditional_ba_verb_form", "After conditional '-ば' form of verb"],
  ],
  [
    "after dictionary form verb",
    ["after::plain_verb_form", "After present form of a verb"],
  ],
  ["after neg. verb", ["with::negative_verb", "With negative verb"]],
  ["after negative verb", ["with::negative_verb", "With negative verb"]],
  [
    "after past tense verb",
    ["after::past_verb_form", "After the 'た' form of a verb"],
  ],
  [
    "after plain form of a verb or adjective",
    [
      "after::plain_verb_or_adjective_form",
      "After present form of a verb or an adjective stem",
    ],
  ],
  [
    "after the -nai stem of a verb",
    ["after::nai_stem", "After a '-ない' stem"],
  ],
  [
    "after the -ta form of a verb",
    ["after::past_verb_form", "After the 'た' form of a verb"],
  ],
  [
    "after the -te form of a verb or adjective",
    [
      "after::te_verb_or_adjective_form",
      "After the 'て' form of a verb or adjective",
    ],
  ],
  [
    "after the dictionary form of verb",
    ["after::plain_verb_form", "After present form of a verb"],
  ],
  [
    "after the stem of an adjective",
    ["after::adjective_stem", "After adjective stem"],
  ],
  [
    "after the volitional form of verb",
    ["after::volitional_verb_form", "After volitional form of verb"],
  ],
  ["at sentence end", ["at_sentence_end", "At sentence end"]],
  [
    "at sentence end after the -masu form of a verb",
    ["at_sentence_end", "At sentence end after the '-ます' form of a verb"],
  ],
  [
    "at sentence end after the question marker か",
    ["at_sentence_end", "At sentence end after the question marker か"],
  ],
  [
    "at sentence end; adds emphasis; usu. ったら",
    ["at_sentence_end", "At sentence end; adds emphasis; usu. ったら"],
  ],
  [
    "at sentence end; expresses depth of feeling or emphasis",
    [
      "at_sentence_end",
      "At sentence end; expresses depth of feeling or emphasis",
    ],
  ],
  [
    "at sentence end; gives reason for an unstated but deducible conclusion",
    [
      "at_sentence_end",
      "At sentence end; gives reason for an unstated but deducible conclusion",
    ],
  ],
  [
    "at sentence end; used as a request for confirmation or agreement",
    [
      "at_sentence_end",
      "At sentence end; used as a request for confirmation or agreement",
    ],
  ],
  [
    "at sentence end; used to express one's thoughts or feelings",
    [
      "at_sentence_end",
      "At sentence end; used to express one's thoughts or feelings",
    ],
  ],
  [
    "at sentence end; used to make a sentence threatening or ironic",
    [
      "at_sentence_end",
      "At sentence end; used to make a sentence threatening or ironic",
    ],
  ],
  [
    "at sentence end; used to make an informal request",
    ["at_sentence_end", "At sentence end; used to make an informal request"],
  ],
  [
    "at sentence end; with a negative",
    ["at_sentence_end", "At sentence end; with a negative"],
  ],
  ["at sentence-end", ["at_sentence_end", "At sentence end"]],
  [
    "at sentence-end; indicates certainty, emphasis, contempt, request, warning, etc.",
    [
      "at_sentence_end",
      "At sentence end; indicates certainty, emphasis, contempt, request, warning, etc.",
    ],
  ],
  [
    "at sentence-end; indicates certainty, emphasis, etc.",
    ["at_sentence_end", "At sentence end; indicates certainty, emphasis, etc."],
  ],
  [
    "sentence end, mainly masc.",
    ["at_sentence_end", "At sentence end, mainly masculine"],
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
    "followed by a counter and か",
    ["after::counter", "Followed by a counter and か"],
  ],
  [
    "followed by a verb in negative form",
    ["after::negative_verb", "Followed by a verb in negative form"],
  ],
  ["following adj. stem", ["after::adjective_stem", "After adjective stem"]],
  [
    "following adj. stem or noun",
    ["after::adjective_stem_or_noun", "After adjective stem or noun"],
  ],
  [
    "following the te-form of a verb",
    ["after::te_form", "After the 'て' form of a verb"],
  ],
  [
    "follows verbs, adjectives",
    ["after::verb_or_adjective", "After a verb or an adjective"],
  ],
  [
    "formal or literary polite copula",
    ["formal_or_literary_polite_copula", "Formal or literary polite copula"],
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
    ["with::negative_verb", "With negative verb"],
  ],
  [
    "with an interrogative word",
    ["with::interrogative", "With an interrogative"],
  ],
  [
    "with neg. verb or adjective",
    ["with::negative_verb_or_adjective", "With negative verb or adjective"],
  ],
]);
