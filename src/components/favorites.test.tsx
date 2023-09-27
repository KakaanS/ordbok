import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { beforeAll, afterAll } from "vitest";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

// Component & Context
import Favorites from "./favorites";
import { FavoriteCtxProvider } from "../store/favoriteCtx";
import exDataBuild from "../__test__/exampleDataBuild.json";
import App from "../App";

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

test("renders favorites heading", () => {
  render(
    <FavoriteCtxProvider>
      <Favorites />
    </FavoriteCtxProvider>
  );
  const favoritesHeading = screen.getByText("Favorites");
  expect(favoritesHeading).toBeInTheDocument();
});

describe("Testing the favorites list by adding more than one of the same, and removing a word", () => {
  test("Adding a word to favorites", async () => {
    render(
      <FavoriteCtxProvider>
        <App />
      </FavoriteCtxProvider>
    );
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    const searchButton = screen.getByText("Search");

    await user.type(input, buildWord);
    await user.click(searchButton);
    expect(screen.getByText("Exact matches:")).toBeInTheDocument();

    const addToFavoriteBtn = screen.getByText("Add to favorites");
    await user.click(addToFavoriteBtn);
    expect(screen.getByText("Remove")).toBeInTheDocument();
  });

  test("Adding the same word twice", async () => {
    render(
      <FavoriteCtxProvider>
        <App />
      </FavoriteCtxProvider>
    );
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    const searchButton = screen.getByText("Search");

    await user.type(input, buildWord);
    await user.click(searchButton);

    const addToFavoriteBtn = screen.getByText("Add to favorites");
    await user.click(addToFavoriteBtn);
    expect(screen.getByText("Remove")).toBeInTheDocument();
    await user.click(addToFavoriteBtn);
    expect(
      screen.getByText(
        "Word already exists in favorites, you can't have 2 of the same!"
      )
    ).toBeInTheDocument();
  });

  test("Removing a word from favorites", async () => {
    render(
      <FavoriteCtxProvider>
        <App />
      </FavoriteCtxProvider>
    );
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    const searchButton = screen.getByText("Search");

    await user.type(input, buildWord);
    await user.click(searchButton);

    const addToFavoriteBtn = screen.getByText("Add to favorites");
    await user.click(addToFavoriteBtn);
    expect(screen.getByText("Remove")).toBeInTheDocument();
    const removeButton = screen.getByText("Remove");
    await user.click(removeButton);
    expect(removeButton).not.toBeInTheDocument();
  });
});
