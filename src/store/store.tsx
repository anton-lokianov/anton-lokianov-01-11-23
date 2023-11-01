import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import favoritesSlice from "./favorites-slice";

const favoritesPersistConfig = {
  key: "favorites",
  storage,
};

const persistedFavoritesReducer = persistReducer(
  favoritesPersistConfig,
  favoritesSlice
);

const rootReducer = {
  favorites: persistedFavoritesReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
