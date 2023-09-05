interface Phonetic {
  text: string;
  audio?: string;
  sourceUrl?: string;
  license?: {
    name: string;
    url: string;
  };
}
interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms?: string[];
  antonyms?: string[];
}

interface WordData {
  word: string;
  phonetic: string;
  phonetics?: Phonetic[];
  origin: string;
  meaning?: Meaning[];
  sourceUrls?: string[];
  license?: {
    name: string;
    url: string;
  };
}

export default WordData;
