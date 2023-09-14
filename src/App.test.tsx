import { rest } from "msw";
import { setupServer } from "msw/node";
import { beforeAll, afterAll } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FavoriteCtxProvider } from "./store/favoriteCtx";
import exDataBuild from "./__test__/exampleDataBuild.json";
import App from "./App";

const buildWord = exDataBuild[0].word;
/* const buildPhonetic = exDataBuild[0].phonetics;
const buildPhonetics = exDataBuild[0].phonetics;
const buildMeanings = exDataBuild[0].meanings;
const buildDefinitions = exDataBuild[0].meanings[0].definitions;
*/

const server = setupServer(
  // Describe the requests to mock.
  rest.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${buildWord}`,
    (_req, res, ctx) => {
      return res(ctx.json(exDataBuild));
    }
  )
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

it("renders without crashing", async () => {
  render(
    <FavoriteCtxProvider>
      <App />
    </FavoriteCtxProvider>
  );
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");
  const searchButton = screen.getByText("Search");

  await user.type(input, buildWord);
  expect(input).toHaveValue(buildWord);
  await user.click(searchButton);
  expect(screen.getByText("Search Result:")).toBeInTheDocument();
});

it("renders the word", async () => {
  render(
    <FavoriteCtxProvider>
      <App />
    </FavoriteCtxProvider>
  );
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");
  const searchButton = screen.getByText("Search");

  await user.type(input, buildWord);
  expect(input).toHaveValue(buildWord);
  await user.click(searchButton);
  expect(screen.getByText(buildWord)).toBeInTheDocument();
});

it("Adding a word to favorites", async () => {
  render(
    <FavoriteCtxProvider>
      <App />
    </FavoriteCtxProvider>
  );
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");
  const searchButton = screen.getByText("Search");

  await user.type(input, buildWord);
  expect(input).toHaveValue(buildWord);
  await user.click(searchButton);
  expect(screen.getByText(buildWord)).toBeInTheDocument();

  const favoriteButton = screen.getByText("Add to favorites"); // Cant find this button?

  await user.click(favoriteButton);
  expect(screen.getByText("Remove")).toBeInTheDocument();
});
