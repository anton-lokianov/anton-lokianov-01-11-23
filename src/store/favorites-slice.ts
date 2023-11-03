import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  favorites: any[];
  selectedFavorites: any[];
}

const initialState: FavoritesState = {
  favorites: [],
  selectedFavorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<any>) => {
      const isAlreadyFavorite = state.favorites.some(
        (city) => city.id === action.payload.id
      );

      if (!isAlreadyFavorite) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (city) => city.id !== action.payload
      );
    },
    removeSelectedFavorites: (state, action: PayloadAction<string[]>) => {
      const idsToRemove = action.payload;
      state.favorites = state.favorites.filter(
        (city) => !idsToRemove.includes(city.id)
      );
      state.selectedFavorites = [];
    },
    toggleSelectedFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedFavorites.includes(id)) {
        state.selectedFavorites = state.selectedFavorites.filter(
          (favId) => favId !== id
        );
      } else {
        state.selectedFavorites.push(id);
      }
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  removeSelectedFavorites,
  toggleSelectedFavorite,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
