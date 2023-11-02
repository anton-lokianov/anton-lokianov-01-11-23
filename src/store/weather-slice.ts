import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  currentWeather: any | null;
  forecast: any | null;
  searchQuery: string | null; // New state for managing the search query
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  searchQuery: null, // Initial value of the search query
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCurrentWeather: (state, action: PayloadAction<any | null>) => {
      state.currentWeather = action.payload;
    },
    setForecast: (state, action: PayloadAction<any | null>) => {
      state.forecast = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string | null>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setCurrentWeather, setForecast, setSearchQuery } =
  weatherSlice.actions;
export default weatherSlice.reducer;
