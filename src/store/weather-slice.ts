import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  currentWeather: any | null;
  forecast: any | null;
  searchQuery: string | null;
  temperatureUnit: "fahrenheit" | "celsius";
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  searchQuery: null,
  temperatureUnit: "fahrenheit",
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
    setTemperatureUnit: (state) => {
      state.temperatureUnit =
        state.temperatureUnit === "fahrenheit" ? "celsius" : "fahrenheit";
    },
  },
});

export const {
  setCurrentWeather,
  setForecast,
  setSearchQuery,
  setTemperatureUnit,
} = weatherSlice.actions;
export default weatherSlice.reducer;
