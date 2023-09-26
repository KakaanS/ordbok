import { render } from "@testing-library/react";
import ResultDisplay from "./SearchResult";
import exDataBuild from "../__test__/exampleDataBuild.json"; // Wherever your mockWordData is stored
import { FavoriteCtxProvider } from "../store/favoriteCtx";

vi.mock("../store/favoriteCtx.tsx", () => ({
  useFavoriteCtx: () => ({
    state: {
      selectedWord: exDataBuild[0],
      favorites: [],
    },
    dispatch: vi.fn(),
  }),
}));

test("renders an audio element and source", () => {
  const { getByTestId } = render(
    <FavoriteCtxProvider>
      <ResultDisplay result={[exDataBuild[0]]} />
    </FavoriteCtxProvider>
  );

  const audioElement = getByTestId("audio-element-0");
  expect(audioElement).toBeInTheDocument();
});
