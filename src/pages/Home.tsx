import { useState, useEffect } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { AiOutlineSearch } from "react-icons/ai";
import WeatherData from "../components/WeatherData";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ErrorModal from "../components/ui/ErrorModal";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useWeather } from "../hooks/useWeather";
import { useAutocomplete } from "../hooks/useAutocomplete";

// Main home component where users land by default
const Home = () => {
  const currentWeather = useSelector(
    (state: RootState) => state.weather.currentWeather
  );
  const forecast = useSelector((state: RootState) => state.weather.forecast);
  const [inputValue, setInputValue] = useState("");
  const {
    fetchWeather,
    fetchWeatherByLocation,
    isLoading,
    error: weatherError,
    setError: setWeatherError,
  } = useWeather();
  const { suggestions, setSuggestions, setAutoCompleteInput } =
    useAutocomplete();

  const searchQuery =
    useSelector((state: RootState) => state.weather.searchQuery) || "";
  const isLightMode = useSelector((state: RootState) => state.ui.theme);

  // Fetch weather data on first load
  useEffect(() => {
    if (searchQuery) {
      fetchWeather(searchQuery.trim());
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByLocation(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        () => {
          fetchWeather("Tel Aviv");
        }
      );
    } else {
      fetchWeather("Tel Aviv");
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setAutoCompleteInput(value);

    if (value.trim() === "") {
      setSuggestions([]);
    }
  };

  const handleSearchClick = () => {
    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
      fetchWeather(inputValue);
      setSuggestions([]);
    } else {
      setWeatherError("Please enter a valid city name.");
    }
  };

  const selectSuggestion = (suggestion: any) => {
    setInputValue(suggestion.LocalizedName);
    setSuggestions([]);
  };

  const clearError = () => {
    setWeatherError(null);
  };

  return (
    <main className="py-12 flex flex-col">
      <div className="flex justify-center gap-2 items-center">
        <div className="relative">
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
        showModal={weatherError !== null}
        message={weatherError || ""}
        onClose={clearError}
      />
    </main>
  );
};

export default Home;
