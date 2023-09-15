import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// Component, Context & exData
import ResultDisplay from "./SearchResult";
import { FavoriteCtxProvider } from "../store/favoriteCtx";
import exDataBuild from "../__test__/exampleDataBuild.json";

it("tests if there is a phonetic", () => {
  render(
    <FavoriteCtxProvider>
      <ResultDisplay result={[exDataBuild[0]]} />
    </FavoriteCtxProvider>
  );
  const audio = screen.getAllByTestId("audioElement")[0];

  expect(audio).toBeInTheDocument();
});

it("test if audio is playable", async () => {
  render(
    <FavoriteCtxProvider>
      <ResultDisplay result={[exDataBuild[0]]} />
    </FavoriteCtxProvider>
  );

  const source = screen.getAllByTestId("sourceElement")[0];
  expect(source).toHaveAttribute("src", exDataBuild[0].phonetics[0].audio);
});
