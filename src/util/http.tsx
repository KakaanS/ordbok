/**
 * This file contains the http request to the dictionary api.
 */

const wordURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export async function fetchWordData(word: string) {
  const response = await fetch(`${wordURL}${word}`);
  return response.json();
}
