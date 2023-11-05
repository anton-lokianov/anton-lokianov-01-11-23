import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  autocompleteLocation,
  getCurrentWeather,
  get5DayForecast,
  getLocationKeyByLatLon,
} from "../utils/api";
import { setCurrentWeather, setForecast } from "../store/weather-slice";

export const useWeather = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleError = (message: any) => {
    setError(message);
    setIsLoading(false);
  };

  // Async function to fetch weather data for a given city
  const fetchWeather = async (city: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const locations = await autocompleteLocation(city);
      if (locations.length === 0) {
        handleError("Location not found.");
        return;
      }
      const locationKey = locations[0].Key;
      const [currentWeatherData, forecastData] = await Promise.all([
        getCurrentWeather(locationKey),
        get5DayForecast(locationKey),
      ]);
      dispatch(
        setCurrentWeather({
          ...currentWeatherData,
          cityName: locations[0].LocalizedName,
          id: locationKey,
        })
      );
      dispatch(setForecast(forecastData));
    } catch (error) {
      handleError("Failed to fetch weather data");
      console.error("Fetch weather error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Async function to fetch weather data based on geolocation coordinates
  const fetchWeatherByLocation = async (
    latitude: number,
    longitude: number
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const { locationKey, cityName } = await getLocationKeyByLatLon(
        latitude,
        longitude
      );

      // Fetch current weather and 5-day forecast in parallel
      const [currentWeatherData, forecastData] = await Promise.all([
        getCurrentWeather(locationKey),
        get5DayForecast(locationKey),
      ]);
      // Dispatch actions to update the store with new weather data
      dispatch(
        setCurrentWeather({
          ...currentWeatherData,
          cityName: cityName,
          id: locationKey,
        })
      );
      dispatch(setForecast(forecastData));
    } catch (error) {
      handleError("Failed to fetch weather data for your location");
      console.error("Fetch weather by location error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchWeather, fetchWeatherByLocation, isLoading, error, setError };
};
