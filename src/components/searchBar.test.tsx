import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// subjects for testing
import SearchBar from "./SearchBar";
import { FavoriteCtxProvider } from "../store/favoriteCtx";

const customRender = () => {
  return render(
    <FavoriteCtxProvider>
      <SearchBar />
    </FavoriteCtxProvider>
  );
};

test("if there is a searchbar", () => {
  customRender();
  const searchBar = screen.getByRole("textbox");
  expect(searchBar).toBeInTheDocument();
});

test("if there is a button", () => {
  customRender();
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

test("what happens if search bar is empty when searching", async () => {
  customRender();
  const button = screen.getByRole("button");
  userEvent.click(button);
  const errorElements = await screen.findAllByText(
    "Search bar is empty, enter a word"
  );
  expect(errorElements[0]).toBeInTheDocument();
});

describe("what happens when you are searching for a word that dosent exist", () => {
  vi.mock("../util/http", () => ({
    fetchWordData: vi.fn(() => Promise.reject(new Error("Word not found"))),
  }));

  test("what happens when you are searching for a word that does not exist", async () => {
    customRender();
    const button = screen.getByRole("button");
    const searchBar = screen.getByRole("textbox");
    const user = userEvent.setup();

    await user.type(searchBar, "asdasdasd");
    await user.click(button);

    const errorElements = await screen.findByText("Error: Word not found");
    expect(errorElements).toBeInTheDocument();
  });
});
