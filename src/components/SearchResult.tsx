import WordData from "../data/types.tsx";

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
      <h1>Searchresult:</h1>
      <h3>The word you searched for: {wordData.word}</h3>
      {wordData.meanings && wordData.meanings.length > 0 && (
        <div>
          <h3>Definitions:</h3>
          <ul>
            {wordData.meanings[0].definitions
              .slice(0, 3)
              .map((definition, index) => (
                <li key={index}>{definition.definition}</li>
              ))}
          </ul>
        </div>
      )}
      {wordData.origin && (
        <div>
          <h3>Origin:</h3>
          <p>{wordData.origin}</p>
        </div>
      )}
    </div>
  );
}

export default ResultDisplay;
