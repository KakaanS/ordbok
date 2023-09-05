interface Phonetic {
  text: string;
  audio?: string;
}
interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface WordData {
  word: string;
  phonetic: string;
  phonetics?: Phonetic[];
  origin: string;
  meaning?: Meaning[];
}

export default WordData;
