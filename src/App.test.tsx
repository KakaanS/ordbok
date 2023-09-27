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

const server = setupServer(
  rest.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${buildWord}`,
    (_req, res, ctx) => {
      console.log("API MOCK: Received request with URL", _req.url);
      const response = ctx.json(exDataBuild);
      console.log("API Mock: sending response data:", response);
      return res(response);
    }
  )
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

beforeEach(() => {
  server.resetHandlers();
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
  expect(screen.getByText("Exact matches:")).toBeInTheDocument();
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

  const favoriteButton = screen.getByText("Add to favorites");

  await user.click(favoriteButton);
  expect(screen.getByText("Remove")).toBeInTheDocument();
});

it("fetch retrieves MP3 file", async () => {
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
  expect(await screen.findByText("Exact matches:")).toBeInTheDocument();

  const audioElement = screen.getAllByTestId("audioElement")[0];
  const sourceElement = screen.getAllByTestId("sourceElement")[0];

  expect(audioElement).toBeInTheDocument();
  expect(sourceElement).toHaveAttribute("type", "audio/mpeg");
});
