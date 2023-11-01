import axios from "axios";

const BASE_URL = "http://dataservice.accuweather.com";
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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
  }
};
