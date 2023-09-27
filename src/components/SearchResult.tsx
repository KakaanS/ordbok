import { useState, useEffect } from "react";
import WordData from "../data/types.tsx";
import { useFavoriteCtx } from "../store/favoriteCtx.tsx";
import "../styles/search&result.css";

interface ResultDisplayProps {
  result: WordData[];
}

function ResultDisplay({ result }: ResultDisplayProps) {
  const { state, dispatch } = useFavoriteCtx();
  const selectedWord = state.selectedWord;
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [wordInFavorites, setWordInFavorites] = useState<boolean>(false);

  useEffect(() => {
    setFeedbackMessage("");
  }, [result]);

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

  const handleAddToFavorites = (word: WordData) => {
    if (state.favorites.some((favorite) => favorite.word === word.word)) {
      setFeedbackMessage(
        "Word already exists in favorites, you can't have 2 of the same!"
      );
      setWordInFavorites(true);
    } else {
      dispatch({ type: "ADD_TO_FAVORITES", payload: word });
      setFeedbackMessage("Word added to favorites!");
      setWordInFavorites(false);
    }
  };

  return (
    <div className="outerContainer">
      <div className={wordInFavorites ? "redFeedback" : "whiteFeedback"}>
        {feedbackMessage}
      </div>
      <h1 className="searchTitle">Exact matches:</h1>
      <div className="resultContainer">
        <div className="leftColumn">
          <h2>{wordData.word}</h2>
          {selectedWord
            ? selectedWord.meanings &&
              selectedWord.meanings.map((meaning, meaningIndex) => (
                <div key={meaningIndex}>
                  <h3>Part of speech:</h3>
                  <p>{meaning.partOfSpeech}</p>
                  <h3>Definitions:</h3>
                  <ul>
                    {meaning.definitions.map((definition, index) => (
                      <li key={index}>{definition.definition}</li>
                    ))}
                  </ul>
                  {meaning.synonyms && meaning.synonyms.length > 0 && (
                    <>
                      <h3>Synonyms:</h3>
                      <ul>
                        {meaning.synonyms.map((synonym, index) => (
                          <li key={index}>{synonym}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ))
            : wordData.meanings &&
              wordData.meanings.map((meaning, meaningIndex) => (
                <div key={meaningIndex}>
                  <h3>Part of speech:</h3>
                  <p>{meaning.partOfSpeech}</p>
                  <h3>Definitions:</h3>
                  <ul>
                    {meaning.definitions.map((definition, index) => (
                      <li key={index}>{definition.definition}</li>
                    ))}
                  </ul>
                  {meaning.synonyms && meaning.synonyms.length > 0 && (
                    <>
                      <h3>Synonyms:</h3>
                      <ul>
                        {meaning.synonyms.map((synonym, index) => (
                          <li key={index}>{synonym}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ))}
        </div>
        {selectedWord && selectedWord.phonetics && (
          <div className="rightColumn">
            <div className="audioContainer">
              <h3>Audio:</h3>
              <ul>
                {selectedWord.phonetics.map((phonetic, phoneticIndex) => (
                  <li key={phoneticIndex}>
                    {phonetic.audio && (
                      <audio controls data-testid="audioElement">
                        <source
                          src={phonetic.audio}
                          type="audio/mpeg"
                          data-testid="sourceElement"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button onClick={() => handleAddToFavorites(selectedWord)}>
                Add to favorites
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultDisplay;
