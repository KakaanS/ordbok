import { useEffect } from "react";
import WordData from "../data/types.tsx";
import { useFavoriteCtx } from "../store/favoriteCtx.tsx";
import "../styles/search&result.css";

interface ResultDisplayProps {
  result: WordData[];
}

function ResultDisplay({ result }: ResultDisplayProps) {
  const { state, dispatch } = useFavoriteCtx();
  const selectedWord = state.selectedWord;

  useEffect(() => {
    if (selectedWord && selectedWord.phonetics) {
      const audioElements = document.querySelectorAll("audio");
      audioElements.forEach((audio, index) => {
        const phonetic = selectedWord.phonetics?.[index];
        if (phonetic?.audio) {
          audio.setAttribute("src", phonetic.audio);
        }
      });
    }
  }, [selectedWord]);

  if (!result || result.length === 0) {
    return <p>No results to display.</p>;
  }

  const wordData = selectedWord || result[0];

  const handleAddToFavorites = (wordData: WordData) => {
    if (dispatch) {
      dispatch({ type: "ADD_TO_FAVORITES", payload: wordData });
      console.log("added data", wordData);
    }
  };

  return (
    <div className="outerContainer">
      <h1 className="searchTitle">Search Result:</h1>
      {selectedWord ? (
        <>
          <h3>The word you selected: {selectedWord.word}</h3>
          {selectedWord.meanings && selectedWord.meanings.length > 0 && (
            <div className="definitionsContainer">
              <h3>Definitions:</h3>
              <ul>
                {selectedWord.meanings[0].definitions.map(
                  (definition, index) => (
                    <li key={index}>{definition.definition}</li>
                  )
                )}
              </ul>
            </div>
          )}

          {selectedWord.phonetics && selectedWord.phonetics.length > 0 && (
            <div className="audioContainer">
              <h3>Audio:</h3>
              <ul>
                {selectedWord.phonetics.map((phonetic, phoneticIndex) => (
                  <div key={phoneticIndex}>
                    <h4>Audio {phoneticIndex + 1}</h4>
                    {phonetic?.audio && (
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
        </>
      ) : (
        <>
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
                    {phonetic?.audio && (
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
            <button onClick={() => handleAddToFavorites(wordData)}>
              Add to favorites
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default ResultDisplay;
