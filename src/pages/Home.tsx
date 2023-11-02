import { useState, useEffect } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { AiOutlineSearch } from "react-icons/ai";
import {
  autocompleteLocation,
  get5DayForecast,
  getCurrentWeather,
} from "../utils/api";
import Weather from "../components/Weather";
import {
  setCurrentWeather,
  setForecast,
  setSearchQuery,
} from "../store/weather-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import ErrorModal from "../components/ui/ErrorModal";
import LoadingSpinner from "../components/ui/LoadingSpinner";

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
  const isDarkMode = useSelector((state: RootState) => state.ui.theme);

  /**i remove the useDebounce hook that i create for the search but i will keep it in hooks folder
   * instead i added a button for the search */

  const fetchWeather = async (city: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const locations = await autocompleteLocation(city);

      if (!locations || locations.length === 0) {
        throw new Error("Location not found.");
      }

      const locationKey = locations[0].Key;
      const [currentWeatherData, forecastData] = await Promise.all([
        getCurrentWeather(locationKey),
        get5DayForecast(locationKey),
      ]);

      if (!currentWeatherData || !forecastData) {
        throw new Error("Weather data is unavailable.");
      }

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
      dispatch(setSearchQuery(""));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cityToFetch = searchQuery.trim() || "Tel Aviv";
    fetchWeather(cityToFetch);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
      dispatch(setSearchQuery(inputValue));
      fetchWeather(inputValue);
    } else {
      setError("Please enter a valid city name.");
    }
  };

  return (
    <main className="py-12 flex flex-col">
      <div className="flex justify-center gap-2 items-center">
        <Input
          className="min-w-[250px]"
          icon={<AiOutlineSearch />}
          placeholder="Search for city"
          type="text"
          value={inputValue}
          onChange={handleSearchChange}
        />
        <Button
          className={isDarkMode ? "primaryBtn" : "primaryDarkBtn"}
          onClick={handleSearchClick}>
          Search
        </Button>
      </div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Weather currentWeather={currentWeather} forecast={forecast} />
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
