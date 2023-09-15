import { useEffect } from "react";
import WordData from "../data/types.tsx";
import { useFavoriteCtx } from "../store/favoriteCtx.tsx";
import "../styles/search&result.css";

/**
 * When a search has been made, this component will display the result.
 * If the user clicks a word from his "favorites" list, the result will also be displayed here.
 */

interface ResultDisplayProps {
  result: WordData[];
}

function ResultDisplay({ result }: ResultDisplayProps) {
  const { state, dispatch } = useFavoriteCtx();
  const selectedWord = state.selectedWord;

  useEffect(() => {
    if (selectedWord && selectedWord.phonetics) {
      const audioElements = document.querySelectorAll("audio");
      selectedWord.phonetics.forEach((phonetic, index) => {
        const audio = audioElements[index] as HTMLAudioElement;
        if (phonetic?.audio && audio) {
          audio.setAttribute("src", phonetic.audio);
        }
      });
    }
  }, [selectedWord]);

  if (!result || result.length === 0) {
    return <p>Welcome to search for a word</p>;
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
          <h2>{selectedWord.word}</h2>
          {selectedWord.meanings && selectedWord.meanings.length > 0 && (
            <div className="definitionsContainer">
              <h3>Definitions:</h3>
              <ul>
                {selectedWord.meanings[0].definitions
                  .slice(0, 3)
                  .map((definition, index) => (
                    <li key={index}>{definition.definition}</li>
                  ))}
              </ul>
            </div>
          )}
          {selectedWord.meanings && selectedWord.meanings.length > 0 && (
            <div className="originContainer">
              <h3>Part of speech:</h3>
              <p>{selectedWord.meanings[0].partOfSpeech}</p>
              {selectedWord.meanings.length > 1 && (
                <p>{selectedWord.meanings[1].partOfSpeech}</p>
              )}
            </div>
          )}
          {selectedWord.meanings && selectedWord.meanings.length > 0 && (
            <div className="synonymsContainer">
              <h3>Synonyms:</h3>
              <ul>
                {selectedWord.meanings.map((meaning, meaningIndex) => (
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

          {selectedWord.phonetics && selectedWord.phonetics.length > 0 && (
            <div className="audioContainer">
              <h3>Audio:</h3>
              <ul>
                {selectedWord.phonetics.map((phonetic, phoneticIndex) => (
                  <div key={phoneticIndex}>
                    {phonetic?.audio && (
                      <>
                        <audio controls data-testid="audio-element">
                          <source src={phonetic.audio} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </>
                    )}
                  </div>
                ))}
              </ul>
            </div>
          )}
          <div>
            <button onClick={() => handleAddToFavorites(selectedWord)}>
              Add to favorites
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>{wordData.word}</h2>
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
          {wordData.meanings && wordData.meanings.length > 0 && (
            <div className="originContainer">
              <h3>Part of speech:</h3>
              <p>{wordData.meanings[0].partOfSpeech}</p>
              {wordData.meanings.length > 1 && (
                <p>{wordData.meanings[1].partOfSpeech}</p>
              )}
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
              <h3 data-testid="audioHeader">Audio:</h3>
              <ul>
                {wordData.phonetics.map((phonetic, phoneticIndex) => (
                  <div key={phoneticIndex}>
                    {phonetic?.audio && (
                      <>
                        <audio controls data-testid="audioElement">
                          <source
                            data-testid="sourceElement"
                            src={phonetic.audio}
                            type="audio/mpeg"
                          />
                          Your browser does not support the audio element.
                        </audio>
                      </>
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
