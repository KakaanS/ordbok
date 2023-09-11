import WordData from "../data/types.tsx";
import "../styles/search&result.css";

interface ResultDisplayProps {
  result: WordData[];
}

function ResultDisplay({ result }: ResultDisplayProps) {
  if (!result || result.length === 0) {
    return <p>No results to display.</p>;
  }

  const wordData = result[0];

  const handleAddToFavorites = () => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      const favoritesArray = JSON.parse(favorites);
      favoritesArray.push(wordData);
      localStorage.setItem("favorites", JSON.stringify(favoritesArray));
    } else {
      localStorage.setItem("favorites", JSON.stringify([wordData]));
    }
  };

  return (
    <div className="outerContainer">
      <h1 className="searchTitle">Searchresult:</h1>
      <h3>The word you searched for: {wordData.word}</h3>
      {wordData.meanings && wordData.meanings.length > 0 && (
        <div className="definitionsContainer">
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
        <div className="originContainer">
          <h3>Origin:</h3>
          <p>{wordData.origin}</p>
        </div>
      )}
      {wordData.meanings && wordData.meanings.length > 0 && (
        <div className="synonymsContainer">
          <h3>Synonyms:</h3>
          <ul>
            {wordData.meanings.map((meaning, meaningIndex) => (
              <div key={meaningIndex}>
                <ul>
                  {meaning.synonyms?.slice(0, 3).map((synonym, index) => (
                    <li key={index}>{synonym}</li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        </div>
      )}

      {wordData.phonetics && wordData.phonetics.length > 0 && (
        <div className="audioContainer">
          <h3>Audio:</h3>
          <ul>
            {wordData.phonetics.map((phonetic, phoneticIndex) => (
              <div key={phoneticIndex}>
                <h4>Audio {phoneticIndex + 1}</h4>
                {phonetic.audio && (
                  <audio controls>
                    <source src={phonetic.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            ))}
          </ul>
        </div>
      )}
      <div>
        <button onClick={handleAddToFavorites}>Add to favorites</button>
      </div>
    </div>
  );
}

export default ResultDisplay;
