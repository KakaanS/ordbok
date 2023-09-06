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
      <h1>Searchresult:</h1>
      <h3>The word you searched for: {wordData.word}</h3>
      {wordData.meaning && wordData.meaning.length > 0 && (
        <div>
          <h3>Definition:</h3>
          <p>{wordData.meaning[0].definitions[0].definition}</p>
        </div>
      )}
    </div>
  );
}

export default ResultDisplay;
