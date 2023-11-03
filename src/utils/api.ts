import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const autocompleteLocation = async (query: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/locations/v1/cities/autocomplete`,
      {
        params: {
          apikey: API_KEY,
          q: query,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch location data Please try again later");
  }
};

export const getCurrentWeather = async (locationKey: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/currentconditions/v1/${locationKey}`,
      {
        params: {
          apikey: API_KEY,
        },
      }
    );
    return response.data[0];
  } catch (err) {
    throw new Error(
      "Failed to fetch current weather data Please try again later"
    );
  }
};

export const get5DayForecast = async (locationKey: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecasts/v1/daily/5day/${locationKey}`,
      {
        params: {
          apikey: API_KEY,
        },
      }
    );
    return response.data.DailyForecasts;
  } catch (err) {
    throw new Error("Failed to fetch forecast data Please try again later");
  }
};

export const getLocationKeyByLatLon = async (
  latitude: number,
  longitude: number
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/locations/v1/cities/geoposition/search`,
      {
        params: {
          apikey: API_KEY,
          q: `${latitude},${longitude}`,
        },
      }
    );
    return {
      locationKey: response.data.Key,
      cityName: response.data.LocalizedName,
    };
  } catch (err) {
    throw new Error("Failed to fetch location key from coordinates");
  }
};
