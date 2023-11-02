import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import favoritesSlice from "./favorites-slice";
import weatherSlice from "./weather-slice";
import uiSlice from "./ui-slice";

const favoritesPersistConfig = {
  key: "favorites",
  storage,
};

const weatherPersistConfig = {
  key: "weather",
  storage,
};

const uiPersistConfig = {
  key: "ui",
  storage,
};

const persistedWeatherReducer = persistReducer(
  weatherPersistConfig,
  weatherSlice
);

const persistedUIReducer = persistReducer(uiPersistConfig, uiSlice);

const persistedFavoritesReducer = persistReducer(
  favoritesPersistConfig,
  favoritesSlice
);

const rootReducer = {
  favorites: persistedFavoritesReducer,
  weather: persistedWeatherReducer,
  ui: persistedUIReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
