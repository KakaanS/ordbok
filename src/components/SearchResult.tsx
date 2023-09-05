import WordData from "../data/types";

interface ResultDisplayProps {
  result: WordData[];
}

function ResultDisplay({ result }: ResultDisplayProps) {
  if (!result || result.length === 0) {
    return <p>No results to display.</p>;
  }

  const wordData = result[0];

  return (
    <div>
      <h1>Result:</h1>
      <h2>{wordData.word}</h2>
      <p>{wordData.phonetic}</p>
      {wordData.phonetics && wordData.phonetics.length > 0 && (
        <div>
          <h3>Phonetics:</h3>
          <ul>
            {wordData.phonetics.map((phonetic, index) => (
              <li key={index}>
                {phonetic.text}
                {phonetic.audio && (
                  <audio controls>
                    <source src={`https:${phonetic.audio}`} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p>Origin: {wordData.origin}</p>
      {wordData.meaning && wordData.meaning.length > 0 && (
        <div>
          <h3>Meaning:</h3>
          {wordData.meaning.map((meaning, index) => (
            <div key={index}>
              <p>Part of Speech: {meaning.partOfSpeech}</p>
              <ul>
                {meaning.definitions.map((definition, defIndex) => (
                  <li key={defIndex}>
                    <p>Definition: {definition.definition}</p>
                    {definition.example && <p>Example: {definition.example}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResultDisplay;
