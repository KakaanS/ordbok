import React, { createContext, useContext, useReducer, ReactNode } from "react";
import WordData from "../data/types";

/**
 * Context handling the favorites list and the selected word from the list.
 */

interface FavoriteCtxState {
  favorites: WordData[];
  selectedWord: WordData | null;
}

type FavoriteCtxAction =
  | {
      type: "ADD_TO_FAVORITES";
      payload: WordData;
    }
  | { type: "REMOVE_FROM_FAVORITES"; payload: string }
  | { type: "SET_SELECTED_WORD"; payload: WordData | null };

const FavoriteCtx = createContext<
  | { state: FavoriteCtxState; dispatch: React.Dispatch<FavoriteCtxAction> }
  | undefined
>(undefined);

const initialState: FavoriteCtxState = {
  favorites: [],
  selectedWord: null,
};

const favoriteReducer = (
  state: FavoriteCtxState,
  action: FavoriteCtxAction
): FavoriteCtxState => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.word !== action.payload
        ),
      };
    case "SET_SELECTED_WORD":
      return {
        ...state,
        selectedWord: action.payload,
      };
    default:
      return state;
  }
};

export const FavoriteCtxProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(favoriteReducer, initialState);

  return (
    <FavoriteCtx.Provider value={{ state, dispatch }}>
      {children}
    </FavoriteCtx.Provider>
  );
};

export const useFavoriteCtx = () => {
  const context = useContext(FavoriteCtx);
  if (context === undefined) {
    throw new Error("useFavoriteCtx must be used within a FavoriteCtxProvider");
  }
  return context;
};
