import * as http from "../util/http";
import { ChangeEvent, useState } from "react";

import ResultDisplay from "./SearchResult";
import WordData from "../data/types";
import { useFavoriteCtx } from "../store/favoriteCtx";

import "../styles/search&result.css";
import "../styles/layout.css";

/**
 * This is the component that managing the search bar and you will also find the result component rendered here.
 */

const SearchBar = () => {
  const [word, setWord] = useState<string>("");
  const [result, setResult] = useState<WordData[]>([]);
  const { dispatch } = useFavoriteCtx();
  const [notFoundMsg, setNotFoundMsg] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleSearch = async () => {
    try {
      setResult([]);

      if (word.trim() === "") {
        console.log("SEARCH BAR IS EMPTY");
        setNotFoundMsg("Search bar is empty, enter a word");
        setInputError(true);
      } else {
        const data = await http.fetchWordData(word);

        if (data && data.length > 0) {
          console.log("WORD FOUND");
          dispatch({ type: "SET_SELECTED_WORD", payload: data[0] });
          setNotFoundMsg("");
          setInputError(false);
        }
        setResult(data);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setInputError(true);
      setNotFoundMsg("Error: " + error.message);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  return (
    <div className="searchContainer">
      <input
        type="text"
        value={word}
        onChange={handleInputChange}
        placeholder="Enter a word"
        className={`searchBar ${inputError ? "searchBar-error" : ""}`}
      />
      <button className="searchBtn" onClick={handleSearch}>
        Search
      </button>
      <div>
        {notFoundMsg && <span className="notFoundPopUp">{notFoundMsg}</span>}
        <ResultDisplay result={result} />
      </div>
    </div>
  );
};

export default SearchBar;
