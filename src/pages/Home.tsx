import { useState, useEffect } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { AiOutlineSearch } from "react-icons/ai";
import {
  autocompleteLocation,
  get5DayForecast,
  getCurrentWeather,
  getLocationKeyByLatLon,
} from "../utils/api";
import WeatherData from "../components/WeatherData";
import {
  setCurrentWeather,
  setForecast,
  setSearchQuery,
} from "../store/weather-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import ErrorModal from "../components/ui/ErrorModal";
import LoadingSpinner from "../components/ui/LoadingSpinner";

// Main home component where users land by default
const Home = () => {
  const dispatch = useDispatch();
  const currentWeather = useSelector(
    (state: RootState) => state.weather.currentWeather
  );
  const searchQuery =
    useSelector((state: RootState) => state.weather.searchQuery) ?? "";
  const forecast = useSelector((state: RootState) => state.weather.forecast);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isLightMode = useSelector((state: RootState) => state.ui.theme);
  const [suggestions, setSuggestions] = useState([]);

  const fetchAutocompleteSuggestions = async (input: string) => {
    if (input.length < 1) {
      setSuggestions([]);
      return;
    }

    try {
      const locationSuggestions = await autocompleteLocation(input);
      setSuggestions(locationSuggestions);
    } catch (error) {
      setError("Failed to fetch autocomplete suggestions");
      console.error("Autocomplete error:", error);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setInputValue(suggestion.LocalizedName);
    setSuggestions([]);
  };

  // Fetch weather data for a given city
  const fetchWeather = async (city: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const locations = await autocompleteLocation(city);

      if (!locations) {
        throw new Error("Location not found.");
      }

      // Use the first suggested location's key to fetch weather data
      const locationKey = locations[0].Key;
      const [currentWeatherData, forecastData] = await Promise.all([
        getCurrentWeather(locationKey),
        get5DayForecast(locationKey),
      ]);

      if (!currentWeatherData || !forecastData) {
        throw new Error("Weather data is unavailable.");
      }
      // Dispatch actions to update the Redux store with the new weather data
      const extendedWeatherData = {
        ...currentWeatherData,
        cityName: locations[0].LocalizedName,
        id: locationKey,
      };

      dispatch(setCurrentWeather(extendedWeatherData));
      dispatch(setForecast(forecastData));
    } catch (error: any) {
      setError(
        error.message ||
          "An unexpected error occurred while fetching weather data."
      );
      console.error("Failed to fetch weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch weather based on the user's current geolocation
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
      const [currentWeatherData, forecastData] = await Promise.all([
        getCurrentWeather(locationKey),
        get5DayForecast(locationKey),
      ]);

      if (!currentWeatherData || !forecastData) {
        throw new Error("Weather data is unavailable.");
      }

      const extendedWeatherData = {
        ...currentWeatherData,
        cityName: cityName,
        id: locationKey,
      };

      dispatch(setCurrentWeather(extendedWeatherData));
      dispatch(setForecast(forecastData));
    } catch (error: any) {
      setError(
        error.message ||
          "An unexpected error occurred while fetching weather data."
      );
      console.error("Failed to fetch weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Default to Tel Aviv if no search query and geolocation is not enabled
    if (searchQuery) {
      fetchWeather(searchQuery.trim());
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeatherByLocation(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            console.error(error);
            fetchWeather("Tel Aviv");
          }
        );
      } else {
        fetchWeather("Tel Aviv");
      }
    }
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    fetchAutocompleteSuggestions(value);
  };

  const handleSearchClick = () => {
    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
      dispatch(setSearchQuery(inputValue));
      fetchWeather(inputValue);
      setSuggestions([]);
    } else {
      setError("Please enter a valid city name.");
    }
  };

  return (
    <main className="py-12 flex flex-col">
      <div className="flex justify-center gap-2 items-center">
        <div className="relative">
          {" "}
          {/* Wrapper div for input and suggestions */}
          <Input
            className="min-w-[250px]"
            icon={<AiOutlineSearch />}
            placeholder="Search for city"
            type="text"
            value={inputValue}
            onChange={handleSearchChange}
          />
          {suggestions.length > 0 && (
            <div className="absolute z-10 bg-white shadow-md max-h-60 w-full overflow-auto custom-scrollbar">
              {suggestions.map((suggestion: any) => (
                <div
                  key={suggestion.Key}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectSuggestion(suggestion)}>
                  {suggestion.LocalizedName}
                </div>
              ))}
            </div>
          )}
        </div>
        <Button
          className={isLightMode ? "primaryBtn" : "primaryDarkBtn"}
          onClick={handleSearchClick}>
          Search
        </Button>
      </div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && currentWeather && (
        <WeatherData currentWeather={currentWeather} forecast={forecast} />
      )}
      <ErrorModal
        showModal={error !== null}
        message={error || ""}
        onClose={() => setError(null)}
      />
    </main>
  );
};

export default Home;
