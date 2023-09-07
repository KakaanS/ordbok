interface Phonetic {
  text: string;
  audio?: string;
  sourceUrl?: string;
  license?: {
    name: string;
    url: string;
  };
}

interface Definitions {
  definition: string;
  example?: string;
}

interface Meanings {
  partOfSpeech: string;
  definitions: Definitions[];
  synonyms?: string[];
  antonyms?: string[];
}

interface WordData {
  word: string;
  phonetic: string;
  phonetics?: Phonetic[];
  origin: string;
  meanings?: Meanings[];
  sourceUrls?: string[];
  license?: {
    name: string;
    url: string;
  };
}

export default WordData;
