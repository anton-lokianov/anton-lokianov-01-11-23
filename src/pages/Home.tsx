import { useEffect, useState } from "react";
import Input from "../components/ui/Input";
import { AiOutlineSearch } from "react-icons/ai";
import {
  autocompleteLocation,
  get5DayForecast,
  getCurrentWeather,
} from "../utils/api";
import Weather from "../components/Weather";
import useDebounce from "../hooks/useDebounce";
import {
  setCurrentWeather,
  setForecast,
  setSearchQuery,
} from "../store/weather-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import ErrorModal from "../components/ui/ErrorModal";
import LoadingSpinner from "../components/ui/LodingSpinner";

const Home = () => {
  const dispatch = useDispatch();
  const currentWeather = useSelector(
    (state: RootState) => state.weather.currentWeather
  );
  const forecast = useSelector((state: RootState) => state.weather.forecast);
  const searchQuery = useSelector(
    (state: RootState) => state.weather.searchQuery
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const locations = await autocompleteLocation(
          debouncedSearchQuery || "Tel Aviv"
        );

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
      }

      setIsLoading(false);
    };

    fetchWeather();
  }, [debouncedSearchQuery, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      dispatch(setSearchQuery(value));
    }
  };

  return (
    <main className="py-12 flex flex-col">
      <div className="flex justify-center">
        <Input
          className="min-w-[20rem]"
          icon={<AiOutlineSearch />}
          placeholder="Search for city"
          type="text"
          value={searchQuery || ""}
          onChange={handleSearchChange}
        />
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
