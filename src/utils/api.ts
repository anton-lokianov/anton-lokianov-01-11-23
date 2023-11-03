import axios from "axios";

const BASE_URL = "https://dataservice.accuweather.com";
const API_KEY = "i8p372LM3yxIHqnPtWwQtpy4UOZMybdc";

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
    throw new Error("Failed to fetch location data");
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
    throw new Error("Failed to fetch current weather data");
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
    throw new Error("Failed to fetch forecast data");
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
    return response.data.Key;
  } catch (err) {
    throw new Error("Failed to fetch location key from coordinates");
  }
};
