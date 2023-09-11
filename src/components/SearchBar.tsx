import * as http from "../util/http";
import { ChangeEvent, useState } from "react";

import ResultDisplay from "./SearchResult";
import WordData from "../data/types";

import "../styles/search&result.css";

export const SearchBar = () => {
  const [word, setWord] = useState<string>("");
  const [result, setResult] = useState<WordData[] | null>(null);

  const handleSearch = async () => {
    try {
      const data = await http.fetchWordData(word);
      console.log("data", data);
      setResult(data);
    } catch (error) {
      console.log("error fetching word", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  return (
    <div className="searchbarOuterContainer">
      <input
        type="text"
        value={word}
        onChange={handleInputChange}
        placeholder="Enter a word"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {result && result.length > 0 && <ResultDisplay result={result} />}
      </div>
    </div>
  );
};
